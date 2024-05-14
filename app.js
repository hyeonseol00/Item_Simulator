import express from 'express';
import connect from "./schemas/index.js";
import CharacterRouter from "./routes/character.router.js";
import ItemRouter from "./routes/item.router.js";
import errorHandlerMiddleware from './middlewares/error-handler.middleware.js';

const app = express();
const PORT = 3000;

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get('/', (req, res) =>
{
	return res.json({ message: 'Hi!' });
});

app.use('/api', [router, CharacterRouter, ItemRouter]);
app.use(errorHandlerMiddleware);

app.listen(PORT, () =>
{
	console.log(PORT, '포트로 서버 실행 성공!');
});