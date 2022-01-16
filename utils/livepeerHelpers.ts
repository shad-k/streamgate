import axios from 'axios';
import { STREAM_PROFILES } from './constants';

export const createStream = async ({ apiKey }, name) => {
  const res = await axios.post(`/api/createStream`, {
    name: name || 'test_stream',
    profiles: STREAM_PROFILES,
    apiKey,
  });
  console.log(res);
  return res.data;
};
