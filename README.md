# **WALL OF PRAYS**

<img src="img/mobile responsive mockup.PNG" style="display: block">

Link to demo : [WALL OF PRAYS](https://wall-of-prays.netlify.app/)

## Summary

WALL OF PRAYS is a safe and supportive platform for cellgroup and cell group members to share their prayer requests and receive uplifting responses from a community of like-minded individuals. By creating a user account, you can easily post your prayer requests and select the prayer topic and who you are praying for. Logged-in users can respond to requests and provide messages of support and hope. User's prayer requests and responses are only avalible to your cellgroupd members

Our website is designed to be user-friendly, with a simple and intuitive layout that makes it easy to post, edit, and manage your prayer requests. You can edit and delete your requests and responses at any time, and mark your requests as "answered" when God has answered your prayers.

## UI/UX

### Strategy

#### Organisational Goals

- To create a supportive and positive community where users can share their prayer requests and receive uplifting responses from others.
- To provide an easy-to-use platform where users can manage their prayer requests and responses.
- To foster a sense of belonging and connectedness among users by providing a safe and welcoming space for them to share their thoughts and feelings.
- To promote a culture of empathy and compassion among users by encouraging them to support and uplift one another.
- To establish the website as a trusted and respected resource for those seeking emotional and spiritual support.

#### User Goals

- To express their personal prayer requests and receive prayers and supportive messages from others in the community.
- To feel heard and understood by a community of like-minded individuals who share similar struggles and beliefs.
- To be able to manage their prayer requests and responses in a simple and intuitive way.
- To connect with others who share their faith and beliefs, and to feel a sense of belonging and connection.
- To find emotional and spiritual support during times of stress, hardship, and uncertainty.

| User Story                                                                                                                     | Acceptance Criteria                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| As a user, I want to create a new prayer request so that I can receive prayers and support from the community.                 | - I can create a new prayer request by filling out a form that includes the prayer topic and who I am praying for.<br>- The request is saved and displayed on the homepage.                                                                                                                                                             |
| As a user, I want to edit my prayer request so that I can update it with new information.                                      | - I can click on the edit icon aboe my prayer request post.<br>- Once click on an "edit" button that allows me to update the prayer request content.<br>- The changes are saved and displayed on the the prayer request page.                                                                                                           |
| As a user, I want to delete my prayer request so that I can remove it from the website.                                        | - I can click on the delete icon aboe my prayer request post.<br>- Once clicked, it removes the prayer request and the response belongs to it from the website.<br>- The request is no longer displayed on the prayer request page.                                                                                                     |
| As a user, I want to respond to a prayer request so that I can provide prayers and support to the person who made the request. | - I can click on a prayer request from the homepage and navigate to the request page.<br>- On the request page, I can fill out a form that includes my name and a message of support.<br>- The response is saved and displayed on the request page with the most recent responses at the top.                                           |
| As a user, I want to edit my response to a prayer request so that I can update it with new information.                        | - I can click on a prayer request from the homepage and navigate to the request page.<br>- On the request page, I can click on an "edit" button next to my response that allows me to update my name or message of support.<br>- The changes are saved and displayed on the request page.                                               |
| As a user, I want to delete my response to a prayer request so that I can remove it from the website.                          | - I can click on a prayer request from the homepage and navigate to the request page.<br>- On the request page, I can click on a "delete" button next to my response that removes the response from the website.<br>- The response is no longer displayed on the request page.                                                          |
| As a user, I want to mark my prayer request as "answered" so that I can indicate that my prayers have been heard.              | - I can click on my prayer request from the homepage and navigate to the request page.<br>- On the request page, I can click on a "mark as answered" button that changes the status of the request to "answered".<br>- The request is displayed on the homepage and the request page with a label indicating that it has been answered. |
| As a user, I want to view the prayer requests and responses of other users so that I can offer prayers and support.            | - I can navigate to the homepage and view a list of the most recent prayer requests.<br>- I can click on a request to navigate to the request page and view the original request and any responses.<br>- I can offer my own response by filling out a form on the request page.                                                         |

### Structure and Skeleton

#### Database

![ERD Diagram](readme/ERD-diagram.png)

Entity-Relationship Diagram (ERD) is drawn to demostrate the various relationships between entities for the website prior to modelling the database in MongoDB.

An Express server is set up and deployed to [Render](https://render.com/), where API endpoints are accessible via the base URL at [https://ds-wallofprays.onrender.com].

#### Sitemap

![Sitemap](readme/sitemap.png)

#### Wireframes

[Wireframes](readme/wireframes.pdf)

### Design Decisions

#### Color scheme

![Screenshot of color scheme](readme/color-scheme.png)

The color scheme chosen revolves around a brown-based primary color as it represents the color of coffee, which is the theme of the website. Brown also implies friendliness and simplicity, which matches the look that the website aims to achieve.

#### Fonts

_Gill Sans_ has a very distinctive look, with bold and upright letterforms, even stroke weights, and a geometric construction that gives it a modern and minimalist feel. It is known for its legibility and versatility, can also help create a sense of unity and coherence throughout the website, contribute to a sense of professionalism and reliability, which is important for users seeking spiritual guidance and support.

## Features

## Features

| Feature                             | Description                                                                                                                                          |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| User Authentication                 | Allows users to create and log into their personal accounts, ensuring their prayer requests and responses to be only visible by their own cellgroup. |
| Prayer Request Creation             | Enables users to create and post their prayer requests, including choosing a prayer request topic and specifying who they are praying for.           |
| Prayer Request Editing and Deletion | Allows users to edit or delete their prayer requests as needed, ensuring that their requests remain up-to-date and relevant.                         |
| Response Creation                   | Enables users to respond to other users' prayer requests, providing support and encouragement to those in need.                                      |
| Response Editing and Deletion       | Allows users to edit or delete their responses as needed, ensuring that their responses remain appropriate and respectful.                           |
| Prayer Request Status               | Enables users to change the status of their prayer requests, indicating whether they have been answered or are still ongoing.                        |
| Prayer Request Search               | Enables users to search prayer requests by created by, prayer topic, prayed for, title and created after date.                                       |

## Limitations and Future Implementations

As of now, the website does not have proper security measures in place for user information and user login. In order to ensure the safety and privacy of our users, this feature will be implemented in future updates.

Additionally, there are several potential future implementations for the website, including:

- Implementing a notification system to alert users when their prayer requests have been responded to or when someone has commented on their request.
- Enable user to create their own more diverse and specific prayer request topics to better cater to users' needs and preferences.

## Technologies Used

### Backend

1. Javascript

2. [Express](https://expressjs.com/)

3. [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/current/)

   - To communicate with MongoDB database

4. [cors](https://www.npmjs.com/package/cors)

   - Middleware to enable Cross-Origin Resource Sharing (CORS)

5. [dotenv](https://www.npmjs.com/package/dotenv)

   - To allow loading of environment variables from .env file

6. [Bcrypt](https://www.npmjs.com/package/bcrypt)
   - For hashing and validating email

### Frontend

1. HTML

2. CSS

3. Javascript

4. [React](https://reactjs.org/)

5. [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)

   - Used for styling website

6. [React Bootstrap](https://react-bootstrap.github.io/)

   - Used for styling website

7. [Axios](https://github.com/axios/axios)

   - Used to communicate with Express server to create, read, update and delete data in database

8. [Font Awesome](https://fontawesome.com/)
   - Used for icons displayed in website

---

## Testing

The website is tested for responsiveness using Developer Tools on Chrome browser for mobile, tablet and desktop screen widths.
The test cases can be found [here](readme/test-cases.pdf).

---

## Deployment

### Frontend

The website is hosted using [Netlify](https://www.netlify.com/), deployed directly from the main branch of this Github repository.
For the detailed deployment steps, you can refer to the blog post on Netlify [here](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/).

### Backend

The Express server is hosted using [Heroku](https://www.heroku.com/), deployed directly from the main branch of the Github repository [here](https://github.com/e0026557/tgc-18-project-2-api).
For the detailed deployment steps, you can refer to the documentation on Heroku [here](https://devcenter.heroku.com/articles/git#deploy-your-code).

---

## Credits and Acknowledgement

### Logo :

- [Adobe Express Logo Maker](https://www.adobe.com/express/create/logo) - Used to generate brand logo for website

### Fonts :

- [Google Fonts](https://fonts.google.com/) - Used for fonts displayed in website

### Icons :

- [Font Awesome](https://fontawesome.com/) - Used for icons displayed in website

### CSS Spinner :

- [SpinKit](https://tobiasahlin.com/spinkit/) - Adapted CSS spinner for use in website

### Box Shadows:

- [CSS Scan](https://getcssscan.com/css-box-shadow-examples) - For box-shadows used to style website

### Regular Expressions

- [w3resource](https://www.w3resource.com/javascript/form/email-validation.php) - Used Regex for email validation

- [StackOverflow](https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url) - Used Regex for URL validation

### Dynamic Form Input :

- [FreeCodeCamp](https://www.freecodecamp.org/news/build-dynamic-forms-in-react/) - For dynamic form input implementation idea

### Images :

- [Unsplash](https://unsplash.com/) - For coffee images used in website

### Screenshot :

- [CreateMockup.com](https://www.createmockup.com/generate/) - Used to generate responsive website mockup for README file
