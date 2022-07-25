import {Dispatch, SetStateAction} from "react";

export type UseStateType<T> = {
    state: T;
    setState: Dispatch<SetStateAction<T>>;
}