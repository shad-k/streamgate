import React from 'react';
import { useRouter } from 'next/router';
import videojs from 'video.js';
import 'videojs-contrib-hls';
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';
import 'video.js/dist/video-js.min.css';

const Stream: React.FC<{}> = () => {
  const videoRef = React.useRef();
  const [videoElement, setVideoElement] = React.useState(null);
  const router = useRouter();
  const playbackId = router.query.playbackId as string;
  // const { isStreamLive, playbackId } = useStreamStatus(id);

  // React.useEffect(() => {
  //   if(!playbackIdRef.current) {
  //     playbackIdRef.current = playbackId;
  //   }
  // }, [playbackId]);

  React.useEffect(() => {
    if (videoElement == null) return;
    if (playbackId) {
      const player = videojs(videoElement, {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: `https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`,
          },
        ],
      });

      player.hlsQualitySelector();

      player.on('error', () => {
        player.src(`https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`);
      });
    }
  }, [videoElement, playbackId]);

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-slate-500">
      <div data-vjs-player>
        {
          <video
            id="video"
            ref={(el) => setVideoElement(el)}
            className="h-full w-full video-js vjs-theme-sea"
            controls
            playsInline
          />
        }
      </div>
    </div>
  );
};

export default Stream;
