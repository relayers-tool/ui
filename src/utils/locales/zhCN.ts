import global from './zhCN/global'
import {Language} from "./type"

const locale = {
  ...global,
  'tr.header1':'Stake',
  'tr.header2':'Relayers',
  'tr.header3':'FAQ',
  'tr.header4':'Audit',
  'tr.header5':'连接钱包',
  'tr.header6':'网络错误',
  'tr.header7':'您的钱包',
  'tr.header8':'指引',
  'tr.header9':'提示',

  'stake.relay1': 'Relayer Overview',
  'stake.relay2': 'Total Staked',
  'stake.relay3': 'Total Burned',
  'stake.relay4': 'Reward Fee',
  'stake.relay5': 'APY',
  'stake.relay6': 'Total Relayer',
  'stake.relay7': 'Rewards hasn\'t paid',

  'stake.personal1': 'Personal Overview',
  'stake.personal2': 'Your Balance',
  'stake.personal3': 'Your Staked',
  'stake.personal4': 'Your Rewards Earned',
  'stake.personal5': 'Withdrawn Rewards',
  'stake.need.fill': '请输入数量',
  'stake.need.approve': '请先授权',

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
  'stake.approved': '已授权',
  'stake.approved.msg': '您已经授权.',
  'stake.stake': '抵押',
  'stake.max': 'MAX',
  'stake.tips1': 'In order to participate in Relayer, you must lock TORNS.Your reward will be equivalent to how many TORNS you lock.',
  'stake.tips2': 'You can unlock your previously locked balance TORN here. If nobody buy your TORN, you may have to wait until it is in order to unlock your balance TORN.',

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

  'unstake.panel1': 'Unstske',
  'unstake.panel2': 'Unlock your locked balance TORN',
  'unstake.panel3': 'Total balance',
  'unstake.panel4': 'Amount to lock',
  'unstake.panel5': 'Staked balance: ',
  'unstake.panel6': 'Total amount of queue',
  'unstake.panel7': 'Your amount of queue',
  'unstake.cancel': 'Cancel',
  'unstake.claim': 'Claim',
  'unstake': '取消抵押',

  'relay.text1': 'Earned',
  'relay.text2': 'TORN staked',
  'relay.text3': 'TORN burned',
  'relay.text4': 'Last relayed on',
  'relay.text5': 'View Contract',

  'message.stake.success': '抵押成功',
  'message.unstake.success': '提取成功',
  'message.unstake.cliam': '请先提取',
  'message.unstake.wait': '请先等待队列完成',
  'message.claim.success': '提取成功',
  'message.claim.error': '提取失败',
  'message.cancel.success': '取消成功',
  'message.cancel.error': '取消失败',

  'login.out': 'Logout',

}

const ZHCN: Language = { code: 'zhCN', language: '简体中文', locale }
export default ZHCN
