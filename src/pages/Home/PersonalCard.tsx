import React, {FC, useContext, useState} from 'react'
import PersonIcon from "../icons/PersonIcon";
import useIntl from "../../utils/useIntl";
import {formatUnits} from "../../utils/common";
import LoadingIcon from "../icons/LoadingIcon";
import {BigNumber} from "ethers";

import {useExitQueueContract,} from "../../Web3";
import {useWeb3React} from "@web3-react/core";

import {message, Tooltip} from "antd";
import HelpIcon from "../icons/HelpIcon";
import {StoreContext} from "../../hooks";

const PersonalCard: FC = () => {
    const intl = useIntl();
    const {user_info, queryInfo, token_price, exit_queue_info} = useContext(StoreContext);
    const {account} = useWeb3React();

    const exitContract = useExitQueueContract();
    const rootToken2Torn = (mun: BigNumber) => {
        if (token_price.eq(0)) {
            return BigNumber.from(0);
        }
        return mun.mul(token_price).div(BigNumber.from(10).pow(18));
    }

    const [showCancel, setShowCancel] = useState(false);

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
                console.error("error:", err);
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
                console.error("error:", err);
                message.error(intl('message.claim.error'))
                queryInfo();
            });
    }

    return (
        <div className="rc_wrap">
            <div className='rc_header flexrsc'>
                {intl('stake.personal1', 'Personal Overview')}
                <PersonIcon style={{marginLeft: '10px'}}/>
            </div>
            <div className='rc_row flexrsc'>
                <div className='rc_panel'>
          <span>{intl('stake.personal3', 'Your Staked')}
              <Tooltip title={intl('your_staked.tips')}
                       placement="bottomLeft"
              >
                            <HelpIcon style={{marginLeft: '10px'}}/>
              </Tooltip>
          </span>
                    <p>{formatUnits(user_info.balance_root_token.mul(token_price).div(BigNumber.from(10).pow(18)))} TORN</p>
                </div>
                <div className='rc_panel'>
                    <span>{intl('stake.personal2', 'Your Earned')}</span>
                    <p>{formatUnits(user_info.balance_of_earned)} TORN</p>
                </div>
                <div className='rc_panel'>
                    <span>{intl('stake.personal4', 'Your Queue Amount')}</span>
                    {
                        exit_queue_info.user_value.gt(0)
                            ?
                            <p className='flexrsc'>
                                <span
                                    className='num'>{formatUnits(exit_queue_info.is_prepared ? exit_queue_info.user_value : rootToken2Torn(exit_queue_info.user_value))}</span>TORN
                                {
                                    exit_queue_info.is_prepared
                                        ? <span className='text_btn'
                                                onClick={claimQueue}>{intl('unstake.claim', 'claim')}</span>
                                        : (showCancel
                                        ? <LoadingIcon style={{width: '16px', flexShrink: '0', marginLeft: '5px'}}/>
                                        : <span className='text_btn'
                                                onClick={cancelQueue}>{intl('unstake.cancel', 'cancel')}</span>)
                                }

                            </p>
                            : <p>0 TORN</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default PersonalCard;
