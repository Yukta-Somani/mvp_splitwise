import Expense from '../models/Expense';
import ExpenseMember from '../models/ExpenseMember';
import UserData from '../models/UserData.js';
import { Op } from "sequelize";
const createExpense = async (data) => {
  const expense = await Expense.create({
    name: data.name,
    value: data.value,
    currency: data.currency,
    date: data.date,
    createdBy: data.createdBy
  });

  // Add members to ExpenseMembers table
  if (data.members && data.members.length > 0) {
    for (const member of data.members) {
        console.log(member);
        console.log(expense.id);
      await ExpenseMember.create({
        ExpenseId: expense.id,
        userId: member.userId,
        share: member.share
      });
    }
  }

  return expense;
};

//view of the expenses for a user will have both expenses createdid and memberexpenses userid in which they are invloved in expense

const getUserExpenses = async (userId) => {
  return await Expense.findAll({
    where: { createdBy: userId },
    include: [
      {
        model: ExpenseMember,
        include: [User] // optional: show who else is involved
      }
    ]
  });
};

const getSharedExpenses = async (userId) => {
  return await Expense.findAll({
    include: [
      {
        model: ExpenseMember,
        where: { userId },
        include: [User]
      }
    ]
  });
};



const viewUserExpenses = async (userId) => {
  try {
    const expenses = await Expense.findAll({
      include: [
        {
          model: ExpenseMember,
          include: [{ model: UserData }],
          required: false
        }
      ],
      where: {
        [Op.or]: [
          { createdBy: userId },                // created by user
          { '$ExpenseMembers.userId$': userId } // shared with user
        ]
      }
    });

    return expenses;
  } catch (err) {
    return { error: err.message };
  }
};


const updateExpense = async (id, data) => {
  const expense = await Expense.findByPk(id);
  if (!expense) throw new Error("Expense not found");

  // Update expense fields
  expense.name = data.name || expense.name;
  expense.value = data.value || expense.value;
  expense.currency = data.currency || expense.currency;
  expense.date = data.date || expense.date;
  await expense.save();

  // Update members
  if (data.members) {
    // 🚫 Prevent creator from being in members
    const filteredMembers = data.members.filter(m => m.userId !== expense.createdBy);

    // Delete old members
    await ExpenseMember.destroy({ where: { ExpenseId: id } });

    // Insert new members
    const newMembers = filteredMembers.map(m => ({
      ExpenseId: id,
      userId: m.userId,
      share: m.share
    }));
    await ExpenseMember.bulkCreate(newMembers);
  }

  return expense;
};


const deleteExpense = async (id) => {
  const expense = await Expense.findByPk(id);
  if (!expense) throw new Error("Expense not found");

  await ExpenseMember.destroy({ where: { ExpenseId: id } }); // delete members first
  await expense.destroy(); // then delete expense
};


module.exports={deleteExpense,createExpense, viewUserExpenses, updateExpense};