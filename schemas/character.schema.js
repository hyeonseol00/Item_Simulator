import mongoose from 'mongoose';

const CharacterSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	id: {
		type: Number,
		required: true,
	},
	health: {
		type: Number,
		required: true,
	},
	power: {
		type: Number,
		required: true,
	},
});

export default mongoose.model('Character', CharacterSchema);