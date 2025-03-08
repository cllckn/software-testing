# **Final Project: Full-Stack Student and Course Management System with Comprehensive Testing**

## **Objective**
In this final project, you will develop a **full-stack web application** for student and course management. 
The project will include a **backend REST API** using **Node.js and PostgreSQL**, 
a **frontend web interface** using **jQuery and CSS**, and comprehensive **automated testing** for 
API endpoints, UI interactions, and system performance.

## **Requirements**

### **1. Database Design**
You will implement a **PostgreSQL database** with the following tables:

#### **1.1. Student Table**
Stores student information.
- **id** (SERIAL PRIMARY KEY) – Unique identifier for each student.
- **name** (VARCHAR(100) NOT NULL) – Name of the student.
- **email** (VARCHAR(100) UNIQUE NOT NULL) – Email address of the student.
- **created_at** (TIMESTAMP DEFAULT CURRENT_TIMESTAMP) – Timestamp of student registration.

#### **1.2. Course Table**
Stores course details.
- **id** (SERIAL PRIMARY KEY) – Unique identifier for each course.
- **course_name** (VARCHAR(100) NOT NULL) – Name of the course.
- **instructor** (VARCHAR(100) NOT NULL) – Name of the course instructor.
- **credit_hours** (SMALLINT NOT NULL CHECK (credit_hours > 0)) – Number of credit hours.

#### **1.3. Enrollment Table**
Stores which students are enrolled in which courses and their grades.
- **id** (SERIAL PRIMARY KEY) – Unique identifier for each enrollment record.
- **student_id** (INTEGER ) – Foreign key referencing the student.
- **course_id** (INTEGER ) – Foreign key referencing the course.
- **assignment1** (DECIMAL(5,2) CHECK (assignment1 BETWEEN 0 AND 100)) – Grade for Assignment 1.
- **assignment2** (DECIMAL(5,2) CHECK (assignment2 BETWEEN 0 AND 100)) – Grade for Assignment 2.
- **midterm_exam** (DECIMAL(5,2) CHECK (midterm_exam BETWEEN 0 AND 100)) – Grade for the Midterm Exam.
- **final_exam** (DECIMAL(5,2) CHECK (final_exam BETWEEN 0 AND 100)) – Grade for the Final Exam.
- **final_project** (DECIMAL(5,2) CHECK (final_project BETWEEN 0 AND 100)) – Grade for the Final Project.

### **2. Grading System**
The final grade for each course will be calculated as follows:
- **Assignment 1:** 15%
- **Assignment 2:** 15%
- **Midterm Exam:** 30%
- **Final Exam:** 30%
- **Final Project:** 10%

The final course grade is the weighted sum of these assessments.

### **3. Web Application Development**

#### **3.1. Backend (Node.js & PostgreSQL)**
- Develop a **REST API** using **Express.js** for managing:
  - **Students** (Add, Retrieve, Update, Delete).
  - **Courses** (Add, Retrieve, Update, Delete).
  - **Enrollments** (Enroll students, retrieve course grades, calculate final grades).
- Store data in a **PostgreSQL database**.
- The application must run on **two different ports (3000 and 4000)**.
- Use **PM2** to manage and run both instances of the application.

#### **3.2. Frontend (jQuery & CSS)**
- Develop  **web interfaces** that allows users to:
  - Manage **students** (view, add, update, delete).
  - Manage **courses** (view, add, update, delete).
  - Enroll students in courses and manage grades.
  - View each student’s final grades and GPA.
- Implement **form validation** for user inputs.
- Use **pure CSS, Tailwind CSS, or another CSS framework** for styling.

### **4. API Testing**
#### **4.1. HTTP Client Testing**
- Use **IntelliJ HTTP client** to test API endpoints.
- Configure **environment variables** to switch between application instances.
- Write test cases in HTTP client to verify API responses and validate returned data.

#### **4.2. Jest & SuperTest API Testing**
- Configure **Jest** and **SuperTest** frameworks for automated testing.
- Write at least **10 unit and integration test cases**, covering:
  - **Student CRUD operations**.
  - **Course CRUD operations**.
  - **Enrollment operations (adding grades, retrieving GPA, etc.).**
  - **Validation checks (ensuring grades are within 0-100, required fields are not empty, etc.).**
- Generate a **test coverage report**.

### **5. End-to-End Testing**
- Implement **Cypress** for testing the frontend.
- Write end-to-end test cases to verify:
  - User interactions with forms (adding/updating students, courses, enrollments).
  - Display of correct grades and GPA calculations.
  - Navigation between different sections of the application.
- Generate a **Cypress test report**.

### **6. Load Testing**
- Use a **load testing tool**  to evaluate system performance.
- Simulate multiple concurrent users accessing API endpoints.
- Measure response times and system behavior under high load.
- Generate a **load testing report** with key findings.


---

## Evaluation Criteria
The assignment will be evaluated based on two primary components:

Project Implementation: The quality and effectiveness of the project you implement.

Oral Exam Performance: Your performance during the oral exam, which will take place during the final exam week(specific day and time to be announced later).

## Oral Exam Requirement

The oral exam is **mandatory** as part of the evaluation process. Students will be assessed based on their understanding
of the material presented in their **reports** and **source code**.

### **During the Oral Exam:**
- Reports must be **open** and accessible.
- Source code must be **ready to show** in the IDE.
- Application&tests must be **ready to run** for demonstration.

## Group Work
Students may form groups of up to two members.

All group members will receive a common grade for the assignment.

Instructors may question any group member during the oral exam, so it is essential that each member has a thorough understanding of all aspects of the project.

## Report Structure
While there is no standard template for the report, it must include the following essential components:

### Cover Page
Student Information: Include your full name, student ID, course name, and date of submission.

Title of the Report: Clearly state the title of your study or project.

### Study Explanation
The report must provide a straightforward explanation of your study, including:

Objective: Clearly outline the purpose and goals of your study.

Methodology: Describe the methods and approaches used in your project.

Conclusion: Summarize the key points and findings of your study.

### Additional Recommendations

Ensure that your report is well-organized and free of grammatical errors.

Use clear headings and subheadings to enhance readability.

## Email Submission

Students are required to **compress** their report and source code into a **single file** (or provide a **GitHub link** to 
their source code repository) and submit it via **email (cceken@ku.edu.kz)** before oral examination.

* Email Subject: Use the following format for the subject line of your email:
  - st-final-project-StudentName
* File Naming: Ensure that the compressed file is named appropriately, using the following format:
  - StudentName-Report.zip
* Only **one submission per group** is sufficient.

### By adhering to these guidelines and policies, you will ensure that your submission is complete and meets the evaluation criteria. Good luck with your projects and oral exams!
