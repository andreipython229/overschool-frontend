import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {NavCreatingCourse} from "../../../NavAccount/NavCreatingCourse/NavCreatingCourse";
import {Constructor} from "./Constructor/Constructor";
import {createCoursePath} from "../../../../../enum/pathE";

export const RedactorCourse = () => {
    return (
        <div>
            <NavCreatingCourse/>
            <Routes>
                <Route path={createCoursePath.Constructor} element={<Constructor/>}/>
            </Routes>
        </div>
    );
};


