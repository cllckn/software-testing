package cc.ku.st.module2.exercises.exercise4;

public class Main {
    public static void main(String[] args) {
        try {
            Student student1 = new Student("Jane", 100);
            Student student2 = new Student("Jack", 76);
            Student student3 = new Student("Alice", 50);

            GradingSystem gradingSystem = new GradingSystem();

            System.out.println(gradingSystem.evaluateStudent(student1));
            System.out.println(gradingSystem.evaluateStudent(student2));
            System.out.println(gradingSystem.evaluateStudent(student3));
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
