import React, {useEffect, useRef, useState} from "react";
import './videoPlayer.scss'
import ReactPlayer from "react-player";

type playerProps = {
    videoSrc: string | undefined;
}

export const VideoPlayer: React.FC<playerProps> = ({videoSrc}) => {

    return (
        <div className="video-player">
            {videoSrc ?
                <ReactPlayer url={videoSrc} width={"100%"} height={"100%"} controls config={{
                    file: {
                        attributes: {
                            controlsList: 'nodownload',
                        },
                    },
                }}/>
                :
                <></>
            }
        </div>
    );
};

