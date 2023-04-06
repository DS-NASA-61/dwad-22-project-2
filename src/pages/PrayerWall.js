import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import CreateNewPrayerRequest from "../components/createNewPrayerRequest";
import PrayerRequests from "../components/prayerRequests";
import MultiselectPrayFor from "../components/multiselectPrayerFor";
import MultiselectPrayerTopic from "../components/multiselectPrayerTopic";
import { FcLikePlaceholder } from "react-icons/fc";
import worship from "../img/worship.jpg";
import { Offcanvas } from "react-bootstrap";
import { AiTwotoneFilter } from "react-icons/ai";

//!!!important note: in JSX, components are used with captial first letter, otherwise cannot be recongnized as JSX hence cannot render

export default class PrayerWall extends React.Component {
  BASE_API_URL = "http://localhost:4000/";

  state = {
    active: "prayerRequests",
    data: [],

    date: new Date(), //for the Calendar Library

    // datePicker: new Date(), //for the datePicker Library

    startDate: new Date(),
    showMenu: false, //for bs offcanvas

    showPrayerRequestForm: false,
    //below state are for filters in side pannel
    prayerTopicOptions: [
      "Spiritual Growth",
      "Relationships",
      "Healing",
      "Peace",
      "Gratitude",
      "Forgiveness",
      "Grief",
      "Provision",
      "Wisdom",
      "Others",
    ],
    prayForOptions: [
      "Church",
      "Cellgroup",
      "Family",
      "Myself",
      "Friends",
      "Workplace",
      "School",
      "World Issues",
      "Others",
    ],
    selectedPrayerTopics: [], //for multiselect
    selectedPrayerFor: [], //for multiselect
    searchTitle: "",
    searchUserName: "",
    searchDate: "",

    newTitle: "",
    newDate: "",
    newPrayer_topic: [],
    newPray_for: [],
    newPrayerRequestContent: "",

    prayerRequestBeingEdited: null,
    editedPrayerRequest: "",

    responseBeingAdded: null,
    prayerRequestResponseBeingEdited: null,
    editedPrayerRequestResponse: "",

    responseBeingEdited: null,
    editedResponse: "",

    // modifiedTitle: "",
    // modifiedContent: "",

    prayerRequestAnsweredBeingEdited: null,
    editedPrayerRequestAnswered: "",
  };

  componentDidMount = async () => {
    const response = await axios.get(this.BASE_API_URL + "prayer_request");
    this.setState({
      data: response.data.requests,
    });
  };

  setTrueFalse = () => {
    this.setState({ showPrayerRequestForm: !this.state.showPrayerRequestForm });
  };

  setActive = (page) => {
    this.setState({
      active: page,
    });
  };

  updateFormField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // for the react-datepicker in create prayer request form
  handleDateChange = (date) => {
    this.setState({ startDate: date });
  };

  // must be async function to add the new PrayerRequest to the mongo database.
  addNewPrayerRequest = async () => {
    let response = await axios.post(this.BASE_API_URL + "prayer_request", {
      user: {
        username: this.props.user.username,
        user_email: this.props.user.user_email,
        cellgroup_id: this.props.user.cellgroup_id,
      },
      title: this.state.newTitle,
      date: this.state.startDate,
      prayer_topic: this.state.newPrayer_topic,
      pray_for: this.state.newPray_for,
      content: this.state.newPrayerRequestContent,
      response: [],
      answered: false,
    });

    console.log("cellgroup_id: ", this.props.user.cellgroup_id);
    console.log("date: ", this.props.user.cellgroup_id);

    this.setState({
      // data: [...this.state.data, response.data[0]],
      data: [...this.state.data, response.data.result],
      active: "prayerRequests",
    });
  };

  //for the calendar library filter
  changeDate = (date) => {
    this.setState({ date: date }, () => {
      this.setState({ searchDate: this.state.date });
    });
  };
  // changeDate = (date) => {
  //   this.setState({ date: date });
  // };

  //for date filter basis date selected in calendar library

  //methods for multiselect on side pannel
  //similar concept as handling checkboxes: modify array in React
  updateMultiSelectPrayerTopics = (selectedItem) => {
    // should not usd const modified = [...this.state.selectedValues, selectedItem];
    // because spread operator will crate a new array and result in returning an array of arrays
    this.setState({
      selectedPrayerTopics: selectedItem,
    });
  };
  removeMultiSelectPrayerTopics = () => {
    this.setState({ selectedPrayerTopics: [] });
  };

  updateMultiSelectPrayerFor = (selectedItem) => {
    this.setState({
      selectedPrayerFor: selectedItem,
    });
  };
  removeMultiSelectPrayerFor = () => {
    this.setState({ selectedPrayerFor: [] });
  };

  //methods for multiselect for create new prayerRequest
  selectNewPrayerTopic = (selectedItem) => {
    this.setState({ newPrayer_topic: selectedItem });
  };

  removeNewPrayerTopic = () => {
    this.setState({ newPrayer_topic: [] });
  };

  selectNewPrayFor = (selectedItem) => {
    this.setState({ newPray_for: selectedItem });
  };

  removeNewPrayFor = () => {
    this.setState({ newPray_for: [] });
  };

  //add onChange handler for the title when creating new prayer request
  inputTitle = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  filterSearch = async () => {
    const response = await axios.get(this.BASE_API_URL + "prayer_request", {
      params: {
        title: this.state.searchTitle,
        prayer_topic: this.state.selectedPrayerTopics,
        pray_for: this.state.selectedPrayerFor,
        date: this.state.searchDate,
        user: { username: this.state.searchUserName },
      },
    });
    console.log("response.date-->", response.date);
    console.log("response-->", response);
    console.log("searchdate-->", this.state.searchDate);

    this.setState({ data: response.data.requests });
  };

  clearSearch = async () => {
    this.setState(
      {
        selectedPrayerTopics: [],
        selectedPrayerFor: [],
        searchTitle: "",
        searchUserName: "",
        searchDate: "",
      },
      () => {
        // wrap axios call in a callback function to be called after the state update is complete
        axios
          .get(this.BASE_API_URL + "prayer_request", {
            params: {
              title: this.state.searchTitle,
              prayer_topic: this.state.selectedPrayerTopics,
              pray_for: this.state.selectedPrayerFor,
              date: this.state.searchDate,
              user: { username: this.state.searchUserName },
            },
          })
          .then((response) => {
            this.setState({ data: response.data.requests });
          })
          .catch((error) => {
            return alert(error);
          });
      }
    );
    // const response = await axios.get(this.BASE_API_URL + "prayer_request", {
    //   params: {
    //     title: this.state.searchTitle,
    //     prayer_topic: this.state.selectedPrayerTopics,
    //     pray_for: this.state.selectedPrayerFor,
    //     // date: this.state.date,
    //     // user: { username: this.state.searchUserName },
    //   },
    // });
    // this.setState({ data: response.data.requests });
  };

  //must use an arrow function here, coz it will automatically bind `this` to the parent component,
  //since arrow functions do not have their own `this` value,
  //so this inside an arrow function refers to the this value of the enclosing scope.
  //otherwise will result in error this.setState is not a function
  beginEditPrayerRequest = (p) => {
    this.setState({
      prayerRequestBeingEdited: p,
      editedPrayerRequest: p.content,
    });
  };

  updateEditedPrayerRequest = (event) => {
    this.setState({ editedPrayerRequest: event.target.value });
  };

  confirmEdit = async () => {
    //clone
    const modifiedPrayerRequest = { ...this.state.prayerRequestBeingEdited };
    modifiedPrayerRequest.content = this.state.editedPrayerRequest;

    //find index
    const indexModifiedPrayerRequest = this.state.data.findIndex(function (p) {
      return p._id === modifiedPrayerRequest._id;
    });

    // find left and right
    const left = this.state.data.slice(0, indexModifiedPrayerRequest);
    const right = this.state.data.slice(indexModifiedPrayerRequest + 1);

    //finally modify the clone
    const modified = [...left, modifiedPrayerRequest, ...right];
    this.setState({
      data: modified,
      prayerRequestBeingEdited: null,
    });

    // make PUT request to update the prayer request in the database
    try {
      // console.log(
      //   this.BASE_API_URL + "prayer_request/" + `${modifiedPrayerRequest._id}`
      // );
      const response = await axios.put(
        this.BASE_API_URL + "prayer_request/" + `${modifiedPrayerRequest._id}`,
        {
          date: new Date(modifiedPrayerRequest.date),
          prayer_topic: modifiedPrayerRequest.prayer_topic,
          pray_for: modifiedPrayerRequest.pray_for,
          content: modifiedPrayerRequest.content,
          answered: modifiedPrayerRequest.answered,
          response: modifiedPrayerRequest.response,
          user: {
            username: modifiedPrayerRequest.user.username,
            user_email: modifiedPrayerRequest.user.user_email,
          },
          title: modifiedPrayerRequest.title,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // --- start the response part ---
  //begin adding response
  beginEditPrayerRequestResponse = (p) => {
    this.setState({
      prayerRequestResponseBeingEdited: p,
    });
  };

  beginToAddResponse = (p) => {
    this.setState({
      responseBeingAdded: p,
    });
  };

  //sweetalert to handle response
  handleResponse = async () => {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Thank you for praying along",
      inputPlaceholder: "Type your prayer here...",
      inputAttributes: {
        "aria-label": "Type your prayer here",
      },
      showCancelButton: true,
    });
    console.log("text", text);

    if (text) {
      const response = await axios.post(
        this.BASE_API_URL +
          "prayer_request/" +
          `${this.state.responseBeingAdded._id}` +
          "/responses",
        {
          content: text,
          user_id: this.props.user.user_id,
          username: this.props.user.username,
        }
      );

      //clone
      const modifiedPrayerRequest = {
        ...this.state.prayerRequestResponseBeingEdited,
      };
      // modifiedPrayerRequest.response = this.state.editedPrayerRequestResponse;
      modifiedPrayerRequest.response = response.data.result;

      //find index
      const indexModifiedPrayerRequest = this.state.data.findIndex(function (
        p
      ) {
        return p._id === modifiedPrayerRequest._id;
      });

      //find left and right
      const left = this.state.data.slice(0, indexModifiedPrayerRequest);
      const right = this.state.data.slice(indexModifiedPrayerRequest + 1);

      //modify the clone
      const modified = [...left, modifiedPrayerRequest, ...right];
      // console.log("mod:", modified);
      this.setState({
        data: modified,
        prayerRequestResponseBeingEdited: null,
      });
    }
  };

  //handle delete response
  //the 3 arguements in the function comes from where it is called (prayerRequest.js) , so already being iterated in the map.
  handleDeleteResponse = async (prayerRequest, response, index) => {
    //basis the index of the response to be deleted, create a new array
    let newResponseArray = prayerRequest.response.filter(
      (r, index_r) => index_r !== index
    );

    // Create a copy of the prayerRequest object and its response array
    const updatedPrayerRequest = {
      ...prayerRequest,
      response: newResponseArray,
    };

    //find index of the prayer request
    const indexPrayerRequest = this.state.data.findIndex(
      (p) => p._id === prayerRequest._id
    );

    //splice method:newData.splice(indexPrayerRequest, 1, updatedPrayerRequest);
    const modifiedPrayerRequest = [
      ...this.state.data.slice(0, indexPrayerRequest),
      updatedPrayerRequest,
      ...this.state.data.slice(indexPrayerRequest + 1),
    ];

    const updatedResponse = await axios.delete(
      this.BASE_API_URL +
        "prayer_request/" +
        `${updatedPrayerRequest._id}` +
        "/responses/" +
        `${response.response_id}`
    );

    //make a new data
    this.setState({ data: modifiedPrayerRequest });
  };

  //handle edit response

  // beginEditResponse = (response) => {
  //   this.setState({
  //     responseBeingEdited: response,
  //     editedResponse: response.content,
  //   });
  // };

  beginEditResponse = (prayerRequest, response) => {
    //find id of the response being edited
    this.setState({
      responseBeingEdited: response.response_id,
      editedResponse: response.content,
    });
  };

  updateEditedResponse = (event) => {
    this.setState({ editedResponse: event.target.value });
  };

  confirmEditResponse = async (prayerRequest, response, index) => {
    //find index of the prayer request
    const indexPrayerRequest = this.state.data.findIndex(
      (p) => p._id === prayerRequest._id
    );

    //find the id of the response being edited

    response.content = this.state.editedResponse;

    //clone response and update the clone with new content
    const updatedResponse = { ...response, content: response.content };

    //clone prayerRequest and update its response array with the updatedResponse
    const updatedPrayerRequest = {
      ...prayerRequest,
      // updatedResponse,
      response: [
        ...prayerRequest.response.slice(0, index),
        updatedResponse,
        ...prayerRequest.response.slice(index + 1),
      ],
    };

    //create new data
    const modifiedPrayerRequest = [
      ...this.state.data.slice(0, indexPrayerRequest),
      updatedPrayerRequest,
      ...this.state.data.slice(indexPrayerRequest + 1),
    ];
    //make a new data
    this.setState({ data: modifiedPrayerRequest, responseBeingEdited: null });

    const newResponse = await axios.put(
      this.BASE_API_URL +
        "prayer_request/" +
        `${updatedPrayerRequest._id}` +
        "/responses/" +
        `${response.response_id}`,
      {
        content: updatedResponse.content,
      }
    );
  };

  // --- start the answered part ---
  beginEditAnswered = (p) => {
    this.setState({
      prayerRequestAnsweredBeingEdited: p,
      editedPrayerRequestAnswered: p.answered,
    });
  };

  handleAnswered = async () => {
    const result = await Swal.fire({
      title: "Your prayer has been answered?",
      input: "radio",
      inputOptions: {
        true: "Yes!",
      },
      inputValidator: (value) => {
        if (!value) {
          return "You need to select something.";
        }
      },
    });

    if (result.isConfirmed) {
      //clone
      const modifiedPrayerRequest = {
        ...this.state.prayerRequestAnsweredBeingEdited,
      }; //result.value is from sweeralert
      modifiedPrayerRequest.answered = result.value;

      //findIndex
      const indexModifiedPrayerRequest = this.state.data.findIndex(function (
        p
      ) {
        return (p._id = modifiedPrayerRequest._id);
      });

      //find left and right
      const left = this.state.data.slice(0, indexModifiedPrayerRequest);
      const right = this.state.data.slice(indexModifiedPrayerRequest + 1);

      //modify the clone
      const modified = [...left, modifiedPrayerRequest, ...right];
      this.setState({
        data: modified,
        prayerRequestAnsweredBeingEdited: null,
      });
      try {
        const response = await axios.put(
          this.BASE_API_URL +
            "prayer_request/" +
            `${modifiedPrayerRequest._id}` +
            "/answered",
          {
            answered: modifiedPrayerRequest.answered,
          }
        );
        // console.log(modifiedPrayerRequest.answered);
      } catch (error) {}
    }
  };

  //---delete prayer request---
  handleDeletePrayerRequest = async (prayerRequest) => {
    //find index by comparing p._id with prayerRequest._id, so need to use ===
    //using `=` will cause indexDeletePrayerRequest not returning anything
    const indexDeletePrayerRequest = this.state.data.findIndex(function (p) {
      return p._id === prayerRequest._id;
    });

    //make a copy of the array, but skip over the one to be deleted
    const newArray = [
      ...this.state.data.slice(0, indexDeletePrayerRequest),
      ...this.state.data.slice(indexDeletePrayerRequest + 1),
    ];

    const response = await axios.delete(
      this.BASE_API_URL + "prayer_request/" + `${prayerRequest._id}`
    );
    console.log("delete-->", response);

    //  if (response.status === 200 || response.status === 204) {
    //   this.setState({
    //     data: newArray,
    //   });
    // } else {

    this.setState({
      data: newArray,
    });
  };

  renderContent() {
    if (this.state.data.length === 0) {
      return null;
    } else {
      if (this.state.active === "prayerRequests") {
        return (
          <PrayerRequests
            data={this.state.data}
            prayerRequestBeingEdited={this.state.prayerRequestBeingEdited}
            editedPrayerRequest={this.state.editedPrayerRequest}
            editPrayerRequest={this.beginEditPrayerRequest}
            updateEditedPrayerRequest={this.updateEditedPrayerRequest}
            confirmEdit={this.confirmEdit}
            user={this.props.user}
            beginToAddResponse={this.beginToAddResponse}
            handleResponse={this.handleResponse}
            beginEditPrayerRequestResponse={this.beginEditPrayerRequestResponse}
            prayerRequestResponseBeingEdited={
              this.state.prayerRequestResponseBeingEdited
            }
            beginEditAnswered={this.beginEditAnswered}
            handleAnswered={this.handleAnswered}
            startDate={this.state.startDate}
            handleDeletePrayerRequest={this.handleDeletePrayerRequest}
            handleDeleteResponse={this.handleDeleteResponse}
            beginEditResponse={this.beginEditResponse}
            updateEditedResponse={this.updateEditedResponse}
            confirmEditResponse={this.confirmEditResponse}
            responseBeingEdited={this.state.responseBeingEdited}
            editedResponse={this.state.editedResponse}
          />
        );
      }
      // else if (this.state.active === "createNewPrayerRequest") {
      //   return <CreateNewPrayerRequest />;
      // }
    }
  }

  renderNewPrayerRequestForm() {
    if (this.state.showPrayerRequestForm === false) {
      return <React.Fragment></React.Fragment>;
    } else if (this.state.showPrayerRequestForm === true) {
      return (
        <React.Fragment>
          <CreateNewPrayerRequest
            onUpdateFormField={this.updateFormField}
            onAddNewPrayerRequest={this.addNewPrayerRequest}
            prayerTopicOptions={this.state.prayerTopicOptions}
            prayForOptions={this.state.prayForOptions}
            selectNewPrayerTopic={this.selectNewPrayerTopic}
            removeNewPrayerTopic={this.removeNewPrayerTopic}
            selectNewPrayFor={this.selectNewPrayFor}
            removeNewPrayFor={this.removeNewPrayFor}
            newTitle={this.state.newTitle}
            newPrayer_topic={this.state.newPrayer_topic}
            newPray_for={this.state.newPray_for}
            newPrayerRequestContent={this.state.newPrayerRequestContent}
            startDate={this.state.startDate}
            handleDateChange={this.handleDateChange}
            setTrueFalse={this.setTrueFalse}
          />
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <section
              id="side_pannel"
              className="d-none d-lg-block col-lg-2"
              style={{
                borderRadius: "5px",
                backgroundColor: "#F5F5F5",
              }}
            >
              <header>
                <h>place holder for a caption here</h>
              </header>
              <div>
                <Calendar onChange={this.changeDate} value={this.state.date} />
              </div>

              {/* side pannel filters */}
              <div>
                <h5 style={{ marginTop: "1rem" }}>Search Area</h5>
                <div style={{ marginTop: "1rem" }}>
                  <MultiselectPrayerTopic
                    options={this.state.prayerTopicOptions}
                    onSelect={this.updateMultiSelectPrayerTopics}
                    onRemove={this.removeMultiSelectPrayerTopics}
                  />
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <MultiselectPrayFor
                    options={this.state.prayForOptions}
                    onSelect={this.updateMultiSelectPrayerFor}
                    onRemove={this.removeMultiSelectPrayerFor}
                  />
                </div>
                <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Title"
                    name="searchTitle"
                    value={this.state.searchTitle}
                    onChange={this.updateFormField}
                  />
                </div>
                <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Created by (username) "
                    name="searchUserName"
                    value={this.state.searchUserName}
                    onChange={this.updateFormField}
                  />
                </div>
                <div className="d-flex justify-content-evenly">
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ margin: "1rem" }}
                    onClick={this.filterSearch}
                  >
                    SEARCH
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ margin: "1rem" }}
                    onClick={() => {
                      this.clearSearch();
                      this.removeMultiSelectPrayerTopics();
                    }}
                    // onClick={this.removeMultiSelectPrayerTopics}
                  >
                    CLEAR
                  </button>
                </div>
              </div>
            </section>
            <Offcanvas
              show={this.state.showMenu}
              onHide={() => this.setState({ showMenu: false })}
              style={{ width: "80vw" }}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Search</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <section
                  id="side_pannel"
                  className="col-lg-2 container-fluid"
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  <header>
                    <h>place holder for a caption here</h>
                  </header>
                  <div>
                    <Calendar
                      onChange={this.changeDate}
                      value={this.state.date}
                    />
                  </div>

                  {/* side pannel filters */}
                  <div>
                    <h5 style={{ marginTop: "1rem" }}>Search Area</h5>
                    <div style={{ marginTop: "1rem" }}>
                      <MultiselectPrayerTopic
                        options={this.state.prayerTopicOptions}
                        onSelect={this.updateMultiSelectPrayerTopics}
                        onRemove={this.removeMultiSelectPrayerTopics}
                      />
                    </div>
                    <div style={{ marginTop: "1rem" }}>
                      <MultiselectPrayFor
                        options={this.state.prayForOptions}
                        onSelect={this.updateMultiSelectPrayerFor}
                        onRemove={this.removeMultiSelectPrayerFor}
                      />
                    </div>
                    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Title"
                        name="searchTitle"
                        value={this.state.searchTitle}
                        onChange={this.updateFormField}
                      />
                    </div>
                    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Created by (username) "
                        name="searchUserName"
                        value={this.state.searchUserName}
                        onChange={this.updateFormField}
                      />
                    </div>
                    <div className="d-flex justify-content-evenly">
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ margin: "1rem" }}
                        onClick={this.filterSearch}
                      >
                        SEARCH
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ margin: "1rem" }}
                        onClick={() => {
                          this.clearSearch();
                          this.removeMultiSelectPrayerTopics();
                        }}
                        // onClick={this.removeMultiSelectPrayerTopics}
                      >
                        CLEAR
                      </button>
                    </div>
                  </div>
                </section>
              </Offcanvas.Body>
            </Offcanvas>

            <section className="col" id="prayerwall">
              <div
                style={{
                  backgroundImage: `url(${worship})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom",
                  borderRadius: "4px",
                }}
              >
                <div className="d-flex justify-content-start p-2">
                  <AiTwotoneFilter
                    className="d-lg-none"
                    style={{ color: "#55BB8E", fontSize: "larger" }}
                    onClick={() =>
                      this.setState({ showMenu: !this.state.showMenu })
                    }
                  />
                </div>

                <header>
                  <h1 className="pt-5 pb-5" style={{ color: "whitesmoke" }}>
                    Prayer Wall for <FcLikePlaceholder className="mb-3 me-1" />
                    {this.props.user.cellgroup_name}
                    <FcLikePlaceholder className="mb-3 ms-1" />
                  </h1>
                </header>
                <div className="pb-4">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={this.setTrueFalse}
                  >
                    SHARE YOUR PRAYER REQUEST
                  </button>
                </div>
              </div>

              <div>{this.renderNewPrayerRequestForm()}</div>
              <div
                className="mt-2"
                style={{ height: "calc(100vh - 270px)", overflowY: "scroll" }}
              >
                {this.renderContent()}
              </div>
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
