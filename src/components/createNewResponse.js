import React from "react";

export default class createNewResponse extends React.Component {
  render() {
    return (
      <React.Fragment>
        <form
          className="container"
          style={{
            width: "40rem",
            padding: "1rem",
            border: "solid grey 0.5px",
          }}
        >
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="newTitle"
              //   value={props.newTitle}
              //   onChange={props.onUpdateFormField}
            />
          </div>
        </form>
      </React.Fragment>
    );
  }
}
