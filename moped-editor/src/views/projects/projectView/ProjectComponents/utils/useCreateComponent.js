import { useReducer } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT_COMPONENT } from "src/queries/components";
import {
  makeDrawnLinesInsertionData,
  makeDrawnPointsInsertionData,
  makeLineStringFeatureInsertionData,
  makePointFeatureInsertionData,
} from "./makeFeatures";
import { getDrawId, isDrawnFeature } from "./features";
import { removeFeatureFromDraftComponent } from "./onMapClick";

const createReducer = (state, action) => {
  switch (action.type) {
    case "start_create":
      return {
        ...state,
        showCreateDialog: true,
        isCreatingComponent: true,
      };
    case "save_create":
      return {
        ...state,
        showCreateDialog: false,
        isCreatingComponent: false,
        draftComponent: null,
      };
    case "cancel_create":
      return {
        ...state,
        showCreateDialog: false,
        isCreatingComponent: false,
        draftComponent: null,
      };
    case "close_create_dialog":
      return {
        ...state,
        showCreateDialog: false,
      };
    case "store_draft_component":
      return { ...state, draftComponent: action.payload };
    case "remove_draft_component_feature":
      const clickedDraftComponentFeature = action.payload;
      const draftComponentWithDeselectedFeatureRemoved =
        removeFeatureFromDraftComponent(
          state.draftComponent,
          clickedDraftComponentFeature
        );

      return {
        ...state,
        draftComponent: draftComponentWithDeselectedFeatureRemoved,
      };
    case "add_drawn_features":
      const newDrawnFeatures = action.payload;
      const featuresWithAdditions = [
        ...state.draftComponent.features,
        ...newDrawnFeatures,
      ];

      const newDraftComponent = {
        ...state.draftComponent,
        features: [...state.draftComponent.features, ...newDrawnFeatures],
      };

      action.callback(featuresWithAdditions);

      return { ...state, draftComponent: newDraftComponent };

    case "update_drawn_features":
      const updatedFeatures = action.payload;

      const featureIdsToUpdate = updatedFeatures.map((feature) =>
        getDrawId(feature)
      );

      const unchangedDraftFeatures = state.draftComponent.features.filter(
        (feature) => {
          if (isDrawnFeature(feature)) {
            return !featureIdsToUpdate.includes(getDrawId(feature));
          } else {
            return true;
          }
        }
      );

      const draftComponentWithUpdates = {
        ...state.draftComponent,
        features: [...unchangedDraftFeatures, ...updatedFeatures],
      };

      return { ...state, draftComponent: draftComponentWithUpdates };

    case "delete_drawn_features":
      const deletedFeatures = action.payload;

      const featureIdsToDelete = deletedFeatures.map((feature) =>
        getDrawId(feature)
      );

      const draftFeaturesToKeep = state.draftComponent.features.filter(
        (feature) => {
          if (isDrawnFeature(feature)) {
            return !featureIdsToDelete.includes(getDrawId(feature));
          } else {
            return true;
          }
        }
      );

      const draftComponentWithDeletes = {
        ...state.draftComponent,
        features: [...draftFeaturesToKeep],
      };

      return { ...state, draftComponent: draftComponentWithDeletes };
    default:
      throw Error(`Unknown action. ${action.type}`);
  }
};

export const useCreateComponent = ({
  projectId,
  setClickedComponent,
  setLinkMode,
  refetchProjectComponents,
}) => {
  const [createState, createDispatch] = useReducer(createReducer, {
    isCreatingComponent: false,
    showCreateDialog: false,
    draftComponent: null,
  });

  const [addProjectComponent] = useMutation(ADD_PROJECT_COMPONENT);

  const onStartCreatingComponent = () => {
    createDispatch({ type: "start_create" });
    setClickedComponent(null);
  };

  const onCancelComponentCreate = () => {
    createDispatch({ type: "cancel_create" });
    setLinkMode(null);
  };

  const onSaveDraftComponent = () => {
    /* Start data preparation */
    const {
      component_id,
      description,
      moped_subcomponents,
      component_name,
      internal_table,
      features,
    } = createState.draftComponent;

    const subcomponentsArray = moped_subcomponents
      ? moped_subcomponents.map((subcomponent) => ({
          subcomponent_id: subcomponent.value,
        }))
      : [];

    const featureTable = internal_table;

    const featuresToInsert = [];
    const drawnLinesToInsert = [];
    const drawnPointsToInsert = [];

    const drawnFeatures = features.filter((feature) =>
      Boolean(getDrawId(feature))
    );
    const selectedFeatures = features.filter(
      (feature) => !Boolean(getDrawId(feature))
    );

    if (featureTable === "feature_street_segments") {
      makeLineStringFeatureInsertionData(
        featureTable,
        selectedFeatures,
        featuresToInsert
      );
      makeDrawnLinesInsertionData(drawnFeatures, drawnLinesToInsert);
    } else if (
      featureTable === "feature_intersections" ||
      featureTable === "feature_signals"
    ) {
      makePointFeatureInsertionData(
        featureTable,
        selectedFeatures,
        featuresToInsert
      );
      makeDrawnPointsInsertionData(drawnFeatures, drawnPointsToInsert);
    }

    const newComponentData = {
      description,
      component_id,
      name: component_name,
      project_id: projectId,
      moped_proj_components_subcomponents: {
        data: subcomponentsArray,
      },
      [featureTable]: {
        data: featuresToInsert,
      },
      feature_drawn_lines: { data: drawnLinesToInsert },
      feature_drawn_points: { data: drawnPointsToInsert },
    };
    /* End data preparation */

    addProjectComponent({ variables: { object: newComponentData } })
      .then(() => {
        refetchProjectComponents();
      })
      .catch((error) => {
        console.log(error);
      });

    createDispatch({ type: "save_create" });
    setLinkMode(null);
  };

  return {
    createState,
    createDispatch,
    onStartCreatingComponent,
    onSaveDraftComponent,
    onCancelComponentCreate,
  };
};
