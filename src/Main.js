import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LandingPage from "./pages/LandingPage";
import PrayerWall from "./pages/PrayerWall";
import Members from "./pages/Members";

export default class Main extends React.Component {
  BASE_API_URL = "http://localhost:4000/";
  state = {
    page: "landing",
    user: null,
  };

  //   componentDidMount = async () => {
  //     const response = await axios.get(this.BASE_API_URL + "prayer_request");
  //     this.setState({
  //       data: response.data,
  //     });
  //   };

  renderPage = () => {
    if (this.state.page === "landing") {
      return <LandingPage login={this.login} switchPage={this.switchPage} />;
    }

    if (this.state.page === "prayerwall") {
      return <PrayerWall user={this.state.user} />;
    }
    if (this.state.page === "members") {
      return <Members />;
    }
  };

  switchPage = (currentPage) => {
    this.setState({ page: currentPage });
  };

  //need to do I axios POST call (log in), passing in the info in the form
  // these three are passed from child
  // login = async (username, email, password) => {
  //   const response = await axios.post(this.BASE_API_URL + "login", {
  //     username: username,
  //     user_email: email,
  //     password: password,
  //   });
  //   // console.log(response);
  //   this.setState({
  //     page: "prayerWall",
  //     user: response.data,
  //   });
  // };

  login = async (username, email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(this.BASE_API_URL + "login", {
          username: username,
          user_email: email,
          password: password,
        });
        // console.log(response);
        this.setState({
          page: "prayerWall",
          user: response.data,
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="main-background-color mt-3">
          <Navbar collapseOnSelect variant="light" expand="lg">
            <Container>
              <Navbar.Brand href="#landing">
                <div className="div-align-title">
                  <span className="nav-title-spacing">Safe Space logo</span>
                </div>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link
                    href="#landing"
                    onClick={() => this.switchPage("landing")} //bug log : must wrap the call to switchPage in an arrow function, to create a new function that will be executed only when the Nav.Link is clicked, otherwise it will execute during rendering.
                  >
                    Home
                  </Nav.Link>
                  {this.state.user ? (
                    <Nav.Link
                      href="#prayerwall"
                      onClick={() => this.switchPage("prayerwall")}
                    >
                      Prayer Wall
                    </Nav.Link>
                  ) : null}
                  {/* <Nav.Link
                    href="#prayerwall"
                    onClick={() => this.switchPage("prayerwall")}
                  >
                    Prayer Wall
                  </Nav.Link> */}
                  <Nav.Link
                    href="#members"
                    onClick={() => this.switchPage("members")}
                  >
                    Members
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          {this.renderPage()}
        </div>
      </React.Fragment>
    );
  }
}
