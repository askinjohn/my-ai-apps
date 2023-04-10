import { createLlmChain, initiateLLM } from '..';
import { promptTemplate } from '../util-functions/prompts';

const biblicalPerspectiveTemplate =
  'I want you to give me answers for the following questions from a biblical perspective {question}. If you are not able to find a proper answer, its good you tell that you are not clear with the answer. Add "- From Bible" at the end of every answer';

export async function getResponseForYourBiblicalQuestion(question: string) {
  const model = initiateLLM();
  const prompt = promptTemplate(biblicalPerspectiveTemplate);
  console.log('-----------model and prompt initialised');
  const chain = await createLlmChain(model, prompt);
  console.log('----------Response from chain', chain);
  const res = await chain.call({ question });
  return res;
}
