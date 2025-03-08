# Assignment1: Unit Testing a Student and Course Grading System

## Objective:

In this assignment, you will design two classes: Student and Course, for a grading system that involves 
various assessments: assignments, midterm exam, final exam, and final project. 
You will then write unit tests involving test cases, test suites, and parameterized tests 
to validate the functionality of your system.

## Task 1: Design the Student and Course Classes
### 1.1. Student Class:
Define a class named Student with the following attributes:

    studentId (unique identifier for the student).
    name (name of the student).
    A list of courses the student is enrolled in (this can be a list or array of Course objects).

Implement the following methods:

    addCourse(Course course): Adds a course to the student's list of courses.
    getCourseGrades(): Returns the list of all grades for courses that the student is enrolled in.
    getGPA(): Returns the student's GPA based on grades across all courses (average of course grades).

### 1.2. Course Class:
Define a class named Course with the following attributes:

    courseId (unique identifier for the course).
    courseName (name of the course).
    Grades for the following assessments:
        assignment1
        assignment2
        midtermExam
        finalExam
        finalProject


Implement the following methods:

    setGrades(double assignment1, double assignment2, double midtermExam, double finalExam, double finalProject): Accepts the grades for the five assessments and sets them.
    getCourseGrade(): Calculates and returns the final course grade based on the weights of assessments (for example: 20% assignments, 30% midterm, 40% final exam, 10% final project).

## Task 2: Write Unit Test Cases

### 2.1. Test Case for Student Class:
Write test cases to:

    Verify the addCourse() method works as expected (i.e., ensures that a course is added to the student).
    Verify the getCourseGrades() method returns the correct grades for a student across all courses.
    Verify the getGPA() method correctly calculates the GPA across multiple courses.

### 2.2. Test Case for Course Class:
Write test cases to:

    Verify the setGrades() method correctly sets the grades for all assessments.
    Verify the getCourseGrade() method calculates the final grade accurately based on the weighted average of all assessments.

## Task 3: Implement Test Suite

Write a test suite that groups all unit tests related to the Student and Course classes. The suite should run all tests for both classes in a single execution.

## Task 4: Implement Parameterized Tests

Use JUnit Parameterized Tests to test the getCourseGrade() method in the Course class for different sets of grades.

    Test Case 1: Verify that the course grade is calculated correctly for a student who has high scores on assignments and exams.
    Test Case 2: Verify the grade for a student with average scores across all assessments.
    Test Case 3: Verify the grade for a student with lower scores on assignments and exams.
    You can use a @ValueSource or @CsvSource to provide different sets of input data for the parameterized test.

## Task 5: Run and Analyze Your Tests
Run the test cases in your IDE IntelliJ or using Maven.
Ensure all test cases pass and verify expected behavior.
Generate a test report.

---

## Evaluation Criteria
The assignment will be evaluated based on two primary components:

Project Implementation: The quality and effectiveness of the project you implement.

Oral Exam Performance: Your performance during the oral exam, which will take place during class in Week 6(specific day and time to be announced later).

## Oral Exam Requirement

The oral exam is **mandatory** as part of the evaluation process. Students will be assessed based on their understanding of the material presented in their **reports** and **source code**.

### **During the Oral Exam:**
- Reports must be **open** and accessible.
- Source code must be **ready to show** in the IDE.
- Tests must be **ready to run** for demonstration.

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

Methodology: Describe the methods and approaches used in your research or project.

Conclusion: Summarize the key points and findings of your study.

### Additional Recommendations

Ensure that your report is well-organized and free of grammatical errors.

Use clear headings and subheadings to enhance readability.

## Email Submission

Students are required to **compress** their reports and source code into a **single file** (or provide a **GitHub link** to their source code repository) and submit it via **email**.

* Email Subject: Use the following format for the subject line of your email:
  - st-assignment1-StudentName
* File Naming: Ensure that the compressed file is named appropriately, using the following format:
  - StudentName-Report.zip
* Only **one submission per group** is sufficient.


## Technology Requirements
Students are **required** to use the following technologies for their project:
- **Java** for implementation
- **JUnit** for testing
- **Maven** for dependency management and test automation

## Late Submission and Oral Exam Policy
Students must submit their **reports and source code** before the **oral exam** (during class in **Week 6**), as the oral exam time is crucial for evaluation.
If a student or group is unable to attend the scheduled oral exam, they will be allowed to defend their project one week later during course hours.
However, this late defense of the oral exam will result in a 20% penalty on the total grade.

**Please note that there will not be another opportunity to defend the project beyond this timeframe.**

### By adhering to these guidelines and policies, you will ensure that your submission is complete and meets the evaluation criteria. Good luck with your projects and oral exams!
