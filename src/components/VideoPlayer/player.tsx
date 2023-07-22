import React, {useEffect, useRef} from "react";
import './videoPlayer.scss'

type playerProps = {
    videoSrc: string | null;
}

export const VideoPlayer: React.FC<playerProps> = ({videoSrc}) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

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
                <></>
            }
        </div>
    );
};

