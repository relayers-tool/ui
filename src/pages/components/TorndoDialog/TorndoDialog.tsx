import React, {FC} from 'react'
import {Modal} from 'antd'
import {TornadoDialogInterface} from './types'
import './index.css'


const TorndoDialog: FC<TornadoDialogInterface> = ({
                                                      title,
                                                      visible,
                                                      onClose,
                                                      options,
                                                      style,
                                                      width,
                                                      children
                                                  }) => {

    return (
        <Modal title={title}
               className='torndo_dialog'
               visible={visible}
               onCancel={() => onClose(false)}
               footer={null}
               width={width || 520}
               style={style}
        >
            {children}
        </Modal>
    )
}
export default TorndoDialog
