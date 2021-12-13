import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Dropdown, DropdownMenuItem} from '../dropdown'
import actions from '../../../../ui/app/actions'
import {LOCALHOST} from '../../../../app/scripts/controllers/network/enums'
import {networks} from '../../../../app/scripts/controllers/network/util'
import ethNetProps from 'xdc-net-props'
import {connect} from 'react-redux'

const LOCALHOST_RPC_URL = 'http://localhost:8545'

class NetworksMenu extends Component {
  static propTypes = {
    showConfigPage: PropTypes.func.isRequired,
    setRpcTarget: PropTypes.func.isRequired,
    updateNetworksMenuOpenState: PropTypes.func.isRequired,
    provider: PropTypes.any.isRequired,
    frequentRpcList: PropTypes.array.isRequired,
    isNetworkMenuOpen: PropTypes.bool,
  }

  render () {
    const props = this.props
    const {provider: {type: providerType}} = props
    const rpcList = props.frequentRpcList
    const isOpen = props.isNetworkMenuOpen
    const knownNetworks = Object.keys(networks)
      .filter((networkID) => {
        return !isNaN(networkID)
      })

    const sortedNetworks = knownNetworks
      .sort(this._sortNetworks)
    const networksView = this._renderNetworksView(sortedNetworks)

    return (
      <Dropdown
        useCssTransition={true}
        isOpen={isOpen}
        onClickOutside={(event) => {
          const {classList} = event.target
          const isNotToggleElement = [
            classList.contains('menu-icon'),
            classList.contains('network-name'),
            classList.contains('network-indicator'),
          ].filter(bool => bool).length === 0
          if (isNotToggleElement) {
            this.props.updateNetworksMenuOpenState(false)
          }
        }}
        zIndex={11}
        style={{
          position: 'absolute',
          bottom: '18px',
          width: '317px',
          maxHeight: isOpen ? '524px' : '0px',
        }}
        innerStyle={{padding: 0}}
      >
        <div className="select-network-list">
          Select Network
          <img className="select-network-close-icon" src="/images/Assets/Close.svg"
               onClick={() => this.props.updateNetworksMenuOpenState(!isOpen)}/>
        </div>
        {networksView}
        {this.renderSelectedCustomOption(props.provider)}
        {this.renderCommonRpc(rpcList, props.provider)}
        <DropdownMenuItem
          closeMenu={() => this.props.updateNetworksMenuOpenState(!isOpen)}
          onClick={() => this.props.showAddNetworkPage()}
          className={'app-bar-networks-dropdown-custom-rpc'}
        >Custom RPC</DropdownMenuItem>
      </Dropdown>
    )
  }

  _renderNetworksView (_networks) {
    const props = this.props
    const {provider: {type: providerType}, networkList} = props
    const state = this.state || {}
    const isOpen = state.isNetworkMenuOpen

    const onNetworkClicked = (networkObj) => {
      props.setProviderType(networkObj.providerType)
      if (networkObj.providerType === LOCALHOST || networkObj.providerType === 'rpc') {
        props.setRpcTarget(networkObj.providerType === LOCALHOST ? 'https://localhost:8545' : networkObj.rpcUrl)
      }
    }
    return networkList
      .map((networkObj) => {
        return (
          <DropdownMenuItem
            key={networkObj.providerName}
            closeMenu={() => this.props.updateNetworksMenuOpenState(!isOpen)}
            onClick={() => onNetworkClicked(networkObj)}
            style={{
              paddingLeft: '20px',
              color: providerType === networkObj.providerType ? '#2149B9' : '',
            }}
          >
            {providerType === networkObj.providerType ? <div className="selected-network"/> : null}
            {networkObj.name}
          </DropdownMenuItem>
        )
      })
  }

  _sortNetworks (networkID1, networkID2) {
    const networkObj1 = networks[networkID1]
    const networkObj2 = networks[networkID2]
    return networkObj1.order - networkObj2.order
  }

  renderCustomOption ({rpcTarget, type}) {
    if (type !== 'rpc') {
      return null
    }

    // Concatenate long URLs
    let label = rpcTarget
    if (rpcTarget.length > 31) {
      label = label.substr(0, 34) + '...'
    }

    switch (rpcTarget) {
      case LOCALHOST_RPC_URL:
        return null
      default:
        return (
          <DropdownMenuItem
            key={rpcTarget}
            onClick={() => this.props.setRpcTarget(rpcTarget)}
            closeMenu={() => this.props.updateNetworksMenuOpenState(false)}
          >
            <i className="fa fa-question-circle fa-lg menu-icon"/>
            {label}
            <div className="check">✓</div>
          </DropdownMenuItem>
        )
    }
  }

  renderCommonRpc (rpcList, provider) {
    const props = this.props
    const {rpcTarget, type} = provider

    return rpcList.map((rpc) => {
      if (type === 'rpc' && rpc === rpcTarget) {
        return null
      } else {
        return (
          <DropdownMenuItem
            key={`common${rpc}`}
            closeMenu={() => this.props.updateNetworksMenuOpenState(false)}
            onClick={() => props.setRpcTarget(rpc)}
            style={{
              paddingLeft: '20px',
            }}
          >
            <span className="custom-rpc">{rpc}</span>
            <div
              className="remove"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                this.props.updateNetworksMenuOpenState(false)
                props.showDeleteRPC(rpc)
              }}
            />
          </DropdownMenuItem>
        )
      }
    })
  }

  renderSelectedCustomOption (provider) {
    const {rpcTarget, type} = provider
    const props = this.props
    if (type !== 'rpc') return null

    // Concatenate long URLs
    let label = rpcTarget
    if (rpcTarget.length > 31) {
      label = label.substr(0, 34) + '...'
    }

    switch (rpcTarget) {
      default:
        return (
          <DropdownMenuItem
            key={rpcTarget}
            onClick={() => props.setRpcTarget(rpcTarget)}
            closeMenu={() => this.props.updateNetworksMenuOpenState(false)}
            style={{
              paddingLeft: '20px',
              color: '#2149B9',
            }}
          >
            <div className="selected-network"/>
            <span className="custom-rpc">{label}</span>
            <div
              className="remove"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                this.props.updateNetworksMenuOpenState(false)
                props.showDeleteRPC(label)
              }}
            />
          </DropdownMenuItem>
        )
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showAddNetworkPage: () => dispatch(actions.showAddNetworkPage()),
    setRpcTarget: (rpcTarget) => dispatch(actions.setRpcTarget(rpcTarget)),
    setProviderType: (providerType) => dispatch(actions.setProviderType(providerType)),
    showDeleteRPC: (label) => dispatch(actions.showDeleteRPC(label)),
  }
}

const mapStateToProps = ({metamask}) => {
  const {networkList} = metamask
  return {
    networkList,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworksMenu)
