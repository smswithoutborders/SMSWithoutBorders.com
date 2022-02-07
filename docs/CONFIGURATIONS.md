# Setup Guide

Please follow the instructions below to setup this project

## Install dependencies

```bash
npm install
```

## Configure environment variables

Create development and production .env configuration files from the env.example template

```bash
cp env.example .env.development.local

cp env.example .env.production.local

```

The .env file(s) contains all modifiable variables for each environment. Below are the defaults

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), which specifies variable naming conventions

* PORT -> development port
* REACT_APP_API_URL ->  Backend API URL
* REACT_APP_API_URL -> Backend API URL
* REACT_APP_ROUTER_URL ->  Router URL
* REACT_APP_DOCS_URL -> Link to hosted privacy policy markdown file
* HTTPS -> enable or disable https
* SSL_CRT_FILE -> Location of SSL CRT file
* SSL_KEY_FILE -> Location of SSL Key file

## Start development server

```bash
npm start
```

Open [http://localhost:18000](http://localhost:18000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

## Create a production build

```bash
npm run build
```

Builds the app for production. Check the `build` folder for deployable files once complete.
