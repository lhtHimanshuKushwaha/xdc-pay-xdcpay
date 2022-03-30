// /*Latest Settings UI **/

// const inherits = require("util").inherits;
// const Component = require("react").Component;
// const h = require("react-hyperscript");
// const connect = require("react-redux").connect;
// const actions = require("../../ui/app/actions");
// const LoadingIndicator = require("./components/loading");
// const Web3 = require("web3");
// import React, { useState } from "react";
// import PropTypes from "prop-types";
// const infuraCurrencies = require("./infura-conversion.json").objects.sort(
//   (a, b) => {
//     return a.quote.name
//       .toLocaleLowerCase()
//       .localeCompare(b.quote.name.toLocaleLowerCase());
//   }
// );
// const validUrl = require("valid-url");
// const exportAsFile = require("./util").exportAsFile;
// const Modal = require("../../ui/app/components/modals/index").Modal;
// const ethNetProps = require("xdc-net-props");
// const { networks } = require("../../app/scripts/controllers/network/util");

// module.exports = connect(mapStateToProps)(ExpandedSettings);

// function mapStateToProps(state) {
//   return {
//     metamask: state.metamask,
//     warning: state.appState.warning,
//     expandUi: state.metamask.expandUi,
//   };
// }

// inherits(expandedSettings, Component);

// function expandedSettings() {
//   this.state = {
//     loading: false,
//   };
//   Component.call(this);
// }

// expandedSettings.prototype.render = function () {
//   const state = this.props;
//   const metamaskState = state.metamask;
//   const { expandUi } = state;
//   const warning = state.warning;

//   // const url = state.dispatch(actions.generalSettings())
//   // class ExpandedSettings extends React.Component {
//   //   static contextTypes = {
//   //     t: PropTypes.func,
//   //   }
//   //   render() {
//   //     const {t} = this.context
//   return (
//     <div className="sidebar">
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "flex-start",
//           margin: "0 0 0 25px",
//           borderBottom: "1px solid #E3E7EB",
//         }}
//       >
//         <img
//           style={{ cursor: "pointer" }}
//           src="/images/Assets/BackArrow.svg"
//           onClick={() => {
//             state.dispatch(actions.goHome());
//           }}
//         />
//         <h2 style={{ margin: "0 0 0 60px" }}>Settings</h2>
//       </div>
//       <div>
//         <div
//           className="settings"
//           style={{ borderBottom: "1px solid #E3E7EB" }}
//           onClick={() => {
//             state.dispatch(actions.generalSettings());
//           }}
//         >
//           <h2> General Settings </h2>
//         </div>

//         <div className="settings" style={{ borderBottom: "1px solid #E3E7EB" }}>
//           <h2>Advance Settings</h2>
//         </div>

//         <div className="settings" style={{ borderBottom: "1px solid #E3E7EB" }}>
//           <h2>Security and Privacy Settings</h2>
//         </div>

//         <div className="settings" style={{ borderBottom: "1px solid #E3E7EB" }}>
//           <h2>Contacts</h2>
//         </div>

//         <div className="settings" style={{ borderBottom: "1px solid #E3E7EB" }}>
//           <h2>Network Settings</h2>
//         </div>

//         <div className="settings" style={{ borderBottom: "1px solid #E3E7EB" }}>
//           <h2>About</h2>
//         </div>
//       </div>
//     </div>
//   );
// };
