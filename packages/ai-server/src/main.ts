import express from 'express';
import { getResponseForYourBiblicalQuestion } from './sources/biblical';
import bodyParser from 'body-parser';
import { getSummarization } from './sources/summarization';
import { getResponseFromGpt4All } from './sources/gpt4All';
import { transcribeAudio } from './sources/transcription';

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

app.post('/transcribe', async (req, res) => {
  console.log('Request received for transcribing', JSON.stringify(req.body));

  const resFromTranscription = await transcribeAudio();

  console.log(resFromTranscription);
  return res.send(resFromTranscription.data);
});

app.post('/summarize', async (req, res) => {
  console.log('Request Received to summarize');
  if (!req.body.data)
    res.send({ message: 'Can you please add a doc to summarize ?' });
  const summary = await getSummarization(req.body.data);
  res.send(summary);
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

app.post('/gpt4all', async (req, res) => {
  console.log('Request received for gpt4All');
  const response = await getResponseFromGpt4All(req.body.data);
  res.send(response);
});
