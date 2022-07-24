import React, {FC} from "react";
import {IconTypes} from "./types";

const loadingIcon:FC<IconTypes> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" {...props}>
            <g>
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 80 80" to="360 80 80" additive="sum" begin="0s" dur="2s" repeatCount="indefinite" />

                <path d="M80,108.7v30.8A69.8,69.8,0,0,1,80,0,45.1,45.1,0,0,0,51.3,79.9h0a28.6,28.6,0,0,0,28.4,28.8ZM51.3,80H20.5A69.8,69.8,0,0,1,160,80,45.1,45.1,0,0,0,80.1,51.3H80A28.59,28.59,0,0,0,51.3,79.8ZM80,51.3V20.5A69.8,69.8,0,0,1,80,160a45.1,45.1,0,0,0,28.7-79.9h0A28.6,28.6,0,0,0,80.3,51.3ZM108.7,80h30.8A69.8,69.8,0,0,1,0,80a45.1,45.1,0,0,0,79.9,28.7H80a28.59,28.59,0,0,0,28.7-28.5Z"
                      fill="#44f1a6"/>
            </g>
        </svg>
    )
}

export default loadingIcon;
