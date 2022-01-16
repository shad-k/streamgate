import axios from 'axios';

const requestHandler = async (req, res) => {
  const body = req.body;
  const { cid } = body;

  try {
    const result = await axios.get(`https://gateway.pinata.cloud/ipfs/${cid}`);
    const { playbackId, accessControlConditions, resourceId } = result.data;
    res.statusCode = 200;
    res.json({
      playbackId,
      accessControlConditions,
      resourceId,
    });
  } catch (error) {
    res.statusCode = 500;
    res.json({
      error: 'Something went wrong while uploading the stream details to IPFS',
    });
  }
};
export default requestHandler;
