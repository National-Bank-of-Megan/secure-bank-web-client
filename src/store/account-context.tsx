import React, {Dispatch, SetStateAction, useState} from "react";
import {Props} from "../common/children-props";
import {AccountData} from "../common/account";

type AccountContextObj = {
    accountData: AccountData | null;
    setAccountData: Dispatch<SetStateAction<AccountData | null>>;
}

const AccountContext = React.createContext<AccountContextObj>({
    accountData: {
        clientId: '',
        accountNumber: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    },
    setAccountData: () => {
    }
});

export const AccountContextProvider: React.FC<Props> = ({children}) => {
    const [accountData, setAccountData] = useState<AccountData | null>(null);

    const contextValue = {
        accountData,
        setAccountData
    };

    return (
        <AccountContext.Provider value={contextValue}>
            {children}
        </AccountContext.Provider>);
};

export default AccountContext;