import express from 'express';
import Character from '../schemas/character.schema.js';
import Item from "../schemas/item.schema.js";
import Joi from 'joi';

const router = express.Router();

const createCharacterSchema = Joi.object({
	name: Joi.string().min(1).max(16).required(),
});

router.post('/character', async (req, res, next) =>
{
	try
	{
		const { name } = await createCharacterSchema.validateAsync(req.body);
		const CharacterMaxId = await Character.findOne().sort('-characterId').exec();
		const characterId = CharacterMaxId ? CharacterMaxId.characterId + 1 : 1;
		const character = new Character({ name, characterId, health: 500, power: 100 });

		await character.save();

		return res.status(201).json({ characterId: character.characterId });
	}
	catch (error)
	{
		next(error);
	}
});

router.get('/character/:characterId', async (req, res) =>
{
	const { characterId } = req.params;
	const character = await Character.findOne({ characterId: characterId }).exec();
	if (!character)
		return res.status(404).json({ errorMessage: '존재하지 않는 캐릭터입니다.' });

	return res.status(200).json({ name: character["name"], health: character["health"], power: character["power"] });
});

router.delete('/character/:characterId', async (req, res) =>
{
	const { characterId } = req.params;
	const character = await Character.findOne({ characterId: characterId }).exec();
	if (!character)
		return res.status(404).json({ errorMessage: '존재하지 않는 캐릭터입니다.' });

	await Character.deleteOne({ characterId: characterId }).exec();

	return res.status(200).json({});
});

router.get("/character/:characterId/equipment", async (req, res) =>
{
	const { characterId } = req.params;
	const character = await Character.findOne({ characterId: characterId }).exec();
	if (!character)
		return res.status(404).json({ errorMessage: '존재하지 않는 캐릭터입니다.' });

	/* 	const answer = [];
		character["equipment"].forEach(async itemCode =>
		{
			const item = await Item.findOne({ code: itemCode }).exec();
			answer.push({ item_code: itemCode, item_name: item["name"] });
		}); */

	const answer = [];
	const promises = character["equipment"].map(async itemCode =>
	{
		const item = await Item.findOne({ code: itemCode }).exec();
		answer.push({ item_code: itemCode, item_name: item["name"] });
	});
	await Promise.all(promises);

	return res.status(200).json(answer);
});

router.post("/character/:characterId/equipment", async (req, res) =>
{
	const { characterId } = req.params;
	const character = await Character.findOne({ characterId: characterId }).exec();
	if (!character)
		return res.status(404).json({ errorMessage: '존재하지 않는 캐릭터입니다.' });

	const { item_code } = req.body;
	const item = await Item.findOne({ code: item_code }).exec();
	if (!item)
		return res.status(404).json({ errorMessage: '존재하지 않는 아이템입니다.' });

	if (character["equipment"].find(element => element == item_code))
		return res.status(400).json({ errorMessage: "이미 장착된 아이템입니다." });

	character["equipment"].push(item_code);
	if (item["stat"]["health"])
		character["health"] += item["stat"]["health"];
	if (item["stat"]["power"])
		character["power"] += item["stat"]["power"];

	await character.save();

	return res.status(200).json({ equipment: character.equipment });
});

router.delete("/character/:characterId/equipment", async (req, res) =>
{
	const { characterId } = req.params;
	const character = await Character.findOne({ characterId: characterId }).exec();
	if (!character)
		return res.status(404).json({ errorMessage: '존재하지 않는 캐릭터입니다.' });

	const { item_code } = req.body;
	const item = await Item.findOne({ code: item_code }).exec();
	if (!item)
		return res.status(404).json({ errorMessage: '존재하지 않는 아이템입니다.' });

	const idx = character["equipment"].findIndex(element => element == item_code);
	if (idx == -1)
		return res.status(400).json({ errorMessage: "장착되지 않은 아이템입니다." });

	character["equipment"].splice(idx, 1);
	if (item["stat"]["health"])
		character["health"] -= item["stat"]["health"];
	if (item["stat"]["power"])
		character["power"] -= item["stat"]["power"];

	await character.save();

	return res.status(200).json({ equipment: character.equipment });
});

export default router;