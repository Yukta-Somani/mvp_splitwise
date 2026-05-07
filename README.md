# mvp_splitwise

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
