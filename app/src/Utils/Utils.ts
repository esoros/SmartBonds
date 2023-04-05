import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";

export function formatEth(bn: BigNumber) {
    return formatEther(bn).substring(0, 6)
}