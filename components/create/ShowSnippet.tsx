import React from 'react';

import useCreateStream from '../../hooks/useCreateStream';

const copyTextToClipboard = (text: string) => {
  // @ts-ignore
  navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
    if (result.state == 'granted' || result.state == 'prompt') {
      navigator.clipboard.writeText(text);
    }
  });
};

const ShowSnippet: React.FC<{}> = () => {
  const { step, stepDetails } = useCreateStream();
  const { streamKey, cid, playbackId } = stepDetails[step];
  const streamUrl = `https://${window.location.host}/auth/${cid}/${playbackId}`;
  const embedCode = `<iframe src=${streamUrl} height="400" width="500" />`;

  return (
    <div className="pb-4">
      <div className="hero">
        <div className="hero-content w-full">
          <div className="card card-normal border border-info shadow-xl rounded-box m-20 relative text-accent-content p-4">
            <div className="card-title">
              <span className="font-bold">Note:&nbsp;</span> To start a video stream, please use a broadcaster software
              like OBS/Streamyard on desktop, or Larix on mobile
            </div>
            <div className="card-body flex-col">
              <span>Stream details:</span>
              <div className="flex items-center">
                <span className="font-bold">Ingest URL:</span>
                <span className="mx-2">rtmp://rtmp.livepeer.com/live/</span>
                <button
                  onClick={() => copyTextToClipboard('rtmp://rtmp.livepeer.com/live/')}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Copy
                </button>
              </div>
              <div className="flex items-center mt-4">
                <span className="font-bold">Stream Key:</span>
                <span className="mx-2">{streamKey}</span>
                <button onClick={() => copyTextToClipboard(streamKey)} className="btn btn-sm btn-outline btn-primary">
                  Copy
                </button>
              </div>
              <div className="flex items-center mt-4">
                <span className="font-bold">Stream URL:</span>
                <span className="mx-2">{streamUrl}</span>
                <button onClick={() => copyTextToClipboard(streamUrl)} className="btn btn-sm btn-outline btn-primary">
                  Copy
                </button>
              </div>
              <div className="flex flex-wrap items-center mt-4">
                <span className="font-bold">Embed Snippet:</span>
                <div className="w-full bg-black card card-normal p-8 relative mt-2">
                  <button
                    onClick={() => copyTextToClipboard(embedCode)}
                    className="absolute right-2 top-2 btn btn-sm btn-ghost"
                  >
                    Copy
                  </button>
                  <code>{embedCode}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSnippet;
