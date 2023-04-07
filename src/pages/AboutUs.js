import React from "react";

export default class AboutUs extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container py-4">
          <div className="row justify-content-end text-white p-2">
            <div
              className="col-lg-5 bg-gradient"
              style={{
                backgroundColor: "black",
                opacity: "70%",
                borderRadius: "5px",
                transition: "transform 0.2s ease",
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              <h2 className="pt-3">About Us</h2>
              <p>
                Welcome to our prayer wall website. We are grateful that you
                have joined us here.
              </p>
              <p>
                Every day we have the opportunity to tap into God's power and
                build a relationship with Him through prayer.He is present at
                every moment looking to hear from us about everything at any
                time. If we learn to go to Him in prayer, we will see so many
                breakthroughs in life.
              </p>
              <p>
                Our community values authenticity, vulnerability, and empathy,
                and we welcome everyone to come as they are and find the love
                and support they need.
              </p>
              <p>
                Through prayer, we find comfort, hope, and healing, and we lift
                each other up in times of need. As it says in{" "}
                <span className="bible-verse" style={{ color: "#55BB8E" }}>
                  Ephesians 6:18
                </span>
                ,{" "}
                <span className="bible-verse" style={{ fontStyle: "italic" }}>
                  "And pray in the Spirit on all occasions with all kinds of
                  prayers and requests. With this in mind, be alert and always
                  keep on praying for all the Lord’s people."
                </span>{" "}
              </p>
              <p className="text-right mb-0">
                <br />
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
