## **Hands-On Exercise 3: Bank Account System - TDD Solution
**


```java

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;

import static org.junit.jupiter.api.Assertions.*;

class BankAccountTest {
    private static BankAccount bankAccount; // Static instance

    @BeforeAll
    public static void setUpBeforeClass() {
        bankAccount = new BankAccount("Jane", 1000); // Initialize once before all tests
    }

    @BeforeEach
    public void resetBalance() {
        bankAccount.setBalance(1000); // Reset balance before each test
    }

    @Test
    void testDeposit() {
        bankAccount.deposit(500);
        assertEquals(1500.0, bankAccount.getBalance());
    }

    @Test
    void testWithdraw() {
        accbankAccountount.withdraw(300);
        assertEquals(700.0, bankAccount.getBalance());
    }

    @Test
    void testWithdrawMoreThanBalance() {
        assertThrows(IllegalArgumentException.class, () -> bankAccount.withdraw(2000));
    }

    @Test
    void testNegativeDeposit() {
        assertThrows(IllegalArgumentException.class, () -> bankAccount.deposit(-100));
    }

    @Test
    void testNegativeWithdraw() {
        assertThrows(IllegalArgumentException.class, () -> bankAccount.withdraw(-50));
    }
}

//////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////

public class Main {
    public static void main(String[] args) {

        try {

            BankAccount bankAccount=new BankAccount("Jack", 2000);

            bankAccount.deposit(0);

            System.out.println(bankAccount.getBalance());

        }catch (IllegalArgumentException e){
            System.out.println(e.getMessage());
        }

    }
}

```