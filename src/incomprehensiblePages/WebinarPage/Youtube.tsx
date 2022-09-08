import { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from 'react-youtube';

export const Youtube = () => {
  const [videoId, setVideoId] = useState()


  useEffect(() => {
    fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCDzlJ_j21iyE1ulhuKFvOfQ&type=video&eventType=live&key=AIzaSyDMHKj5PRSmoeu9bCzco6uEMf29diFjA1U")
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setVideoId(data.items[0].id.videoId)
    })
    .catch(error => console.log(error))
  })
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  }

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />;
}