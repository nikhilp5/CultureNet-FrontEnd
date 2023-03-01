# CultureNet

_CultureNet_ is a web application designed to provide users with a platform to review, log, and network around movies, TV shows, music, and books. The main purpose of the project is to enable users to discover new entertainment content, share their opinions and insights, and connect with like-minded individuals.

- _Date Created_: 27 Feb 2023
- _Last Modification Date_: 28 Feb 2023
- _Git URL_: https://git.cs.dal.ca/andharia/csci5709-group11/-/tree/main
- _Deployed App URL_: https://csci5709-group11.netlify.app/

## Authors

- [Monil Andharia](andhariamonil@dal.ca) - _Full Stack Developer_
- [Nikhil Panikkassery](nk561034@dal.ca) - _Full Stack Developer_
- [Pranay Raycha](pr746594@dal.ca) - _Full Stack Developer_
- [Rishi Vasa](rishi.vasa@dal.ca) - _Full Stack Developer_
- [Ronil Patel](ronil.patel@dal.ca) - _Full Stack Developer_

## Getting Started

### Prerequisites

To have a local copy of this lab / assignment / project up and running on your local machine, you will first need to install the following software/libraries / plug-ins

```
Node.js
```

See the following section for detailed step-by-step instructions on how to install this software / libraries / plug-ins

### Installing

1. Install [Node.js](https://nodejs.org/en/download/) from the following link:

2. Clone the git repository.

3. Open the terminal and run the following commands:

```
> npm install
> npm run start
```

## Deployment

### Auto deployment (CI/CD)

1. Login to [Netlify](https://app.netlify.com/)

2. Create a new site.

3. Upon pushing a new commit on `main` branch, the application will be automatically published to https://csci5709-group11.netlify.app/

### Manual deployment

1. Login to the Github repo and import the Gitlab repo.

2. Login to [Netlify](https://app.netlify.com/) and sign in with the Github account.

3. Import the `csci5709-group11` repo.

4. Select branch `main` to deploy.

5. Select build command as `npm run build`.

6. Select publish directory as `build`.

7. Click Deploy Site.

## Built With

- [Node.js](https://nodejs.org/en/) - JavaScript RTE
- [React](https://reactjs.org/) - JavaScript Frontend Library
- [Material UI](https://mui.com/) - Web Component library
- [Redux](https://redux.js.org/) - JavaScript library for state management
- [React Router](https://reactrouter.com/en/main) - library to routing between pages
- [Redux Devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) - tool for handling events in redux
- [The movie database](https://www.themoviedb.org/) - Used external api from tmdb for data.

## Sources Used

### Login.jsx

_Line 34_

```
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
```

The code was adapted from [Regexr](https://regexr.com/3e48o)

_Line 35_

```
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
```

The code was adapted from [Stack Overflow](https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a)

### Registration.jsx

_Lines 32-34_

```
const Alert = forwardRef(function Alert(props, ref) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
```

_Lines 160-164_

```
<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
    {snackbarMessage}
    </Alert>
</Snackbar>
```

The code was adapted from [MUI official documentation](https://mui.com/material-ui/react-snackbar/)

## References

[1] Matt The Dev, “Create a Movie Watchlist with React Hooks, Context API and localStorage” Youtube. [Online]. Available: https://youtu.be/1eO_hNYzaSc. [Accessed: 28-Feb-2023].

[2] “Stack Overflow” Stack Overflow. [Online]. Available: https://stackoverflow.com/. [Accessed: 28-Feb-2023].

[3] “MUI The React Component Library” MUI. [Online]. Available: https://mui.com/. [Accessed: 28-Feb-2023].

[4] “Redux A Predictable State Container” Redux. [Online]. Available: https://redux.js.org/. [Accessed: 28-Feb-2023].

[5] “The movie database” TMD.[Online]. Available: https://www.themoviedb.org/. [Accessed: 28-Feb-2023].

[6] developedbyed, “Redux For Beginners | React Redux Tutorial” Youtube. [Online]. Available: https://youtu.be/CVpUuw9XSjY. [Accessed: 28-Feb-2023].

[7]“React Router” React Router. [Online]. Available: https://reactrouter.com/en/main. [Accessed: 28-Feb-2023].

## Acknowledgments

- [Gitlab docs](https://docs.gitlab.com/ee/ci/examples/deployment/index.html#storing-api-keys) for providing _yml_ to deploy code to Heroku

- [React documentation](https://reactjs.org/docs/create-a-new-react-app.html) for guiding how to create first react application

- [Material UI](https://mui.com/) for providing better UI components

- [Project Proposal Sample on Brightspace](https://dal.brightspace.com/d2l/le/content/250793/viewContent/3445418/View)

- The Professor

- All the TAs of this course
