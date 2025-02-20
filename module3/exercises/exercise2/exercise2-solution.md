## **Hands-On Exercise 2: Using TDD for a Student Grading System**


```java
public class Student {
    private String name;
    private int grade;

    public Student(String name, int grade) {
        if (grade < 0 || grade > 100) {
            throw new IllegalArgumentException("Grade must be between 0 and 100");
        }
        this.name = name;
        this.grade = grade;
    }

    public String getName() {
        return name;
    }

    public int getGrade() {
        return grade;
    }

    public String getLetterGrade() {
        if (grade >= 90) return "A";
        else if (grade >= 80) return "B";
        else if (grade >= 70) return "C";
        else if (grade >= 60) return "D";
        else return "F";
    }
}
///////////////////////////////////////////////////





import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class StudentTest {
    

    @Test
    void testGetLetterGrade() {
        Student student = new Student("Bob", 95);
        assertEquals("A", student.getLetterGrade());
    }


    @Test
    void testInvalidGradeThrowsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            new Student("Invalid", 105);
        });
        assertEquals("Grade must be between 0 and 100", exception.getMessage());
    }

    
    
    

    // Optional
    @ParameterizedTest
    @CsvSource({
            "95, A",
            "85, B",
            "75, C",
            "65, D",
            "50, F"
    })
    void testGetLetterGrade(int grade, String expectedLetter) {
        Student student = new Student("Test", grade);
        assertEquals(expectedLetter, student.getLetterGrade());
    }
    
    
    //or
    
    

    public class StudentTest {

        @Test
        void testGetLetterGrade() {
            assertAll(
                    () -> assertEquals("A", new Student("Test", 95).getLetterGrade()),
                    () -> assertEquals("B", new Student("Test", 85).getLetterGrade()),
                    () -> assertEquals("C", new Student("Test", 75).getLetterGrade()),
                    () -> assertEquals("D", new Student("Test", 65).getLetterGrade()),
                    () -> assertEquals("F", new Student("Test", 50).getLetterGrade())
            );
        }
    }


    @ParameterizedTest
    @ValueSource(ints = {-1, -10, 101, 110})
    void testInvalidGradeThrowsException(int invalidGrade) {
        assertThrows(IllegalArgumentException.class, () -> new Student("Invalid", invalidGrade));
    }

    
    void testInvalidGradeThrowsException() {

        assertAll(
                () -> assertThrows(IllegalArgumentException.class, () -> new Student("Invalid", -1)),
                () -> assertThrows(IllegalArgumentException.class, () -> new Student("Invalid", 101))
        );
        
    }
    
    
    
}



@Suite
@SelectClasses({ StudentTest.class, GradingSystemTest.class, StudentParameterizedTest.class })
public class GradingSystemTestSuite {
}




//mvn test
//mvn surefire-report:report


```


---

## **Hands-On Exercise 3: Bank Account System - TDD Solution**


```java

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;

import static org.junit.jupiter.api.Assertions.*;

class BankAccountTest {
    private BankAccount account;

    @BeforeEach
    void setUp() {
        account = new BankAccount("John Doe", 1000.0);
    }

    @Test
    void testDeposit() {
        account.deposit(500);
        assertEquals(1500.0, account.getBalance());
    }

    @Test
    void testWithdraw() {
        account.withdraw(300);
        assertEquals(700.0, account.getBalance());
    }

    @Test
    void testWithdrawMoreThanBalance() {
        assertThrows(IllegalArgumentException.class, () -> account.withdraw(2000));
    }

    @Test
    void testNegativeDeposit() {
        assertThrows(IllegalArgumentException.class, () -> account.deposit(-100));
    }

    @Test
    void testNegativeWithdraw() {
        assertThrows(IllegalArgumentException.class, () -> account.withdraw(-50));
    }
}




public class BankAccount {
    private String owner;
    private double balance;

    public BankAccount(String owner, double balance) {
        if (balance < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative");
        }
        this.owner = owner;
        this.balance = balance;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdraw amount must be positive");
        }
        if (amount > balance) {
            throw new IllegalArgumentException("Insufficient balance");
        }
        balance -= amount;
    }

    public double getBalance() {
        return balance;
    }

    public String getOwner() {
        return owner;
    }
}

```
