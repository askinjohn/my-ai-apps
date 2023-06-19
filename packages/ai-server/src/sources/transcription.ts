import { initiateOpenAI } from '..';
import * as fs from 'fs';

export async function transcribeAudio(model = 'whisper-1') {
  const resp = await initiateOpenAI().createTranscription(
    fs.createReadStream('joel-audio-bible.mp3') as any,
    model
  );
  return resp;
}
