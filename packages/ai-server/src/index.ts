import { LLMChain } from 'langchain';
import { OpenAI } from 'langchain/llms';
import { promptTemplate } from './util-functions/prompts';

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
