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
import umbrella from "../img/umbrella.jpg";

//!!!important note: in JSX, components are used with captial first letter, otherwise cannot be recongnized as JSX hence cannot render

export default class PrayerWall extends React.Component {
  BASE_API_URL = "http://localhost:4000/";

  state = {
    active: "prayerRequests",
    data: [],

    date: new Date(), //for the Calendar Library

    // datePicker: new Date(), //for the datePicker Library

    startDate: new Date(),

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

    // newRequested_by: "",
    // newRequested_by_email: "",
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

    // console.log(response.data);
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
      date: this.state.datePicker,
      prayer_topic: this.state.newPrayer_topic,
      pray_for: this.state.newPray_for,
      content: this.state.newPrayerRequestContent,
      response: [],
      answered: false,
    });

    console.log("data: ", this.state.data);
    console.log("response: ", response.data);

    this.setState({
      // data: [...this.state.data, response.data[0]],
      data: [...this.state.data, response.data.result],
      active: "prayerRequests",
    });
  };

  //for the calendar library filter
  changeDate = (date) => {
    this.setState({ date: date });
  };

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
        // cellgroupId: this.props.user.cellgroupId,
        title: this.state.searchTitle,
        prayer_topic: this.state.selectedPrayerTopics,
        pray_for: this.state.selectedPrayerFor,
        // date: this.state.date,
        user: { username: this.state.searchUserName },
      },
    });

    console.log(response.data);

    this.setState({ data: response.data.requests });
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
      console.log(
        this.BASE_API_URL + "prayer_request/" + `${modifiedPrayerRequest._id}`
      );
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
      console.log("mod:", modified);
      this.setState({
        data: modified,
        prayerRequestResponseBeingEdited: null,
      });
    }
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
        console.log(modifiedPrayerRequest.answered);
      } catch (error) {}
    }
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
          <div className="row" style={{ height: "93vh" }}>
            <section
              id="side_pannel"
              className="col col-lg-2"
              style={{
                // border: "solid 1px #E2E7E4",
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
                <div>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ margin: "1rem" }}
                    onClick={this.filterSearch}
                  >
                    SEARCH
                  </button>
                </div>
              </div>
            </section>

            <section className="col" id="prayerwall">
              <div
                style={{
                  backgroundImage: `url(${umbrella})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  borderRadius: "4px",
                  // position: "sticky",
                }}
              >
                <header>
                  <h1 className="pt-5 pb-5" style={{ color: "whitesmoke" }}>
                    Prayer Wall for <FcLikePlaceholder className="mb-3 me-1" />
                    {this.props.user.cellgroup_name}
                    <FcLikePlaceholder className="mb-3 ms-1" />
                  </h1>
                </header>
                <div className="pb-2">
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
