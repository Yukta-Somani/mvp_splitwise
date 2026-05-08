# mvp_Splitwise

A backend project built with **Node.js**, **Express**, and **Sequelize** to manage shared expenses between users.  
This system allows users to create accounts, record expenses, split costs among members, and view balances with other users.

---

## 📌 Features

- User management (create, update, delete accounts).
- Expense creation with multiple members.
- Track shares of each member in an expense.
- View all expenses created or shared with a user.
- Calculate balances between users.

---

## ⚙️ Tech Stack

- **Node.js** (server runtime)
- **Express.js** (API framework)
- **Sequelize ORM** (database modeling)
- **PostgreSQL** (relational database)

---

## 🚀 Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Yukta-Somani/mvp_splitwise.git
   cd mvp_splitwise
   ```

2. npm install
3. Configure database in config/config.json.
4. create .env file.
5. Run Migrations : npx sequelize-cli db:migrate
6. Npm run dev

## API Endpoints

1. getUserById
2. updateUserById
3. deleteUserById
4. getExpense
5. updateExpense
6. createExpense
7. deleteExpense
8. getBalances

# sequelize

npx sequelize-cli model:generate --name UsersData --attributes email:string,password:string currency:string
npx sequelize-cli init:models
npx sequelize-cli db:migrate
npx sequelize-cli model:generate --name Balance --attributes userId:integer,otherUserId:integer,balance:decimal
npx sequelize-cli model:generate --name ExpenseMember --attributes expenseId:integer,userId:integer,share:decimal
npx sequelize-cli model:generate --name Expense --attributes name:string,value:decimal,currency:string,date:date,createdBy:integer

# Users Data Db

SELECT \* FROM public."UserData"
ORDER BY id ASC LIMIT 100

INSERT INTO public."UserData" (
email,
password,
currency,
"createdAt",
"updatedAt"
)
VALUES (
'yuktasomani@gmail.com',
'djdkjwlkw',
'INR',
NOW(),
NOW()
);

SELECT column_name
FROM information_schema.columns
WHERE table_name = 'UserData';
