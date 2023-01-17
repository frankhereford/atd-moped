-- Remove empty strings and 0 that we added when a user updates the moped_proj_funding table
UPDATE moped_proj_funding SET fund_dept_unit = null WHERE fund_dept_unit = '';
UPDATE moped_proj_funding SET funding_description = null WHERE funding_description = '';
UPDATE moped_proj_funding SET funding_program_id = null WHERE funding_program_id = 0;
UPDATE moped_proj_funding SET funding_amount = null WHERE funding_amount = 0;

INSERT INTO moped_fund_programs (funding_program_id, funding_program_name) VALUES (0, '');
