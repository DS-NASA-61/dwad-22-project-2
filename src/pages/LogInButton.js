import React from "react";

export default class LogInButton extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "122vh",
          }}
        >
          <p
            className="text-center m-5"
            style={{
              color: "lightgrey",
              fontSize: "large",
              fontStyle: "italic",
            }}
          >
            James 5:16 Confess your faults one to another, and pray one for
            another, that ye may be healed.
            <button
              type="button"
              className="btn btn-link"
              onClick={this.props.goToLogIn}
            >
              Let's Pray
            </button>
          </p>
        </div>
      </React.Fragment>
    );
  }
}
