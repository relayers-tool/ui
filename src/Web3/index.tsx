import {AbiItem} from 'web3-utils'
import React, {FC} from "react";
import { message} from "antd";

import Web3 from 'web3'
import {useWeb3React} from "@web3-react/core";
import {
    Deposit_ABI,
    ERC20_ABI,
    ExitQueue_ABI,
    offchainOracle_ABI,
    ProfitRecord_ABI,
    RelayerRegistry_ABI,
    RootDb_ABI
} from "../services/constants/abis/ABI";
import {ChainId, Contract} from "@chainstarter/multicall-client.js";
import {signERC2612Permit} from 'eth-permit'

export interface Address {
    65?: string
    56?: string
    66?: string
}

export let web3Provider: any
export const useWeb3 = () => {
    const {library} = useWeb3React()
    web3Provider = library?.provider || null;
    // return new Web3(String(process.env.REACT_APP_ETH_RPC))




    return new Web3(web3Provider)
}

export const addressBook = {
    usdcToken: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    usdtToken: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    daiToken: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    cDaiToken: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    wethToken: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    wBtcToken: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    wethToken_xdai: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
    wBNB: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    wMatic: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    tornToken: '0x77777FeDdddFfC19Ff86DB637967013e6C6A116C',
    mRootDb: '0x2fB6ac90378d4065a0D750cE42CDDD7E85835609',
    mIncome: '0x875d48f26b1f0e41D62A76446A5D25905Bcf6395',
    mDeposit: '0x3654EcfC4e406c8320DCE4Af95C318369488f6b6',
    mExitQueue: '0x4Ddc2B9a75b67D8A049475838CF3D1326aCc0177',
    TornGovStaking: "0x5efda50f22d34f262c29268506c5fa42cb56a1ce",
    relayerRegistry: '0x58E8dCC13BE9780fC42E8723D8EaD4CF46943dF2',
    mProfitRecord: "0xdB97042c66A41740cD5C58BCF934151F9E09cA6f",
    mTornadoStakingRewards: "0x2FC93484614a34f26F7970CBB94615bA109BB4bf",
    MTornRouter: "0xd90e2f925DA726b50C4Ed8D0Fb90Ad053324F31b",
    multicall: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
}


//
export const useTokenContract = () => {
    const web3 = useWeb3()
    const contract = new web3.eth.Contract(ERC20_ABI as unknown as AbiItem, addressBook.tornToken)
    return contract
}

export const useRootDBContract = () => {
    const web3 = useWeb3();
    const contract = new web3.eth.Contract((RootDb_ABI.abi as unknown) as AbiItem, addressBook.mRootDb);
    return contract;
}

export const useDepositContract = () => {
    const web3 = useWeb3();
    const contract = new web3.eth.Contract((Deposit_ABI.abi as unknown) as AbiItem, addressBook.mDeposit);
    return contract;
}

export const useExitQueueContract = () => {
    const web3 = useWeb3();
    const contract = new web3.eth.Contract((ExitQueue_ABI.abi as unknown) as AbiItem, addressBook.mExitQueue);
    return contract;
}

export const mTorn_token = new Contract(ERC20_ABI, addressBook.tornToken, ChainId.ETH);
export const mRootDb = new Contract(RootDb_ABI.abi, addressBook.mRootDb, ChainId.ETH);
export const mDeposit = new Contract(Deposit_ABI.abi, addressBook.mDeposit, ChainId.ETH);
export const mExit = new Contract(ExitQueue_ABI.abi, addressBook.mExitQueue, ChainId.ETH);
export const mRelayerRegistry = new Contract(RelayerRegistry_ABI.abi, addressBook.relayerRegistry, ChainId.ETH);
export const mProfitRecord = new Contract(ProfitRecord_ABI.abi, addressBook.mProfitRecord, ChainId.ETH);
export const mDai = new Contract(ERC20_ABI, addressBook.daiToken, ChainId.ETH);
export const mcDai = new Contract(ERC20_ABI, addressBook.cDaiToken, ChainId.ETH);
export const mWbtc = new Contract(ERC20_ABI, addressBook.wBtcToken, ChainId.ETH);

// @ts-ignore
export const mWeth_xdai = new Contract(ERC20_ABI, addressBook.wethToken_xdai, ChainId.XDAI);
export const mUSDT = new Contract(ERC20_ABI, addressBook.usdtToken, ChainId.ETH);
export const mUSDC = new Contract(ERC20_ABI, addressBook.usdcToken, ChainId.ETH);
export const off_chain_Oracle = new Contract(offchainOracle_ABI, '0x07D91f5fb9Bf7798734C3f606dB065549F6893bb', ChainId.ETH);

export const SendWidthSign = async (Contract: any, account: string, tokenAddress: string, _spender: string, bigNumStr: string, method: string) => {

    return new Promise(async resolve => {
        let signRes: any = ''
        try {
            signRes = await signERC2612Permit(web3Provider, tokenAddress, (account as string), _spender, bigNumStr);
        } catch (err: any) {
            message.error(err.message || 'error');
            resolve({
                messageCode: 305,
                data: err
            })
        }

        Contract.methods[method](bigNumStr, signRes.deadline, signRes.v, signRes.r, signRes.s)
            .send({from: account})
            .on('receipt', (receipt: any) => {
                resolve({
                    messageCode: 200,
                    data: receipt
                })
            })
            .on('rejected', (res: any) => {
                console.warn("rejected:", res);
            })
            .on('error', (err: any) => {
                console.error("==e==", err);
                message.error(err.message || 'error');
                resolve({
                    messageCode: 300,
                    data: err
                })
            });
    })
}

const Web3Test: FC = () => {
    // const intl = useIntl();
    // const {login} = useAuth();
    // const {account} = useAccount();
    //
    // const rootDBContract = useRootDBContract();
    //
    //
    // const connectWallet = () => {
    //     login('injected');
    //
    //     window.localStorage.setItem(connectorLocalStorageKey, 'injected')
    // }
    //
    // const getAcc = () => {
    //     console.log(account);
    // }
    //
    //
    // const depositContract = useDepositContract();
    // const stakeWithApprove = async () => {
    //     const res = await signERC2612Permit(web3Provider, addressBook.tornToken, String(account), (addressBook.mDeposit as string), toTokenDecimals(1.2).toString())
    //
    //     await depositContract.methods
    //         .deposit(toTokenDecimals(1.2), res.deadline, res.v, res.r, res.s)
    //         .send({from: account})
    //         .on('receipt', async (receipt: any) => {
    //
    //         })
    //         .on('error', (err: any) => {
    //             console.error("error:", err);
    //         });
    // }
    //
    // const stakeWithApprove1 = async () => {
    //      await SendWidthSign(depositContract, String(account), addressBook.tornToken, addressBook.mDeposit, toTokenDecimals(1.8).toString(), 'deposit');
    // }
    //
    // const queryInfo = async () => {
    //      await rootDBContract.methods.totalTorn().call();
    // }

    return (
        <div>
            {/*<h2>Test Page</h2>*/}
            {/*<p>{account}</p>*/}
            {/*<p>{intl('tr.header5', 'fsfs')}</p>*/}
            {/*<Button type='primary' onClick={connectWallet}>Connect</Button>*/}
            {/*<br/><br/>*/}
            {/*<Button type='primary' onClick={getAcc}>Get</Button>*/}
            {/*<br/><br/>*/}
            {/*<Button type='primary' onClick={() => {*/}
            {/*}}>Query</Button>*/}
            {/*<Button type='primary' onClick={queryInfo}>Query Info</Button>*/}
            {/*<Button type='primary' onClick={stakeWithApprove}>stake</Button>*/}
            {/*<Button type='primary' onClick={stakeWithApprove1}>stake111</Button>*/}
        </div>
    )
}

export default Web3Test;
