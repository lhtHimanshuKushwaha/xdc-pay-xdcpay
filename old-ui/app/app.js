const inherits = require('util').inherits
const Component = require('react').Component
const connect = require('react-redux').connect
const {withRouter} = require('react-router-dom')
const {compose} = require('recompose')
const h = require('react-hyperscript')
const actions = require('../../ui/app/actions')
const log = require('loglevel')
// mascara
const MascaraFirstTime = require('../../mascara/src/app/first-time').default
const MascaraBuyEtherScreen = require('../../mascara/src/app/first-time/buy-ether-screen').default
// init
const InitializeMenuScreen = require('./first-time/init-menu')
const NewKeyChainScreen = require('./new-keychain')
// unlock
const UnlockScreen = require('./unlock')
// accounts
const AccountDetailScreen = require('./account-detail')
const AccountQrScreen = require('./account-qr')
const SendTransactionScreen = require('./components/send/send')
const SendTokenScreen = require('./components/send/send-token')
const SendContractScreen = require('./components/send/send-contract')
const ChooseContractExecutorScreen = require('./components/send/choose-contract-executor')
const ConfirmTxScreen = require('./conf-tx')
// notice
const NoticeScreen = require('./components/notice')
const generateLostAccountsNotice = require('../lib/lost-accounts-notice')
// other views
const ConfigScreen = require('./config')
const AddTokenScreen = require('./components/add-token')
const ConfirmAddTokenScreen = require('./components/confirm-add-token')
const RemoveTokenScreen = require('./remove-token')
const AddSuggestedTokenScreen = require('./add-suggested-token')
const Import = require('./accounts/import')
const ForgetDeviceScreen = require('./components/connect-hardware/forget-screen')
import { transactionDetails } from '../../ui/app/actions'
import ConnectHardwareForm from './components/connect-hardware/index'
import TransactionList from './components/transaction-list'
import createVaultComplete from './keychains/hd/create-vault-complete'
import revealSeed from './keychains/hd/reveal-seed'

const InfoScreen = require('./info')
const AppBar = require('./components/app-bar/app-bar.component')
const Loading = require('./components/loading')
const BuyView = require('./components/buy-button-subview')
const HDCreateVaultComplete = require('./keychains/hd/create-vault-complete')
const HDRestoreVaultScreen = require('./keychains/hd/restore-vault')
const RevealSeedConfirmation = require('./keychains/hd/recover-seed/confirmation')
const DeleteRpc = require('./components/delete-rpc')
const DeleteImportedAccount = require('./components/delete-imported-account')
const ConfirmChangePassword = require('./components/confirm-change-password')
const ethNetProps = require('xdc-net-props')
const {getMetaMaskAccounts} = require('../../ui/app/selectors')
const ConfirmRecoveryPhrase = require('./keychains/hd/confirm-recovery-phrase')
const GeneralSettings = require('../app/general-settings')
const AdvanceSettings = require('../app/advance-settings')
const SecurityAndPrivacy = require('../app/components/security-and-privacy/security-and-privacy')
const NetworkSettings = require('../app/network-settings')
const AddNetwork = require('../app/components/add-network/index')
const ViewNetwork = require('../app/view-network')
const AlertSettings = require('../app/alert-settings')
const Contacts = require('../app/contacts')
const AddContacts = require('./components/add-contacts')
const ContactDetails = require('./components/add-contacts/contactDetails')
const ConnectedSites = require('../app/connectedSites')
const TransactionDetails = require('./components/transaction-details/transaction-details')

module.exports = compose(
  withRouter,
  connect(mapStateToProps),
)(App)

inherits(App, Component)

function App () {
  Component.call(this)
}

function mapStateToProps (state) {

  const accounts = getMetaMaskAccounts(state)

  const {
    identities,
    address,
    keyrings,
    isInitialized,
    noActiveNotices,
    seedWords,
    featureFlags,
  } = state.metamask
  const selected = address || Object.keys(accounts)[0]

  return {
    // state from plugin
    isLoading: state.appState.isLoading,
    loadingMessage: state.appState.loadingMessage,
    noActiveNotices: state.metamask.noActiveNotices,
    isInitialized: state.metamask.isInitialized,
    isUnlocked: state.metamask.isUnlocked,
    currentView: state.appState.currentView,
    selectedAddress: state.metamask.selectedAddress,
    transForward: state.appState.transForward,
    isMascara: state.metamask.isMascara,
    isOnboarding: Boolean(!noActiveNotices || seedWords || !isInitialized),
    seedWords: state.metamask.seedWords,
    unapprovedTxs: state.metamask.unapprovedTxs,
    unapprovedMsgs: state.metamask.unapprovedMsgs,
    menuOpen: state.appState.menuOpen,
    network: state.metamask.network,
    provider: state.metamask.provider,
    forgottenPassword: state.appState.forgottenPassword,
    nextUnreadNotice: state.metamask.nextUnreadNotice,
    lostAccounts: state.metamask.lostAccounts,
    frequentRpcList: state.metamask.frequentRpcList || [],
    networkList: state.metamask.networkList || [],
    contactList: state.metamask.contactList || [],
    featureFlags,
    suggestedTokens: state.metamask.suggestedTokens,

    // state needed to get account dropdown temporarily rendering from app bar
    identities,
    selected,
    keyrings,
  }
}

App.prototype.render = function () {
  var props = this.props
  const {
    currentView,
    isLoading,
    loadingMessage,
    transForward,
    network,
    provider,
  } = props
  const isLoadingNetwork = network === 'loading' && currentView.name !== 'config' && currentView.name !== 'delete-rpc'
  const networkName = provider.type === 'rpc' ? `${this.getNetworkName()} (${provider.rpcTarget})` : this.getNetworkName()
  const loadMessage = loadingMessage || isLoadingNetwork ?
    `Connecting to selected network` : null
  log.debug('Main ui render function')

  const confirmMsgTx = (props.currentView.name === 'confTx' && Object.keys(props.unapprovedTxs).length === 0)

  return (
    h('.flex-column.full-height', {
      style: {
        // Windows was showing a vertical scroll bar:
        overflow: 'hidden',
        position: 'relative',
        alignItems: 'center',
        background: (props.isUnlocked || props.currentView.name === 'restoreVault' || props.currentView.name === 'config') ? 'white' : '#ffffff',
      },
    }, [
      h(AppBar, {
        ...this.props,
      }),
      this.renderLoadingIndicator({isLoading, isLoadingNetwork, loadMessage}),

      // panel content
      h('.app-primary' + (transForward ? '.from-right' : '.from-left'), {
        style: {
          background: (props.isUnlocked || props.currentView.name === 'restoreVault' || props.currentView.name === 'config') ? confirmMsgTx ? '#2050fd' : 'white' : 'transparent',
          height: (props.isUnlocked && confirmMsgTx) ? '100%' : 'auto',
        },
      }, [
        this.renderPrimary(),
      ]),
    ])
  )
}

App.prototype.renderLoadingIndicator = function ({isLoading, isLoadingNetwork, loadMessage}) {
  const {isMascara} = this.props

  return isMascara
    ? null
    : h(Loading, {
      isLoading: isLoading || isLoadingNetwork,
      loadingMessage: loadMessage,
    })
}

App.prototype.renderPrimary = function () {
  log.debug('rendering primary')
  var props = this.props
  const {isMascara, isOnboarding} = props

  if (isMascara && isOnboarding) {
    return h(MascaraFirstTime)
  }

  // notices
  if (!props.noActiveNotices) {
    log.debug('rendering notice screen for unread notices.')
    return h('div', {
      style: {width: '100%'},
    }, [

      h(NoticeScreen, {
        notice: props.nextUnreadNotice,
        key: 'NoticeScreen',
        onConfirm: () => props.dispatch(actions.markNoticeRead(props.nextUnreadNotice)),
      }),
    ])
  } else if (props.lostAccounts && props.lostAccounts.length > 0) {
    log.debug('rendering notice screen for lost accounts view.')
    return h(NoticeScreen, {
      notice: generateLostAccountsNotice(props.lostAccounts),
      key: 'LostAccountsNotice',
      onConfirm: () => props.dispatch(actions.markAccountsFound()),
    })
  }

  // show initialize screen
  if (!props.isInitialized || props.forgottenPassword) {
    // show current view
    log.debug('rendering an initialize screen')
    switch (props.currentView.name) {

      case 'restoreVault':
        log.debug('rendering restore vault screen')
        return h(HDRestoreVaultScreen, {key: 'HDRestoreVaultScreen'})

      default:
        log.debug('rendering menu screen')
        return h(InitializeMenuScreen, {key: 'menuScreenInit'})
    }
  }

  // show unlock screen
  if (!props.isUnlocked) {
    switch (props.currentView.name) {

      case 'restoreVault':
        log.debug('rendering restore vault screen')
        return h(HDRestoreVaultScreen, {key: 'HDRestoreVaultScreen'})

      case 'config':
        log.debug('rendering config screen from unlock screen.')
        return h(ConfigScreen, {key: 'config'})

      default:
        log.debug('rendering locked screen')
        return h(UnlockScreen, {key: 'locked'})
    }
  }

  // show seed words screen
  if (props.seedWords) {
    log.debug('rendering seed words')
    return props.currentView.name === 'confirmRecoveryPhrase' ? h(ConfirmRecoveryPhrase, {key: 'confirm-recovery-phrase'}) : h(HDCreateVaultComplete, {key: 'HDCreateVaultComplete'})
  }

  // show current view
  switch (props.currentView.name) {

    case 'accountDetail':
      log.debug('rendering account detail screen')
      return h(AccountDetailScreen, {key: 'account-detail'})
    case 'confirmRecoveryPhrase':
      log.debug('rendering Confirm recovery screen')
      return h(ConfirmRecoveryPhrase, {key: 'confirm-recovery-phrase'})

    case 'sendTransaction':
      log.debug('rendering send tx screen')
      return h(SendTransactionScreen, {key: 'send-transaction'})

    case 'sendToken':
      log.debug('rendering send token tx screen')
      return h(SendTokenScreen, {key: 'send-token'})

    case 'sendContract':
      log.debug('rendering send contract tx screen')
      return h(SendContractScreen, {key: 'send-contract'})

    case 'show-choose-contract-executor-page':
      log.debug('rendering choose contract executor screen')
      return h(ChooseContractExecutorScreen, {key: 'show-choose-contract-executor-page'})

    case 'newKeychain':
      log.debug('rendering new keychain screen')
      return h(NewKeyChainScreen, {key: 'new-keychain'})

    case 'confTx':
      log.debug('rendering confirm tx screen')
      return h(ConfirmTxScreen, {key: 'confirm-tx'})

    case 'add-token':
      log.debug('rendering add-token screen from unlock screen.')
      return h(AddTokenScreen, {key: 'add-token'})

    case 'general-settings':
      log.debug('rendering general-settings screen ')
      return h(GeneralSettings, {key: 'general-settings'})

    case 'config':
      log.debug('rendering config screen ')
      return h(ConfigScreen, {key: 'config'})

    case 'CreateVaultCompleteScreen':
      log.debug('rendering seed words screen')
      return h(createVaultComplete, {key: 'CreateVaultCompleteScreen'})

    case 'reveal-seed':
      log.debug('rendering the reveal seed words')
      return h(revealSeed, {key: 'reveal-seed'})

    case 'advance-settings':
      log.debug('rendering advance-settings screen ')
      return h(AdvanceSettings, {key: 'advance-settings'})

    case 'securityandprivacy-settings':
      log.debug('rendering security-privacy-screen')
      return h(SecurityAndPrivacy, {key: 'securityandprivacy-settings'})

    case 'contacts':
      log.debug('rendering contacts-screen')
      return h(Contacts, {key: 'contacts'})

    case 'contactDetails':
      log.debug('rendering contactDetails-screen')
      return h(ContactDetails, {key: 'contactDetails'})

    case 'add-contacts':
      log.debug('rendering add Contacts screen ')
      return h(AddContacts, {key: 'add-contacts'})

    case 'network-settings':
      log.debug('renderng network-settings screen ')
      return h(NetworkSettings, {key: 'network-settings'})

    case 'add-network':
      log.debug('rendering add-network screen ')
      return h(AddNetwork, {key: 'add-network'})

    case 'view-network':
      log.debug('rendering view-network screen ')
      return h(ViewNetwork, {key: 'view-network'})

    case 'alert-settings':
      log.debug('rendering alert-settings screen')
      return h(AlertSettings, {key: 'alert-settings'})

    case 'confirm-add-token':
      log.debug('rendering confirm-add-token screen from unlock screen.')
      return h(ConfirmAddTokenScreen, {key: 'confirm-add-token'})

    case 'remove-token':
      log.debug('rendering remove-token screen from unlock screen.')
      return h(RemoveTokenScreen, {key: 'remove-token', ...props.currentView.context})

    case 'add-suggested-token':
      log.debug('rendering add-suggested-token screen from unlock screen.')
      return h(AddSuggestedTokenScreen, {key: 'add-suggested-token'})

    case 'config':
      log.debug('rendering config screen')
      return h(ConfigScreen, {key: 'config'})

    case 'import-menu':
      log.debug('rendering import screen')
      return h(Import, {key: 'import-menu'})

    case 'forget-device':
      log.debug('rendering forget device screen')
      return h(ForgetDeviceScreen, {key: 'forget-device'})

    case 'hardware-wallets-menu':
      log.debug('rendering hardware wallet menu screen')
      return h(ConnectHardwareForm, {key: 'hardware-wallets-menu'})

    case 'reveal-seed-conf':
      log.debug('rendering reveal seed confirmation screen')
      return h(RevealSeedConfirmation, {key: 'reveal-seed-conf'})

    case 'info':
      log.debug('rendering info screen')
      return h(InfoScreen, {key: 'info'})

    case 'buyEth':
      log.debug('rendering buy ether screen')
      return h(BuyView, {key: 'buyEthView'})

    case 'onboardingBuyEth':
      log.debug('rendering onboarding buy ether screen')
      return h(MascaraBuyEtherScreen, {key: 'buyEthView'})

    case 'qr':
      log.debug('rendering show qr screen')
      return h('div', {
        style: {
          height: '100%',
          top: '0px',
          left: '0px',
          width: '100%',
        },
      }, [
        h('.section-title.flex-row.flex-center', {style: {marginTop: '38px'}}, [
          h('img', {
            src: '/images/Assets/BackArrow.svg',
            onClick: () => props.dispatch(actions.backToAccountDetail(props.selectedAddress)),
            style: {
              marginLeft: '15px',
              marginTop: '-17px',
              position: 'absolute',
              left: '0',
              cursor: 'pointer',
            },
          }),
          h('h2.page-subtitle', {
            style: {
              // fontFamily: 'Nunito SemiBold',
              marginTop: '-14px',
              marginBottom: '0px',
              textAlign: 'center',
              fontWeight: 'bold',
            },
          }, 'QR Code'),
        ]),
        h('div', [
          h(AccountQrScreen, {
            key: 'account-qr',
          }),
        ]),
      ])
    case 'delete-rpc':
      log.debug('rendering delete rpc confirmation screen')
      return h(DeleteRpc, {key: 'delete-rpc'})
    case 'delete-imported-account':
      log.debug('rendering delete imported account confirmation screen')
      return h(DeleteImportedAccount, {key: 'delete-imported-account'})
    case 'confirm-change-password':
      log.debug('rendering confirm password changing screen')
      return h(ConfirmChangePassword, {key: 'confirm-change-password'})

    case 'connected-sites':
      log.debug('rendering confirm password changing screen')
      return h(ConnectedSites, {key: 'connected-sites'})


    default:
      log.debug('rendering default, account detail screen')
      return h(AccountDetailScreen, {key: 'account-detail'})
  }
}

App.prototype.getNetworkName = function () {
  const {network} = this.props
  return ethNetProps.props.getNetworkDisplayName(network)
}
