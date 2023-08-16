import React, {useEffect, useRef, useState} from "react";
import './videoPlayer.scss'
import ReactPlayer from "react-player";

type playerProps = {
    videoSrc: string | undefined;
}

export const VideoPlayer: React.FC<playerProps> = ({videoSrc}) => {
    // const videoRef = useRef<HTMLVideoElement | null>(null);
    //
    // useEffect(() => {
    //     if (videoRef.current) {
    //         const video = videoRef.current;
    //         const playButton = document.createElement("button");
    //         playButton.classList.add("play-button");
    //         playButton.innerHTML = '<i class="fa fa-play"></i>';
    //
    //         video.parentElement?.appendChild(playButton);
    //         playButton.addEventListener("click", () => {
    //             video.play();
    //             playButton.style.display = "none";
    //         });
    //
    //         video.addEventListener("play", () => {
    //             playButton.style.display = "none";
    //         });
    //
    //         video.addEventListener("pause", () => {
    //             playButton.style.display = "block";
    //         });
    //     }
    // }, [videoRef]);
    console.log('ссылка на видос: ', videoSrc)

    return (
        <div className="video-player">
            {videoSrc ?
                // <video ref={videoRef} controls autoPlay={false} className="video-content">
                //     <source src={videoSrc} type="video/mp4"/>
                // </video>
                <ReactPlayer url={videoSrc} width={"100%"} height={"100%"} controls={true}/>
                // <iframe src={videoSrc} width="100%" height="360px" frameBorder="50px" allowFullScreen />
                :
                <></>
            }
        </div>
    );
};

