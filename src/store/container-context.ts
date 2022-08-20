import React, {createContext, Dispatch, SetStateAction, useState} from "react";

type ContainerContextObj = {
    hasContainer: boolean;
    setHasContainer: Dispatch<SetStateAction<boolean>> | null;
}
const ContainerContext = React.createContext<ContainerContextObj>({hasContainer :true, setHasContainer : null});
export default ContainerContext;