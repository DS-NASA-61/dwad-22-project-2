import React from "react";
import axios from "axios";

export default class LandingPage extends React.Component {
  BASE_API_URL = "http://localhost:4000/";
  state = {
    data: [],
    username: "",
    user_email: "",
  };

  componentDidMount = async () => {
    const response = await axios.get(this.BASE_API_URL + "prayer_request");
    this.setState({
      data: response.data,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">hello</div>
      </React.Fragment>
    );
  }
}
