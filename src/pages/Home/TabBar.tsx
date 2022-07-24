import React, {FC, useContext} from 'react'
import {TabBarContext} from './hooks'
import useIntl from "../../utils/useIntl";

/* eslint-disable */
const TabBar:FC = () => {
  const intl = useIntl();
  const {barActive, setBarActive} = useContext(TabBarContext);

  return (
    <div className='rc_bar flexrbc'>
      <div className={ barActive === 1 ? 'item active' : 'item'}
           onClick={() => setBarActive(1) }
      >{intl('stake.tab1', 'Stake')}</div>

      <div className={ barActive === 3 ? 'item active' : 'item'}
           onClick={() => setBarActive(3) }
      >{intl('stake.tab3', 'Unstake')}</div>
    </div>
  )
}

export default TabBar
