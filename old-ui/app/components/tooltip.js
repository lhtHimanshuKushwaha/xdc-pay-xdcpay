// const Component = require('react').Component
// const h = require('react-hyperscript')
// const inherits = require('util').inherits
// const ReactTooltip = require('react-tooltip')

// module.exports = Tooltip

// inherits(Tooltip, Component)
// function Tooltip () {
//   Component.call(this)
// }

// Tooltip.prototype.render = function () {
//   const props = this.props
//   const { position, title, children } = props

//   return h(ReactTooltip, {
//     place: position || 'bottom',
//     title,
//     fixed: true,
//   }, children)
// }


import React,{useState} from "react";
// import "./styles.css";
import ReactTooltip from "react-tooltip";

export default function Tooltip({message, value, children}) {
  // console.log(message,value,children,"message,value")

  const [copySuccess, setCopySuccess] = useState('copy');

// your function to copy here

  const copyToClipBoard = async copyMe => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };


  return (
    <div className="App" data-tip data-for="registerTip">
      {/* <button data-tip data-for="registerTip">
      {value} */}
        {/* <img onClick={() => copyToClipBoard('some text to copy')} style={{width:"20px"}} src="https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688" data-tip data-for="registerTip"/> */}
      {/* </button> */}

      {/* <button onClick={() => copyToClipBoard('some text to copy')} data-tip data-for="registerTip">
      {copySuccess}

     </button> */}
     
{children}
      <ReactTooltip id="registerTip" place="top" effect="solid">
        {message}
      </ReactTooltip>
    </div>
  );
}
