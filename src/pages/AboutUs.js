import React from "react";

export default class AboutUs extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div
          className="container row justify-content-end "
          style={{ color: "white" }}
        >
          <div className="col-lg-5 bg-gradient">
            <h2>About Us</h2>
            <p>
              Welcome to our prayer wall website. We're so glad you're here.
            </p>{" "}
            <p>
              Sometimes it can feel like you're all alone, that no one
              understands what you're going through. But we believe prayer is a
              powerful tool that can help bring us closer to God and to each
              other. As it says in James 5:16, "Therefore confess your sins to
              each other and pray for each other so that you may be healed. The
              prayer of a righteous person is powerful and effective." We want
              to create a community that values authenticity, vulnerability, and
              empathy, where people can come as they are and find the love and
              support they need. As it says in Colossians 3:13, "Bear with each
              other and forgive one another if any of you has a grievance
              against someone. Forgive as the Lord forgave you." We believe that
              when we come together in prayer, God listens and responds to our
              needs. As it says in 1{" "}
              <span className="bible-verse" style={{ color: "pink" }}>
                John 5:14-15
              </span>
              ,{" "}
              <span style={{ fontStyle: "italic", fontWeight: "lighter" }}>
                "This is the confidence we have in approaching God: that if we
                ask anything according to his will, he hears us. And if we know
                that he hears us—whatever we ask—we know that we have what we
                asked of him."
              </span>{" "}
              Through prayer, we can find comfort, hope, and healing, and we can
              lift each other up in times of need. As it says in Ephesians 6:18,
              "And pray in the Spirit on all occasions with all kinds of prayers
              and requests. With this in mind, be alert and always keep on
              praying for all the Lord’s people."
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
