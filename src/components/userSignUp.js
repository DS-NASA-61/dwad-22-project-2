import React from "react";
import axios from "axios";
import { BiUserCircle, BiLock, BiMailSend } from "react-icons/bi";
import { BsFillPeopleFill, BsLightbulb } from "react-icons/bs";

export default class UserSignUp extends React.Component {
  BASE_API_URL = "http://localhost:4000/";

  state = {
    cellGroups: [],
    selectedCellGroup: "",
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

  render() {
    return (
      <React.Fragment>
        <div className="row justify-content-center">
          <div className="d-flex justify-content-center text-center">
            <div className="card text-white bg-success mb-3">
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
                      <BsFillPeopleFill
                        className="me-1"
                        style={{ width: "3rem" }}
                      />
                    </div>
                    <select
                      class="form-select"
                      style={{ borderRadius: "5px", color: "#636464" }}
                      value={this.state.selectedCellGroup}
                      onChange={this.handleSelectChange}
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
                    </select>
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
