import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { BiMailSend } from "react-icons/bi";
import { BiLock } from "react-icons/bi";

export default class UserSignUp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="row justify-content-center">
          <div className="d-flex justify-content-center text-center">
            <div className="card text-white bg-success  mb-3">
              <div className="card-body mx-auto">
                <h4 className="card-title mt-3 text-center">Hey, mate</h4>
                <p className="text-center">Welcome to the Safe Space</p>
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
                        // onChange={this.updateFormField}
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
                        // onChange={this.updateFormField}
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
                        // onChange={this.updateFormField}
                      />
                    </div>
                  </div>

                  <div className="form-group mt-4">
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      // onClick={this.callLogin}
                    >
                      Join Us
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
