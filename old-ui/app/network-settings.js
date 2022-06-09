const connect = require("react-redux").connect;
const actions = require("../../ui/app/actions");
const React = require("react");
import PropTypes from "prop-types";

class NetworkSettings extends React.Component {
  onDeleteRPCNetwork = networkObj => {
    const state = this.props;
    state.dispatch(actions.delRpcTarget(networkObj));
  };
  static contextTypes = {
    t: PropTypes.func
  };

  render() {
    const state = this.props;
    const networkList = state.metamask.networkList;
    const frequentRPCList = state.metamask.frequentRpcList;
    const netList = [...networkList, ...frequentRPCList];
    const { t } = this.context;
    return (
      <div
        className="flex-column flex-grow"
       
      >
        <div
          className="section-title flex-row"
          style={{
            borderBottom: "1px solid #E3E7EB",
            padding: "0 0 17px 14px",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <img
            src="/images/Assets/BackArrow.svg"
            // className="image-display"
            style={{ cursor: "pointer" }}
            onClick={() => {
              state.backToSetting
                ? state.backToSetting()
                : state.dispatch(actions.goConfig());
            }}
          />
          <h2 style={{ fontFamily: "Inter-bold" }}>{`${t(
            "networkSettings"
          )}`}</h2>
          <img
            src="/images/Assets/Add.svg"
            style={{ cursor: "pointer", marginRight: "16px" }}
            onClick={() => {
              this.props.dispatch(actions.displayWarning(""));
              state.onAddNetworkClicked
                ? state.onAddNetworkClicked()
                : state.dispatch(actions.showAddNetworkPage());
            }}
          />
        </div>
        <div  style={{
          maxHeight: "100%",
          overflowY: "auto"
        }}>
        {netList.map(networkObj => (
          <div >
            <div
              style={{
                padding: " 11px 13px 11px 13px ",
                borderBottom: "1px solid #E3E7EB",
                fontFamily: "inter-medium",
                fontSize: "14px",
                display: "flex",
                justifyContent: "space-between"
              }}
              key={networkObj.chainId}
            >
              {" "}
              <div>
                <svg style={{ height: "16px", width: "26px" }}>
                  <circle
                    style={{
                      cx: "10",
                      cy: "10",
                      r: "6",
                      fill: networkObj.colorCode
                        ? networkObj.colorCode
                        : "#E58A0F"
                    }}
                    key={networkObj.isPermanent}
                  />
                </svg>{" "}
                {networkObj.name}
              </div>
              <div>
                <img
                  src={
                    networkObj.isPermanent
                      ? "/images/Assets/Lock.svg"
                      : "/images/Assets/Delete.svg"
                  }
                  style={{
                    cursor: networkObj.isPermanent ? "normal" : "pointer"
                  }}
                  onClick={() =>
                    !networkObj.isPermanent &&
                    this.onDeleteRPCNetwork(networkObj)
                  }
                />
                <img
                  src="/images/Assets/Arrow.svg"
                  onClick={() =>
                    state.onAddNetworkClicked
                      ? state.onAddNetworkClicked(networkObj)
                      : state.dispatch(actions.viewNetwork(networkObj))
                  }
                  style={{
                    margin: "0 0 4px 4px",
                    cursor: "pointer"
                  }}
                />
              </div>
            </div>
          </div>
        ))}
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning
  };
}

module.exports = connect(mapStateToProps)(NetworkSettings);
