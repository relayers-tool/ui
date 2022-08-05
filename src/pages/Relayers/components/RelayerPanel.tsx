import React, {FC, useState} from "react";
import {formatUnits} from "../../../utils/common";
import ArrowDown from "../../icons/ArrowDown";
import useIntl from "../../../utils/useIntl";
import {Tabs, Tooltip} from 'antd';
import {
    bnbIcon,
    cdaiIcon,
    daiIcon,
    ethIcon,
    gnosisIcon,
    maticICon,
    relayerIcon,
    usdcIcon,
    usdtIcon,
    wbtcIcon,
    workIcon
} from "../../icons/icons";
import HelpIcon from "../../icons/HelpIcon";
import {utils} from "ethers";

const { TabPane } = Tabs;

interface panelInterface {
    info: any,
    ethInfo:any
    feeInfo:any
}
const RelayerPanel:FC<panelInterface> = (props) => {
    const intl = useIntl();
    const [expand, setExpand] = useState<Boolean>(false)
    const switchExpand = () => {
        setExpand(!expand);
    }
    const open_address = (addr:string) => {
        window.open(addr)
    }
    return (
        <div className="rr_row_wrap">
            <div className='rr_row flexrst'  onClick={switchExpand}>
                <div className='col_1' onClick={()=>{open_address('https://etherscan.io/address/'+props.info.address)}}>
                    relayer007.eth
                </div>
                <div className='col'>
                    <div className='col_title'>{intl('relay.text3', 'Total Staked')}</div>
                    <div className='col_text'>{formatUnits(String(props.ethInfo.total_staked_torn))}TORN</div>
                </div>
                <div className='col'>
                    <div className='col_title'>{intl('relay.text1', 'Total Burned')}</div>
                    <div className='col_text'>{formatUnits(String(props.ethInfo.total_burned_torn))} TORN</div>
                </div>
                <div className='col'>
                    <div className='col_title'>{intl('relay.text2', 'TORN Staking')}</div>
                    <div className='col_text'>{formatUnits(String(props.info.relayerBalance))} TORN</div>
                </div>

                <div className='col'>
                    <div className='col_title'>{intl('relay.text4', '-------')}
                    </div>
                    <div className='col_text'>----</div>
                </div>
                <div className='flexccc'>
                    <ArrowDown className={ expand ? 'arrow open' : 'arrow' } onClick={switchExpand} />
                </div>
            </div>
            <div className={ expand ? 'rp_wrap flexres open' : 'rp_wrap flexres'}>
                <Tabs defaultActiveKey="1" className="rp_tabs">
                    <TabPane key="1"
                             tab={
                                 <span className="rp_text">
                                     <img src={ethIcon} width={41} alt="eth" style={{marginRight: '20px'}}/>
                                     ETH-NODE
                                 </span>
                             }
                    >
                        <div className="rp_data_panel">
                            <div className="flexrsc">
                                <div className="flexrsc rp_card" onClick={()=>{open_address('https://etherscan.io/address/'+props.info.address)}} >
                                    <img src={ethIcon} alt="eth" width={32} style={{marginRight: '20px'}}/>
                                    <text className="worker_card">ETH: {formatUnits(String(props.ethInfo.relayer_eth))}</text>
                                </div>
                                <div className="flexrsc rp_card">
                                    <img src={daiIcon} alt="eth" width={32} style={{marginRight: '20px'}}/>
                                    DAI: {formatUnits(String(props.info.mDai))}
                                </div>
                                <div className="flexrsc rp_card">
                                    <img src={cdaiIcon} alt="eth" width={32} style={{marginRight: '20px'}}/>
                                    cDAI: {formatUnits(String(props.info.mcDai))}
                                </div>
                                <div className="flexrsc rp_card">
                                    <img src={usdcIcon} alt="eth" width={32} style={{marginRight: '20px'}}/>
                                    USDC: {formatUnits(String(props.info.mUSDC),6)}
                                </div>
                            </div>
                            <div className="flexrsc">
                                <div className="flexrsc rp_card">
                                    <img src={usdtIcon} alt="eth" width={32} style={{marginRight: '20px'}}/>
                                    USDT: {formatUnits(String(props.info.mUSDT),6)}
                                </div>
                                <div className="flexrsc rp_card">
                                    <img src={wbtcIcon} alt="eth" width={32} style={{marginRight: '20px'}}/>
                                    WBTC: {formatUnits(String(props.info.mWbtc),6)}
                                </div>
                                <div className="flexrsc rp_card" onClick={()=>{open_address('https://etherscan.io/address/'+props.ethInfo.work_address)}} >
                                    <img src={workIcon} alt="eth" width={32} style={{marginRight: '20px'}}
                                    />
                                    <span className="worker_card">Worker: {formatUnits(String(props.ethInfo.work_eth))} ETH</span>
                                    <Tooltip title={intl('worker.tips')}
                                             placement="bottomLeft"
                                    >
                                        <HelpIcon style={{marginLeft: '10px'}} />
                                    </Tooltip>
                                </div>
                                <div className="flexrsc rp_card">
                                    <img src={relayerIcon} alt="eth" width={32} style={{marginRight: '20px'}}/>
                                    Relayer Fee : {props.feeInfo.fee_eth} %
                                    <Tooltip title={intl('relayerFee.tips')}
                                             placement="bottomLeft"
                                    >
                                        <HelpIcon style={{marginLeft: '10px'}} />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane key="2"
                             tab={
                                 <span className="rp_text">
                                     <img src={bnbIcon} width={41} alt="BNB" style={{marginRight: '20px'}}/>
                                     BSC-NODE
                                 </span>
                             }
                    >
                        <div className="rp_data_panel">
                            <div className="flexrsc">
                                <div className="flexrsc rp_card" onClick={()=>{open_address('https://bscscan.com/address/'+props.info.address)}}>
                                    <img src={bnbIcon} alt="eth" width={32} style={{marginRight: '20px'}}/>
                                    <text className="worker_card">BNB:  {formatUnits(String(props.ethInfo.relayer_bsc))} </text>
                                </div>
                                <div className="flexrsc rp_card" onClick={()=>{open_address('https://bscscan.com/address/'+props.ethInfo.work_address)}}>
                                    <img src={workIcon} alt="eth" width={32} style={{marginRight: '20px'}}
                                    />
                                    <span className="worker_card">Worker: {formatUnits(String(props.ethInfo.work_bsc))} BNB</span>
                                    <Tooltip title={intl('worker.tips')}
                                             placement="bottomLeft"
                                    >
                                        <HelpIcon style={{marginLeft: '10px'}} />
                                    </Tooltip>
                                </div>
                                <div className="flexrsc rp_card">
                                    <img src={relayerIcon} alt="eth" width={32} style={{marginRight: '20px'}}/>
                                    Relayer Fee : {props.feeInfo.fee_bsc} %
                                    <Tooltip title={intl('relayerFee.tips')}
                                             placement="bottomLeft"
                                    >
                                        <HelpIcon style={{marginLeft: '10px'}} />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane key="3"
                             tab={
                                 <span className="rp_text">
                                     <img src={maticICon} width={41} alt="MATIC" style={{marginRight: '20px'}}/>
                                     MATIC-NODE
                                 </span>
                             }
                    >
                        <div className="rp_data_panel">
                            <div className="flexrsc">
                                <div className="flexrsc rp_card" onClick={()=>{open_address('https://polygonscan.com/address/'+props.info.address)}}>
                                    <img src={maticICon} alt="eth" width={32} style={{marginRight: '20px'}}/>
                                    <text className="worker_card">MATIC: {formatUnits(String(props.ethInfo.relayer_matic))}</text>
                                </div>
                                <div className="flexrsc rp_card" onClick={()=>{open_address('https://polygonscan.com/address/'+props.ethInfo.work_address)}}>
                                    <img src={workIcon} alt="eth" width={32} style={{marginRight: '20px'}}
                                    />
                                    <span className="worker_card">Worker: {formatUnits(String(props.ethInfo.work_matic))} MATIC</span>
                                </div>
                                <div className="flexrsc rp_card">
                                    <img src={relayerIcon} alt="eth" width={32} style={{marginRight: '20px'}}/>
                                    Relayer Fee : {props.feeInfo.fee_matic} %
                                    <Tooltip title={intl('relayerFee.tips')}
                                             placement="bottomLeft"
                                    >
                                        <HelpIcon style={{marginLeft: '10px'}} />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane key="4"
                             tab={
                                 <span className="rp_text">
                                     <img src={gnosisIcon} width={41} alt="GNOSIS" style={{marginRight: '20px'}}/>
                                     NOVA-NODE
                                 </span>
                             }
                    >
                        <div className="rp_data_panel">
                            <div className="flexrsc">
                                <div className="flexrsc rp_card" onClick={()=>{open_address('https://blockscout.com/xdai/mainnet/address/'+props.info.address)}}>
                                    <img src={daiIcon} alt="eth" width={32} style={{marginRight: '20px'}}/>
                                    <text className="worker_card">XDAI: {formatUnits(String(props.ethInfo.relayer_xdai))}</text>
                                </div>
                                <div className="flexrsc rp_card" onClick={()=>{open_address('https://blockscout.com/xdai/mainnet/address/'+props.ethInfo.work_address)}}>
                                    <img src={workIcon} alt="eth" width={32} style={{marginRight: '20px'}}
                                    />
                                    <span className="worker_card">Worker: {formatUnits(String(props.ethInfo.work_xdai))} XDAI</span>
                                </div>
                                <div className="flexrsc rp_card">
                                    <img src={relayerIcon} alt="eth" width={32} style={{marginRight: '20px'}}/>
                                    Relayer Fee : {props.feeInfo.nova.withdrawal} %
                                    <Tooltip title={intl('relayerFee.tips')}
                                             placement="bottomLeft"
                                    >
                                        <HelpIcon style={{marginLeft: '10px'}} />
                                    </Tooltip>
                                </div>
                                <div className="flexrsc rp_card">
                                    <img src={relayerIcon} alt="eth" width={32} style={{marginRight: '20px'}}/>
                                    ETH Fee : {utils.formatUnits(props.feeInfo.nova.transfer, 18).replace(/^(.*\..{4}).*$/, "$1")} ETH
                                    {/*<Tooltip title={intl('relayerFee.tips')}*/}
                                    {/*         placement="bottomLeft"*/}
                                    {/*>*/}
                                    {/*    <HelpIcon style={{marginLeft: '10px'}} />*/}
                                    {/*</Tooltip>*/}
                                </div>
                            </div>
                            <div className="flexrsc">
                                <div className="flexrsc rp_card">
                                    <img src={ethIcon} alt="eth" width={32} style={{marginRight: '20px'}}/>
                                     WETH: {formatUnits(String(props.info.mWeth_xdai),18)}
                                </div>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default RelayerPanel;
