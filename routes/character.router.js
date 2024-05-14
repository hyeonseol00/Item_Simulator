import express from 'express';
import Character from '../schemas/character.schema.js';
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

		return res.status(201).json({ character });
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

export default router;