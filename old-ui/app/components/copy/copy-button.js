import React from 'react'
import classNames from 'classnames'
import CopyComponent from './copy-component'

class CopyButton extends CopyComponent {

  // As parameters, accepts:
  // "value", which is the value to copy (mandatory)
  // "title", which is the text to show on hover (optional, defaults to 'Copy')
  render () {
    const { value, display, title, style, isWhite, tooltipPosition } = this.props
    const { copied } = this.state

    const message = copied ? 'Copied' : title || 'copy'
    const defaultCopyStyles = ['clipboard', 'cursor-pointer']
    const originalStyle = {
      display: display || 'flex',
      alignItems: 'center',
    }
    const fullStyle = Object.assign(originalStyle, style)
    console.log("this.props565656",copied);



    const tooltipChild = (
      <i
      style={{
        marginLeft: '5px',
      }}
      className={classNames(defaultCopyStyles, {white: isWhite})}
        onClick={(event) => this.onClick(event, value)}
      />
     
    )
    // console.log("this.propsAamir",this.renderTooltip(value, message, tooltipPosition, tooltipChild));
console.log("message",message)
    return (
      <div className="copy-button"
        style={fullStyle}
      >
        {this.renderTooltip(message, tooltipPosition, tooltipChild)}
      </div>
    )
  }
}

module.exports = CopyButton
