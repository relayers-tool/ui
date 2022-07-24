import React, {FC, useContext} from "react";
import './index.css'
import {StoreContext} from "../../hooks";
import RelayerPanel from "./components/RelayerPanel";
import {isMobile} from '../../utils/screen';
import MbRelayerPanel from "./components/MbRelayerPanel";


export const Relayers:FC = () => {
    const { RelayerInfo ,EthInfo,FeeInfo} = useContext(StoreContext);
     return (
        <div className={isMobile? 'mb_rr_list' : 'rr_list'}>
            {
                RelayerInfo.map((item, index) =>
                    isMobile
                        ? <MbRelayerPanel key={index} info={item} ethInfo={EthInfo[index]} feeInfo={FeeInfo[index]} />
                        : <RelayerPanel key={index} info={item} ethInfo={EthInfo[index]} feeInfo={FeeInfo[index]}/>
                )
            }
        </div>
    )
}
export default Relayers;
