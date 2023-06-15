import React, {useEffect, useRef} from "react";
import './videoPlayer.scss'

type playerProps = {
    videoSrc: string | null;
}

export const VideoPlayer: React.FC<playerProps> = ({videoSrc}) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const fallbackImageSrc = 'https://static.vecteezy.com/system/resources/previews/022/567/833/non_2x/video-tutorials-2-colored-line-icon-vector.jpg'

    useEffect(() => {
        if (videoRef.current) {
            const video = videoRef.current;
            const playButton = document.createElement("button");
            playButton.classList.add("play-button");
            playButton.innerHTML = '<i class="fa fa-play"></i>';

            video.parentElement?.appendChild(playButton);
            playButton.addEventListener("click", () => {
                video.play();
                playButton.style.display = "none";
            });

            video.addEventListener("play", () => {
                playButton.style.display = "none";
            });

            video.addEventListener("pause", () => {
                playButton.style.display = "block";
            });
        }
    }, [videoRef]);

    return (
        <div className="video-player">
            {videoSrc ?
                <video ref={videoRef} src={videoSrc} controls autoPlay={false} className="video-content"/>
                :
                <img src={fallbackImageSrc} alt="Could not load video content" className="video-content"
                     style={{width: "50%", opacity: '0.5'}}/>
            }
        </div>
    );
};

