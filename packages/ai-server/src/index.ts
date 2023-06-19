import { LLMChain } from 'langchain';
import { OpenAI } from 'langchain/llms';
import { loadSummarizationChain } from 'langchain/chains';
import { GPT4All } from 'gpt4all';
import { Configuration, OpenAIApi } from 'openai';

export function initiateOpenAI() {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
  });
  const openai = new OpenAIApi(configuration);
  return openai;
}

export function initiateLLM() {
  return new OpenAI({
    openAIApiKey: process.env.OPENAI_KEY,
    temperature: 0.9,
  });
}

// Sample function to get result using langchain
export async function getOutputFromOpenAI(inputText?: string) {
  const llM = initiateLLM();
  const llMResponse = llM.call(`Why is Easter Sunday celebrated ?`);
  return llMResponse;
}

export async function createLlmChain(llm, prompt) {
  console.log('--------- Create chain called');
  const chain = new LLMChain({ llm, prompt });
  console.log('------------ New LLM Chain created', chain);
  return chain;
}

export async function summarizeContent(model, docs) {
  const chain = loadSummarizationChain(model);
  const res = await chain.call({
    input_documents: docs,
  });

  console.log(res);

  return res;
}

export async function initiateGpt4All() {
  console.log('initialise gpt');
  try {
    const gpt4All = new GPT4All('gpt4all-lora-unfiltered-quantized', true);
    await gpt4All.init();
    await gpt4All.open();
    return gpt4All;
  } catch (e) {
    console.log(e.message);
  }
}

export function closeGpt4All(gpt4All: GPT4All) {
  gpt4All.close();
}
