import React from "react";
// import DatePickerFunc from "./datePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MultiselectPrayFor from "./multiselectPrayerFor";
import MultiselectPrayerTopic from "./multiselectPrayerTopic";
import { BsFillCalendarHeartFill } from "react-icons/bs";

export default function createNewPrayerRequest(props) {
  return (
    <React.Fragment>
      <form
        className="container mt-4"
        style={{
          maxWidth: "40rem",
          padding: "1rem",
          backgroundColor: "#F5F5F5",
          borderRadius: "5px",
          border: "solid 2px #E2E7E4",
        }}
      >
        <div className="row">
          <h5>Welcome to The Safe Space Prayer Wall</h5>
        </div>

        <div
          className="row mt-3"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="newTitle"
              value={props.newTitle}
              onChange={props.onUpdateFormField}
            />
          </div>
          <div className="col-md-6 mb-3">
            <DatePicker
              selected={props.startDate}
              onChange={props.handleDateChange}
              showIcon
            />
          </div>
        </div>

        <div
          className="row mt-3"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          <div className="col-md-6 mb-3">
            <MultiselectPrayerTopic
              options={props.prayerTopicOptions}
              onSelect={props.selectNewPrayerTopic}
              onRemove={props.removeNewPrayerTopic}
            />
          </div>
          <div className="col-md-6 mb-3">
            <MultiselectPrayFor
              options={props.prayForOptions}
              onSelect={props.selectNewPrayFor}
              onRemove={props.removeNewPrayFor}
            />
          </div>
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Prayer Request: 300 character max."
            name="newPrayerRequestContent"
            value={props.newPrayerRequestContent}
            onChange={props.onUpdateFormField}
          ></textarea>
        </div>

        <div className="row mt-3">
          <div class="col-12 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary mb-3"
              onClick={() => {
                props.onAddNewPrayerRequest();
                props.setTrueFalse();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}
