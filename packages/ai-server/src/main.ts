import express from 'express';
import { getResponseForYourBiblicalQuestion } from './sources/biblical';
import bodyParser from 'body-parser';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.post('/bible', async (req, res) => {
  console.log('Request received', req.body);
  const answers = await getResponseForYourBiblicalQuestion(req.body.question);
  console.log(answers);
  res.send({
    status: 'SUCCESS',
    message: answers,
  });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
