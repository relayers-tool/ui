import {InjectedConnector} from '@web3-react/injected-connector'
import NetworkConnector from '../modules/web3/utils/netWork'
import {WalletConnectConnector} from '@web3-react/walletconnect-connector'

const MainChainId = 1

export const NetworkContextName = 'NETWORK'
export const connectorLocalStorageKey = 'connectorId'

export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? MainChainId.toString())
export const injected = new InjectedConnector({
    supportedChainIds: [NETWORK_CHAIN_ID],
})

export const RPC = {
    1: String(process.env.REACT_APP_ETH_RPC),
    3: String(process.env.REACT_APP_ROPSTEN_RPC),
    56:String(process.env.REACT_APP_BSC_RPC),
    137:String(process.env.REACT_APP_MATIC_RPC)
}


export const network = new NetworkConnector({
    urls: {
        [NETWORK_CHAIN_ID]: RPC[MainChainId],
    },
})

export const walletconnect = new WalletConnectConnector({
    rpc: { [NETWORK_CHAIN_ID]: RPC[MainChainId] },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    // pollingInterval: 15000,
})
