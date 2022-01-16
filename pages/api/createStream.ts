import axios from 'axios';
import { LIVEPEER_API_URL } from '../../utils/constants';

const createStream = async (req, res) => {
  const { apiKey, name, profiles } = req.body;
  const response = await axios.post(
    `${LIVEPEER_API_URL}/stream`,
    {
      name: name || 'test_stream',
      profiles: profiles,
    },
    {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
    }
  );
  res.statusCode = 200;
  res.json({
    ...response.data,
  });
};

export default createStream;
