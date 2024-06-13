import { Middleware } from '@reduxjs/toolkit';
import {RootState} from "./redux/store";


const errorMiddleware: Middleware<Record<string, unknown>, RootState> = store => next => action => {
    if (action.type.endsWith('/rejected') && action.payload) {
        const { status } = action.payload;

        if (status === 451) {
            window.location.href = '/access-denied';
        }
    }

    return next(action);
};

export default errorMiddleware;
