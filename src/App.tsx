import React, {FC, useEffect, useState} from 'react';
import {HashRouter, Route, Routes,} from "react-router-dom";
import {StoreContext} from "./hooks";
import {isMobile} from "./utils/screen";
import Home from "./pages/Home/Home";
import {LoadingOutlined} from '@ant-design/icons'

import 'antd/dist/antd.css'
import Web3Test, {
    addressBook,
    mcDai,
    mDai,
    mDeposit,
    mExit,
    mProfitRecord,
    mRelayerRegistry,
    mRootDb,
    mTorn_token,
    mUSDC,
    mUSDT,
    mWbtc, mWeth_xdai,
    off_chain_Oracle
} from "./Web3";
import Web3ReactManager from "./services/Web3ReactManager";
import WebHeader from "./pages/layout/Menu/Header";
import './assets/styles/index.css'
import Relayers from "./pages/Relayers/Relayers";
import {ChainId, getWeb3, multicallClient} from "@chainstarter/multicall-client.js";
import {BigNumber} from "ethers";
import {StringtoTokenDecimals} from "./utils/common";
import {useWeb3React} from "@web3-react/core";


const App: FC = () => {
    const [publicInfo, setPublicInfo] = useState({});
    const [eventStatus, setEventStatus] = useState({});
    const [loading, setLoading] = useState(true);
    const [relayersAddressList, setRelayersAddressList] = useState<string[]>([]);
    const [relayerTotal, setRelayerTotal] = useState(BigNumber.from(0));
    const [token_price, set_token_price] = useState(BigNumber.from(0));
    const [totalStakedTorn, setTotalStakedTorn] = useState(BigNumber.from(0));
    const [RelayerInfo, setRelayerInfo] = useState<any[]>([]);
    const [profit_ratio, setprofit_ratio] = useState(BigNumber.from(0));
    const [Un_paid_usdt, setUn_paid_usdt] = useState(BigNumber.from(0));
    const [showConnect, setShowConnect] = useState(true);

    const [exit_queue_info, set_exit_queue_info] = useState({
        exit_queue_torn: BigNumber.from(0),
        exit_queue_root_token: BigNumber.from(0),
        user_value: BigNumber.from(0),
        is_prepared: false,
    });
    const [user_info, set_user_info] = useState({
        balance_of_torn: BigNumber.from(0),
        balance_root_token: BigNumber.from(0),
        balance_of_earned: BigNumber.from(0)
    });

    const [gov_staking_info, set_gov_staking_info] = useState({
        staking_torn: BigNumber.from(0),
        reward_torn: BigNumber.from(0),
    });

    const [EthInfo, setEthInfo] = useState<any[]>([]);
    const [FeeInfo, setFeeInfo] = useState<any[]>([]);

    const {account} = useWeb3React()

    const eth_web3 = getWeb3(ChainId.ETH);
    const bsc_web3 = getWeb3(ChainId.BSC);
    const matic_web3 = getWeb3(ChainId.MATIC);

    // @ts-ignore
    const xdai_web3 = getWeb3(ChainId.XDAI);

    const queryInfo = async () => {
        queryUserInfo();
        querySysInfo();
    }
    let woker_map = new Map();
    woker_map.set("0xa0109274F53609f6Be97ec5f3052C659AB80f012", "0x155301c59ff55C74cc921dA6745C86390ED13424");

    const query_all_usdt = async () => {

        if (RelayerInfo.length === 0 || EthInfo.length === 0) {
            return
        }
        const tokens = {
            usdt: {
                address: addressBook.usdtToken,
                decimals: 6,
                name: "usdt"
            },
            cdai: {
                address: addressBook.cDaiToken,
                decimals: 8,
                name: "cdai"
            },
            wbtc: {
                address: addressBook.wBtcToken,
                decimals: 8,
                name: "wbtc"
            },
            wbnb: {
                address: addressBook.wBNB,
                decimals: 18,
                name: "wbnb"
            },
            wmatic: {
                address: addressBook.wMatic,
                decimals: 18,
                name: "wmatic"
            },
            weth: {
                address: addressBook.wethToken,
                decimals: 18,
                name: "weth"
            }
        }


        const calls = [
            /*0*/ (off_chain_Oracle as any).getRate(addressBook.cDaiToken, addressBook.usdtToken, true),
            /*1*/ (off_chain_Oracle as any).getRate(addressBook.wBtcToken, addressBook.usdtToken, false),
            /*2*/ (off_chain_Oracle as any).getRate(addressBook.wBNB, addressBook.usdcToken, false),
            /*3*/ (off_chain_Oracle as any).getRate(addressBook.wMatic, addressBook.usdtToken, false),
            /*4*/ (off_chain_Oracle as any).getRate(addressBook.wethToken, addressBook.usdtToken, false),
        ]

        multicallClient(calls).then(res => {
            let cDai = BigNumber.from(res[0][0] ? res[0][1] : 0);
            let wBtcToken = BigNumber.from(res[1][0] ? res[1][1] : 0);
            let wBNB = BigNumber.from(res[2][0] ? res[2][1] : 0);
            let wMatic = BigNumber.from(res[3][0] ? res[3][1] : 0);
            let wEth = BigNumber.from(res[4][0] ? res[4][1] : 0);

            const numerator = BigNumber.from(10).pow(tokens.cdai.decimals);
            const denominator = BigNumber.from(10).pow(tokens.usdt.decimals); // eth decimals
            const price_cdai = BigNumber.from(cDai).mul(numerator).div(denominator);

            const numerator_btc = BigNumber.from(10).pow(tokens.wbtc.decimals);
            const price_btc = BigNumber.from(wBtcToken).mul(numerator_btc).div(denominator);

            const numerator_bnb = BigNumber.from(10).pow(tokens.wbnb.decimals);
            const price_bnb = BigNumber.from(wBNB).mul(numerator_bnb).div(denominator);

            const numerator_wMatic = BigNumber.from(10).pow(tokens.wmatic.decimals);
            const price_wmatic = BigNumber.from(wMatic).mul(numerator_wMatic).div(denominator);

            const numerator_wEth = BigNumber.from(10).pow(tokens.weth.decimals);
            const price_wEth = BigNumber.from(wEth).mul(numerator_wEth).div(denominator);

            let all_usdc = BigNumber.from(0);
            for (let i = 0; i < EthInfo.length; i++) {
                let eth_usdc = price_wEth.mul(EthInfo[i].work_eth.add(EthInfo[i].relayer_eth).add(RelayerInfo[i].mWeth_xdai)).div(BigNumber.from(10).pow(tokens.weth.decimals + 12));
                // console.log("eth_usdc",formatUnits(eth_usdc,6));

                let bnb_usdc = price_bnb.mul(EthInfo[i].work_bsc.add(EthInfo[i].relayer_bsc)).div(BigNumber.from(10).pow(tokens.wbnb.decimals + 11));


                // console.log("bnb",formatUnits(EthInfo[i].work_bsc.add(EthInfo[i].relayer_bsc),18));
                // console.log("bnb_usdc",formatUnits(bnb_usdc,6));

                let matic_usdc = price_wmatic.mul(EthInfo[i].work_matic.add(EthInfo[i].relayer_matic)).div(BigNumber.from(10).pow(tokens.wmatic.decimals + 12));
                // console.log("matic_usdc",formatUnits(matic_usdc,6));

                let cdai_usdc = price_cdai.mul(RelayerInfo[i].mcDai).div(BigNumber.from(10).pow(tokens.cdai.decimals + 12));
                // console.log("cdai_usdc",formatUnits(cdai_usdc,6));

                let btc_usdc = price_btc.mul(RelayerInfo[i].mWbtc).div(BigNumber.from(10).pow(tokens.wbtc.decimals + 12));
                // console.log("btc_usdc",formatUnits(btc_usdc,6));

                all_usdc = all_usdc.add(eth_usdc.add(bnb_usdc).add(matic_usdc).add(cdai_usdc).add(btc_usdc).add(RelayerInfo[i].mUSDC).add(RelayerInfo[i].mUSDT)
                    .add(RelayerInfo[i].mDai.add(EthInfo[i].work_xdai).add(EthInfo[i].relayer_xdai).div(10 ** 12)));
            }

            setUn_paid_usdt(all_usdc);
        });
    }


    const querySysInfo = async () => {

        const calls = [
            /*0*/ (mRootDb as any).totalRelayerTorn(),
            /*1*/(mRootDb as any).totalTorn(),
            /*2*/(mDeposit as any).balanceOfStakingOnGov(),
            /*3*/(mDeposit as any).checkRewardOnGov(),
            /*4*/(mRootDb as any).valueForTorn(StringtoTokenDecimals("1.0")),
            /*5*/(mDeposit as any).profitRatio(),
        ]
        if (relayersAddressList.length) {
            relayersAddressList.forEach(item => {
                calls.push((mRelayerRegistry as any).getRelayerBalance(item))
                calls.push((mWbtc as any).balanceOf((item)))
                calls.push((mDai as any).balanceOf((item)))
                calls.push((mUSDC as any).balanceOf((item)))
                calls.push((mUSDT as any).balanceOf((item)))
                calls.push((mcDai as any).balanceOf((item)))
                calls.push((mWeth_xdai as any).balanceOf((item)))
            })
        }

        let res = await multicallClient(calls);

        setRelayerTotal(BigNumber.from(res[0][0] ? res[0][1] : 0));
        setTotalStakedTorn(BigNumber.from(res[1][0] ? res[1][1] : 0));
        set_gov_staking_info({
            staking_torn: BigNumber.from(res[2][0] ? res[2][1] : 0),
            reward_torn: BigNumber.from(res[3][0] ? res[3][1] : 0),
        });
        let one_root_token_value = BigNumber.from(res[4][0] ? res[4][1] : 0);
        set_token_price(one_root_token_value)
        let profit_ratio = BigNumber.from(res[5][0] ? res[5][1] : 0);
        setprofit_ratio(profit_ratio);

        const list = [];
        for (let i = 0; i < relayersAddressList.length; i++) {
            let index = 6 + i * 6;
            let obj = {
                address: relayersAddressList[i],
                relayerBalance: BigNumber.from(res[index][0] ? res[index][1] : 0),
                mWbtc: BigNumber.from(res[index + 1][0] ? res[index + 1][1] : 0),
                mDai: BigNumber.from(res[index + 2][0] ? res[index + 2][1] : 0),
                mUSDC: BigNumber.from(res[index + 3][0] ? res[index + 3][1] : 0),
                mUSDT: BigNumber.from(res[index + 4][0] ? res[index + 4][1] : 0),
                mcDai: BigNumber.from(res[index + 5][0] ? res[index + 5][1] : 0),
                mWeth_xdai: BigNumber.from(res[index + 6][0] ? res[index + 6][1] : 0),

            }
            list.push(obj);
        }
        setRelayerInfo(list)
    }

    const queryFee = async () => {
        try {
            const fee_list = [];
            for (let i = 0; i < relayersAddressList.length; i++) {
                const [fee_eth, fee_bsc, fee_matic, fee_nova] = await Promise.all([
                    fetch(`https://torn.relayersdao.finance/v1/status`),
                    fetch(`https://bsc.relayersdao.finance/v1/status`),
                    fetch(`https://matic.relayersdao.finance/v1/status`),
                    fetch(`https://nova.relayersdao.finance/status`),

                ]);
                let obj = {
                    address: relayersAddressList[i],
                    fee_eth: (await fee_eth.json()).tornadoServiceFee,
                    fee_bsc: (await fee_bsc.json()).tornadoServiceFee,
                    fee_matic: (await fee_matic.json()).tornadoServiceFee,
                    nova: (await fee_nova.json()).serviceFee,
                }
                fee_list.push(obj);
            }
            setFeeInfo(fee_list);
        } catch (e) {
            console.error(e);
        }
    }


    const queryUserInfo = async () => {

        if (!account) {
            return;
        }

        const calls = [
            (mTorn_token as any).balanceOf(account),
            (mRootDb as any).balanceOf(account),
            (mTorn_token as any).balanceOf(addressBook.mExitQueue),
            (mRootDb as any).balanceOf(addressBook.mExitQueue),
            (mExit as any).getQueueInfo(account),

        ]
        multicallClient(calls).then(res => {
            set_user_info({
                balance_of_torn: (BigNumber.from(res[0][0] ? res[0][1] : 0)),
                balance_root_token: (BigNumber.from(res[1][0] ? res[1][1] : 0)),
                balance_of_earned: user_info.balance_of_earned
            });
            // let banlance_of_torn = (BigNumber.from(res[0][0] ? res[0][1] : 0));

            set_exit_queue_info({
                exit_queue_torn: BigNumber.from(res[2][0] ? res[2][1] : 0),
                exit_queue_root_token: BigNumber.from(res[3][0] ? res [3][1] : 0),
                user_value: BigNumber.from(res[4][0] && res[4][1][0] ? res[4][1][0] : 0),
                is_prepared: res[4][0] && res[4][1][0] > 0 && res[4][1][1],
            });

        })
    }
    const queryRelayersList = async () => {
        const calls = [
            (mRootDb as any).MAX_RELAYER_COUNTER(),
        ]
        const [counterRes] = await multicallClient(calls);
        let res;
        if (counterRes[0]) {
            const countCalls = [];
            for (let i = 1; i <= counterRes[1]; i++) {
                countCalls.push((mRootDb as any).mRelayers(i - 1))
            }
            res = await multicallClient(countCalls);
            const list: any[] = []
            res.forEach(item => {
                if (item[0]) {
                    list.push(item[1])
                }
            })
            setRelayersAddressList(list);
        }

    }

    const queryAllEthBalance = async () => {
        try {
            const eth_list = [];
            for (let i = 0; i < relayersAddressList.length; i++) {

                const [relayer_eth, relayer_bsc, relayer_matic, work_eth, work_bsc, work_matic, work_xdai, relayer_xdai] = await Promise.all([
                    eth_web3.eth.getBalance(relayersAddressList[i]),
                    bsc_web3.eth.getBalance(relayersAddressList[i]),
                    matic_web3.eth.getBalance(relayersAddressList[i]),
                    eth_web3.eth.getBalance(woker_map.get(relayersAddressList[i])),
                    bsc_web3.eth.getBalance(woker_map.get(relayersAddressList[i])),
                    matic_web3.eth.getBalance(woker_map.get(relayersAddressList[i])),
                    xdai_web3.eth.getBalance(woker_map.get(relayersAddressList[i])),
                    xdai_web3.eth.getBalance(relayersAddressList[i])
                ]);

                let obj = {
                    address: relayersAddressList[i],
                    work_address: woker_map.get(relayersAddressList[i]),
                    relayer_eth: BigNumber.from(relayer_eth),
                    relayer_bsc: BigNumber.from(relayer_bsc),
                    relayer_matic: BigNumber.from(relayer_matic),
                    work_eth: BigNumber.from(work_eth),
                    work_bsc: BigNumber.from(work_bsc),
                    work_matic: BigNumber.from(work_matic),
                    work_xdai: BigNumber.from(work_xdai),
                    relayer_xdai: BigNumber.from(relayer_xdai),
                }
                eth_list.push(obj);
            }

            setEthInfo(eth_list);
        } catch (e) {
            console.error(e);
        }
    }

    const queryEarned = async () => {
        if (!account || user_info.balance_root_token.eq(0)) {
            return;
        }
        const calls = [
            (mProfitRecord as any).getProfit(account, user_info.balance_root_token),
        ]

        multicallClient(calls).then(res => {
            set_user_info({
                balance_of_torn: user_info.balance_of_torn,
                balance_root_token: user_info.balance_root_token,
                balance_of_earned: (BigNumber.from(res[0][0] ? res[0][1] : 0))
            });

        })
    }

    const queryAllBalance = async () => {
        await querySysInfo();
        await queryUserInfo();
        await queryAllEthBalance();
        await queryFee();
        if (relayersAddressList.length > 0) {
            setLoading(false)
        }
    }

    useEffect(() => {
        queryAllBalance();
    }, [relayersAddressList]);

    useEffect(() => {
        query_all_usdt();
    }, [RelayerInfo, EthInfo])

    useEffect(() => {
        queryEarned();
    }, [user_info.balance_root_token])


    useEffect(() => {
        queryUserInfo();
        querySysInfo();
    }, [account])


    useEffect(() => {
        setLoading(true);
        queryRelayersList();

    }, [])

    return (
        <HashRouter>
            <StoreContext.Provider value={{
                isMobile,
                showConnect, setShowConnect,
                publicInfo,
                setPublicInfo,
                eventStatus,
                setEventStatus,
                RelayerInfo,
                setRelayerInfo,
                relayersAddressList,
                EthInfo,
                setEthInfo,
                FeeInfo,
                setFeeInfo,
                user_info,
                exit_queue_info,
                token_price,
                queryInfo,
                relayerTotal,
                totalStakedTorn,
                gov_staking_info,
                Un_paid_usdt,
                setUn_paid_usdt,
                profit_ratio,
                setprofit_ratio

            }}>
                <Web3ReactManager>
                    {
                        loading ?
                            <div className='loading_page'>
                                <div className="loading_box">
                                    <LoadingOutlined className="loading_icon"/>
                                    <p>Loading...</p>
                                </div>
                            </div>
                            :
                            <WebHeader>
                                <Routes>
                                    <Route path="/" element={<Home/>}/>
                                    <Route path="/relay" element={<Relayers/>}/>
                                    <Route path="web3" element={<Web3Test/>}/>
                                </Routes>
                            </WebHeader>
                    }
                </Web3ReactManager>

            </StoreContext.Provider>

        </HashRouter>
    );
}

export default App;
