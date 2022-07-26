import {BigNumber, utils} from "ethers";

export const BIG_ZERO = BigNumber.from(0)
export const BIG_TEN = BigNumber.from(0)


export const formatUnits = (num: BigNumber|string,pre: number = 18) => {

    try {
        return utils.formatUnits(num, pre).replace(/^(.*\..{3}).*$/, "$1");
    } catch (e) {
        return "0.00"
    }
}


export function StringtoTokenDecimals(num: string|number, pre: number = 18):BigNumber {
    return   utils.parseUnits(String(num),pre);
}

export function toTokenDecimals(num: number, pre: number = 18):BigNumber {
        return   utils.parseUnits(num.toFixed(4),pre);
}

