const Component = require('react').Component
import React from "react";
const h = require('react-hyperscript')
const inherits = require('util').inherits
const formatBalance = require('../util').formatBalance
const generateBalanceObject = require('../util').generateBalanceObject
const FiatValue = require('./fiat-value2.js')

module.exports = EthBalanceComponent

inherits(EthBalanceComponent, Component)
function EthBalanceComponent() {
  Component.call(this)
}

EthBalanceComponent.prototype.render = function () {
  var props = this.props
  let { value } = props
  const { style, width, network, isToken, tokenSymbol, networkList } = props
  var needsParse = this.props.needsParse !== undefined ? this.props.needsParse : true
  value = value ? formatBalance(value, 6, needsParse, network, isToken, tokenSymbol, networkList) : '...'

  return (

    h('.ether-balance.ether-balance-amount', {
      style: {
        marginTop: '129px',
      }

    }, [
      h('div', {
        style: {
          marginBottom: '15px',
          fontSize: '12px',
          color: '#848484',
          marginRight: '4px',
        }
      }, 'Available:'),
      h('div', {
        style: {
          display: 'inline',
          width,
        },
      }, this.renderBalance(value)),

    ])

  )
}
EthBalanceComponent.prototype.renderBalance = function (value) {
  var props = this.props
  const { conversionRate, shorten, incoming, currentCurrency } = props
  if (value === 'None') return value
  if (value === '...') return value
  var balanceObj = generateBalanceObject(value, shorten ? 1 : 4)
  var balance
  var splitBalance = value.split(' ')
  var ethNumber = splitBalance[0]
  var ethSuffix = splitBalance[1]
  const showFiat = 'showFiat' in props ? props.showFiat : true

  if (shorten) {
    balance = balanceObj.shortBalance
  } else {
    balance = balanceObj.shortBalance
  }

  var label = balanceObj.label
  const valueStyle = props.valueStyle ? props.valueStyle : {
    color: '#848484',
    width: '100%',
    fontSize: props.fontSize || '12px',
    textAlign: 'right',
  }
  const dimStyle = props.dimStyle ? props.dimStyle : {
    color: ' #848484',
    fontSize: props.fontSize || '12px',
    marginLeft: '5px',
  }

  return (
    <div>
      <div className={'flex-column'}>
        <div className={'flex-row'}
          style={{
            alignItems: 'flex-end',
            lineHeight: '20px',
            textRendering: 'geometricPrecision',
          }}>
          <div style={valueStyle} >{incoming ? `+${balance}` : balance}</div>
          <div style={dimStyle} >{label}</div>
        </div>


        {showFiat ? h(FiatValue, { valueStyle, dimStyle, value: props.value, conversionRate, currentCurrency, network: props.network }) : null}
      </div>
    </div>
  )
}
