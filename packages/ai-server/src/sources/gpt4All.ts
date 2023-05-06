import { closeGpt4All, initiateGpt4All } from '..';

export async function getResponseFromGpt4All(inputText: string) {
  const gpt4AllInitiated = await initiateGpt4All();
  const res = await gpt4AllInitiated.prompt(inputText);
  console.log(res);
  closeGpt4All(gpt4AllInitiated);
  return res;
}
