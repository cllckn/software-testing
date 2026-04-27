# Hands-on Exercise 1

## Task 1
Implement and run the application provided in:
[Module 5, Case Study: E2E Testing of a Sample Web Application](../README.md#conducting-the-first-load-test)

## Task 2

Conduct a load test on the `POST /login` endpoint using the following configuration file.

```yaml
config:
  target: 'http://localhost:3000' # Replace with your application's URL if different
  phases:
    - duration: 30 # Run the test for 30 seconds
      arrivalRate: 10 # Simulate 10 new virtual users arriving per second
  defaults:
    headers:
      Content-Type: 'application/json' # Assuming your API uses JSON


scenarios:
  - name: Load Test - login request
    flow:
      - post:
          url: '/login'
          json:
            name: "user"
            price: "password"
```
