const inherits = require('util').inherits
const Component = require('react').Component
const connect = require('react-redux').connect
const h = require('react-hyperscript')
const actions = require('../../../../ui/app/actions')
const exportAsFile = require('../../util').exportAsFile

module.exports = connect(mapStateToProps)(CreateVaultCompleteScreen)

inherits(CreateVaultCompleteScreen, Component)
function CreateVaultCompleteScreen () {
  Component.call(this)
}

function mapStateToProps (state) {
  return {
    seed: state.appState.currentView.seedWords,
    cachedSeed: state.metamask.seedWords,
  }
}

CreateVaultCompleteScreen.prototype.render = function () {
  var state = this.props
  var seed = state.seed || state.cachedSeed || ''
  
  // console.log(seedArr.random(), '*-*')
  
  var seedArr = seed.split(' ')
  
  
    
    
  
  return (

    h('.initialize-screen.flex-column.flex-center.flex-grow', [

      // subtitle and nav
      // h('.section-title.flex-row.flex-center', [
      //   h('h2.page-subtitle', 'Vault Created'),
      // ]),
      
      h('h3.flex-center.section-title', {
        style: {
          color: '#333333',
          fontWeight: '600'
        },
      }, [
        h('img', { style: { marginRight: '3px', }, src: "/images/Assets/Check-Green.svg" }),

        'Vault Created',
      ]),

      h('div', {
        style: {
          fontSize: '12px',
          textAlign: 'center',
          width: '265px',
          height: '61px',
          marginTop: '25px',
        },
      }, [
        h('div.error1', {
          style: { fontFamily: 'Inter-medium' },
        }, 'These 12 words are the only way to restore your XDCPay accounts.\nSave them somewhere safe and secret.'),
      ]),
      h('div', {

        style: {
          display: 'flex',
          flex: '1 3 auto ',
        },
      },
        [
          h('textarea.twelve-word-phrase', {
            readOnly: true,
            value: "1." + seedArr[0],
          }),
          
          h('textarea.twelve-word-phrase', {
            style: { marginLeft: '4px', },
            readOnly: true,
            value: "2." + seedArr[1],
          }),
          
        
          h('textarea.twelve-word-phrase', {
            style: { marginLeft: '4px', },
            readOnly: true,
            value: "3." + seedArr[2],
          }),
        
        ]),
      h('div', {

        style: {
          display: 'flex',
          flex: '1 3 auto ',
        },
      },
        [
          h('textarea.twelve-word-phrase', {
            readOnly: true,
            value: "4." + seedArr[3],
          }),
            
          h('textarea.twelve-word-phrase', {
            style: { marginLeft: '4px', },
            readOnly: true,
            value: "5." + seedArr[4],
          }),
            
          
          h('textarea.twelve-word-phrase', {
            style: { marginLeft: '4px', },
            readOnly: true,
            value: "6." + seedArr[5],
          }),
          
        ]),
     
      h('div', {

        style: {
          display: 'flex',
          flex: '1 3 auto ',
        },
      },
        [
          h('textarea.twelve-word-phrase', {
            readOnly: true,
            value: "7." + seedArr[6],
          }),
            
          h('textarea.twelve-word-phrase', {
            style: { marginLeft: '4px', },
            readOnly: true,
            value: "8." + seedArr[7],
          }),
            
          
          h('textarea.twelve-word-phrase', {
            style: { marginLeft: '4px', },
            readOnly: true,
            value: "9." + seedArr[8],
          }),
          
        ]),
      h('div', {

        style: {
          display: 'flex',
          flex: '1 3 auto ',
        },
      },
        [
          h('textarea.twelve-word-phrase', {
            readOnly: true,
            value: "10." + seedArr[9],
          }),
              
          h('textarea.twelve-word-phrase', {
            style: { marginLeft: '4px', },
            readOnly: true,
            value: "11." + seedArr[10],
          }),
              
            
          h('textarea.twelve-word-phrase', {
            style: { marginLeft: '4px', },
            readOnly: true,
            value: "12." + seedArr[11],
          }),
            
        ]),
      h('button', {
        onClick: () => {
          this.confirmRecoveryPhrase()
          exportAsFile(`XDCPay Seed Words`, seed)
        },
        // .then(seed => {
        //   exportAsFile(`XDCPay Seed Words`, seed)
        // }),
      
            // this.confirmSeedWords()
        // exportAsFile(`XDCPay Seed Words`, seed)
        // .then(account => this.showAccountDetail(account)),
        style: {
          marginTop: '56px',
          fontSize: '0.9em',
          background: '#ffffff',
          color: '#0CBE46',
          width: '265px',
          height: '40px',
          border: '1px solid #0CBE46',
          display: 'flex',
          paddingLeft: '58px',
          paddingTop: '7px',
        },
      },
      [
        h('img', {
        style:{
          marginRight: '12px',
        },
         src: "/images/Assets/Download.svg"}),
         h('div',{style: {
            marginTop: '3px',
         },},
      'Save as CSV File'),]),
      
      h('button', {
        onClick: () => {
          this.confirmRecoveryPhrase()
            this.confirmSeedWords()
          
        },
          // this.confirmSeedWords()
        style: {
          marginTop: '28px',
          fontSize: '14px',
          background: '#0CBE46',
          width: '265px',
          height: '40px',
          border: 'none'
        },
      }, 'I have copied it somewhere safe'),

      
    ])                          
  )
}

CreateVaultCompleteScreen.prototype.confirmSeedWords = function () {
  return this.props.dispatch(actions.confirmSeedWords())
}

CreateVaultCompleteScreen.prototype.confirmRecoveryPhrase = function () {
  return this.props.dispatch(actions.confirmRecoveryPhrase())
}

CreateVaultCompleteScreen.prototype.exportAsFile = function (seed) {
  return this.props.dispatch(actions.exportAsFile(`XDCPay Seed Words`, seed))
}





