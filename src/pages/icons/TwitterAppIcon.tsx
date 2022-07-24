import React, {FC} from "react";
import {IconTypes} from "./types";

const TwitterAppIcon:FC<IconTypes> = (props) => {
    return (
        <svg width="29px" height="25px" { ...props }>
            <path fill="rgb(255, 255, 255)"
                  d="M25.646,3.965 C26.804,3.242 27.818,1.940 28.252,0.494 C27.94,1.217 25.791,1.795 24.488,1.940 C23.475,0.783 21.882,0.60 20.145,0.60 C16.816,0.60 14.210,2.808 14.210,6.280 C14.210,6.714 14.210,7.292 14.355,7.726 C9.433,7.437 5.90,4.978 2.50,1.217 C1.615,2.85 1.326,3.242 1.326,4.399 C1.326,6.569 2.194,8.449 3.787,9.606 C2.774,9.606 1.36,9.317 1.36,8.883 L1.36,9.28 C1.36,12.65 3.208,14.524 5.958,15.103 C5.524,15.248 4.945,15.392 4.511,15.392 C4.76,15.392 3.787,15.392 3.353,15.248 C4.76,17.707 6.248,19.587 8.854,19.587 C6.827,21.323 4.221,22.335 1.471,22.335 C1.36,22.335 0.457,22.335 0.23,22.191 C2.629,23.926 5.814,24.939 9.143,24.939 C20.0,24.939 26.80,15.392 26.80,7.147 L26.80,6.280 C27.239,5.412 28.252,4.255 28.976,3.97 C28.107,3.531 26.949,3.821 25.646,3.965 Z"/>
        </svg>
    )
}

export default TwitterAppIcon;
