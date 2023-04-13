import { CharacterTextSplitter } from 'langchain/text_splitter';

export async function textSplitter(data) {
  const splitter = new CharacterTextSplitter({
    separator: '\n\n',
    chunkSize: 7,
    chunkOverlap: 3,
  });

  const output = await splitter.createDocuments([data]);
  console.log(output, '---------splitted text');
  return output;
}
