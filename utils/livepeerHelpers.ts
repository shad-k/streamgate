import axios from 'axios';
import { LIVEPEER_API_URL, STREAM_PROFILES } from './constants';

export const createStream = async ({ apiKey }, name) => {
  const res = await axios.post(
    `${LIVEPEER_API_URL}/stream`,
    {
      name: name || 'test_stream',
      profiles: STREAM_PROFILES,
    },
    {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return res.data;
};
