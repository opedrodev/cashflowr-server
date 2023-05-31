# Cashflowr API Documentation

The Cashflowr API is the backend for the Cashflowr app, which allows users to track their incomes and outcomes. This document outlines the endpoints and operations that the API provides.

**DISCLAIMER: This API is still under development!**

<br />
<br />

## Authentication
All requests to the Cashflowr Server API require authentication. Authentication is achieved by including an **Authorization** header in the request, which contains a JWT token.

To obtain a JWT token, clients must first authenticate using their email and password. The token should be included in the **Authorization** header of all subsequent requests.

All requests that require authentication will return a **404 Not Found** response if the Authorization header is missing or **401 Unauthorized** if the token is invalid.

<br />
<br />

# Endpoints
The Cashflowr API provides the following endpoints

### `POST /auth/signup`
Registers a new user with the provided name, email, and password. The request must include the following parameters in JSON format:
```json
{
  "name": "Jhon Doe",
  "email": "jhon@doe.com",
  "password": "jhonsecret"
}
```
Make sure that
  - `Name` has at least 3 characters
  - `Email` has a valid format
  - `Password` has at least 6 characters
  
If successful, the server will respond with a status code of **201** and a JSON object containing a message indicating that the user was created successfully. The response will have the following format:
```json
{
  "message": "User created successfully"
}
```
  
<br />

### `POST /auth/signin`
Authenticates a user and returns a JWT token. The request must include the following parameters in JSON format:
```json
{
  "email": "jhon@doe.com",
  "password": "jhonsecret"
}
```
Make sure that
  - `Email` has a valid format
  - `Password` has at least 6 characters
  
If successful, the server will respond with a status code of **200** and a JSON object containing an access token that can be used to authenticate future requests. The response will have the following format:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... [JWT token]"
}
```

<br />

### `GET /transactions`
Retrieves a list of all transactions for the authenticated user. The request must include a valid access token in the Authorization header.

If successful, the server will respond with a status code of **200** and a JSON object containing an array of transaction objects. Each transaction object will have the following properties:

  - `id` (string): Unique identifier for the transaction
  - `type` (string): Type of the transaction, either "income" or "outcome"
  - `description` (string): Description of the transaction
  - `category` (string): Category of the transaction
  - `value` (number): Value of the transaction
  - `date` (string): Date of the transaction

Here's an example of a successful response:

```json
[
  {
    "id": "9afdee99-5a93-471b-a7da-ff3058dc8007",
    "type": "income",
    "description": "Salary",
    "category": "Work",
    "value": 1200,
    "date": "2023-05-01T05:04:58.571Z"
  },
  {
    "id": "34822c9f-0106-40f1-9c15-642920bbc095",
    "type": "outcome",
    "description": "Book",
    "category": "Education",
    "value": 14.99,
    "date": "2023-05-01T05:23:39.323Z"
  }
]
```

<br />

### `POST /transactions`
Creates a new transaction for the authenticated user. The request must include a valid access token in the Authorization header.

The request body must include the following parameters in JSON format:
```json
{
    "type": "income",
    "description": "Salary",
    "category": "Work",
    "value": 1200
}
```

Make sure that
  - `type` is either "income" or "outcome"
  - `description` has at least 3 characters
  - `category` has at least 3 characters
  - `value` is greater than 0

  
If successful, the server will respond with a status code of **201** and a JSON object containing a message. The response will have the following format:
```json
{
  "message": "Transaction created successfully"
}
```

<br />

### `PUT /transactions/id`
Update a transaction for the authenticated user. The request must include a valid access token in the Authorization header.

The request body must include the following parameters in JSON format:
```json
{
    "type": "income",
    "description": "Salary",
    "category": "Work",
    "value": 1200
}
```

If successful, the server will respond with a status code of **200** and a JSON object containing a message. The response will have the following format:
```json
{
  "message": "Transaction updated successfully"
}
```

Make sure that
  - `id` is the transaction's id
  - `type` is either "income" or "outcome"
  - `description` has at least 3 characters
  - `category` has at least 3 characters
  - `value` is greater than 0

<br />

### `DELETE /transactions/id`
Delete a transaction for the authenticated user. The request must include a valid access token in the Authorization header.

Make sure that
  - `id` is the transaction's id

If successful, the server will respond with a status code of **200** and a JSON object containing a message. The response will have the following format:
```json
{
  "message": "Transaction deleted successfully"
}
```
