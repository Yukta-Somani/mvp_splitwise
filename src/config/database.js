require('dotenv/config');

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true
  },
};


// npx sequelize-cli model:generate --name User --attributes email:string,password:string,currency:string
// npx sequelize-cli init:models
// npx sequelize-cli db:migrate


