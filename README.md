# Assignment 1

- _Date Created_: 04 February 2023
- _Last Modification Date_: 06 February 2023
- _Lab URL_: https://csci5709-a1-b00884813.netlify.app/
- _Git URL_: https://git.cs.dal.ca/andharia/csci5709-group11/-/tree/monil-develop

## Authors

- [Monil Hitesh Andharia](andhariamonil@dal.ca) (andhariamonil@dal.ca) - B00884813

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

3. Upon pushing a new commit on `monil-develop` branch, the application will be automatically published to https://csci5709-a1-b00884813.netlify.app/

### Manual deployment

1. Login to the Github repo and import the Gitlab repo.

2. Login to [Netlify](https://app.netlify.com/) and sign in with the Github account.

3. Import the `csci5709-group11` repo.

4. Select branch `monil-develop` to deploy.

5. Select build command as `npm run build`.

6. Select publish directory as `build`.

7. Click Deploy Site.

## Built With

- [Node.js](https://nodejs.org/en/) - JavaScript RTE
- [React](https://reactjs.org/) - JavaScript Frontend Library
- [Material UI](https://mui.com/) - Web Component library

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

## Acknowledgments

- [Gitlab docs](https://docs.gitlab.com/ee/ci/examples/deployment/index.html#storing-api-keys) for providing _yml_ to deploy code to Heroku

- [React documentation](https://reactjs.org/docs/create-a-new-react-app.html) for guiding how to create first react application

- [Material UI](https://mui.com/) for providing better UI components

- The Professor

- All the TAs of this course
