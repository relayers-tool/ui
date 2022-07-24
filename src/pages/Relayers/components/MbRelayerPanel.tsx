import React, {FC, useState} from "react";
import {formatUnits} from "../../../utils/common";
import ArrowDown from "../../icons/ArrowDown";
import useIntl from "../../../utils/useIntl";
import {
    bnbIcon,
    cdaiIcon,
    daiIcon,
    ethIcon,
    gnosisIcon,
    maticICon,
    usdcIcon,
    usdtIcon,
    wbtcIcon
} from "../../icons/icons";


interface panelInterface {
    info: any,
    ethInfo: any
    feeInfo: any
}

const MbRelayerPanel: FC<panelInterface> = (props) => {
    const intl = useIntl();
    const [expand, setExpand] = useState<Boolean>(false);
    const [tabKey, setTabKey] = useState<string>('1')
    const switchExpand = () => {
        setExpand(!expand);
    }
    const open_address = (addr: string) => {
        window.open(addr)
    }
    const tabList = [
        {key: '1', icon: ethIcon, name: 'ETH'},
        {key: '2', icon: bnbIcon, name: 'BSC'},
        {key: '3', icon: maticICon, name: 'MATIC'},
        {key: '4', icon: gnosisIcon, name: 'NOVA'},
    ]

    return (
        <div className="mbrr_row_wrap">
            <div className="mbrr_row_content">
                <div className='flexrbc'>
                    <div className='mbrr_name' onClick={() => {
                        open_address('https://etherscan.io/address/' + props.info.address)
                    }}>
                        relayer007.eth
                    </div>
                    <div className='flexccc'>
                        <ArrowDown className={expand ? 'arrow open' : 'arrow'} onClick={switchExpand}/>
                    </div>
                </div>
                <div className='mbrr_row flexrst' onClick={switchExpand}>

                    <div className='col'>
                        <div className='col_title'>{intl('relay.text1', 'Earned')}</div>
                        <div className='col_text'>--- TORN</div>
                    </div>
                    <div className='col'>
                        <div className='col_title'>{intl('relay.text2', 'TORN Staked')}</div>
                        <div className='col_text'>{formatUnits(String(props.info.relayerBalance))} TORN</div>
                    </div>

                </div>
            </div>
            <div className={expand ? 'mbrp_wrap open' : 'mbrp_wrap'}>
                <div className="mbr_tab_pane flexrbc">
                    {
                        tabList.map(item =>
                            <div className={item.key === tabKey ? 'mbr_tab flexrsc active' : 'mbr_tab flexrsc'}
                                 onClick={() => setTabKey(item.key)}
                            >
                                <img src={item.icon} className='icon' alt={item.name}/>
                                {item.name}
                            </div>
                        )
                    }
                </div>
                {
                    tabKey === '1'
                    &&
                    <div className='mbr_panel'>
                      <div className="mbr_coin_wrap flexrbc">
                        <div className='mbr_coin flexrsc' onClick={() => {
                            open_address('https://etherscan.io/address/' + props.info.address)
                        }}>
                          <img src={ethIcon} alt='eth'/>
                          <text className="worker_card">ETH: {formatUnits(String(props.ethInfo.relayer_eth))}</text>
                        </div>
                        <div className='mbr_coin flexrsc'>
                          <img src={daiIcon} alt='dai'/>
                          DAI: {formatUnits(String(props.info.mDai))}
                        </div>
                        <div className='mbr_coin flexrsc'>
                          <img src={cdaiIcon} alt='cdai'/>
                          cDAI: {formatUnits(String(props.info.mcDai))}
                        </div>
                        <div className='mbr_coin flexrsc'>
                          <img src={usdcIcon} alt='usdc'/>
                          USDC: {formatUnits(String(props.info.mUSDC))}
                        </div>
                        <div className='mbr_coin flexrsc'>
                          <img src={usdtIcon} alt='usdt'/>
                          USDT: {formatUnits(String(props.info.mUSDT), 6)}
                        </div>
                        <div className='mbr_coin flexrsc'>
                          <img src={wbtcIcon} alt='wbtc'/>
                          WBTC: {formatUnits(String(props.info.mWbtc), 6)}
                        </div>
                      </div>
                      <div className="flexrbc mbr_f_row" onClick={() => {
                          open_address('https://etherscan.io/address/' + props.ethInfo.work_address)
                      }}>
                        <span className="worker_card">Worker</span>
                        <span style={{color: '#fff'}}>{formatUnits(String(props.ethInfo.work_eth))} ETH</span>
                      </div>
                      <div className="flexrbc mbr_f_row">
                        <span>Relayer Fee</span>
                        <span style={{color: '#fff'}}>{props.feeInfo.fee_eth} %</span>
                      </div>
                    </div>
                }
                {
                    tabKey === '2'
                    &&
                    <div className='mbr_panel'>
                      <div className="mbr_coin_wrap flexrbc">
                        <div className='mbr_coin flexrsc' onClick={() => {
                            open_address('https://bscscan.com/address/' + props.info.address)
                        }}>
                          <img src={bnbIcon} alt='eth'/>
                          <span className="worker_card">BNB: {formatUnits(String(props.ethInfo.relayer_bsc))}</span>
                        </div>

                      </div>
                      <div className="flexrbc mbr_f_row" onClick={() => {
                          open_address('https://bscscan.com/address/' + props.ethInfo.work_address)
                      }}>
                        <span className="worker_card">Worker</span>
                        <span style={{color: '#fff'}}>{formatUnits(String(props.ethInfo.work_bsc))} BNB</span>
                      </div>
                      <div className="flexrbc mbr_f_row">
                        <span>Relayer Fee</span>
                        <span style={{color: '#fff'}}>{props.feeInfo.fee_bsc} %</span>
                      </div>
                    </div>
                }
                {
                    tabKey === '3'
                    &&
                    <div className='mbr_panel'>
                      <div className="mbr_coin_wrap flexrbc">
                        <div className='mbr_coin flexrsc' onClick={() => {
                            open_address('https://polygonscan.com/address/' + props.info.address)
                        }}>
                          <img src={maticICon} alt='eth'/>
                          <span className="worker_card">MATIC: {formatUnits(String(props.ethInfo.relayer_matic))}</span>
                        </div>

                      </div>
                      <div className="flexrbc mbr_f_row" onClick={() => {
                          open_address('https://polygonscan.com/address/' + props.ethInfo.work_address)
                      }}>
                        <span className="worker_card">Worker</span>
                        <span style={{color: '#fff'}}>{formatUnits(String(props.ethInfo.work_matic))} MATIC</span>
                      </div>
                      <div className="flexrbc mbr_f_row">
                        <span>Relayer Fee</span>
                        <span style={{color: '#fff'}}>{props.feeInfo.fee_matic} %</span>
                      </div>
                    </div>
                }
                {
                    tabKey === '4'
                    &&
                    <div className='mbr_panel'>
                      <div className="mbr_coin_wrap flexrbc">
                        <div className='mbr_coin flexrsc' onClick={() => {
                            open_address('https://blockscout.com/xdai/mainnet/address/' + props.info.address)
                        }}>
                          <img src={daiIcon} alt='eth'/>
                          <span className="worker_card">XDAI: {formatUnits(String(props.ethInfo.relayer_xdai))}</span>
                        </div>
                          <div className='mbr_coin flexrsc'>
                              <img src={ethIcon} alt='dai'/>
                              WETH: {formatUnits(String(props.info.wethToken_xdai))}
                          </div>

                      </div>
                      <div className="flexrbc mbr_f_row" onClick={() => {
                          open_address('https://blockscout.com/xdai/mainnet/address/' + props.ethInfo.work_address)
                      }}>
                        <span className="worker_card">Worker</span>
                        <span style={{color: '#fff'}}>{formatUnits(String(props.ethInfo.work_xdai))} XDAI</span>
                      </div>
                      <div className="flexrbc mbr_f_row">
                        <span>Relayer Fee</span>
                        <span style={{color: '#fff'}}>{props.feeInfo.nova.withdrawal} %</span>
                      </div>
                    </div>
                }
            </div>
        </div>

    )
}

export default MbRelayerPanel;
