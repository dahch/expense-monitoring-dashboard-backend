# Expense Monitoring Dashboard Backend

## Purpose

This project is the backend for an expense monitoring panel. It provides an API to manage and analyze user expenses.

## Technologies

- Node.js
- Express
- PostgreSQL
- TypeORM
- Docker

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tu-usuario/expense-monitoring-dashboard-backend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd expense-monitoring-dashboard-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Environmental Variables

Create an `.env` file in the root of the project and add the following variables:

```
SERVER_PORT=server_port # default 3000
DB_HOST=db_host # default localhost
DB_PORT=db_port # default 5432
DB_USER=db_user # default postgres
DB_PASSWORD=db_password # default postgres
DB_NAME=db_name # default postgres
JWT_SECRET=some_secret_key # default secret_jwt
```

## Start the Database (Docker)

To pull up the PostgreSQL database using Docker, run the following command:

```bash
docker-compose up -d
```

## Raise the Project

Once the database is up and running, you can start the server:

```bash
npm run dev
```

To compile and run the project in production mode, run:

```bash
npm run build
npm start
```

## Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login

### Transactions

- `POST /transactions` - Create a new transaction
- `GET /transactions:` - Get all transactions of a user
- `GET /transactions/filtered` - Obtain transactions from a user with filters
- `GET /transactions/balance` - Obtain a user's balance
- `PUT /transactions/:id` - Update a transaction
- `DELETE /transactions/:id` - Delete a transaction.
- `GET /transactions/categories` - Get all transactions categories of the user.

## Contribute

If you wish to contribute to the project, please open an issue or send a pull request.

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) license. For more details, please visit https://creativecommons.org/licenses/by-nc/4.0/
