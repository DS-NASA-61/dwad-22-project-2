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
import { BsHearts } from "react-icons/bs";

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
                this.props.user.cellgroup_id == prayerRequest.user.cellgroupId
              ) {
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
                                {prayerRequest?.answered ? (
                                  <p>Answered!</p>
                                ) : (
                                  <></>
                                )}
                              </h5>

                              {prayerRequest?.user.username ==
                              this.props.user.username ? (
                                <div className="col d-flex justify-content-end">
                                  <FaEdit
                                    className="me-2"
                                    style={{ color: "#55BB8E" }}
                                    onClick={() => {
                                      this.props.editPrayerRequest(
                                        prayerRequest
                                      );
                                    }} //use arraw function, so can have parameter in,
                                    // must put `prayerRequest` since we are using map(prayerRequest),
                                    //so can identify which one we are about to edit
                                  />

                                  <GiSelfLove
                                    className="me-2"
                                    style={{ color: "#55BB8E" }}
                                    onClick={() => {
                                      this.props.beginEditAnswered(
                                        prayerRequest
                                      );
                                      this.props.handleAnswered(prayerRequest);
                                    }}
                                  />
                                  <FaTimesCircle
                                    className="me-0"
                                    style={{ color: "#F2542D" }}
                                    onClick={() => {
                                      this.props.handleDeletePrayerRequest(
                                        prayerRequest
                                      );
                                    }}
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
                              <FaCalendarAlt /> {prayerRequest?.date}
                            </p>
                            {/* <button
                            className="btn btn-primary btn-sm me-2"
                            style={{
                              width: "8rem",
                            }}
                          >
                            Gimme a hug
                            <MdAccessibilityNew className="ms-2" />
                          </button> */}
                            <button
                              type="button"
                              className="btn btn-primary btn-sm me-5"
                              style={{
                                width: "7rem",
                              }}
                              onClick={() => {
                                this.props.beginEditPrayerRequestResponse(
                                  prayerRequest
                                );
                                this.props.beginToAddResponse(prayerRequest);
                                this.props.handleResponse();
                                // this.props.handleResponse(prayerRequest);
                              }}
                            >
                              Response
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
                            {!this.state.showResponses ? (
                              <MdExpandMore onClick={this.showHideResponses} />
                            ) : (
                              <MdExpandLess onClick={this.showHideResponses} />
                            )}
                          </div>
                          <div>
                            {this.state.showResponses &&
                              prayerRequest?.response?.map(
                                (response, index) => {
                                  if (
                                    !this.props.responseBeingEdited ||
                                    response.response_id !==
                                      this.props.responseBeingEdited
                                  ) {
                                    return (
                                      <div
                                        className="container mt-3 d-flex justify-content-between justify-content-center"
                                        style={{ borderColor: "#FAFAFA" }}
                                        key={response?.response_id}
                                      >
                                        <div>
                                          {response.username ==
                                          this.props.user.username ? (
                                            <BsHearts
                                              style={{ color: "#f27474" }}
                                            />
                                          ) : (
                                            <></>
                                          )}
                                          {response?.username} responded:{" "}
                                          {response?.content}
                                        </div>
                                        {response.username ==
                                        this.props.user.username ? (
                                          <div>
                                            <FaEdit
                                              className="me-2"
                                              style={{ color: "#55BB8E" }}
                                              onClick={() => {
                                                this.props.beginEditResponse(
                                                  prayerRequest,
                                                  response
                                                );
                                              }}
                                            />

                                            <FaTimesCircle
                                              className="me-0"
                                              style={{ color: "#F2542D" }}
                                              onClick={() => {
                                                this.props.handleDeleteResponse(
                                                  prayerRequest,
                                                  response,
                                                  index
                                                );
                                              }}
                                            />
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div
                                        className="container mt-3 d-flex justify-content-between justify-content-center"
                                        style={{ borderColor: "#FAFAFA" }}
                                        key={response?.response_id}
                                      >
                                        <div>
                                          {response.username ==
                                          this.props.user.username ? (
                                            <BsHearts
                                              style={{ color: "#f27474" }}
                                            />
                                          ) : (
                                            <></>
                                          )}
                                          {response?.username} responded:{" "}
                                          {/* {response?.content} */}
                                          {/* ------- */}
                                          <div className="card-text d-flex align-items-end justify-content-center">
                                            <input
                                              type="text"
                                              value={this.props.editedResponse}
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
                                              // onChange={() => {
                                              //   this.props.updateEditedResponse(
                                              //     response
                                              //   );
                                              // }}
                                              onChange={
                                                this.props.updateEditedResponse
                                              }
                                            />
                                            <button className="btn me-2 mt-0">
                                              <FcOk
                                                onClick={() => {
                                                  this.props.confirmEditResponse(
                                                    prayerRequest,
                                                    response,
                                                    index
                                                  );
                                                }}
                                              />
                                            </button>
                                          </div>
                                          {/* ------- */}
                                        </div>
                                        {response.username ==
                                        this.props.user.username ? (
                                          <div>
                                            <FaEdit
                                              className="me-2"
                                              style={{ color: "#55BB8E" }}
                                              onClick={() => {
                                                this.props.beginEditResponse(
                                                  prayerRequest,
                                                  response
                                                );
                                              }}
                                            />

                                            <FaTimesCircle
                                              className="me-0"
                                              style={{ color: "#F2542D" }}
                                              onClick={() => {
                                                this.props.handleDeleteResponse(
                                                  prayerRequest,
                                                  response,
                                                  index
                                                );
                                              }}
                                            />
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    );
                                  }
                                  return (
                                    <div
                                      className="container mt-3 d-flex justify-content-between justify-content-center"
                                      style={{ borderColor: "#FAFAFA" }}
                                      key={response?.response_id}
                                    >
                                      <div>
                                        {response.username ==
                                        this.props.user.username ? (
                                          <BsHearts
                                            style={{ color: "#f27474" }}
                                          />
                                        ) : (
                                          <></>
                                        )}
                                        {response?.username} responded:{" "}
                                        {response?.content}
                                      </div>
                                      {response.username ==
                                      this.props.user.username ? (
                                        <div>
                                          <FaEdit
                                            className="me-2"
                                            style={{ color: "#55BB8E" }}
                                            onClick={() => {
                                              this.props.beginEditResponse(
                                                prayerRequest,
                                                response
                                              );
                                            }}
                                          />

                                          <FaTimesCircle
                                            className="me-0"
                                            style={{ color: "#F2542D" }}
                                            onClick={() => {
                                              this.props.handleDeleteResponse(
                                                prayerRequest,
                                                response,
                                                index
                                              );
                                            }}
                                          />
                                        </div>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  );
                                }
                              )}
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
                              <h5 className="card-title text-start col d-flex justify-content-between">
                                {prayerRequest?.title}
                                {prayerRequest?.answered ? (
                                  <p>Answered!</p>
                                ) : (
                                  <></>
                                )}
                              </h5>

                              {prayerRequest?.user.username ==
                              this.props.user.username ? (
                                <div className="col d-flex justify-content-end">
                                  <FaEdit
                                    className="me-2"
                                    style={{ color: "#55BB8E" }}
                                    onClick={() => {
                                      this.props.editPrayerRequest(
                                        prayerRequest
                                      );
                                    }} //use arraw function, so can have parameter in,
                                    // must put `prayerRequest` since we are using map(prayerRequest),
                                    //so can identify which one we are about to edit
                                  />

                                  <GiSelfLove
                                    className="me-2"
                                    style={{ color: "#55BB8E" }}
                                    onClick={() => {
                                      this.props.beginEditAnswered(
                                        prayerRequest
                                      );
                                      this.props.handleAnswered(prayerRequest);
                                    }}
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
                            {/* <button
                            className="btn btn-primary btn-sm me-2"
                            style={{
                              width: "8rem",
                            }}
                          >
                            Gimme a hug
                            <MdAccessibilityNew />
                          </button> */}
                            <button
                              type="button"
                              className="btn btn-primary btn-sm me-5"
                              style={{
                                width: "7rem",
                              }}
                              onClick={() => {
                                this.props.beginToAddResponse(prayerRequest);
                                this.props.handleResponse();
                                // this.props.handleResponse(prayerRequest);
                              }}
                            >
                              Response
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
                            {!this.state.showResponses ? (
                              <MdExpandMore onClick={this.showHideResponses} />
                            ) : (
                              <MdExpandLess onClick={this.showHideResponses} />
                            )}
                          </div>
                          {this.state.showResponses &&
                            prayerRequest?.response?.map((response, index) => {
                              return (
                                <div
                                  className="container mt-3 d-flex justify-content-between justify-content-center"
                                  style={{ borderColor: "#FAFAFA" }}
                                  key={response?.response_id}
                                >
                                  <div>
                                    {response.username ==
                                    this.props.user.username ? (
                                      <BsHearts style={{ color: "#f27474" }} />
                                    ) : (
                                      <></>
                                    )}
                                    {response?.username} responded:{" "}
                                    {response?.content}
                                  </div>
                                  {response.username ==
                                  this.props.user.username ? (
                                    <div>
                                      <FaEdit
                                        className="me-2"
                                        style={{ color: "#55BB8E" }}
                                        onClick={() => {
                                          this.props.beginEditResponse(
                                            prayerRequest,
                                            response
                                          );
                                        }}
                                      />

                                      <FaTimesCircle
                                        className="me-0"
                                        style={{ color: "#F2542D" }}
                                        onClick={() => {
                                          this.props.handleDeleteResponse(
                                            prayerRequest,
                                            response,
                                            index
                                          ); //error uccored here without ()=> : as long as
                                          //logged in the prayer request created by the logged in
                                          //user are deleted right away, suspect it's dut to
                                          //directly calling the function instead of a call back
                                        }}
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
                  );
                }
              }
            })}
        </div>
      </React.Fragment>
    );
  }
}
