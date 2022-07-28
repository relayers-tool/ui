import React, {useContext, useEffect, useState} from "react";
import './Header.css'
import {Button,  message} from "antd";
import {useWeb3React} from "@web3-react/core";
import useAuth from "../../../Web3/methods/useAuth";
import {connectorLocalStorageKey} from "../../../services/constants";
import TorndoDialog from "../../components/TorndoDialog/TorndoDialog";
import useIntl from "../../../utils/useIntl";

import MetaMaskIcon from '../../../assets/png/meta_mask_icon.png'
import WalletConnectIcon from '../../../assets/png/wallet_icon.png'

import {Link, useLocation} from "react-router-dom";
import TwitterAppIcon from "../../icons/TwitterAppIcon";
import GithubIcon from "../../icons/GithubIcon";
import OutLinkIcon from "../../icons/OutLinkIcon";
import CopyIcon from "../../icons/CopyIcon";
import {isMobile} from "../../../utils/screen";
import {mbLogo} from "../../icons/icons";
import {StoreContext} from "../../../hooks";
import useAccount from "../../../Web3/methods";

const WebHeader = ({children}: { children: React.ReactNode }) => {

    const {account} = useAccount()
    const intl = useIntl()
    const {login, logout} = useAuth();
    const location = useLocation();

    const toFAQ = () => {
        window.open(process.env.REACT_APP_FAQ_URL)
    }
    const toGuide = () => {
        window.open(process.env.REACT_APP_GUIDE_URL)
    }

    const connectWallet = async () => {
        await login('injected');
        sessionStorage.setItem(connectorLocalStorageKey, 'injected')
        window.localStorage.setItem(connectorLocalStorageKey, 'injected')
    }
    const connectWallet1 = async () => {
        await login('walletConnect');
        sessionStorage.setItem(connectorLocalStorageKey, 'walletConnect')
        window.localStorage.setItem(connectorLocalStorageKey, 'walletConnect')
    }
    const doLogout = async () => {
        await logout();
        setShowAccount(false);
        window.localStorage.removeItem(connectorLocalStorageKey);
    }


    const {showConnect, setShowConnect} =  useContext(StoreContext);
    const [showAccount, setShowAccount] = useState(false);
    const [showWarn, setShowWarn] = useState(true);

    const copyAccount = () => {
        navigator.clipboard.writeText(String(account)).then(r => {});
        message.success('Copied!').then(r => {});
    }

    useEffect(() => {
        if (account && showConnect) {
            setShowConnect(false);
        }
    }, [account,showConnect])

    // const setLang = (lang: string) => {
    //     localStorage.setItem('lang', lang);
    //     window.location.reload();
    // }



    // const menu = (
    //     <Menu
    //         items={[
    //             {
    //                 key: '1',
    //                 label: (
    //                     <span style={{textAlign: 'center'}} onClick={() => setLang('zhCN')}>中文</span>
    //                 ),
    //             },
    //             {
    //                 key: '2',
    //                 label: (
    //                     <span style={{textAlign: 'center'}} onClick={() => setLang('enUS')}>Englis</span>
    //                 ),
    //             }
    //         ]}
    //     />
    // );

    return (
        <div className="web_wrap flexcsc">
            {
                isMobile
                    ?
                    <div className="mb_web_header_wrap">
                        <div className='flexrbc mb_web_header'>
                            <img src={mbLogo} alt='logo' className='logo'/>
                            <div className="r flexrec">
                                {
                                    account
                                        ? <div className="m_wallet_connect"
                                               onClick={() => setShowAccount(true)}>{`${String(account).slice(0, 6)}...${String(account).slice(-4)}`}</div>
                                        : <div className="m_wallet_connect" onClick={() => setShowConnect(true)}>Connect
                                            Wallet</div>
                                }
                            </div>
                        </div>
                        <div className="mb_web_nav flexrbc">
                            <div className='mb_nav'>
                                <Link className={location.pathname === '/' ? 'nav_item active' : 'nav_item'}
                                      to='/'>{intl('tr.header1', 'Stake')}</Link>
                                <Link className={location.pathname === '/relay' ? 'nav_item active' : 'nav_item'}
                                      to='/relay'>{intl('tr.header2', 'Relayers')}</Link>
                                <span className={location.pathname === '/faq' ? 'nav_item active' : 'nav_item'}
                                      onClick={toFAQ}>{intl('tr.header3', 'Doc')}</span>
                            </div>
                            <div className='mb_audit'/>
                        </div>
                    </div>

                    :
                    <div className='web_header'>
                        <div className="header flexrbc">
                            <div className="l flexrsc">
                                <Link className="logo" to='/'>Relayers Tool</Link>
                                <div className="nav flexrsc">
                                    <Link className={location.pathname === '/' ? 'nav_item active' : 'nav_item'}
                                          to='/'>{intl('tr.header1', 'Stake')}</Link>
                                    <Link className={location.pathname === '/relay' ? 'nav_item active' : 'nav_item'}
                                          to='/relay'>{intl('tr.header2', 'Relayers')}</Link>
                                    <span className={location.pathname === '/faq' ? 'nav_item active' : 'nav_item'}
                                          onClick={toFAQ}>{intl('tr.header3', 'Doc')}</span>
                                </div>
                            </div>
                            <div className="r flexrec">
                                {
                                    account
                                        ? <div className="wallet_connect"
                                               onClick={() => setShowAccount(true)}>{`${String(account).slice(0, 6)}...${String(account).slice(-4)}`}</div>
                                        : <div className="wallet_connect" onClick={() => setShowConnect(true)}>Connect
                                            Wallet</div>
                                }
                            </div>
                        </div>
                    </div>

            }
            <div className={isMobile ? 'web_content flexcbc' : 'web_content'}>
                {children}
                {
                    isMobile
                        ?
                        <div className='flexrsc mb_tr_footer'>
                            <div className='contact_us'>
                                <a href="https://twitter.com/RelayersTool" title='Twitter' target='_blank'
                                   style={{marginRight: '0.91rem'}}
                                >
                                    <TwitterAppIcon className='icon'/>
                                </a>
                                <a href="https://github.com/relayers-tool" title='Github' target='_blank'>
                                    <GithubIcon className='icon'/>
                                </a>
                            </div>
                        </div>
                        :
                        <div className='tr_footer'>
                            <div className='tr_footer_content flexrbc'>
                                <p className='title'></p>
                                <div className='contact_us'>
                                    <a href="https://twitter.com/RelayersTool" title='Twitter' target='_blank'>
                                        <TwitterAppIcon className='icon'/>
                                    </a>
                                    <a href="https://github.com/relayers-tool" title='Github' target='_blank'>
                                        <GithubIcon className='icon' style={{marginLeft: '40px'}}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                }
            </div>

            {isMobile ?
                <TorndoDialog title={intl('tr.header9')} visible={showWarn} onClose={setShowWarn}>
                    <div className='trc_dialog connect_dialog'>
                        <p className='wallet_row_title_warn wallet_row_title'>BEWARE OF THE RISK WITH NO AUDIT.</p>
                        <p className='sub_title_guide' onClick={toGuide}>GUIDE</p>
                    </div>
                </TorndoDialog> : ''
            }

            <TorndoDialog title={intl('tr.header7')} visible={showConnect} onClose={setShowConnect}>
                <div className='trc_dialog connect_dialog'>
                    <p className='sub_title'>Please select your Web3 compatible wallet</p>
                    <div className='wallet_row flexrbc' onClick={connectWallet}
                         style={isMobile ? {maxWidth: '100%'} : {}}>
                        <p className='wallet_row_title'>MetaMask</p>
                        <img src={MetaMaskIcon} alt='MetaMask' width='32'/>
                    </div>

                    <div className='wallet_row flexrbc' onClick={connectWallet1}
                        style={isMobile ? {maxWidth: '100%'} : {}}>
                            <p className='wallet_row_title'>WalletConnect</p>
                            <img src={WalletConnectIcon} alt='WalletConnect' width='32'/>
                   </div>
                </div>
            </TorndoDialog>

            <TorndoDialog title={intl('tr.header7')} visible={showAccount} onClose={setShowAccount}>
                <div className='trc_dialog connect_dialog'>
                    <p className='wallet_account'>{account}</p>
                    <div className='flexrsc btns'>
                        <a href={`https://etherscan.io/address/${account}`}
                           className='text_btn'
                        >view</a>
                        <OutLinkIcon fill='#F3731B'/>

                        <Button type='text' onClick={copyAccount}
                                className='text_btn'
                        >copy</Button>
                        <CopyIcon fill='#F3731B'/>
                    </div>
                    <div className='logout_btn_wrap'>
                        <Button className='logout_btn' onClick={doLogout}>{intl('login.out')}</Button>
                    </div>
                </div>
            </TorndoDialog>
        </div>
    )
}
export default WebHeader;
