# **Hands-on Exercise 1: Cypress Testing for dashboard.html**


## **Objective**
Write Cypress tests to verify the **dashboard.html page** functionality, ensuring:
1. The **page title** is correct.
2. The **left sidebar options** are present.
3. The **Customers List link** is functional.

---

## **Instructions**

### **1. Write Tests in `cypress/e2e/dashboard.spec.js`**
Implement the following tests:

#### **Test 1: Verify Dashboard Page Title**
- Ensure the page title is "Dashboard".

#### **Test 2: Check Left Sidebar Options**
- Verify the sidebar is visible.
- Confirm the presence of **Home, Customers, Orders, and Settings** options.

#### **Test 3: Verify Customers List Link Works**
- Click the "Customers" link.
- Ensure it navigates to the **customers list page**.

