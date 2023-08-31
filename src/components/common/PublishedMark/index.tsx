import React, {FC} from 'react';
import {Chip} from "@mui/material";

interface publishedMarkI {
    isPublished: boolean
}

export const PublishedMark: FC<publishedMarkI> = ({isPublished}) => {
    return (
        <div>
            {isPublished ? <Chip label={'Опубликовано'} color={'success'}/>:
                <Chip label={'Не опубликовано'} color={'error'}/>}
        </div>
    )
};
