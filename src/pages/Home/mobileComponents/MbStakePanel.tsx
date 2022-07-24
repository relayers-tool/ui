import React, {FC, useContext, useState} from 'react'
import {Button, InputNumber, message, Tooltip} from 'antd'
import {useWeb3React} from "@web3-react/core";
import {BigNumber,} from "ethers";
import useIntl from "../../../utils/useIntl";
import {StoreContext} from "../../../hooks";
import {addressBook, getDepositContract,  SendWidthSign} from "../../../Web3";
import {formatUnits, toTokenDecimals} from "../../../utils/common";
import HelpIcon from "../../icons/HelpIcon";
import TorndoDialog from "../../components/TorndoDialog/TorndoDialog";
import QuotesIcon from "../../icons/QuotesIcon";
import {PanelContext} from "../hooks";
import PersonIcon from "../../icons/PersonIcon";

/* eslint-disable */
const MbStakePanel: FC = () => {
    const intl = useIntl();
    const {user_info, queryInfo} = useContext(StoreContext);
    const {setShowDrawer1, setShowDrawer2} = useContext(PanelContext);

    const [show, setShow] = useState(false);
    const [showWait, setShowWait] = useState(false);
    const [staking, setStaking] = useState(false);

    const [inputNum, setInputNum] = useState<number | undefined>(undefined);

    const {account} = useWeb3React();

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
        const GET_DEP_CONTRACT = getDepositContract();

        const res: any = await SendWidthSign(
            GET_DEP_CONTRACT,
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
        <div className="mb_claim_panel">
            <div className='flexcss mb_claim_box'>
                <div className='mb_cp_header flexrbc'>
                    <div className='title flexrsc'>
                        <span>
                            {intl('stake.personal7', 'Stake TORN to earn TORN')}
                        </span>
                        <Tooltip title={intl('stake.tips1')}
                                 trigger='click'
                                 placement="bottom"
                        >
                            <HelpIcon style={{marginLeft: '10px'}}/>
                        </Tooltip>
                    </div>
                    <QuotesIcon className='icon' onClick={() => setShowDrawer2(true)}/>
                </div>

                <div className='mb_usp_main flexcss'>
                    <div className='flexrbc mb_row'>
                        <p className='title'>{intl('stake.personal9', 'Amount to lock')} </p>
                        <PersonIcon className='icon' onClick={() => setShowDrawer1(true)}/>
                    </div>
                    <div className='mb_iput_group flexrsc'>
                        <InputNumber className='mb_st_input'
                                     value={inputNum}
                                     min={0}
                                     controls={false}
                                     placeholder="0.0000"
                                     onChange={amountChange}
                        />
                        <div className='mb_max_btn title' onClick={fillMax}>{intl('stake.personal10', 'Max')}</div>
                    </div>
                    <p className='mb_usp_tips'>{intl('stake.personal11', 'Available balance:')}
                        <span>{formatUnits(user_info.balance_of_torn)} TORN</span></p>

                </div>
                <div className='mb_footer flexrbc'>
                    <Button className='mb_btn primary'
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

export default MbStakePanel;
