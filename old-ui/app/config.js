// /*Latest Settings UI **/

const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')
const LoadingIndicator = require('./components/loading')
const Web3 = require('web3')
import React, { useState } from 'react';
import PropTypes from 'prop-types'
const infuraCurrencies = require('./infura-conversion.json').objects.sort(
  (a, b) => {
    return a.quote.name
      .toLocaleLowerCase()
      .localeCompare(b.quote.name.toLocaleLowerCase())
  },
)
const validUrl = require('valid-url')
const exportAsFile = require('./util').exportAsFile
const Modal = require('../../ui/app/components/modals/index').Modal
const ethNetProps = require('xdc-net-props')
const {networks} = require('../../app/scripts/controllers/network/util')

module.exports = connect(mapStateToProps)(ConfigScreen)

function mapStateToProps (state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
    expandUi: state.metamask.expandUi,
  }
}

inherits(ConfigScreen, Component)

function ConfigScreen () {
  this.state = {
    loading: false,
  }
  Component.call(this)
}

ConfigScreen.prototype.render = function () {
  const state = this.props
  const metamaskState = state.metamask
  const {expandUi} = state
  const warning = state.warning

  // class ConfigScreen extends React.Component {
  //   static contextTypes = {
  //     t: PropTypes.func,
  //   }
  //   render() {
  //     const {t} = this.context
      return (

  h(
    '.flex-column.flex-grow',
    {
      style: {
        maxHeight: '585px',
        overflowY: 'auto',
      },
    },
    [
      h(LoadingIndicator, {
        isLoading: this.state.loading,
      }),

      h(Modal, {}, []),
      // subtitle and nav

      h('.section-title.flex-row', {style: {borderBottom: '1px solid #E3E7EB', paddingBottom: '17px'}}, [
        h('img', {
          onClick: () => {
            state.dispatch(actions.goHome())
          },
          src: '/images/Assets/BackArrow.svg',
          style: {
            position: 'static',
            marginLeft: '15px',
            cursor: 'pointer',
          },
        }),
        h(
          'h2',
          {
            style: {
              marginLeft: '94px',
              fontWeight: '600',
              minHeight: '20px',
              padding: '0px 18px ',
            },
          },
          'Settings',
          ),
        ]),

      h('.settingsExpanded', [

        h('.settings', {onClick: () => state.dispatch(actions.generalSettings())}, ['General Settings',
          h('img', {
            src: '/images/Assets/Arrow.svg',
          }
          ),
        ]),

        h('.settings', {onClick: () => state.dispatch(actions.advanceSettings())}, ['Advance Settings',
        h('img', {
          src: '/images/Assets/Arrow.svg',

        }),
      ]),

        h('.settings', {onClick: () => state.dispatch(actions.securityAndPrivacy())}, ['Security and Privacy Settings',
        h('img', {
          src: '/images/Assets/Arrow.svg',
        }),
      ]),

      h('.settings', {onClick: () => state.dispatch(actions.Contacts())}, ['Contacts',
      h('img', {
        src: '/images/Assets/Arrow.svg',
      }),
    ]),

        h('.settings', {onClick: () => state.dispatch(actions.alertSettings())}, ['Alert Settings',
        h('img', {
          src: '/images/Assets/Arrow.svg',
        }),
      ]),

      h('.settings', {onClick: () => state.dispatch(actions.networkSettings())}, ['Network Settings',
      h('img', {
        src: '/images/Assets/Arrow.svg',
      }),
    ]),

    h('.settings', {onClick: () => state.dispatch(actions.showInfoPage())}, ['About',
    h('img', {
      src: '/images/Assets/Arrow.svg',
          }),
        ]),
      ])

    ])
    )
  }

/*Latest Settings UI **/

// const inherits = require("util").inherits;
// const Component = require("react").Component;
// const h = require("react-hyperscript");
// const connect = require("react-redux").connect;
// const actions = require("../../ui/app/actions");
// const LoadingIndicator = require("./components/loading");
// const Web3 = require("web3");
// import React, { useState } from "react";
// import GeneralSettings from "../../old-ui/app/general-settings";
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

// module.exports = connect(mapStateToProps)(ConfigScreen);

// function mapStateToProps(state) {
//   return {
//     metamask: state.metamask,
//     warning: state.appState.warning,
//     expandUi: state.metamask.expandUi,
//   };
// }

// inherits(ConfigScreen, Component);

// function ConfigScreen() {
//   this.state = {
//     loading: false,
//   };
//   Component.call(this);
// }

// const [state, setState] = useState('start')
// ConfigScreen.prototype.render = function () {
//   const state = this.props;
//   const metamaskState = state.metamask;
//   const { expandUi } = state;
//   const warning = state.warning;
  
//   // const url = state.dispatch(actions.generalSettings())
//   // class ConfigScreen extends React.Component {
//   //   static contextTypes = {
//   //     t: PropTypes.func,
//   //   }
//   //   render() {
//   //     const {t} = this.context
//   return (
//     <div className="sidebar"
//       style={{
//         width: "100%",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           height: "42px",
//           borderBottom: "1px solid #E3E7EB",
//         }}
//       >
//         <img
//           style={{
//             cursor: "pointer",
//             height: "14px",
//             width: "14px",
//             margin: "0 0 0 5px",
//           }}
//           src="/images/Assets/Close.svg"
//           onClick={() => {
//             state.dispatch(actions.goHome());
//           }}
//         />
//         <h2 style={{ margin: "0 0 0 60px" }}>Settings</h2>
//       </div>
     
//       <div
//         style={{
//           display: "flex",
//           width: "20%",
//           position: "absolute",
//           left: "0",
//           borderRight: "1px solid #E3E7EB ",
//         }}
//       >
//         <div>
//           <div className="settings" onClick={() => <GeneralSettings />}>
//             <h2> General Settings </h2>
//           </div>

//           <div className="settings">
//             <h2>Advance Settings</h2>
//           </div>

//           <div className="settings">
//             <h2>Security and Privacy Settings</h2>
//           </div>

//           <div className="settings">
//             <h2>Contacts</h2>
//           </div>

//           <div className="settings">
//             <h2>Network Settings</h2>
//           </div>

//           <div className="settings">
//             <h2>About</h2>
//           </div>
//         </div>
//       </div>
     
//       <div
//         style={{
//           width: "80%",
//           display: "flex",
//           position: "absolute",
//           right: "0",
//         }}
//       >
        
//         Screen will render here.......
//       </div>
//     </div>
//   );
// };
