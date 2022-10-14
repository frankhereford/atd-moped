import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  TextField,
} from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { GET_COMPONENTS_FORM_OPTIONS } from "src/queries/components";
import { makeRandomComponentId } from "./utils";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const componentLabel = ({ component_name, component_subtype }) => {
  return component_subtype
    ? `${component_name} - ${component_subtype}`
    : `${component_name}`;
};

const useComponentOptions = (data) =>
  useMemo(() => {
    if (data === undefined) return [];

    const options = data.moped_components.map((comp) => ({
      value: comp.component_id,
      label: componentLabel(comp),
      subcomponents: comp.moped_subcomponents,
    }));
    // add empty option for default state
    return [...options, { value: "", label: "" }];
  }, [data]);

const initialFormValues = {
  componentType: "",
  subcomponent: null,
  description: "",
};

const ControlledAutocomplete = ({
  id,
  disabled = false,
  options,
  getOptionLabel,
  name,
  control,
  label,
}) => (
  <Controller
    id={id}
    name={name}
    control={control}
    disabled={disabled}
    render={({ field, value }) => (
      <Autocomplete
        options={options}
        getOptionLabel={getOptionLabel}
        value={value}
        {...field}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label={label}
            variant="outlined"
          />
        )}
        onChange={(_event, data) => field.onChange(data?.code ?? "")}
      />
    )}
  />
);

const ComponentEditModal = ({
  showDialog,
  setShowDialog,
  setDraftComponent,
  setLinkMode,
  setIsEditingComponent,
  linkMode,
  componentFormState,
  dispatchComponentFormState,
}) => {
  const classes = useStyles();

  // Get options and format them
  const {
    data: optionsData,
    loading: areOptionsLoading,
    error: optionsError,
  } = useQuery(GET_COMPONENTS_FORM_OPTIONS);
  const componentOptions = useComponentOptions(optionsData);

  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
    formState: { isSubmitting },
    reset,
  } = useForm({
    defaultValues: initialFormValues,
  });

  const onSave = (e) => {
    e.preventDefault();
    const newComponent = {
      ...componentFormState.type.data,
      description: componentFormState.description,
      label: componentFormState.type.label,
      _id: makeRandomComponentId(),
      features: [],
    };

    const linkMode = newComponent.line_representation ? "lines" : "points";

    setDraftComponent(newComponent);
    setLinkMode(linkMode);
    // switch to components tab
    setShowDialog(false);
  };

  const onClose = () => {
    setLinkMode(null);
    setDraftComponent(null);
    setIsEditingComponent(false);
    setShowDialog(false);
    dispatchComponentFormState({ action: "reset" });
  };

  return (
    <Dialog open={showDialog} onClose={onClose} fullWidth>
      <DialogTitle disableTypography className={classes.dialogTitle}>
        <h3>New component</h3>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                id="components-type"
                options={areOptionsLoading ? [] : componentOptions}
                getOptionLabel={(option) => {
                  return option.label || "";
                }}
                value={""}
                onChange={(_, option) => {
                  console.log(option);
                }}
                getOptionSelected={(option, value) =>
                  option.value === value.value
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label={"Component Type"}
                    variant="outlined"
                    autoFocus
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              {/* Subcomponents
              This shows available subcomponents
              grey out if none available for selected component type */}
              <Autocomplete
                id="subcomponents"
                disabled={false}
                options={areOptionsLoading ? [] : componentOptions}
                getOptionLabel={(option) => {
                  return option.label || "";
                }}
                value={""}
                onChange={(_, option) => {
                  console.log(option);
                }}
                getOptionSelected={(option, value) =>
                  option.value === value.value
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label={"Subcomponents"}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                fullWidth
                size="small"
                name={"Description"}
                id="description"
                label={"Description"}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                multiline
                minRows={4}
                value={""}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} display="flex" justifyContent="flex-end">
            <Grid item style={{ margin: 5 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CheckCircle />}
                onClick={onSave}
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ComponentEditModal;
