import React, {FC, useContext} from "react";
import useIntl from "../../../utils/useIntl";
import {TabBarContext} from "../hooks";

const MbTabBar: FC = () => {
    const intl = useIntl();
    const { barActive, setBarActive } = useContext(TabBarContext);

    return (
        <div className='mh_tb_wrap flexrbc'>
            <div className={ barActive === 1 ? 'mh_tab active' : 'mh_tab'}
                 onClick={() => setBarActive(1)}
            >{intl('stake.tab1', 'Stake')}</div>
            <div className={ barActive === 3 ? 'mh_tab active' : 'mh_tab'}
                 onClick={() => setBarActive(3)}
            >{intl('stake.tab3', 'Unstake')}</div>
        </div>
    )
}
export default MbTabBar;
