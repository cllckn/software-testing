package cc.ku.st.module2.exercises.exercise1;

public class Product {
    private int id;
    private String name;
    private double price;
    private int stock;

    public Product(int id, String name, double price, int stock) {
        this.id = id;
        this.name = name;
        setPrice(price);  // Using the setter to ensure validation
        this.stock = stock;
    }


    public double getPrice() {
        return price;
    }

    public int getStock() {
        return stock;
    }

    public void setPrice(double price) {
        if (price < 0) {
            throw new IllegalArgumentException("Price cannot be negative.");
        }
        this.price = price;
    }

    public void increaseStock(int amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("Amount cannot be negative.");
        }
        if (this.stock + amount > 100) {
            throw new IllegalArgumentException("Stock cannot exceed 100.");
        }
        this.stock += amount;
    }

    public void applyDiscount(double discount) {
        if (discount < 0) {
            throw new IllegalArgumentException("Discount cannot be negative.");
        }
        this.price -= discount;
        if (this.price < 0) {
            this.price = 0;  // Ensure the price does not go below zero
        }
    }
}

