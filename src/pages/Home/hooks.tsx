import {createContext} from 'react'

export interface TabBarInterface {
  barActive: number;
  setBarActive: any;
}

export interface PublicInfoInterface {


  dateStr: string;

  // Un_paid_usdt:BigNumber;
  // setUn_paid_usdt:any;
}

export interface PanelInterface {
  setShowDrawer1: any,
  setShowDrawer2: any,
}

export const TabBarContext = createContext({} as TabBarInterface);

export const PublicInfoContext = createContext({} as PublicInfoInterface);

export const PanelContext = createContext({} as PanelInterface);
