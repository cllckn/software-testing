package cc.st.module2.exercises.exercise4;

public class Order {

    private final String orderId;
    private final double amount;
    private String status;

    public Order(String orderId, double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Order amount must be greater than zero.");
        }
        this.orderId = orderId;
        this.amount = amount;
        this.status = "NEW";
    }

    public String getOrderId() {
        return orderId;
    }

    public double getAmount() {
        return amount;
    }

    public String getStatus() {
        return status;
    }

    void markPaid() {
        this.status = "PAID";
    }

    void markFailed() {
        this.status = "FAILED";
    }
}
