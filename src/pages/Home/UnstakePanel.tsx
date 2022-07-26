import React, {FC, useContext, useEffect, useState} from 'react'
import {Button, InputNumber, message, Tooltip} from 'antd'
import {BigNumber} from "ethers";
import HelpIcon from "../icons/HelpIcon";
import useIntl from "../../utils/useIntl";
import {useDepositContract, useExitQueueContract, mDeposit,} from "../../Web3";
import TorndoDialog from "../components/TorndoDialog/TorndoDialog";
import {useWeb3React} from "@web3-react/core";
import {formatUnits, StringtoTokenDecimals, toTokenDecimals} from "../../utils/common";
import _ from 'lodash';
import {multicallClient} from "@chainstarter/multicall-client.js";
import {StoreContext} from "../../hooks";

const UnstakePanel: FC = () => {
    const intl = useIntl()
    const {account} = useWeb3React();
    const {token_price, user_info, exit_queue_info, queryInfo,setShowConnect} = useContext(StoreContext);

    const [show, setShow] = useState(false);
    const [showWait, setShowWait] = useState(false);
    const [unStaking, setUnSatking] = useState(false);
    const [inputNum, setInputNum] = useState<number | undefined>(undefined);
    const [isEnough, setIsEnough] = useState(false);

    const exitContract = useExitQueueContract();
    const depositContract = useDepositContract();

    const get_user_staked_tron = () => {
        return user_info.balance_root_token.mul(token_price).div(BigNumber.from(10).pow(18))
    }

    const amountChange = (num: number) => {
        setInputNum(num || undefined);
        queryIsEnough(num || 0);
    }

    const fillMax = () => {
        setInputNum(Number(formatUnits(get_user_staked_tron())) || 0);
        queryIsEnough(Number(formatUnits(get_user_staked_tron())) || 0);
    }


    const torn2rootToken = (mun: any) => {
        if (token_price.eq(0)) {
            return BigNumber.from(0);
        }
        return StringtoTokenDecimals(mun + "").mul(BigNumber.from(10).pow(18)).div(token_price);
    }

    useEffect(() => {
        queryIsEnough(inputNum || 0);
    }, [])

    const queryIsEnough = _.debounce(async (num = 0) => {
        const calls = [
            (mDeposit as any).isBalanceEnough(torn2rootToken(num || 0)),
        ];
       let res = await multicallClient(calls);
       const eStatus = res[0][0] ? res[0][1] : false
       setIsEnough(eStatus);
       return eStatus;

    }, 500);



    const withDrawExe = async (bigNumStr: string) => {

        return new Promise(async resolve => {

            depositContract.methods["withDraw"](bigNumStr)
                .send({from: account})
                .on('receipt', (receipt: any) => {

                    resolve({
                        messageCode: 200,
                        data: receipt
                    })
                })
                .on('rejected', (res: any) => {
                    console.warn("rejected:", res);
                    resolve({
                        messageCode: 300,
                        data: res
                    })
                })
                .on('error', (err: any) => {
                    message.error(err.message || 'error');
                    resolve({
                        messageCode: 300,
                        data: err
                    })
                });
        })
    }

    const withDrawDep = async () => {
        setUnSatking(true);
        let input = torn2rootToken(inputNum || 0)
        if (user_info.balance_root_token.lt(input)) {
            input = user_info.balance_root_token;
        }

        const res: any = await withDrawExe(input.toString());

        if (res.messageCode === 200) {
            message.success(intl('message.unstake.success'));
            setInputNum(undefined);
        }
        setUnSatking(false)
        queryInfo();
    }

    const addQueueExe = async (bigNumStr: string) => {

        return new Promise(async resolve => {

            exitContract.methods["addQueue"](bigNumStr)
                .send({from: account})
                .on('receipt', (receipt: any) => {
                    resolve({
                        messageCode: 200,
                        data: receipt
                    })
                })
                .on('rejected', (res: any) => {
                    console.warn("rejected:", res);
                    resolve({
                        messageCode: 300,
                        data: res
                    })
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

    const addQueue = async () => {

        setUnSatking(true);
        try {
            let input = torn2rootToken(inputNum || 0)
            if (user_info.balance_root_token.lt(input)) {
                input = user_info.balance_root_token;
            }

            const res: any = await addQueueExe(input.toString());

            if (res.messageCode === 200) {
                message.success(intl('message.unstake.success'));
                setInputNum(undefined);
            }
        } finally {
            setUnSatking(false);
        }

        queryInfo();

    }

    const doUnStake = async () => {

        if(_.isEmpty(account)){
            setShowConnect(true);
            return;
        }

        if (!inputNum) {
            message.warning(intl('stake.need.fill'))
            return;
        }

        if (toTokenDecimals(inputNum || 0).gt(get_user_staked_tron())) {
            setShow(true);
            return;
        }

        setUnSatking(true);
        try {
            if (isEnough) {
                // can unStake
                await withDrawDep();
            } else {

                if (exit_queue_info.user_value.eq(0)) {
                    await addQueue();
                } else if (exit_queue_info.is_prepared) {
                    // need cliam
                    message.warning(intl('message.unstake.cliam'));
                } else {
                    // wait or cancel
                    message.warning(intl('message.unstake.wait'));
                }
            }
        } finally {
            setUnSatking(false);
        }

    }

    return (
        <div className='claim_panel usp_panel'>
            <div className='flexcss claim_box'>
                <div className='cp_header'>
                    <div className='title flexrsc'>
                        {intl('unstake.panel1', 'Unstake')}
                        <Tooltip title={intl('stake.tips2')}
                                 placement="bottomLeft"
                        >
                            <HelpIcon style={{marginLeft: '10px'}}/>
                        </Tooltip>
                    </div>
                    <p>{intl('unstake.panel2', 'Unstake your staked balance TORN')}</p>
                </div>

                <div className='usp_main flexcss'>

                    <p className='title' style={{marginTop: '10px'}}>{intl('unstake.panel4', 'Amount to lock')}</p>
                    <div className='st_iput_group flexrsc'>
                        <InputNumber className='st_input'
                                     value={inputNum}
                                     min={0}
                                     controls={false}
                                     placeholder="0.0000"
                                     onChange={amountChange}
                        />
                        <div className='st_max_btn title' onClick={fillMax}>{intl('stake.max', 'Max')}</div>
                    </div>
                    <p className='usp_tips'>{intl('unstake.panel5', 'Staked balance:')}<span>{formatUnits(get_user_staked_tron())} TORN</span>
                    </p>

                </div>

                <div className='cp_footer flexrbc'>

                    <Button className='cp_btn primary'
                            loading={unStaking}
                            onClick={doUnStake}
                    >{intl('unstake', 'UnStake')}</Button>
                </div>
            </div>


            <TorndoDialog title={intl('stake.modal4', 'Waiting For Confirmation')} visible={showWait}
                          onClose={setShowWait}>
                <div className='trc_dialog st_dialog'>
                    <div className='main flexcsc' style={{paddingBottom: '15px'}}>
                        <p className='title'>{intl('stake.modal5', 'Waiting For Confrmation')}</p>
                        <p className='sub'>{intl('stake.modal6', 'Confirm this transaction in your wallet')}</p>
                    </div>
                    <div className='footer flexrcc'>
                        <div className='btn primary'
                             onClick={() => setShowWait(false)}>{intl('stake.modal.close', 'Close')}</div>
                    </div>
                </div>
            </TorndoDialog>


            <TorndoDialog title={intl('stake.modal1', 'Insufficient balance')} visible={show} onClose={setShow}>
                <div className='trc_dialog st_dialog'>
                    <div className='main'>
                        <p className='sub'>{intl('stake.modal9', 'You do not have enough TORN tokens.Your current balance is ')}{formatUnits(get_user_staked_tron())}</p>
                    </div>
                    <div className='footer flexrcc'>
                        <div className='btn primary'
                             onClick={() => setShow(false)}>{intl('stake.modal.close', 'Close')}</div>
                    </div>
                </div>
            </TorndoDialog>
        </div>
    )
}
export default UnstakePanel;
