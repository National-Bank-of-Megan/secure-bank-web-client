import History from "../components/history/History";
import React, {useState} from "react";

const HistoryPage = () => {
    const [currentlyBrowsing, setCurrentlyBrowsing] = useState('transfers');

    const handleBrowsingChange = (event: React.SyntheticEvent, newCurrent: string) => {
        setCurrentlyBrowsing(newCurrent);
    };

    return (<>
        <History currentlyBrowsing={currentlyBrowsing} handleBrowsingChange={handleBrowsingChange}/>
    </>)
}

export default HistoryPage;
