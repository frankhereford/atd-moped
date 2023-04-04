ALTER TABLE moped_milestones
    DROP COLUMN is_deleted;



alter table moped_milestones add column "required_milestone" boolean;
alter table moped_milestones add column "milestone_average_length" integer;


UPDATE moped_milestones SET milestone_name = 'FDU and Task Orders created including Signs and Markings' WHERE milestone_id = 36;
UPDATE moped_milestones SET milestone_name = 'Contractor DO created' WHERE milestone_id = 40;
UPDATE moped_milestones SET milestone_name = 'Power has been installed' WHERE milestone_id = 43;
UPDATE moped_milestones SET milestone_name = 'Verification deficiencies have been addressed ' WHERE milestone_id = 50;
UPDATE moped_milestones SET milestone_name = 'Signal turn on ' WHERE milestone_id = 51;
UPDATE moped_milestones SET milestone_name = 'Cabinet ready to be set ' WHERE milestone_id = 44;
