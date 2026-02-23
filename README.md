Job Application Tracker API 🚀

A secure and scalable backend system designed to help users record, manage, and analyze their job applications. This project demonstrates strong backend fundamentals including RESTful API design, session-based authentication, relational database modeling, and UUID-based architecture.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
📌 Project Overview

The Job Application Tracker allows users to:

Register and log in securely
Add and manage job applications applied through external platforms
Update and track application status (Applied, Interview, Selected, Rejected)
Delete application records
View analytics such as total applications and status-wise distribution

The system is built using Node.js, Express.js, and PostgreSQL with a normalized relational schema and UUID-based identifiers to efficiently handle multiple users and growing data.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
🚀 Features

🔐 Authentication & Security

Session-based authentication using express-session
Secure password hashing with bcrypt
Environment configuration using dotenv
UUID-based primary keys for improved security and scalability
Protected routes for authenticated users

🗄️ Database & Data Integrity

PostgreSQL relational database
Fully normalized schema design
Foreign key constraints to maintain relationships

-Efficient SQL JOIN queries to fetch combined data from:

 Users
 Companies
 Jobs
 Applications

📊 Application Management

Add and manage job application records

Update application status:
Applied
Interview
Selected
Rejected
Delete applications

View statistics grouped by status

⚙️ RESTful API

Clean REST architecture
Full CRUD operations
Structured routes and middleware
Error handling and validation

🛠️ Tech Stack

Category	Technology
Runtime	Node.js
Framework	Express.js
Database	PostgreSQL
Authentication	Express-session, Bcrypt
Utilities	UUID, Dotenv
