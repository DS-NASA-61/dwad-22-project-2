import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LandingPage from "./pages/LandingPage";
import LogInButton from "./pages/LogInButton";
import PrayerWall from "./pages/PrayerWall";
import AboutUs from "./pages/AboutUs";
import Swal from "sweetalert2";
import background3 from "./img/background3.png";

export default class Main extends React.Component {
  BASE_API_URL = "http://localhost:4000/";
  state = {
    page: "loginbutton",
    user: null,
  };

  switchPage = (currentPage) => {
    this.setState({ page: currentPage });
  };

  goToLogIn = () => {
    this.setState({ page: "landing" });
  };

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

  // need to do an axios POST call (log in), passing in the info in the form
  // these three are passed from child
  // wrap the axios.post call in a Promise to enable "login and then switch" to happen one after another
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
        if (error.response) {
          //https://axios-http.com/docs/handling_errors
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            iconColor: "white",
            customClass: {
              popup: "colored-toast",
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
          await Toast.fire({
            icon: "error",
            title: error.response.data.error,
          });
        }
      }
    });
  };

  signup = async (username, email, password, selectedCellGroup) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(this.BASE_API_URL + "signup", {
          username: username,
          user_email: email,
          password: password,
          cell_group_name: selectedCellGroup,
        });
        this.setState({
          user: response.data.response,
          page: "prayerWall",
        });
        resolve(response.data.response);
        console.log("response.data-->", response.data.response);
      } catch (error) {
        reject(error);
        if (error.response) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            iconColor: "white",
            customClass: {
              popup: "colored-toast",
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
          await Toast.fire({
            icon: "error",
            title: error.response.data.error,
          });
        }
      }
    });
  };

  renderPage = () => {
    if (this.state.page === "loginbutton") {
      return <LogInButton goToLogIn={this.goToLogIn} />;
    }
    if (this.state.page === "landing") {
      return (
        <LandingPage
          login={this.login}
          switchPage={this.switchPage}
          onSignup={this.signup}
          goToLogIn={this.goToLogIn}
        />
      );
    }

    // if (this.state.page === "signup") {
    //   return <UserSignUp signup={this.login} switchPage={this.switchPage} />;
    // }

    if (this.state.page === "prayerwall") {
      return <PrayerWall user={this.state.user} />;
    }

    if (this.state.page === "aboutus") {
      return <AboutUs />;
    }
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="main-background-color"
          style={{
            height: "100vh",
            width: "99wh",
            backgroundImage: `url(${background3})`,
            backgroundSize: "cover",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            borderRadius: "4px",
          }}
        >
          <Navbar
            className="navbar-custom bg-transparent"
            collapseOnSelect
            variant="dark"
            expand="lg"
            style={{
              position: "sticky",
              top: "0",
            }}
          >
            <Container>
              <Navbar.Brand href="#landing" style={{ color: "lightgrey" }}>
                <div className="div-align-title">
                  <span className="nav-title-spacing">Safe Space logo</span>
                </div>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link
                    href="#landing"
                    style={{ color: "white" }}
                    onClick={() => this.switchPage("loginbutton")} //bug log : must wrap the call to switchPage in an arrow function, to create a new function that will be executed only when the Nav.Link is clicked, otherwise it will execute during rendering.
                  >
                    Home
                  </Nav.Link>
                  {this.state.user ? (
                    <Nav.Link
                      href="#prayerwall"
                      style={{ color: "lightgrey" }}
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
                    href="#aboutus"
                    style={{ color: "lightgrey" }}
                    onClick={() => this.switchPage("aboutus")}
                  >
                    AboutUs
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
