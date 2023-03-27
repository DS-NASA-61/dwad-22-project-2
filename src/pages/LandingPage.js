import React from "react";
import UserSignUp from "../components/userSignUp";
import { BiUserCircle, BiMailSend, BiLock } from "react-icons/bi";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default class LandingPage extends React.Component {
  state = {
    //the state here rembers who logged in
    username: "",
    email: "",
    password: "",
    cellgroup: "",
    display: "login",
    passwordVisible: false,
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

  // handle password visibility toggle
  togglePassword = () => {
    this.setState({ passwordVisible: !this.state.passwordVisible });
  };

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

  handleDisplayChange = () => {
    this.setState({ display: "signup" });
  };

  handleUsernameChangeinSignUp = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleEmailChangeinSignUp = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleCellgroupChangeinSignUp = (event) => {
    this.setState({
      cellgroup: event.target.value,
    });
  };

  handlePasswordChangeinSignUp = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.display === "login" ? (
          <div className="row justify-content-center">
            <div className="d-flex justify-content-center text-center">
              <div className="card bg-light">
                <div className="card-body mx-auto">
                  <h4 className="card-title mt-3 text-center">Hey, mate</h4>
                  <p className="text-center">We've been missing you</p>
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
                        <BiMailSend
                          className="me-1"
                          style={{ width: "3rem" }}
                        />
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

                    <div className="relative form-group input-group mt-2 w-4/5 mx-auto">
                      <div className="row align-content-center">
                        <BiLock className="me-1" style={{ width: "3rem" }} />
                      </div>
                      <div className="w-full relative">
                        <input
                          id="password"
                          type={
                            this.state.passwordVisible === false
                              ? "password"
                              : "text"
                          }
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          onChange={this.updateFormField}
                        />
                      </div>
                      <div className="absolute top-0 right-0 px-3 py-2">
                        {this.state.passwordVisible === false ? (
                          <AiFillEyeInvisible onClick={this.togglePassword} />
                        ) : (
                          <AiFillEye onClick={this.togglePassword} />
                        )}
                      </div>
                    </div>

                    <div className="form-group mt-4">
                      <button
                        type="button"
                        className="btn btn-primary btn-block"
                        onClick={this.callLogin}
                      >
                        Sign in
                      </button>
                    </div>
                    <p className="text-center mt-4">
                      Not a member yet?
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={this.handleDisplayChange}
                      >
                        Sign Up
                      </button>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <UserSignUp
            onUsernameChange={this.handleUsernameChangeinSignUp}
            onEmailChange={this.handleEmailChangeinSignUp}
            onCellGroupChange={this.handleCellgroupChangeinSignUp}
            onPasswordChange={this.handlePasswordChangeinSignUp}
          />
        )}
      </React.Fragment>
    );
  }
}
