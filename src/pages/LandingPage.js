import React from "react";

export default class LandingPage extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
  };

  callLogin = () => {
    this.props.login(
      this.state.username,
      this.state.email,
      this.state.password
    );
  };

  updateFormField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <form
            className="container mt-5"
            style={{
              width: "40rem",
              padding: "1rem",
              border: "solid grey 0.5px",
            }}
          >
            <div className="row">
              <h5>Welcome to The Safe Space Prayer Wall</h5>
              <h6>Sign in here</h6>
              <div className="col">
                <input
                  id="username"
                  type="text"
                  className="form-control mt-3"
                  placeholder="Username"
                  name="username"
                  onChange={this.updateFormField}
                />
                <input
                  id="email"
                  type="text"
                  className="form-control mt-2"
                  placeholder="Email"
                  name="email"
                  onChange={this.updateFormField}
                />
                <input
                  id="password"
                  type="text"
                  className="form-control mt-2"
                  placeholder="Password"
                  name="password"
                  onChange={this.updateFormField}
                />
              </div>
              <div className="row mt-3">
                <div class="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={this.callLogin}
                  >
                    Log in
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
