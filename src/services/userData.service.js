import UserData from '../models/UserData.js';

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

module.exports={deleteUser,getUser, updateUser};