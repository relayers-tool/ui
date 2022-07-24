import {Interface} from '@ethersproject/abi'
import ERC20_ABI from './erc20.json'
import ERC20_BYTES32_ABI from './erc20_bytes32.json'
import Deposit_ABI from './Deposit.json'
import RootDb_ABI from './RootDB.json'
import ExitQueue_ABI from './ExitQueue.json'
import RelayerRegistry_ABI from './IRelayerRegistry.json';
import ProfitRecord_ABI from './ProfitRecord.json';
import offchainOracle_ABI from './OffchainOracle.abi.json';

const ERC20_INTERFACE = new Interface(ERC20_ABI)

export default ERC20_INTERFACE
export { ERC20_ABI, ERC20_BYTES32_ABI, Deposit_ABI,RootDb_ABI, ExitQueue_ABI, RelayerRegistry_ABI,ProfitRecord_ABI,offchainOracle_ABI}
