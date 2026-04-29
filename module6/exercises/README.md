# Hands-on Exercise 1

## Task 1
Set up and run the following case study:
[Module 5, Case Study: E2E Testing of a Sample Web Application](../README.md#conducting-the-first-load-test)

## Task 2

Conduct a load test on the `POST /login` endpoint using the provided configuration file, and evaluate system performance 
based on the latency metrics and their defined ranges in [this document](../README.md#1-latency-metrics).

**st-load-test-post-10clients-v1.yml**
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
## Task 3

Conduct the same load test on the `POST /login` endpoint and send the results to the Artillery Cloud service using a 
valid API key.


## Task 4

Increase the arrival rate to the 100 and conduct load test on the `POST /login` endpoint.  Send the results to the 
Artillery Cloud service, and compare both of the performance results.
