import express from 'express';
import Todo from '../schemas/todo.schema.js';

const router = express.Router();

router.post('/item', async (req, res) =>
{
	const { name } = req.body;
	const itemMaxCode = await Todo.findOne().sort('-code').exec();
	const code = itemMaxCode ? itemMaxCode.order + 1 : 1;
	const item = new Todo({ name, code });

	await item.save();

	return res.status(201).json({ item });
});

export default router;