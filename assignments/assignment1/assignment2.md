# **Assignment 2: Developing and Testing a Web Application for Student and Course Management**

## **Objective**
In this assignment, you will develop a web application using **Node.js** and **PostgreSQL** to manage student and course operations. 
You will also implement and execute functional tests to ensure the reliability of the application.

## **Requirements**


### **1. Database Design**
You will design and implement a **PostgreSQL database** with the following tables:

#### **1.1. Student Table**
Stores student information.
- **id** (SERIAL PRIMARY KEY) – Unique identifier for each student.
- **name** (VARCHAR(100) NOT NULL) – Name of the student.
- **email** (VARCHAR(100) UNIQUE NOT NULL) – Email address of the student.
- **registration_time** (TIMESTAMP DEFAULT CURRENT_TIMESTAMP) – Timestamp of student registration.

#### **1.2. Course Table**
Stores course details.
- **id** (SERIAL PRIMARY KEY) – Unique identifier for each course.
- **course_name** (VARCHAR(100) NOT NULL) – Name of the course.
- **instructor** (VARCHAR(100) NOT NULL) – Name of the course instructor.
- **credit_hours** (SMALLINT NOT NULL CHECK (credit_hours > 0)) – Number of credit hours.

#### **1.3. Enrollment Table**
Stores which students are enrolled in which courses.
- **id** (SERIAL PRIMARY KEY) – Unique identifier for each enrollment record.
- **student_id** (INTEGER ) – Foreign key referencing the student.
- **course_id** (INTEGER ) – Foreign key referencing the course.
- **assignment1** (DECIMAL(5,2) CHECK (assignment1 BETWEEN 0 AND 100)) – Grade for Assignment 1.
- **assignment2** (DECIMAL(5,2) CHECK (assignment2 BETWEEN 0 AND 100)) – Grade for Assignment 2.
- **midterm_exam** (DECIMAL(5,2) CHECK (midterm_exam BETWEEN 0 AND 100)) – Grade for the Midterm Exam.
- **final_exam** (DECIMAL(5,2) CHECK (final_exam BETWEEN 0 AND 100)) – Grade for the Final Exam.
- **final_project** (DECIMAL(5,2) CHECK (final_project BETWEEN 0 AND 100)) – Grade for the Final Project.

### **2. Grading System**
Each student’s final grade for a course will be calculated as follows:
- **Assignment 1:** 15%
- **Assignment 2:** 15%
- **Midterm Exam:** 30%
- **Final Exam:** 30%
- **Final Project:** 10%

The final course grade is the weighted sum of these assessments.

### **3. Web Application Development**
- Develop a **REST API** using **Express.js** for managing students and courses.
- Implement **CRUD operations** for:
    - **Students** (Add, Retrieve, Update, Delete).
    - **Courses** (Add, Retrieve, Update, Delete).
    - **Enrollments** (Enroll students, retrieve course grades, calculate final grades).
- Store the data in a **PostgreSQL database**.
- The application must run on **two different ports (3000 and 4000)**.
- Use **PM2** to manage and run both instances of the application.

### **4. API Testing with IntelliJ HTTP Client**
- Configure the **IntelliJ HTTP client** to test the API.
- Set up an **environment variable** to switch between the two application instances.
- Write test cases in the HTTP client to **verify response values**.

### **5. Automated Testing with Jest & SuperTest**
- Configure **Jest** and **SuperTest** frameworks for testing.
- Implement **at least 15 test cases** covering:
    - **Student CRUD operations**.
    - **Course CRUD operations**.
    - **Enrollment operations (adding grades, retrieving GPA, etc.).**
    - **Validation checks (ensuring grades are within 0-100, required fields are not empty, etc.).**
- Generate a **test coverage report**.

## **Deliverables**
- Source code of the web application.
- Configuration files for **IntelliJ HTTP client**.
- Test cases and test reports.


---

## Evaluation Criteria
The assignment will be evaluated based on two primary components:

Project Implementation: The quality and effectiveness of the project you implement.

Oral Exam Performance: Your performance during the oral exam, which will take place during class in Week 12(specific day and time to be announced later).

## Oral Exam Requirement

The oral exam is **mandatory** as part of the evaluation process. Students will be assessed based on their understanding of the material presented in their **reports** and **source code**.

### **During the Oral Exam:**
- Reports must be **open** and accessible.
- Source code must be **ready to show** in the IDE.
- Applications must be **ready to run** for demonstration.

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

Students are required to **compress** their report and source code into a **single file** (or provide a **GitHub link** to their source code repository) and submit it via **email (cceken@ku.edu.kz)** before oral examination.

* Email Subject: Use the following format for the subject line of your email:
    - st-assignment2-StudentName
* File Naming: Ensure that the compressed file is named appropriately, using the following format:
    - StudentName-Report.zip
* Only **one submission per group** is sufficient.

## Late Submission and Oral Exam Policy
Students must submit their **reports and source code** before the **oral exam**, as the oral exam time is crucial for evaluation.
If a student or group is unable to attend the scheduled oral exam, they will be allowed to defend their project one week later during course hours.
However, this late defense of the oral exam will result in a 20% penalty on the total grade.

**Please note that there will not be another opportunity to defend the project beyond this timeframe.**

### By adhering to these guidelines and policies, you will ensure that your submission is complete and meets the evaluation criteria. Good luck with your projects and oral exams!
