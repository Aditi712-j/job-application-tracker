1. Users Table
user_id: UUID (Primary Key)
name: VARCHAR
email: VARCHAR
password: VARCHAR

2. Company Table
company_id: SERIAL (Primary Key)
name: VARCHAR

3. Job Table
job_id: SERIAL (Primary Key)
j_name: VARCHAR
company_id: INT (Foreign Key)
deadline: DATE

4. Application Table
application_id: SERIAL (Primary Key)
user_id: UUID 
job_id: INT 
status: VARCHAR
