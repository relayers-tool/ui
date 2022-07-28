import {createContext} from "react";
import {BigNumber} from "ethers";

export interface StoreInterface {
    isMobile: Boolean,

    showConnect :boolean,
    setShowConnect:any,

    publicInfo: any,
    eventStatus: any,
    setEventStatus: any,
    setPublicInfo: any,
    RelayerInfo: any[]
    setRelayerInfo: any,
    EthInfo: any[],
    setEthInfo: any,
    FeeInfo: any[],
    setFeeInfo: any,
    relayersAddressList: string[]
    exit_queue_info:{
        exit_queue_torn: BigNumber,
        exit_queue_root_token:  BigNumber,
        user_value:  BigNumber,
        is_prepared: boolean,
    },
    user_info:{
        balance_of_torn: BigNumber,
        balance_root_token:   BigNumber,
        balance_of_earned: BigNumber,
    }
    gov_staking_info:{
        staking_torn: BigNumber,
        reward_torn:  BigNumber,
    }
    token_price:BigNumber,
    relayerTotal: BigNumber;
    totalStakedTorn: BigNumber;
    queryInfo: any,

    Un_paid_usdt:BigNumber,
    setUn_paid_usdt:any,

    profit_ratio:BigNumber,
    setprofit_ratio:any,
}

export const StoreContext = createContext({} as StoreInterface);
