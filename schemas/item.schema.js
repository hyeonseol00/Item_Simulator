import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	code: {
		type: Number,
		required: true,
		unique: true
	},
	stat: {
		type: Object,
		required: true,
	},
});

export default mongoose.model('Item', ItemSchema);