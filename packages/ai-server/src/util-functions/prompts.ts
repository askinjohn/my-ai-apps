import { PromptTemplate } from 'langchain';

export function promptTemplate(template: string) {
  console.log('-------called prompt');
  const prompt = new PromptTemplate({
    template: template,
    inputVariables: ['question'],
  });
  return prompt;
}
