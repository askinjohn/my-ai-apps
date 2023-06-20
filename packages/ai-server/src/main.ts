import express from 'express';
import { getResponseForYourBiblicalQuestion } from './sources/biblical';
import bodyParser from 'body-parser';
import { getSummarization } from './sources/summarization';
import { getResponseFromGpt4All } from './sources/gpt4All';
import { transcribeAudio } from './sources/transcription';
import { getSDEngines, textToImage } from './sources/text-to-image';

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

app.get('/stableDiffusion/engines', async (req, res) => {
  console.log('Request received for getting list of engines');
  const engines = await getSDEngines();
  return res.send(engines.data);
});

app.post('/text-to-image', async (req, res) => {
  if (!req.body.text) {
    res.send({
      status: 'ERROR',
      message: 'Text prompts are necessary',
    });
  }
  const imageRes = await textToImage(
    req.body.engine_id ?? 'stable-diffusion-v1-5',
    req.body.text
  );
  console.log(imageRes.data);
  return res.send(imageRes.data);
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
