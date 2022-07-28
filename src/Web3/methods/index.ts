import {useWeb3React} from "@web3-react/core";

const useAccount = () => {
    const { account } = useWeb3React();
    return { account  };
}

export default useAccount;
