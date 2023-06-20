import axios from 'axios';

const stabilityAPI = 'https://api.stability.ai';

export async function textToImage(engineId, prompts) {
  console.log(prompts, engineId);
  const data = { text_prompts: prompts };
  console.log(data);
  try {
    return await axios.post(
      `${stabilityAPI}/v1/generation/${engineId}/text-to-image`,
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  } catch (e) {
    console.log(e.message);
  }
}

export async function getSDEngines() {
  const res = await axios.get(`${stabilityAPI}/v1/engines/list`, {
    headers: {
      Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
    },
  });

  console.log(res);
  return res;
}
