Job Application Tracker API 🚀

A scalable and secure backend system for tracking job applications. This project focuses on backend architecture, relational database design, and session-based authentication, built as part of my backend engineering practice 

📌 Project Overview

The Job Application Tracker allows users to:

Register and log in securely
Apply for jobs
Track application status
View analytics of their applications

The system is built using Node.js, Express, and PostgreSQL with a normalized relational schema and UUID-based identifiers.

🚀 Features

🔐 Authentication & Security

Session-based authentication using express-session
Password hashing with bcrypt
Environment variable management using dotenv
UUID-based primary keys for enhanced security and scalability

🗄️ Database & Data Integrity

PostgreSQL relational database
Fully normalized schema
Foreign key constraints to maintain relationships

SQL JOINs to fetch combined data from:

Users
Jobs
Companies
Applications

📊 Application Management

.Apply to jobs
.Update application status
(Applied, Interview, Selected, Rejected)
.Delete applications
.View statistics grouped by status

⚙️ RESTful API

Complete CRUD operations following REST principles.

🛠️ Tech Stack

Category	Technology
Runtime	Node.js
Framework	Express.js
Database	PostgreSQL
Authentication	Express-session, Bcrypt
Utilities	UUID, Dotenv 

