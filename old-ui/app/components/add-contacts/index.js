const connect = require('react-redux').connect
const actions = require('../../../../ui/app/actions')
import React from 'react'
import PropTypes from 'prop-types'

const AddContactComponent = require('./add-contacts')

export default class AddContact extends React.Component {
  constructor (props) {
    super(props)
    const contactObj=this.props.viewContactObj
    // eslint-disable-next-line react/prop-types
    // const viewContactObj = this.props.viewContactObj;
    this.state = {
      contactAddress: contactObj ? contactObj.address : ' ',
      contactName: contactObj ? contactObj.name : ' ',
    }
  }



  onBackClick = () => {
    // eslint-disable-next-line react/prop-types
    this.props.dispatch(actions.Contacts())
  }

  onStateChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  onAddContactClicked = async () => {
    this.props.dispatch(actions.displayWarning(''))
    const {contactAddress, contactName} = this.state
    await this.props.dispatch(actions.addToAddressBook(contactName, contactAddress))
    this.props.dispatch(actions.Contacts())
  }
  onDeleteClicked = async (viewContactObj) => {
    this.props.dispatch(actions.displayWarning(''))
    await this.props.dispatch(actions.addToAddressBook(viewContactObj.name, viewContactObj.address, true))
    this.props.dispatch(actions.Contacts())
  }
  static contextTypes = {
    t: PropTypes.func,
  }

  render () {
    // eslint-disable-next-line react/prop-types
    const { t } = this.context
    const { warning, viewContactObj} = this.props
    return (
      <AddContactComponent
        t ={t}
        state={this.state}
        props={this.props}
        viewContactObj={viewContactObj}
        warningMsg={warning}
        onBackClick={this.onBackClick}
        onStateChange={this.onStateChange}
        onDeleteClicked={this.onDeleteClicked}
        onAddContactClicked={this.onAddContactClicked}

      />
    )
  }
}

function mapStateToProps (state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
    viewContactObj: state.appState.currentViewContactObj,
  }
}

module.exports = connect(mapStateToProps)(AddContact)
