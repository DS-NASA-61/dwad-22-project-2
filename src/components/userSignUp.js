import React from "react";
import axios from "axios";
import { BiUserCircle, BiLock, BiMailSend } from "react-icons/bi";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import Swal from "sweetalert2";
import Modal_img from "../img/Modal_img.webp";
import "./modal.css";

export default class UserSignUp extends React.Component {
  BASE_API_URL = "http://localhost:4000/";

  state = {
    cellGroups: [],
    selectedCellGroup: "",
    username: "",
    email: "",
    password: "",
    passwordVisible: false,
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get(this.BASE_API_URL + "cellgroups", {});
      this.setState({ cellGroups: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  handleSelectChange = (event) => {
    this.setState({
      selectedCellGroup: event.target.value,
    });
  };

  UpdateFormFields = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  callSwitchPage = () => {
    this.props.switchPage("prayerwall");
  };

  // handle password visibility toggle
  togglePassword = () => {
    this.setState({ passwordVisible: !this.state.passwordVisible });
  };

  callSignup = async () => {
    try {
      await this.props.onSignup(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.selectedCellGroup
      );
      await Swal.fire({
        title: "Hello, " + `${this.state.username}`,
        text: "Welcome to the Safe Space",
        imageUrl: Modal_img,
        // imageWidth: 400,
        // imageHeight: 200,
        imageAlt: "Custom image",
        customClass: "custom-swal-bg",
      });
      this.callSwitchPage();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="row"
          style={{
            justifyContent: "end",
            alignItems: "center",
            minHeight: "70vh",
          }}
        >
          <div className="d-flex col-5">
            <div className="card text-white mb-3 bg-dark   bg-opacity-75">
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
                        onChange={this.UpdateFormFields}
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
                        onChange={this.UpdateFormFields}
                      />
                    </div>
                  </div>

                  <div className="form-group input-group mt-2">
                    <div className="row align-content-center">
                      <BsFillPeopleFill
                        className="me-1"
                        style={{ width: "3rem" }}
                      />
                    </div>
                    <select
                      class="form-select"
                      style={{ borderRadius: "5px", color: "#636464" }}
                      value={this.state.selectedCellGroup}
                      onChange={(event) => {
                        this.handleSelectChange(event);
                        this.UpdateFormFields(event);
                      }}
                    >
                      <option value={""}>Select Cell Group</option>
                      {this.state.cellGroups.requests?.map((cellgroup) => {
                        return (
                          <option
                            key={cellgroup._id}
                            value={cellgroup.cell_group_name}
                          >
                            {cellgroup.cell_group_name}
                          </option>
                        );
                      })}
                      {console.log(this.state.cellGroups.requests)}
                    </select>
                  </div>

                  <div className="form-group input-group mt-2">
                    <div className="row align-content-center">
                      <BiLock className="me-1" style={{ width: "3rem" }} />
                    </div>
                    <div>
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
                        onChange={this.UpdateFormFields}
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
                      onClick={this.callSignup}
                    >
                      Join Us
                    </button>
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={this.props.backToLogInForm}
                    >
                      Back to Log in
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
