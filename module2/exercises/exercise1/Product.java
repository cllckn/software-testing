package cc.ku.st.module2.exercises.exercise1;
public class Product {
    private int id;
    private String name;
    private double price;
    private int stockQuantity;

    public Product(int id, String name, double price, int stockQuantity) {
        this.id = id;
        this.name = name;
        //this.price = price;
        setPrice(price);
        this.stockQuantity = stockQuantity;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setPrice(double price) {
        if (price < 0) {
            throw new IllegalArgumentException("Price cannot be negative.");
        }
        this.price = price;
    }

    public void reduceStock(int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }
        if (quantity > stockQuantity) {
            throw new IllegalArgumentException("Cannot reduce stockQuantity below 0");
        }
        stockQuantity -= quantity;
    }

    public void increaseStock(int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity cannot be negative or zero.");
        }
        if (this.stockQuantity + quantity > 100) {
            throw new IllegalArgumentException("Stock cannot exceed 100.");
        }
        this.stockQuantity += quantity;
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

