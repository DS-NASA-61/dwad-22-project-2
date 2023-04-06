# **WALL OF PRAYS**

![Screenshots of WALL OF PRAYS's homepage](PNG)

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
| As a user, I want to create a new prayer request so that I can receive prayers and support from the community.                 | - I can create a new prayer request by filling out a form that includes the prayer topic and who I am praying for.<br>- The request is saved and displayed on the homepage with the most recent requests at the top.                                                                                                                    |
| As a user, I want to edit my prayer request so that I can update it with new information.                                      | - I can click on my prayer request from the homepage and navigate to the request page.<br>- On the request page, I can click on an "edit" button that allows me to update the prayer topic and who I am praying for.<br>- The changes are saved and displayed on the homepage and the request page.                                     |
| As a user, I want to delete my prayer request so that I can remove it from the website.                                        | - I can click on my prayer request from the homepage and navigate to the request page.<br>- On the request page, I can click on a "delete" button that removes the request from the website.<br>- The request is no longer displayed on the homepage or the request page.                                                               |
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

_Inter_ is the font family used for the website as it maintains great readability whether used at small or large sizes. It also helps to create space between lines of text, which is ideal for long text used in coffee recipes.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
