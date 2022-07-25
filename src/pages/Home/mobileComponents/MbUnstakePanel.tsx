import React, {FC, useContext, useEffect, useState} from 'react'
import {Button, InputNumber, message, Tooltip} from 'antd'
import {BigNumber} from "ethers";
import HelpIcon from "../../icons/HelpIcon";
import useIntl from "../../../utils/useIntl";
import {getDepositContract, getExitQueueContract, mDeposit,} from "../../../Web3";

import TorndoDialog from "../../components/TorndoDialog/TorndoDialog";
import {useWeb3React} from "@web3-react/core";
import {formatUnits, StringtoTokenDecimals, toTokenDecimals} from "../../../utils/common";
import _ from 'lodash';
import {multicallClient} from "@chainstarter/multicall-client.js";
import {StoreContext} from "../../../hooks";
import QuotesIcon from "../../icons/QuotesIcon";
import {PanelContext} from "../hooks";
import PersonIcon from "../../icons/PersonIcon";

const MbUnstakePanel: FC = () => {
  const intl = useIntl()
  const {account} = useWeb3React();
  const {setShowDrawer1, setShowDrawer2} = useContext(PanelContext);
  const {token_price, user_info, exit_queue_info, queryInfo} = useContext(StoreContext);

  const [show, setShow] = useState(false);
  const [showWait, setShowWait] = useState(false);
  const [unStaking, setUnSatking] = useState(false);
  const [inputNum, setInputNum] = useState<number | undefined>(undefined);
  const [isEnough, setIsEnough] = useState(false);


  const get_user_staked_tron = () => {
    return user_info.balance_root_token.mul(token_price).div(BigNumber.from(10).pow(18))
  }

  const amountChange = (num: number) => {
    setInputNum(num || undefined);
    queryIsEnough(num || 0);
  }

  const fillMax = () => {
    queryIsEnough(Number(formatUnits(get_user_staked_tron())) || 0);
    setInputNum(Number(formatUnits(get_user_staked_tron())) || 0);

  }


  const torn2rootToken = (mun: any) => {
    if (token_price.eq(0)) {
      return BigNumber.from(0);
    }
    return StringtoTokenDecimals(mun + "").mul(BigNumber.from(10).pow(18)).div(token_price);
  }

  useEffect(() => {
    queryIsEnough(inputNum || 0);
  }, [inputNum])

  const queryIsEnough = _.debounce(async (num = 0) => {

    const calls = [

      (mDeposit as any).isBalanceEnough(torn2rootToken(num || 0)),

    ];
    multicallClient(calls).then(res => {

      const eStatus = res[0][0] ? res[0][1] : false
      setIsEnough(eStatus);
    })
  }, 1000);

  const depositContract = getDepositContract();

  const withDraw1 = async (bigNumStr: string) => {

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
            console.log("rejected:", res);
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

  const withDrawDep = async () => {

    setUnSatking(true);
    try {
      let input = torn2rootToken(inputNum || 0)
      if (user_info.balance_root_token.lt(input)) {
        input = user_info.balance_root_token;
      }

      const res: any = await withDraw1(input.toString());

      if (res.messageCode === 200) {
        message.success(intl('message.unstake.success'));
        setInputNum(undefined);
      }
    } finally {
      setUnSatking(false)
    }

    queryInfo();
  }

  const exitQueueContract = getExitQueueContract();

  const addQueueExe = async (bigNumStr: string) => {
    return new Promise(async resolve => {


      exitQueueContract.methods["addQueue"](bigNumStr)
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
      await queryIsEnough(inputNum);

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
      <div className='mb_claim_panel'>
        <div className='flexcss mb_claim_box'>
          <div className='mb_cp_header flexrbc'>
            <div className='title flexrsc'>
              <span>{intl('unstake.panel2', 'Unstake your staked balance TORN')}</span>
              <Tooltip title={intl('stake.tips2')}
                       placement="bottomLeft"
              >
                <HelpIcon style={{marginLeft: '10px'}}/>
              </Tooltip>
            </div>
            <QuotesIcon className='icon' onClick={() => setShowDrawer2(true)}/>
          </div>

          <div className='mb_usp_main flexcss'>
            <div className='flexrbc mb_row'>
              <p className='title' style={{marginTop: '10px'}}>{intl('unstake.panel4', 'Amount to lock')}</p>
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
              <div className='mb_max_btn title' onClick={fillMax}>{intl('stake.max', 'Max')}</div>
            </div>
            <p className='mb_usp_tips'>{intl('unstake.panel5', 'Staked balance:')}<span>{formatUnits(get_user_staked_tron())} TORN</span>
            </p>

          </div>

          <div className='mb_footer flexrbc'>

            <Button className='mb_btn primary'
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
export default MbUnstakePanel;
