const connect = require("react-redux").connect;
const actions = require("../../../../ui/app/actions");
const React = require("react");
const CopyButton = require("../../components/copy/copy-button");
const { toChecksumAddress } = require("../../util");
const vreme = new (require("vreme"))();
const hexToBn = require("../../../../app/scripts/lib/hex-to-bn");
const EthBalanceComponent = require("../eth-balance-cnf-tx");
const { pick, view } = require("ramda");

export default class ExpandedTransactionDetails extends React.Component {
  render() {
    function shorten(b, amountL = 7, /*amountR = 4,*/ stars = 3) {
      return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
        b.length - 4,
        b.length
      )}`;
    }

    var props = this.props;
    const contactList = props.metamask.addressBook;
    const viewTrans = props.viewTransaction;
    const { network, conversionRate, currentCurrency, networkList } = props;
    var selected = props.address || Object.keys(props.accounts)[0];
    var checksumAddress = selected && toChecksumAddress(network, selected);
    console.log(viewTrans, " ++-- ");
    const { transactions } = this.props;

    // var msgData = this.props.txData
    // var msgParams = msgData.id
    var fromAdd;
    var toAdd;
    var value;
    var gas;
    var gasPrice;
    var txnId;
    var date;
    // var time = formatDate(date);
    const valueBn = hexToBn(value);
    const gasPriceBn = hexToBn(gasPrice);
    const gasBn = hexToBn(gas);
    // const txFeeBn = gasBn.mul(gasPriceBn)
    // const maxCost = txFeeBn.add(valueBn)
    // console.log(msgParams,'paramsData')
    {
      const transactionList = transactions.sort((a, b) => a.time - b.time);

      const pickData = transactionList.map(({ id }) => id);

      console.log(pickData, "--");

      // if (viewTrans === pickData) {
      transactionList.filter((txObj) => {
        viewTrans === props.txId;
        (fromAdd = txObj.txParams.from),
          // fromAdd = fromAdd.replace('0x', 'xdc'),
          (toAdd = txObj.txParams.to),
          console.log(txObj.txParams.to, "****");
        // console.log(toAdd.replace('0x', 'xdc'),'[--]'),
        (value = txObj.txParams.value),
          (gas = txObj.txParams.gas),
          //  txnId = txObj.id,
          (gasPrice = txObj.txParams.gasPrice);
        date = txObj.txParams.time;
      });

      // }
    }
    // function formatDate(date) {
    //   return vreme.format(new Date(date), "Mar 16 2014, 02:30 PM");
    // }

    // console.log(contactList.address, ' +-+ ')
    // if(fromAdd === contactList.address)

    // const
    //   var adde
    //   {
    //   addressBook.map((obj) => {
    //     adde = obj.address

    //     if (fromAdd === adde) {
    //       fromAdd = obj.name
    //     } else if (toAdd === adde) {
    //       toAdd = obj.name
    //     }
    //     else {
    //       fromAdd = fromAdd
    //     }

    //   }
    //   )
    //   console.log(adde,'add')
    // }

    //value calculated
    value = parseInt(value, 16);
    value = value / Math.pow(10, 18);

    //gas Calculated
    gas = parseInt(gas, 16);

    //gasPrice calculated
    gasPrice = parseInt(gasPrice, 16);
    gasPrice = gasPrice / Math.pow(10, 9);
    //  var date = formatDate(transactions.time)

    return (
      <div
        className="flex-column flex-grow settingsExpanded"
        style={{
          // maxHeight: '585px',
          overflowY: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
            borderBottom: "2px solid #EDEDED",
            display: "flex",
            height: "57px",
            justifyContent: "center",
          }}
        >
          <div
            className=" flex-row"
            style={{
              justifyContent: "flex-start",
              width: "100%",
              alignItems: "center",
            }}
          >
            <div>
              {" "}
              <img
                src="/images/Assets/BackArrow.svg"
                style={{
                  marginLeft: "25px",
                  marginTop: "14",
                  cursor: "pointer",
                }}
                onClick={() => {
                  props.dispatch(actions.goHome());
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <div style={{margin:'0 0 0 371px'}}>
                <div
                  style={{
                    fontFamily: "Inter-Medium",
                    marginLeft: "139px",
                    fontSize: "14px",
                    color: "#1F1F1F",
                  }}
                >
                  Sent
                </div>

                <div
                  className="trasaction-details-from-to"
                  style={{ display: "flex" }}
                >
                  {" "}
                  {checksumAddress}
                  <CopyButton value={checksumAddress} isWhite={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            minHeight: "842px",
          }}
        >
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              borderRight: "2px solid #EDEDED",
            }}
          >
            <div style={{width:'100%',padding:'24px 13px'}}>
              <div className="details">Details</div>
              <div className="flexbox">
                <div className="trasaction-details-from-to">From</div>
                <div className="trasaction-details-from-to-accounts">
                  {fromAdd}
                </div>
                <img src="/images/Assets/DownArrow.svg" />
                <div className="trasaction-details-from-to">To</div>
                <div className="trasaction-details-from-to-accounts">
                  {toAdd}{" "}
                </div>
              </div>

              {/* all trasaction details  */}
              <div className="trasaction-details-amount">
                <div style={{ marginLeft: "16px" }}>Amount</div>
                <div style={{ marginRight: "6px", marginLeft: "auto" }}>
                  {value}
                </div>
                <h1 style={{ color: "#848484" }}>XDC</h1>
              </div>

              <div className="trasaction-details-amount">
                <div style={{ marginLeft: "16px" }}>Gas Limit</div>
                <div>{gas}</div>
              </div>

              <div className="trasaction-details-amount">
                <div style={{ marginLeft: "16px" }}>Gas Price (GWEI)</div>
                <div>{gasPrice}</div>
              </div>

              <div className="trasaction-details-amount">
                <div style={{ marginLeft: "16px" }}>Total</div>
                <div style={{ marginLeft: "200px" }}>
                  {/* <EthBalanceComponent 
              value={maxCost.toString(16)} /> */}
                </div>
                <h1 style={{ color: "#848484" }}>XDC</h1>
              </div>
            </div>
          </div>

          <div
            style={{ width: "50%", display: "flex", justifyContent: "center" }}
          >
            <div style={{width:'100%',padding:"0px 13px "}}>
              <div>
                <h2 className="transaction-log-heading">Transaction Log</h2>

                <div className="transaction-log-main">
                  <div style={{ display: "flex" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <img
                        style={{ marginRight: "10px" }}
                        src="/images/Assets/TransactionCreated.svg"
                      />
                      <div className="transaction-border"></div>
                    </div>
                    <div> Transaction created with a value of {value} XDC.</div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <img
                        style={{ marginRight: "10px" }}
                        src="/images/Assets/TransactionSubmitted.svg"
                      />
                      <div className="transaction-border"></div>
                    </div>
                    <div>
                      {" "}
                      Trasaction submitted with estimated gas fee of 1.00 GWEI.{" "}
                    </div>
                  </div>

                  <div style={{ display: "flex" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <img
                        style={{ marginRight: "10px" }}
                        src="/images/Assets/TransactionComplete.svg"
                      />
                    </div>
                    <div> Trasaction confirmed. </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
    txId: state.appState.txId,
    address: state.metamask.selectedAddress,
    network: state.metamask.network,
    transactions: state.metamask.selectedAddressTxList || [],
    addressBook: state.metamask.addressBook || [],
    viewTransaction: state.appState.currentViewTransactionObj,
  };
}

module.exports = connect(mapStateToProps)(ExpandedTransactionDetails);
