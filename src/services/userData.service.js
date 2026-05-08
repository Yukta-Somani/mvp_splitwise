import UserData from '../models/UserData.js';
import ExpenseMember from '../models/ExpenseMember.js';
import Expense from '../models/Expense.js';
import { Op } from "sequelize";
const getUser = async (id) => {
  return await UserData.findByPk(id);
};

const updateUser = async (id, data) => {
  const user = await UserData.findByPk(id);
  if (!user) throw new Error("User not found");

  user.email = data?.email || user?.email;
  user.currency = data?.currency || user.currency;

  await user.save();
  return user;
};



const deleteUser = async (id) => {
  const user = await UserData.findByPk(id);
  if (!user) throw new Error("User not found");
  await user.destroy();
};

const viewUserBalances = async (userId) => {
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
        { createdBy: userId },
        { '$ExpenseMembers.userId$': userId }
      ]
    }
  });

  const balances = {};

  for (const expense of expenses) {
    const creatorId = expense.createdBy;
    console.log(creatorId);
    const members = expense.ExpenseMembers || [];
    // console.log(members[0]);

    for (const member of members) {
      console.log(member.share);
      const share = Number(member.share || 0);
      console.log(member.userId);
      console.log(creatorId == userId) 
      // Case 1: user created the expense → others owe them
      if (creatorId == userId && member.userId !== userId) {
            console.log(`User ${userId} created expense ${expense.id}, member ${member.userId} owes ${share}`);
        balances[member.userId] = (balances[member.userId] || 0) + share;
      }

      // Case 2: user is a member → they owe the creator
      if (member.userId == userId && creatorId !== userId) {
            console.log(`User ${userId} is member in expense ${expense.id}, owes creator ${creatorId} ${share}`);
        balances[creatorId] = (balances[creatorId] || 0) - share;
      }
    }
  }

  return Object.entries(balances).map(([otherUserId, balance]) => ({
    withUser: parseInt(otherUserId, 10),
    balance
  }));
};

module.exports={viewUserBalances,deleteUser,getUser, updateUser};