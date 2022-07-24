import {ChainId, config} from "@chainstarter/multicall-client.js";
// ChainId.MATIC = 4
// https://github.com/joshstevens19/ethereum-multicall#readme

// @ts-ignore
ChainId.XDAI = 100
// @ts-ignore
const multicallConfig = config(
    {
        defaultChainId: 1,
        delay: 100,//debounce
        timeout: 20000,//ms
        maxCalls: 500,//Single request contains call
        allowFailure: true,//The result structure is different
        rpc: {
            [ChainId.ETH]: {
                url: String(process.env.REACT_APP_ETH_RPC),// rpc url (https|wss)
                address: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',//multicall2 address
            },
            [ChainId.MATIC]: {
                url: String(process.env.REACT_APP_MATIC_RPC),
                address: '0x275617327c958bD06b5D6b871E7f491D76113dd8'
            },
            [ChainId.BSC]: {
                url: String(process.env.REACT_APP_BSC_RPC),
                address: '0xC50F4c1E81c873B2204D7eFf7069Ffec6Fbe136D'
            },
            // @ts-ignore
            [ChainId.XDAI]: {
                url: String(process.env.REACT_APP_XDAI_RPC),
                address: '0x2325b72990D81892E0e09cdE5C80DD221F147F8B'
            },
        }
    }
)
