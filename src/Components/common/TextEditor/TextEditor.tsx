import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const TextEditor = () => {
    const [value, setValue] = useState('');

    return (
        <div style={{width: '100%', height: '300px', marginBottom:'10px'}}>
            <ReactQuill style={{height: '200px'}} theme="snow" value={value} onChange={setValue}/>
        </div>
    );

};


