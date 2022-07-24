import {UnsupportedChainIdError, useWeb3React} from "@web3-react/core";
import {useCallback} from "react";
import {connectorLocalStorageKey, injected, walletconnect} from "../../services/constants";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import {message} from "antd";

const useAuth = () => {
    const { activate, deactivate } = useWeb3React()

    const login = useCallback((type: string) => {

        const connector = type === 'injected' ? injected : walletconnect;
        if (connector) {
            activate(connector, async (error: Error) => {
                window.localStorage.removeItem(connectorLocalStorageKey)
                if (error instanceof UnsupportedChainIdError){
                    message.error("Please Switch TO ETH Chain");
                }else if(connector instanceof WalletConnectConnector) {
                    const walletConnector = connector as WalletConnectConnector;
                    walletConnector.walletConnectProvider = undefined;
                }
            })
        } else {

        }
    }, [])

    return { login, logout: deactivate }
}

export default useAuth;
