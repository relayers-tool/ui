import React, {FC, useContext, useState} from 'react'
import {Button, InputNumber, message, Tooltip} from 'antd'
import HelpIcon from "../icons/HelpIcon";
import useIntl from "../../utils/useIntl";
import {addressBook, useDepositContract,  SendWidthSign} from "../../Web3";
import {useWeb3React} from "@web3-react/core";

import TorndoDialog from "../components/TorndoDialog/TorndoDialog";
import {formatUnits, toTokenDecimals} from "../../utils/common";
import {BigNumber,} from "ethers";
import {StoreContext} from "../../hooks";

/* eslint-disable */
const PersonalCard: FC = () => {
    const intl = useIntl();
    const {user_info, queryInfo} = useContext(StoreContext);

    const [show, setShow] = useState(false);
    const [showWait, setShowWait] = useState(false);
    const [staking, setStaking] = useState(false);

    const [inputNum, setInputNum] = useState<number | undefined>(undefined);

    const {account} = useWeb3React();
    const depositContract = useDepositContract();


    const fillMax = () => {
        setInputNum(Number(formatUnits(user_info.balance_of_torn)));
    }

    const amountChange = (num: number) => {
        setInputNum(num || undefined);
    }

    const doStake = async () => {

        if (!inputNum) {
            message.warning(intl('stake.need.fill'))
            return;
        }

        if (BigNumber.from(toTokenDecimals(inputNum || 0)).gt(user_info.balance_of_torn)) {
            setShow(true);
            return;
        }

        setShowWait(true);
        setStaking(true);

        const res: any = await SendWidthSign(
            depositContract,
            (account as string),
            addressBook.tornToken,
            addressBook.mDeposit,
            toTokenDecimals(inputNum).toString(),
            'deposit'
        )
        if (res.messageCode === 200) {
            message.success(intl('message.stake.success'));
            setInputNum(undefined);

        }
        setStaking(false);
        setShowWait(false);
        queryInfo();
    }

    return (
        <div className="claim_panel usp_panel">
            <div className='flexcss claim_box'>
                <div className='cp_header'>
                    <div className='title flexrsc'>
                        {intl('stake.personal6', 'Stake')}
                        <Tooltip title={intl('stake.tips1')}
                                 placement="bottomLeft"
                        >
                            <HelpIcon style={{marginLeft: '10px'}}/>
                        </Tooltip>
                    </div>
                    <p>{intl('stake.personal7', 'Stake TORN to earn TORN')} </p>
                </div>

                <div className='usp_main flexcss'>

                    <p className='title' style={{marginTop: '10px'}}>{intl('stake.personal9', 'Amount to lock')} </p>
                    <div className='st_iput_group flexrsc'>
                        <InputNumber className='st_input'
                                     value={inputNum}
                                     min={0}
                                     controls={false}
                                     placeholder="0.0000"
                                     onChange={amountChange}
                        />
                        <div className='st_max_btn title' onClick={fillMax}>{intl('stake.personal10', 'Max')}</div>
                    </div>
                    <p className='usp_tips'>{intl('stake.personal11', 'Available balance:')}
                        <span>{formatUnits(user_info.balance_of_torn)} TORN</span></p>

                </div>
                <div className='cp_footer flexrbc'>
                    <Button className='cp_btn primary'
                            loading={staking}
                            onClick={doStake}>{intl('stake.stake', 'Stake')}</Button>
                </div>
            </div>
            <TorndoDialog title={intl('stake.modal1', 'Insufficient balance')} visible={show} onClose={setShow}>
                <div className='trc_dialog st_dialog'>
                    <div className='main'>
                        <p className='sub'>{intl('stake.modal2', 'You do not have enough TORN tokens.Your current balance is ')}{formatUnits(user_info.balance_of_torn)} TORN</p>
                    </div>
                    <div className='footer flexrcc'>
                        <div className='btn primary'
                             onClick={() => setShow(false)}>{intl('stake.modal.close', 'Close')}</div>
                    </div>
                </div>
            </TorndoDialog>

            <TorndoDialog title={intl('stake.modal4', 'Waiting For Confirmation')} visible={false}
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
        </div>
    )
}

export default PersonalCard;
