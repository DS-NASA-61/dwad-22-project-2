import React from "react";

export default class WelcomeMessage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h3>Welcome to the Safe Space</h3>
        <div className="form-group mt-4">
          <button
            type="button"
            className="btn btn-primary btn-block"
            // onClick={this.callLogin}
          >
            Sign in
          </button>
        </div>
      </React.Fragment>
    );
  }
}
