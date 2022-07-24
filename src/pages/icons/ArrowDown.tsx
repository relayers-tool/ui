import React, {FC} from "react";
import {IconTypes} from "./types";
import arrowdown from '../../assets/icons/arrow-down.png'


const ArrowDown:FC<IconTypes> = (props) => {
    return (
        <img {...props} src={arrowdown} width='27' alt='arrow' />
    )
}

export default ArrowDown;
