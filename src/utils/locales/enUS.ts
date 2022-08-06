import global from './enUS/global'
import {Language} from "./type"

const locale = {
  ...global,

  'tr.header1':'Stake',
  'tr.header2':'Relayers',
  'tr.header3':'Doc',
  'tr.header4':'Audit',
  'tr.header5':'Connect Wallet',
  'tr.header6':'Wrong Network',
  'tr.header7':'Your Wallet',
  'tr.header8':'GUIDE',
  'tr.header9':'One Tip',
  'tr.header10':'Stats',


  'stake.relay1': 'Relayer Overview',
  'stake.relay2': 'Total Staked',
  'stake.relay3': 'APR(7 days)',
  'stake.relay4': 'Reward Fee',
  'stake.relay5': 'APY(7 days)',
  'stake.relay6': 'Total In Relayers',
  'stake.relay7': 'Rewards hasn\'t paid',
  'stake.relay8': 'Total Queue Amount',
  'stake.relay9': 'Gov Staking',
  'stake.relay10': 'Gov Reward',

  'stake.personal1': 'Personal Overview',
  'stake.personal2': 'Your Earned',
  'stake.personal3': 'Your Staked',
  'stake.personal4': 'Your Queue Amount',
  'stake.personal5': 'Withdrawn Rewards',
  'stake.need.fill': 'Amount is Requested',
  'stake.need.approve': 'Authority is Requested',

  'stake.tab1': 'Stake',
  'stake.tab2': 'Claim',
  'stake.tab3': 'Unstake',

  'stake.personal6': 'Stake',
  'stake.personal7': 'Stake TORN to earn TORN',
  'stake.personal8': 'APR',
  'stake.personal9': 'Amount to lock',
  'stake.personal10': 'MAX',
  'stake.personal11': 'Available balance: ',
  'stake.approve': 'Approve',
  'stake.approved': 'Approved',
  'stake.approved.msg': 'You are approved.',
  'stake.stake': 'Stake',
  'stake.max': 'MAX',
  'stake.tips1': 'Please note: in order to participate in Relayer, you must lock TORNS.Your reward will be equivalent to how many TORNS you lock.',
  'stake.tips2': 'Please note: you can unstake your previously locked balance TORN here.You may have to wait until TORN is enough on the ExitQueue contract.',
  'rewardFee.tips': 'Please note: this fee applies to staking rewards/earnings only,and is NOT taken from your staked amount.This fee percentage can be changed by the community.',
  'apr.tips': 'Average annual percentage rate from staking over 7 days except the today.',
  'apy.tips': 'Annual Percentage Yield (APY) Refers to the compounded interest from staking over 7 days except the day.' +'APY=(1+APR)^52-1',
  'totalStaked.tips': 'Please note: the amount TORN is the staked minus burned in the Relayers Tool contract.',
  'relayerFee.tips': 'Please note: Tornado Cash withdraw fee.This fee in % that is used for tornado pool withdrawals.',
  'worker.tips': 'Please note: The balance amount of ETH gas fee which will be paid by worker when user withdrawn token from Tornado via the relayer.',
  'has_not_play.tips': 'Please note: the amount of relayers reward include ETH,DAI,USDC etc. Which hasn\'t been transfered to TORN and distributed.',
  'your_staked.tips': 'Please note: the amount TORN is your staked minus your burned in the Relayers Tool contract.',
  'stake.modal1': 'Insufficient balance',
  'stake.modal2': 'You do not have enough TORN tokens.Your current balance is ',
  'stake.modal3': 'Stake failed',
  'stake.modal4': 'Waiting For Confirmation',
  'stake.modal5': 'Waiting For Confrmation',
  'stake.modal6': 'Confirm this transaction in your wallet',
  'stake.modal7': 'Transaction Submitted',
  'stake.modal8': 'View on etherscan',
  'stake.modal9': 'You do not have enough tokens.Your current balance is ',
  'stake.modal.close': 'Close',
  'stake.modal.confirm': 'Confirm',

  'claim.panel1': 'Claim',
  'claim.panel2': 'Claim your sta king reward',
  'claim.panel3': 'Available staking reward',
  'claim.claim': 'Claim',

  'unstake.panel1': 'Unstake',
  'unstake.panel2': 'Unstake your staked balance TORN',
  'unstake.panel3': 'Total balance',
  'unstake.panel4': 'Amount to lock',
  'unstake.panel5': 'Staked balance: ',
  'unstake.panel6': 'Total amount of queue',
  'unstake.panel7': 'Your amount of queue',
  'unstake.cancel': 'Cancel',
  'unstake.claim': 'Claim',

  'relay.text1': 'Total Burned',
  'relay.text2': 'TORN Staking',
  'relay.text3': 'Total Staked',
  'relay.text4': '-------',
  'relay.text5': 'View Contract',

  'message.stake.success': 'Stake Success',
  'message.unstake.success': 'Withdraw Success',
  'message.unstake.cliam': 'Withdraw is Requested',
  'message.unstake.wait': 'Waiting Queue',
  'message.claim.success': 'Claim Success',
  'message.claim.error': 'Claim Fail',
  'message.cancel.success': 'Cancel Success',
  'message.cancel.error': 'Cancel Fail',
  'message.testnet.guide': 'BEWARE OF THE RISK WITH NO AUDIT.',

}

const EnUs: Language = { code: 'enUS', language: 'English', locale }
export default EnUs
