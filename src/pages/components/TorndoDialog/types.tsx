import React, {createContext} from 'react'

export interface TornadoDialogInterface {
  title: string,
  visible: boolean
  width?: number,
  options?: any,
  style?:any,
  onClose: any,
  children: React.ReactNode
}

export const TornadoDialogContext = createContext({} as TornadoDialogInterface);
