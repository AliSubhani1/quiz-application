### Quiz Application

Quiz Application is a React.js and typescript application that brings a user-friendly platform to take an online quiz and check its results.

### Project Features

List users dynamically by fetching them using a REST API.
Filter feature to filter data related to any of the fields.
Sort the users list based on name and email and also toggle them between ascending and descending order.

### Built With

- React (18) - A JavaScript library for building user interfaces
- TailwindCss (3.4.17) - A utility-first CSS framework
- TypeScript - Typed JavaScript
- For a full list of dependencies, refer to package.json.

### Prerequisites

- Before running the project, ensure you have:

- Node.js (version >= v20.16.0)
- npm (usually comes with Node.js)
- Git for cloning the repository

### Getting Started

To get a local copy up and running, follow these steps:

### Clone the repository:

git clone https://github.com/AliSubhani1/quiz-application.git

### Navigate to the project directory:

cd quiz-application

### Install dependencies:

npm install

### Run the development server:

npm start

Open http://localhost:3000 with your browser to see the result.

### Project Link

https://github.com/AliSubhani1/quiz-application

### Running Unit Tests:

Run the following command to run all tests,

npm test

Check the terminal for test results.

### Deployment of Quiz Application

### Automated CI/CD Deployment Integration using Netlify:

Currently, this website is deployed on netlify. Following simple steps can be used for its deployment,

- Authorized my github account on netlify to provide access to my public repositories.
- Connected the quiz application website with netlify to enable automated CI/CD deployment integration so that when a user push any latest code to the main branch of this quiz application repo the latest code automatically get deployed to netlify.

### Manual Deployment on Netlify without repo access:

- Lets say if someone wants to deploy this application on netlify they can download the entire repository and drop it in netlify for frontend deployment.
- This drag and drop deployment is not automated but this is an easy way to deploy the frontend code just using all existing project files.

### Frontend Deployment on AWS (Alternative Deployment Option):

- Another option for frontend deployment can be AWS.
- We can create an S3 bucket on AWS and upload the quiz application project build on the S3 bucket.
- Create a Cloudfront distribution on AWS and connect the S3 bucket from last step.
- Use the cloudfront link for accessing secure HTTPS link of the deployed website on aws.

### Running Unit Tests:

For running the unit tests you can run the following command,

npm test

Choose the option to run all tests just by typing a in the terminal when it asks you to enter it.

### Deployed Link:

This website is live on link below,

https://quiz-application4.netlify.app/

### State Management:

This project uses Redux Toolkit for managing application state. Redux Toolkit simplifies state management by providing a robust and opinionated set of tools that streamline common Redux tasks, making the development process more efficient. Here's an overview of its usage in this project:

### Why Redux Toolkit?

- Provides a concise and standardized way to write Redux logic.
- Comes with built-in utilities like createSlice and createAsyncThunk, reducing boilerplate code.
- Offers built-in support for immutable updates and middleware, improving application performance and reliability.

### Store Configuration

- The global store is configured using the configureStore method from Redux Toolkit.
- Middleware like redux-thunk is included by default for handling asynchronous actions.
- The state structure is modular, making it easier to maintain and scale.

### Slices

- Application state is divided into "slices," each representing a specific feature or domain (e.g., user, authentication, products).

### Routing:

- To navigate between quiz and results page, I have used react router dom for client side routing.
