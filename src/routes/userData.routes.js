import express from "express";
const router = express.Router();
import userDataController from "../controllers/userData.controller.js";

router.get('/users/:id', userDataController.getUser);
router.put('/users/:id', userDataController.updateUser);
router.delete('/users/:id', userDataController.deleteUser);

export default router;