const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('7a0b54fa91b15e840962', '0e55e60f4ee84ed921fa507d7f90164d6737fae613f05864626d1b19ff73c615');

const requestHandler = async (req, res) => {
  const body = req.body;
  const { playbackId } = body;

  const options = {
    pinataMetadata: {
      name: playbackId,
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };
  try {
    const result = await pinata.pinJSONToIPFS(body, options);
    console.log(body, result);
    res.statusCode = 200;
    res.json({
      cid: result.IpfsHash,
    });
  } catch (error) {
    console.log(error.message);
    res.statusCode = 200;
    res.json({
      error: 'Something went wrong while uploading the stream details to IPFS',
    });
  }
};
export default requestHandler;
