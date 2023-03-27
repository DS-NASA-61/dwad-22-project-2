import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { BiMailSend } from "react-icons/bi";
import { BiLock } from "react-icons/bi";

export default class LandingPage extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
  };

  callSwitchPage = () => {
    this.props.switchPage("prayerwall");
  };

  // callLogin = () => {
  //   this.props.login(
  //     this.state.username,
  //     this.state.email,
  //     this.state.password
  //   );
  // };

  callLogin = async () => {
    try {
      await this.props.login(
        this.state.username,
        this.state.email,
        this.state.password
      );
      this.callSwitchPage();
    } catch (error) {
      console.error(error);
    }
  };

  updateFormField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row justify-content-center">
          <div className="d-flex justify-content-center text-center">
            <div className="card bg-light">
              <div className="card-body mx-auto">
                <h4 className="card-title mt-3 text-center">Hi, welcome</h4>
                <p className="text-center">Sign in to the Safe Space</p>
                <form>
                  <div className="form-group input-group  mt-4">
                    <div className="row align-content-center">
                      <BiUserCircle
                        className="me-1"
                        style={{ width: "3rem" }}
                      />
                    </div>
                    <div>
                      <input
                        id="username"
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        name="username"
                        onChange={this.updateFormField}
                      />
                    </div>
                  </div>

                  <div className="form-group input-group mt-2">
                    <div className="row align-content-center">
                      <BiMailSend className="me-1" style={{ width: "3rem" }} />
                    </div>
                    <div>
                      <input
                        id="email"
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        onChange={this.updateFormField}
                      />
                    </div>
                  </div>

                  <div className="form-group input-group mt-2">
                    <div className="row align-content-center">
                      <BiLock className="me-1" style={{ width: "3rem" }} />
                    </div>
                    <div>
                      <input
                        id="password"
                        type="text"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={this.updateFormField}
                      />
                    </div>
                  </div>

                  <div className="form-group mt-4">
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      onClick={this.callLogin}
                    >
                      Sign in{" "}
                    </button>
                  </div>
                  <p className="text-center mt-2">
                    Not a member yet? <a href="">Sign Up</a>{" "}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
