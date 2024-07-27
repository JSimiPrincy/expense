# Expense Sharing Application

This is a backend service for a daily expense sharing application built with Node.js, Express, and MongoDB. It allows users to add expenses and split them based on different methods: equal, exact amounts, and percentages.

## Features

- User registration and authentication
- Add expenses with three split methods:
  - Equal split
  - Exact amount split
  - Percentage split
- Retrieve individual user expenses
- Retrieve all expenses
- Generate and download balance sheets

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0.0 or later)

## Installation

1. Clone the repository:
git clone https://github.com/JSimiPrincy/expense.git


2. Install the dependencies:
npm install 


3. Create a `.env` file in the root directory and add the following environment variables:
Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `your_jwt_secret` with a secure random string.

## Usage

To start the server, run:


For development with auto-restart on file changes, use:


## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login and receive a JWT token

### User

- `GET /api/users/me`: Get current user details (protected route)

### Expenses

- `POST /api/expenses`: Add a new expense (protected route)
- `GET /api/expenses/user`: Get expenses for the current user (protected route)
- `GET /api/expenses/all`: Get all expenses (protected route)
- `GET /api/expenses/balance-sheet`: Download balance sheet as PDF (protected route)

## Sample Requests

### Register a User
POST /api/auth/register Content-Type: application/json

{ "name": "John Doe", "email": "john@example.com", "mobile": "1234567890", "password": "password123" }

### Login
POST /api/auth/login Content-Type: application/json

{ "email": "john@example.com", "password": "password123" }


### Add an Expense (Equal Split)
POST /api/expenses Content-Type: application/json
{ "description": "Dinner", "amount": 3000, "splitMethod": "equal", "participants": ["user_id_1", "user_id_2", "user_id_3"] }


## Error Handling

The API uses conventional HTTP response codes to indicate the success or failure of requests. Errors are returned in JSON format:

```json
{
  "message": "Error message here"
}

