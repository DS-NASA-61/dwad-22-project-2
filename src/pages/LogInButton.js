import React from "react";

export default class LogInButton extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
            // backgroundColor: "black",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontSize: "3.5rem",
                color: "white",
                textShadow: "2px 2px 4px #000000",
              }}
            >
              Come, Let's Pray
            </h1>
            <p
              style={{
                color: "#E1E1E1",
                fontSize: "1.5rem",
                fontStyle: "italic",
                maxWidth: "700px",
                margin: "1rem 0",
              }}
            >
              "Confess your faults one to another, and pray one for another,
              that ye may be healed. The effectual fervent prayer of a righteous
              man availeth much." - James 5:16
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.props.goToLogIn}
              style={{
                display: "inline-block",
                margin: "2rem auto 0",
                fontSize: "1.25rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "2px",
                backgroundColor: "#FFB900",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "5px",
                padding: "5px 20px",
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                transition: "all 0.3s ease-in-out",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-4px)";
                e.target.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
                e.target.style.borderRadius = "12px";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";
                e.target.style.borderRadius = "8px";
              }}
            >
              Log in
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
