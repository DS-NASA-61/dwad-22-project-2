import React from "react";
import { FcBusinesswoman, FcOk, FcCallback } from "react-icons/fc";
import {
  FaEdit,
  FaBible,
  FaTimesCircle,
  FaCalendarAlt,
  FaPray,
  FaPrayingHands,
} from "react-icons/fa";
import { MdAccessibilityNew, MdExpandMore, MdExpandLess } from "react-icons/md";
import { GiSelfLove } from "react-icons/gi";

export default class prayerRequests extends React.Component {
  BASE_API_URL = "http://localhost:4000/";
  state = {
    showResponses: false,
    displayedPrayerRequestId: null,
  };

  showHideResponses = () => {
    this.setState({ showResponses: !this.state.showResponses });
  };

  render() {
    return (
      <React.Fragment>
        <div id="all-prayerRequest">
          {/* optional chaining : "?"  */}
          {this.props.data &&
            this.props.data?.map((prayerRequest) => {
              if (
                !this.props.prayerRequestBeingEdited ||
                prayerRequest._id !== this.props.prayerRequestBeingEdited._id
              ) {
                return (
                  <div
                    className="card mt-3"
                    style={{ border: "solid 1px #E2E7E4" }}
                    key={prayerRequest._id}
                  >
                    <div className="card-body">
                      <div className="container">
                        <div className="row">
                          <div className="row">
                            <h5 className="card-title text-start col d-flex justify-content-between">
                              {prayerRequest?.title}
                            </h5>
                            {prayerRequest?.user.username ==
                            this.props.user.username ? (
                              <div className="col d-flex justify-content-end">
                                <FaEdit
                                  className="me-2"
                                  style={{ color: "#55BB8E" }}
                                  onClick={() => {
                                    this.props.editPrayerRequest(prayerRequest);
                                  }} //use arraw function, so can have parameter in,
                                  // must put `prayerRequest` since we are using map(prayerRequest),
                                  //so can identify which one we are about to edit
                                />

                                <GiSelfLove
                                  className="me-2"
                                  style={{ color: "#55BB8E" }}
                                />
                                <FaTimesCircle
                                  className="me-0"
                                  style={{ color: "#F2542D" }}
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>

                          <div className="card-text">
                            <ul
                              className="text-start fst-italic"
                              style={{ padding: "1.5rem" }}
                            >
                              {prayerRequest?.content}
                            </ul>
                          </div>
                          <p className="card-title text-start col mb-0">
                            <FcBusinesswoman className="me-1" />
                            {prayerRequest?.user.username}{" "}
                            <span style={{ fontSize: "small" }}>
                              needs your prayers for
                            </span>
                          </p>
                          <p
                            className="card-title text-start mb-0"
                            style={{ fontSize: "small" }}
                          >
                            <FaPray
                              className="me-1"
                              style={{ color: "#55BB8E" }}
                            />{" "}
                            #{prayerRequest?.pray_for}
                          </p>
                          <p
                            className="card-title text-start mb-0 col"
                            style={{ fontSize: "small" }}
                          >
                            <FaBible
                              className="me-1"
                              style={{ color: "#55BB8E" }}
                            />{" "}
                            #{prayerRequest?.prayer_topic}
                          </p>
                          <p
                            className="card-title text-start mb-0 col"
                            style={{ fontSize: "small" }}
                          >
                            <FaCalendarAlt /> {prayerRequest.date}
                          </p>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            style={{
                              width: "8rem",
                            }}
                          >
                            Gimme a hug
                            <MdAccessibilityNew className="ms-2" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm me-5"
                            style={{
                              width: "7rem",
                            }}
                            onClick={() => {
                              this.props.beginToAddResponse(prayerRequest);
                              this.props.handleResponse(prayerRequest);
                            }}
                          >
                            Pray for me
                            <FaPrayingHands className="ms-1" />
                          </button>
                        </div>
                      </div>

                      {/* below render resonse */}
                      <div
                        className="container mt-3"
                        style={{
                          borderRadius: "4px",
                          border: "solid #F5F5F5 1px",
                          backgroundColor: "#F5F5F5",
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <h5 className="mb-0 me-2">Responses</h5>
                          {this.state.showResponses === false ? (
                            <MdExpandMore onClick={this.showHideResponses} />
                          ) : (
                            <MdExpandLess onClick={this.showHideResponses} />
                          )}
                        </div>
                        <div>
                          {this.state.showResponses &&
                            prayerRequest?.response?.map((response) => {
                              return (
                                <div
                                  className="container mt-3 d-flex justify-content-between justify-content-center"
                                  style={{ borderColor: "#FAFAFA" }}
                                  key={response?.response_id}
                                >
                                  <div>
                                    {response?.username} prayed:{" "}
                                    {response?.content}
                                  </div>
                                  {response.username ==
                                  this.props.user.username ? (
                                    <div>
                                      <FaEdit
                                        className="me-2"
                                        style={{ color: "#55BB8E" }}
                                        // onClick={() => {
                                        //   props.editPrayerRequest(prayerRequest);
                                        // }}
                                      />
                                      <FaTimesCircle
                                        className="me-0"
                                        style={{ color: "#550C18" }}
                                      />
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    className="card mt-3"
                    style={{ borderColor: "#FAFAFA" }}
                    key={prayerRequest?._id}
                  >
                    <div className="card-body">
                      <div className="container">
                        <div className="row">
                          <div className="row">
                            <h5 className="card-title text-start col-11">
                              {prayerRequest?.title}
                            </h5>
                            <div className="col">
                              <FaEdit
                                className="me-2"
                                style={{ color: "#55BB8E" }}
                                onClick={() => {
                                  this.props.editPrayerRequest(prayerRequest);
                                }}
                              />

                              <FaTimesCircle style={{ color: "#550C18" }} />
                            </div>
                          </div>

                          <div className="card-text d-flex align-items-end justify-content-center">
                            <input
                              type="text"
                              value={this.props.editedPrayerRequest}
                              spellCheck="true"
                              style={{
                                width: "100%",
                                height: "100px",
                                whiteSpace: "pre-wrap",
                                wordWrap: "break-word",
                                overflowWrap: "break-word",
                                overflowX: "hidden",
                                overflowY: "scroll",
                                display: "block",
                                boxSizing: "border-box",
                                minHeight: "60px",
                                resize: "none",
                              }}
                              onChange={this.props.updateEditedPrayerRequest}
                            />
                            <button className="btn me-2 mt-0">
                              <FcOk onClick={this.props.confirmEdit} />
                            </button>
                            {/* <ul
                        className="text-start fst-italic"
                        style={{ padding: "1.5rem" }}
                      >
                        {prayerRequest.content}
                      </ul> */}
                          </div>

                          <p className="card-title text-start col mb-0">
                            <FcBusinesswoman className="me-1" />
                            {prayerRequest.user.username}{" "}
                            <span style={{ fontSize: "small" }}>
                              needs your prayers for
                            </span>
                          </p>
                          <p
                            className="card-title text-start mb-0"
                            style={{ fontSize: "small" }}
                          >
                            <FaPray
                              className="me-1"
                              style={{ color: "#55BB8E" }}
                            />{" "}
                            #{prayerRequest.pray_for}
                          </p>
                          <p
                            className="card-title text-start mb-0 col"
                            style={{ fontSize: "small" }}
                          >
                            <FaBible
                              className="me-1"
                              style={{ color: "#55BB8E" }}
                            />{" "}
                            #{prayerRequest.prayer_topic}
                          </p>
                          <p
                            className="card-title text-start mb-0 col"
                            style={{ fontSize: "small" }}
                          >
                            <FaCalendarAlt /> {prayerRequest.date}
                          </p>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            style={{
                              width: "8rem",
                            }}
                          >
                            Gimme a hug
                            <MdAccessibilityNew />
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm me-5"
                            style={{
                              width: "7rem",
                            }}
                          >
                            Pray for me
                            <FaPrayingHands className="ms-1" />
                          </button>
                        </div>
                      </div>
                      {/* below render resonse */}
                      <div
                        className="container mt-3"
                        style={{
                          borderRadius: "4px",
                          border: "solid #F5F5F5 1px",
                          backgroundColor: "#F5F5F5",
                        }}
                      >
                        <div className="d-flex justify-content-start">
                          Responses
                        </div>
                        {prayerRequest?.response &&
                          prayerRequest?.response?.map((response) => {
                            return (
                              <div
                                className="container mt-3 d-flex justify-content-between justify-content-center"
                                style={{ borderColor: "#FAFAFA" }}
                                key={response?.response_id}
                              >
                                <div>
                                  {response?.user_id}
                                  {response.content}
                                </div>
                                <div>
                                  <FaEdit
                                    className="me-2"
                                    style={{ color: "#55BB8E" }}
                                    // onClick={() => {
                                    //   props.editPrayerRequest(prayerRequest);
                                    // }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </React.Fragment>
    );
  }
}
