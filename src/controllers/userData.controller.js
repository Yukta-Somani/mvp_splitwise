const userService = require('../services/userData.service.js');

const getUser = async (req, res) => {
  try {
    const user_id=req.params.id || null;
    if (!user_id) return res.status(400).json({ error: "User Id found null" });
    const user = await userService.getUser(user_id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const updateUser = async (req, res) => {
  try { 
    const user_id=req.params.id || null;
    console.log(user_id);
    // console.log(req);
    const updatedUserData=req.body || null;
    console.log(updatedUserData);
    const updatedUser = await userService.updateUser(user_id, updatedUserData);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const userToBeDeleted=req.params.id;
    await userService.deleteUser(userToBeDeleted);
    res.status(204).send(); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserBalances = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const balances = await userService.viewUserBalances(userId);
    res.json({ balances });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports={getUserBalances,updateUser, getUser, deleteUser};