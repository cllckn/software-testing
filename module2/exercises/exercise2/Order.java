package cc.st.module2.exercises.exercise2;


public class Order {

    private final int orderId;
    private double totalAmount;

    public Order(int orderId, double totalAmount) {
        if (totalAmount < 0) {
            throw new IllegalArgumentException("Total amount must be non-negative");
        }
        this.orderId = orderId;
        this.totalAmount = totalAmount;
    }

    public int getOrderId() {
        return orderId;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void applyDiscount(double discount) {
        if (discount < 0) {
            throw new IllegalArgumentException("Discount must not be negative");
        }
        if (discount > totalAmount) {
            throw new IllegalArgumentException("Discount must not exceed total amount");
        }
        totalAmount -= discount;
    }

    public void applyTax(double taxRate) {
        if (taxRate < 0) {
            throw new IllegalArgumentException("Tax rate must not be negative");
        }
        totalAmount += totalAmount * taxRate;
    }

    public void addItem(double price) {
        if (price < 0) {
            throw new IllegalArgumentException("Item price must be non-negative");
        }
        totalAmount += price;
    }

    public void removeItem(double price) {
        if (price < 0) {
            throw new IllegalArgumentException("Item price must be non-negative");
        }
        if (price > totalAmount) {
            throw new IllegalArgumentException("Item price exceeds total amount");
        }
        totalAmount -= price;
    }
}
