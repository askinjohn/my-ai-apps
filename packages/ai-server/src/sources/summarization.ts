import { initiateLLM, summarizeContent } from '..';
import { textSplitter } from '../util-functions/text-splitter';

export async function getSummarization(data: string) {
  const splittedData = await textSplitter(data);
  const summarizedContent = await summarizeContent(initiateLLM(), splittedData);
  console.log('------------Summarized Data', summarizedContent);
  return summarizedContent;
}
