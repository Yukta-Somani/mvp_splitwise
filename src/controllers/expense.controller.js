const expenseService = require('../services/expense.service');

const createExpense = async (req, res) => {
  try {
    const expense = await expenseService.createExpense(req.body);
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const viewExpense= async(req, res)=>{
    try{
        console.log("wkj")
        console.log(req.params.id);
        const expense=await expenseService.viewUserExpenses(req.params.id);
        if(!expense) return res.status(404).json({error:"Expense not found"});
        res.status(200).json(expense);
    }catch(err){
    res.status(400).json({ error: err.message });
    }
}

const updateExpense = async (req, res) => {
  try {
    const updatedExpense = await expenseService.updateExpense(req.params.id, req.body);
    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    await expenseService.deleteExpense(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports={deleteExpense,createExpense, viewExpense, updateExpense};
