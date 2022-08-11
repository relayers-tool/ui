import React, {FC, useContext, useState} from "react";
import StakePanel from "./StakePanel";
import TornIMG from "./TornIMG";
import {PanelContext, PublicInfoContext, TabBarContext} from './hooks'
import {StoreContext} from "../../hooks";
import RelayerCard from "./MainView";
import PersonalCard from "./PersonalCard";
import TabBar from "./TabBar";
import UnstakePanel from "./UnstakePanel";
import useIntl from "../../utils/useIntl";
import './index.css';
import MbTabBar from "./mobileComponents/MbTabBar";
import MbStakePanel from "./mobileComponents/MbStakePanel";
import MbUnstakePanel from "./mobileComponents/MbUnstakePanel";
import {Drawer, message} from "antd";
import CloseIcon from "../icons/CloseIcon";
import {formatUnits} from "../../utils/common";
import {BigNumber} from "ethers";
import LoadingIcon from "../icons/LoadingIcon";
import {useExitQueueContract} from "../../Web3";
import PersonIcon from "../icons/PersonIcon";
import QuotesIcon from "../icons/QuotesIcon";
import useAccount from "../../Web3/methods";

const Home: FC = () => {
    const intl = useIntl();
    const [barActive, setBarActive] = useState(1);

    const [dateStr, setDateStr] = useState('');
    const [showDrawer1, setShowDrawer1] = useState(false);
    const [showDrawer2, setShowDrawer2] = useState(false);

    const {isMobile, profit_ratio, Un_paid_usdt, apy,apr ,EthInfo} = useContext(StoreContext);
    const {
        user_info,
        queryInfo,
        token_price,
        relayerTotal,
        totalStakedTorn,
        gov_staking_info,
        exit_queue_info,
    } = useContext(StoreContext);

    const open_guide = () => {
        window.open(process.env.REACT_APP_GUIDE_URL);
    }

    const rootToken2Torn = (mun: BigNumber) => {
        if (token_price.eq(0)) {
            return BigNumber.from(0);
        }
        return mun.mul(token_price).div(BigNumber.from(10).pow(18));
    }

    const [showCancel, setShowCancel] = useState(false);
    const {account} = useAccount();
    const exitContract = useExitQueueContract();
    const cancelQueue = async () => {
        setShowCancel(true);

        exitContract.methods.cancelQueue()
            .send({from: account})
            .on('receipt', async (receipt: any) => {
                setShowCancel(false);
                message.success(intl('message.cancel.success'))
                queryInfo();
            })
            .on('error', (err: any) => {
                setShowCancel(false);
                // console.error("====", err);
                message.error(intl('message.cancel.error'))
                queryInfo();
            });
    }

    const claimQueue = async () => {
        setShowCancel(true);

        exitContract.methods.claim()
            .send({from: account})
            .on('receipt', async (receipt: any) => {
                setShowCancel(false);
                message.success(intl('message.claim.success'))
                queryInfo();
            })
            .on('error', (err: any) => {
                setShowCancel(false);
                // console.error("====", err);
                message.error(intl('message.claim.error'))
                queryInfo();
            });
    }

    return (
        <PublicInfoContext.Provider value={{
            dateStr,
        }}>
            {
                isMobile
                    ?
                    <div className='mh_wrap'>
                        <TabBarContext.Provider value={{barActive, setBarActive}}>
                            <MbTabBar/>
                        </TabBarContext.Provider>

                        <PanelContext.Provider value={{setShowDrawer1, setShowDrawer2}}>
                            {barActive === 1 && <MbStakePanel/>}
                            {barActive === 3 && <MbUnstakePanel/>}
                        </PanelContext.Provider>

                        <Drawer className='mb_drawer'
                                size='large'
                                title={
                                    <div className='mb_drawer_header flexrbc'>
                                        <span className='flexrsc'>Personal Overview<PersonIcon
                                            style={{marginLeft: '10px'}}/></span>
                                        <CloseIcon style={{width: '0.43rem'}}
                                                   onClick={() => setShowDrawer1(false)}/>
                                    </div>
                                }
                                placement='bottom'
                                onClose={() => setShowDrawer1(false)}
                                visible={showDrawer1}
                                closable={false}
                        >
                            <div className='mbd_title'>{intl('stake.personal3', 'Your Staked')}</div>
                            <div className='mbd_text'>{ formatUnits(user_info.balance_root_token.mul(token_price).div(BigNumber.from(10).pow(18))) } TORN</div>

                            <div className='mbd_title'>{intl('stake.personal2', 'Your Earned')}</div>
                            <div className='mbd_text'>{ formatUnits(user_info.balance_of_earned) } TORN</div>


                            <div className='mbd_title'>{intl('stake.personal4', 'Your Queue Amount')}</div>
                            <div className='mbd_text'>
                                {
                                    exit_queue_info.user_value.gt(0)
                                        ?
                                        <p className='flexrsc'>
                                            <span
                                                className='num'>{formatUnits(exit_queue_info.is_prepared ? exit_queue_info.user_value : rootToken2Torn(exit_queue_info.user_value))} TORN</span>
                                            {
                                                exit_queue_info.is_prepared
                                                    ? <span className='text_btn'
                                                            onClick={claimQueue}>{intl('unstake.claim', 'claim')}</span>
                                                    : (showCancel
                                                    ? <LoadingIcon
                                                        style={{width: '16px', flexShrink: '0', marginLeft: '5px'}}/>
                                                    : <span className='text_btn'
                                                            onClick={cancelQueue}>{intl('unstake.cancel', 'cancel')}</span>)
                                            }

                                        </p>
                                        : <p>0 TORN</p>
                                }
                            </div>

                        </Drawer>

                        <Drawer className='mb_drawer'
                                size='large'
                                title={
                                    <div className='mb_drawer_header flexrbc'>
                                        <span>Relayer Overview<QuotesIcon style={{marginLeft: '10px'}}/></span>
                                        <CloseIcon style={{width: '0.43rem'}}
                                                   onClick={() => setShowDrawer2(false)}/>
                                    </div>
                                }
                                placement='bottom'
                                onClose={() => setShowDrawer2(false)}
                                visible={showDrawer2}
                                closable={false}
                        >
                            <div className='mbd_title'>{intl('stake.relay2', 'Total Staked')}</div>
                            <div className='mbd_text'>{formatUnits(totalStakedTorn)} TORN</div>

                            <div className='mbd_title'>{intl('stake.relay6', 'Total In Relayers')}</div>
                            <div className='mbd_text'>{formatUnits(relayerTotal)} TORN</div>


                            <div className='mbd_title'>{intl('stake.relay7', 'Rewards hasn\'t paid')}</div>
                            <div className='mbd_text'>{/*dateStr*/"$ " + formatUnits(Un_paid_usdt, 6)}</div>

                            <div className='mbd_title'>{intl('stake.relay3', 'APR(7 days)')}</div>
                            <div className='mbd_text'> {(Number(100) * Number(apr)).toFixed(2)} %</div>

                            <div className='mbd_title'>{intl('stake.relay5', 'APY(7 days)')}</div>
                            <div className='mbd_text'>{(Number(100) * Number(apy)).toFixed(2)} %</div>

                            <div className='mbd_title'>{intl('stake.relay4', 'Reward Fee')}</div>
                            <div className='mbd_text'>{(profit_ratio.toNumber() / 1000).toFixed(3)} %</div>




                            <div className='mbd_title'>{intl('stake.relay8', 'Total queue amount')}</div>
                            <div
                                className='mbd_text'>{formatUnits(exit_queue_info.exit_queue_torn.add(rootToken2Torn(exit_queue_info.exit_queue_root_token)))} TORN
                            </div>

                            <div className='mbd_title'>{intl('stake.relay9', 'Gov Staking')}</div>
                            <div className='mbd_text'>{formatUnits(gov_staking_info.staking_torn)} TORN</div>

                            <div className='mbd_title'>{intl('stake.relay10', 'Gov Reward')}</div>
                            <div className='mbd_text'>{formatUnits(gov_staking_info.reward_torn)} TORN</div>
                        </Drawer>

                    </div>
                    :
                    <>
                        <div className='stake_wrap flexrbst'>
                            <div className='test_net'>
                                <p className='title'
                                   style={{marginTop: '10px'}}>{intl('message.testnet.guide', 'BEWARE OF THE RISK WITH NO AUDIT.')}
                                    <span>&nbsp;&nbsp;</span>
                                    <span className='title guide' style={{marginTop: '10px'}}
                                          onClick={open_guide}>{intl('tr.header8', 'GUIDE')}</span>
                                </p>
                            </div>
                        </div>
                        <div className='stake_wrap flexrbst'>
                            <div className='left'>
                                <RelayerCard/>
                                <PersonalCard/>
                            </div>
                            <div className="right flexcss">
                                <TabBarContext.Provider value={{barActive, setBarActive}}>
                                    <TabBar/>
                                </TabBarContext.Provider>
                                {barActive === 1 && <StakePanel/>}
                                {barActive === 3 && <UnstakePanel/>}
                                <TornIMG/>
                            </div>
                        </div>
                    </>
            }

        </PublicInfoContext.Provider>
    )
};

export default Home;

