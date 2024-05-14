import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	code: {
		type: Number,
		required: true,
	},
	stat: {
		type: Object,
		required: false,
	},
});

export default mongoose.model('Item', ItemSchema);