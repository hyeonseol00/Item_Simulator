import express from 'express';
import Item from '../schemas/item.schema.js';

const router = express.Router();

router.post('/item', async (req, res) =>
{
	const { name, code, stat } = req.body;
	if (!name || !code || !stat)
		return res.status(400).json({ errorMessage: '누락된 정보가 있습니다.' });

	const item = new Item({ name, code, stat });

	await item.save();

	return res.status(201).json({ item });
});

router.patch('/item/:itemCode', async (req, res) =>
{
	const { itemCode } = req.params;
	const { name, stat } = req.body;
	const item = await Item.findOne({ code: itemCode }).exec();
	if (!item)
		return res.status(404).json({ errorMessage: '존재하지 않는 아이템입니다.' });

	item.name = name;
	item.stat = stat;

	await item.save();

	return res.status(200).json({});
});

router.get('/item', async (req, res) =>
{
	const arr = await Item.find().exec();
	const answer = [];

	arr.forEach(item => { answer.push({ code: item["code"], name: item["name"] }); });

	return res.status(200).json(answer);
});

router.get('/item/:itemCode', async (req, res) =>
{
	const { itemCode } = req.params;
	const item = await Item.findOne({ code: itemCode }).exec();
	const answer = { code: item["code"], name: item["name"], stat: item["stat"] };

	return res.status(200).json(answer);
});

export default router;