# Cashflowr API Documentation

The Cashflowr API is the backend for the Cashflowr app, which allows users to track their incomes and outcomes. This document outlines the endpoints and operations that the API provides.

<br />
<br />

## Authentication
All requests to the Cashflowr Server API require authentication. Authentication is achieved by including an **Authorization** header in the request, which contains a JWT token.

To obtain a JWT token, clients must first authenticate using their username and password. The token should be included in the **Authorization** header of all subsequent requests.

All requests that require authentication will return a **404 Not found** response if the Authorization header is missing or **401 Unauthorized** if the token is invalid.

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
  
If the request is successful, the server will respond with a status code of **201** and a JSON object containing a message indicating that the user was created successfully. The response will have the following format:
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
  
If the request is successful, the server will respond with a status code of **200** and a JSON object containing an access token that can be used to authenticate future requests. The response will have the following format:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... [JWT token]"
}
```
