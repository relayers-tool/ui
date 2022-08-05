import React, {FC, useContext} from 'react'
import QuotesIcon from "../icons/QuotesIcon";
import useIntl from "../../utils/useIntl";
import {formatUnits} from "../../utils/common";
import {BigNumber} from "ethers";
import {Tooltip} from "antd";
import HelpIcon from "../icons/HelpIcon";
import {StoreContext} from "../../hooks";

const MainView:FC = () => {
  const intl = useIntl()
  const { token_price,relayerTotal, totalStakedTorn ,gov_staking_info,exit_queue_info,Un_paid_usdt,profit_ratio,apy,EthInfo} = useContext(StoreContext);

  const rootToken2Torn = (mun:BigNumber) => {
    if(token_price.eq(0)){
      return BigNumber.from(0);
    }
    return mun.mul(token_price).div(BigNumber.from(10).pow(18));
  }

  return (
    <div className="rc_wrap">
      <div className='rc_header flexrsc'>
        { intl('stake.relay1', 'Relayer Overview') }
        <QuotesIcon style={{marginLeft: '10px'}} />
      </div>
      <div className='rc_row flexrsc'>
        <div className='rc_panel'>
          <span>{intl('stake.relay2', 'Total Staked')}
            <Tooltip title={intl('totalStaked.tips')}
                     placement="bottomLeft"
            >
                <HelpIcon style={{marginLeft: '10px'}} />
            </Tooltip>
          </span>
          <p>{ formatUnits(totalStakedTorn) } TORN</p>
        </div>
        <div className='rc_panel'>
          <span>{intl('stake.relay3', 'Total Burned')}</span>
          <p> {formatUnits(EthInfo[0].total_burned_torn)} TORN</p>
        </div>
        <div className='rc_panel'>
          <span>{intl('stake.relay4', 'Reward Fee')}
            <Tooltip title={intl('rewardFee.tips')}
                     placement="bottomLeft"
            >
                <HelpIcon style={{marginLeft: '10px'}} />
            </Tooltip>
          </span>
          <p> { (profit_ratio.toNumber()/1000).toFixed(3) } %</p>
        </div>
      </div>
      <div className='rc_row flexrsc'>
        <div className='rc_panel'>
          <span>{intl('stake.relay5', 'APY')}</span>
          <p>{  (Number(100)*Number(apy)).toFixed(2) }%</p>
        </div>
        <div className='rc_panel'>
          <span>{intl('stake.relay6', 'Total Relayer')} </span>
          <p>{formatUnits(relayerTotal)} TORN</p>
        </div>
        <div className='rc_panel'>
          <span>{intl('stake.relay7', 'Rewards hasn\'t paid')}
            <Tooltip title={intl('has_not_play.tips')}
                     placement="bottomLeft"
            >
              <HelpIcon style={{marginLeft: '10px'}} />
            </Tooltip>
          </span>
          <p>{/*dateStr*/"$ "+formatUnits(Un_paid_usdt,6) }</p>
        </div>
      </div>
      <div className='rc_row flexrsc'>
        <div className='rc_panel'>
          <span>{intl('stake.relay8', 'Total queue amount')}</span>
          <p>{ formatUnits(exit_queue_info.exit_queue_torn.add(rootToken2Torn(exit_queue_info.exit_queue_root_token))) } TORN</p>
        </div>
        <div className='rc_panel'>
          <span>{intl('stake.relay9', 'Gov Staking')} </span>
          <p>{ formatUnits(gov_staking_info.staking_torn) } TORN</p>
        </div>
        <div className='rc_panel'>
          <span>{intl('stake.relay10', 'Gov Reward')} </span>
          <p>{ formatUnits(gov_staking_info.reward_torn) } TORN</p>
        </div>
      </div>
    </div>
  )
}

export default MainView;
