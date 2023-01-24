export const ProjectActivityLogTableMaps = {
  moped_project: {
    label: "Project",
    fields: {
      project_name: {
        label: "name",
      },
      project_description: {
        label: "description",
      },
      ecapris_subproject_id: {
        label: "eCAPRIS subproject ID",
      },
      current_status: {
        label: "current status",
      },
      current_phase: {
        label: "phase",
      },
      is_deleted: {
        label: "soft delete status",
      },
      milestone_id: {
        label: "milestone ID",
      },
      status_id: {
        label: "status ID",
      },
      // deprecated column, but keeping because historical activities depend on it
      contractor: {
        label: "contractor",
      },
      project_sponsor: {
        label: "project sponsor",
        lookup: "moped_entity",
      },
      public_process_status_id: {
        label: "public process status",
        lookup: "moped_public_process_statuses"
      },
      project_website: {
        label: "project website",
      },
      knack_project_id: {
        label: "Knack internal ID",
      },
      // deprecated column, but keeping because historical activities depend on it
      purchase_order_number: {
        label: "purchase order number",
      },
      task_order: {
        label: "task order",
      },
      // deprecated column, but keeping because historical activities depend on it
      work_assignment_id: {
        label: "work assignment ID",
      },
      parent_project_id: {
        label: "parent project id",
      },
      interim_project_id: {
        label: "Interim MPD (Access) ID",
      },
      project_lead_id: {
        label: "project lead",
        lookup: "moped_entity",
      },
      capitally_funded: {
        label: "capitally funded"
      },
      is_retired: {
        label: "is retired"
      }
    },
  },
  moped_proj_entities: {
    label: "Entity",
    fields: {
      project_sponsors: {
        icon: "",
        label: "sponsor",
        type: "text",
      },
      entity_list_id: {
        icon: "",
        label: "list ID",
        type: "int4",
      },
      date_added: {
        icon: "",
        label: "date added",
        type: "timestamptz",
      },
      project_id: {
        icon: "",
        label: "ID",
        type: "int4",
      },
      project_personnel: {
        icon: "",
        label: "personnel",
        type: "text",
      },
      workgroups: {
        icon: "",
        label: "work groups",
        type: "int4",
      },
      partners: {
        icon: "",
        label: "partners",
        type: "text",
      },
      project_groups: {
        icon: "",
        label: "groups",
        type: "bpchar",
      },
    },
  },
  moped_proj_milestones: {
    label: "Milestone",
    fields: {
      milestone_end: {
        label: "end date",
      },
      project_id: {
        label: "project ID",
      },
      project_milestone_id: {
        label: "ID",
      },
      completed: {
        label: "completion",
      },
      is_current_milestone: {
        label: "current milestone marker",
      },
      milestone_order: {
        label: "order",
      },
      milestone_description: {
        label: "description",
      },
      milestone_name: {
        label: "name",
      },
      date_added: {
        label: "date added",
      },
      milestone_privacy: {
        label: "privacy flag",
      },
      milestone_start: {
        label: "start date",
      },
      completion_percentage: {
        label: "completion percentage",
      },
      milestone_status: {
        label: "status",
      },
      milestone_priority: {
        label: "priority",
      },
      milestone_date_type: {
        label: "date type",
      },
      milestone_related_phase_id: {
        label: "related phase ID",
      },
      started_by_user_id: {
        label: "started by user ID",
      },
      completed_by_user_id: {
        label: "completed by user ID",
      },
      milestone_estimate: {
        label: "completion estimate",
      },
      is_deleted: {
        label: "is deleted",
      },
    },
  },
  moped_proj_notes: {
    label: "Note",
    fields: {
      // todo: this column has been deprecated. we should remove it from here and use a gracefull fallback handler
      added_by: {
        icon: "",
        label: "added by",
        type: "bpchar",
      },
      project_id: {
        icon: "",
        label: "project ID",
        type: "int4",
      },
      project_note_id: {
        icon: "",
        label: "note ID",
        type: "int4",
      },
      date_created: {
        icon: "",
        label: "date created",
        type: "timestamptz",
      },
      project_note: {
        icon: "",
        label: "note",
        type: "text",
      },
      is_deleted: {
        icon: "",
        label: "is deleted",
        type: "boolean",
      },
      added_by_user_id: {
        icon: "",
        label: "added by user ID",
        type: "integer",
      },
      project_note_type: {
        icon: "",
        label: "note type",
        type: "integer",
      },
    },
  },
  moped_proj_partners: {
    label: "Partner",
    fields: {
      added_by: {
        icon: "",
        label: "added By",
        type: "int4",
      },
      date_added: {
        icon: "",
        label: "date added",
        type: "timestamptz",
      },
      proj_partner_id: {
        icon: "",
        label: "partner ID",
        type: "int4",
      },
      partner_name: {
        icon: "",
        label: "name",
        type: "text",
      },
      entity_id: {
        icon: "",
        label: "entity ID",
        type: "int4",
      },
      project_id: {
        icon: "",
        label: "project ID",
        type: "int4",
      },
      is_deleted: {
        icon: "",
        label: "is deleted",
        type: "boolean",
      },
    },
  },
  moped_proj_personnel: {
    label: "Team",
    fields: {
      added_by: {
        icon: "",
        label: "added by",
        type: "int4",
      },
      date_added: {
        icon: "",
        label: "date added",
        type: "timestamptz",
      },
      project_personnel_id: {
        icon: "",
        label: "ID",
        type: "int4",
      },
      notes: {
        icon: "",
        label: "notes",
        type: "text",
      },
      is_deleted: {
        icon: "",
        label: "is deleted",
        type: "boolean",
        map: {
          true: "Inactive",
          false: "Active",
        },
      },
      project_id: {
        icon: "",
        label: "project ID",
        type: "int4",
      },
      role_id: {
        icon: "",
        label: "role",
        type: "int4",
        lookup: {
          table: "moped_project_roles",
          fieldLabel: "project_role_id",
          fieldValues: ["project_role_name"],
        },
      },
      user_id: {
        icon: "",
        label: "user",
        type: "int4",
        lookup: {
          table: "moped_users",
          fieldLabel: "user_id",
          fieldValues: ["first_name", "last_name"],
        },
      },
    },
  },
  moped_proj_phases: {
    label: "Phases",
    fields: {
      phase_order: {
        icon: "",
        label: "order",
        type: "int4",
      },
      phase_id: {
        icon: "",
        label: "phase",
        type: "integer",
        lookup: {
          table: "moped_phases",
          fieldLabel: "phase_id",
          fieldValues: ["phase_name"],
        },
      },
      phase_description: {
        icon: "",
        label: "description",
        type: "text",
      },
      completion_percentage: {
        icon: "",
        label: "completion percentage",
        type: "int4",
      },
      phase_status: {
        icon: "",
        label: "status",
        type: "text",
      },
      phase_privacy: {
        icon: "",
        label: "privacy",
        type: "bool",
      },
      phase_start: {
        icon: "",
        label: "start date",
        type: "date",
      },
      phase_end: {
        icon: "",
        label: "end date",
        type: "date",
      },
      phase_priority: {
        icon: "",
        label: "priority",
        type: "int4",
      },
      is_current_phase: {
        icon: "",
        label: "current phase marker",
        type: "bool",
      },
      completed: {
        icon: "",
        label: "completed",
        type: "bool",
      },
      project_id: {
        icon: "",
        label: "project ID",
        type: "int4",
      },
      started_by_user_id: {
        icon: "",
        label: "started by user ID",
        type: "int4",
      },
      completed_by_user_id: {
        icon: "",
        label: "completed by user ID",
        type: "int4",
      },
      date_added: {
        icon: "",
        label: "date added",
        type: "timestamptz",
      },
      project_phase_id: {
        icon: "",
        label: "ID",
        type: "int4",
      },
      is_deleted: {
        icon: "",
        label: "is deleted",
        data_type: "boolean",
      },
      subphase_id: {
        icon: "",
        label: "subphase ID",
        type: "integer",
        lookup: {
          table: "moped_subphases",
          fieldLabel: "subphase_id",
          fieldValues: ["subphase_name"],
        },
      },
    },
  },
  moped_proj_components: {
    label: "Component",
    fields: {
      project_id: {
        icon: "",
        label: "ID",
        data_type: "int4",
      },
      project_component_id: {
        icon: "",
        label: "component ID",
        data_type: "int4",
      },
      component_id: {
        icon: "",
        label: "component ID",
        data_type: "integer",
      },
      name: {
        icon: "",
        label: "name",
        data_type: "text",
      },
      description: {
        icon: "",
        label: "description",
        data_type: "text",
      },
      is_deleted: {
        icon: "",
        label: "is deleted",
        data_type: "boolean",
      },
    },
  },
  moped_project_files: {
    label: "File",
    fields: {
      project_file_id: {
        icon: "",
        label: "ID",
        data_type: "int4",
      },
      project_id: {
        icon: "",
        label: "Project ID",
        data_type: "int4",
      },
      file_key: {
        icon: "",
        label: "file name",
        data_type: "text",
      },
      file_name: {
        icon: "",
        label: "title",
        data_type: "text",
      },
      file_description: {
        icon: "",
        label: "description",
        data_type: "text",
      },
      file_size: {
        icon: "",
        label: "size",
        data_type: "int4",
      },
      file_permissions: {
        icon: "",
        label: "permissions",
        data_type: "jsonb",
      },
      file_metadata: {
        icon: "",
        label: "metadata",
        data_type: "jsonb",
      },
      api_response: {
        icon: "",
        label: "API response",
        data_type: "jsonb",
      },
      created_by: {
        icon: "",
        label: "created by",
        data_type: "int4",
      },
      create_date: {
        icon: "",
        label: "create date",
        data_type: "date",
      },
      is_scanned: {
        icon: "",
        label: "scanned flag",
        data_type: "bool",
      },
      is_deleted: {
        icon: "",
        label: "deleted flag",
        data_type: "bool",
      },
      file_type: {
        icon: "",
        label: "file type",
        data_type: "integer",
      },
    },
  },
  moped_proj_funding: {
    label: "Fund",
    fields: {
      proj_funding_id: {
        label: "ID",
      },
      project_id: {
        label: "project ID",
      },
      date_added: {
        label: "date added",
      },
      added_by: {
        label: "added by",
      },
      funding_source_id: {
        label: "source",
        lookup: "fundingSources",
      },
      funding_program_id: {
        label: "program",
        lookup: "fundingPrograms"
      },
      funding_amount: {
        label: "amount",
      },
      fund_dept_unit: {
        label: "fund department unit",
      },
      funding_description: {
        label: "fund description",
      },
      funding_status_id: {
        label: "status",
        lookup: "fundingStatus"
      },
      is_deleted: {
        label: "is deleted",
      },
      fund: {
        label: "fund",
      },
      dept_unit: {
        label: "department unit",
      },
    },
  },
  moped_project_types: {
    label: "Type",
    fields: {
      project_id: {
        icon: "",
        label: "project ID",
        data_type: "integer",
      },
      project_type_id: {
        icon: "",
        label: "project type ID",
        data_type: "integer",
      },
      date_added: {
        icon: "",
        label: "date added",
        data_type: "timestamptz",
      },
      added_by: {
        icon: "",
        label: "added by",
        data_type: "integer",
      },
      id: {
        icon: "",
        label: "ID",
        data_type: "integer",
      },
      is_deleted: {
        icon: "",
        label: "is deleted",
        data_type: "boolean",
      },
    },
  },
  moped_proj_tags: {
    fields: {
      tag_id: {
        icon: "",
        label: "Tag ID",
        data_type: "integer",
        lookup: {
          table: "moped_tags",
          fieldLabel: "id",
          fieldValues: ["name"],
        },
      },
    },
  },
};

export const ProjectActivityLogOperationMaps = {
  moped_project: {
    DELETE: {
      label: "Deleted",
      icon: "close",
    },
    INSERT: {
      label: "Created",
      icon: "beenhere",
    },
    UPDATE: {
      label: "Update",
      icon: "create",
    },
  },

  moped_proj_personnel: {
    DELETE: {
      label: "Removed",
      icon: "close",
    },
    INSERT: {
      label: "Added",
      icon: "personadd",
    },
    UPDATE: {
      label: "Updated",
      icon: "create",
    },
  },

  moped_proj_phases: {
    DELETE: {
      label: "Removed",
      icon: "close",
    },
    INSERT: {
      label: "Added",
      icon: "event",
    },
    UPDATE: {
      label: "Updated",
      icon: "create",
    },
  },

  moped_project_files: {
    DELETE: {
      label: "Deleted",
      icon: "close",
    },
    INSERT: {
      label: "Added",
      icon: "description",
    },
    UPDATE: {
      label: "Updated",
      icon: "create",
    },
  },

  generic: {
    DELETE: {
      label: "Deleted",
      icon: "close",
    },
    INSERT: {
      label: "Created",
      icon: "addcircle",
    },
    UPDATE: {
      label: "Update",
      icon: "create",
    },
  },
};

export const ProjectActivityLogGenericDescriptions = {
  project_extent_geojson: {
    label: "Project GeoJSON updated",
  },
};

export const ProjectActivityLogCreateDescriptions = {
  moped_proj_personnel: {
    label: (record, userList) =>
      userList[`${record.record_data.event.data.new.user_id}`] + " to the team",
  },
  moped_proj_phases: {
    label: (record, userList, phaseList) => {
      const recordData = record.record_data.event.data.new;
      const phaseName = phaseList[recordData?.phase_id] ?? "";
      return `'${phaseName}' as Project Phase with start date as '${recordData.phase_start}' and end date as '${recordData.phase_end}'`;
    },
  },
  moped_project_files: {
    label: (record) =>
      `New file '${record.record_data.event.data.new.file_name}'`,
  },
  moped_proj_milestones: {
    label: (record, userList) => {
      return (
        fieldFormat(
          record.record_data.event.data.new.milestone_description,
          true
        ) + " as a new milestone"
      );
    },
  },
  moped_proj_notes: {
    label: (record, userList) => {
      // remove HTML tags
      const note = record.record_data.event.data.new.project_note.replace(
        /(<([^>]+)>)/gi,
        ""
      );

      const shortNote =
        note.length > 30 ? note.substr(0, 30).trim() + "..." : note.trim();

      return fieldFormat(shortNote, true) + " as a new note";
    },
  },
  moped_proj_partners: {
    label: (record, userList) => {
      return (
        fieldFormat(record.record_data.event.data.new.partner_name, true) +
        " as a new partner"
      );
    },
  },
  moped_proj_components: {
    label: (record, userList) => {
      return (
        fieldFormat(record.record_data.event.data.new.description, true) +
        " as a new component"
      );
    },
  },
  moped_proj_funding: {
    label: (record, userList) => {
      //return '"' + record.record_data.event.data.new.funding_description + "\" as a new funding source";
      return (
        "A new funding source" +
        (record.record_data.event.data.new.funding_description
          ? ": " + record.record_data.event.data.new.funding_description
          : "")
      );
    },
  },
  generic: {
    label: (record) => {
      return "Added";
    },
  },
};

/**
 * Returns a human-readable field name (translates the column into a readable label)
 * @param {string} type - The table name
 * @param {string} field - The column name
 * @return {string}
 */
export const getHumanReadableField = (type, field) => {
  return (
    ProjectActivityLogTableMaps[type.toLowerCase()]?.fields[field.toLowerCase()]
      ?.label ?? field
  );
};

/**
 * Returns true if a specific field is mapped
 * @param {string} type - The table name
 * @param {string} field - The column name
 * @return {boolean}
 */
export const isFieldMapped = (type, field) =>
  (ProjectActivityLogTableMaps[type.toLowerCase()]?.fields[field.toLowerCase()]
    ?.map ?? null) !== null;

/**
 * Returns the mapped value within the configuration
 * @param {string} type - The table name
 * @param {string} field - The column name
 * @param {*} value - Usually an integer but it can be a string
 * @return {string}
 */
export const getMappedValue = (type, field, value) =>
  ProjectActivityLogTableMaps[type.toLowerCase()]?.fields[field.toLowerCase()]
    ?.map[value];

/**
 * Returns the
 * @param {string} type - The name of the table
 * @return {string}
 */
export const getRecordTypeLabel = (type) => {
  return ProjectActivityLogTableMaps[type.toLowerCase()]?.label ?? type;
};

/**
 * Returns the icon to be used for a specific line, if the field is empty, it defaults to the table's icon
 * @param {string} event_type - The operation type: INSERT, UPDATE, DELETE
 * @param {string} record_type - The name of the table
 * @return {string}
 */
export const getChangeIcon = (event_type, record_type = "moped_project") => {
  const recordType =
    record_type in ProjectActivityLogOperationMaps ? record_type : "generic";
  return (
    ProjectActivityLogOperationMaps[recordType][event_type.toUpperCase()]
      ?.icon ?? "create"
  );
};

/**
 * Translates the operation type value into friendly label
 * @param {string} event_type - The operation type: INSERT, UPDATE, DELETE
 * @param {string} record_type - The name of the table
 * @return {string}
 */
export const getOperationName = (event_type, record_type = "moped_project") => {
  const recordType =
    record_type in ProjectActivityLogOperationMaps ? record_type : "generic";
  return (
    ProjectActivityLogOperationMaps[recordType][event_type.toUpperCase()]
      ?.label ?? "Unknown"
  );
};

/**
 * Translates the operation type value into friendly label when there is no specified difference
 * @param {string} record - The event record
 * @return {string}
 */
export const getCreationLabel = (record, userList, phaseList) => {
  const recordType =
    record.record_type in ProjectActivityLogCreateDescriptions
      ? record.record_type
      : "generic";

  const label = ProjectActivityLogCreateDescriptions[recordType]?.label ?? null;

  return label ? label(record, userList, phaseList) : "Created";
};

/**
 * Attempts to represent a number of possible data types from the database as a string
 * @param {string} the javascript variable (whatever type) you want represented as a string.
 * @return {string}
 */
export const fieldFormat = (changeItem, capitalize = false) => {
  let result = "";
  if (changeItem === null) {
    result = "a null value";
  } else if (String(changeItem).length === 0) {
    result = "an empty value";
  } else if (typeof changeItem === "object") {
    result = "a JavaScript object";
  } else if (typeof changeItem === "boolean") {
    result = String(changeItem);
  } else if (parseFloat(changeItem)) {
    result = String(changeItem);
  } else {
    result = '"' + changeItem + '"';
  }
  return capitalize ? result.charAt(0).toUpperCase() + result.slice(1) : result;
};
