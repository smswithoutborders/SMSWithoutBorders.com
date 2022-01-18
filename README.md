# SMSwithoutBorders.com

## Setup Guide

Quick start guide to get the dashboard *running*:

### Install dependencies

```bash
npm install
```

### Set env variables

Create dev and production .env configs from the example.env template

```bash
cp example.env .env.development.local

cp example.env .env.production.local

```

The .env file(s) contains all modifiable system variables. Below are the defaults

```bash
PORT=18900  /* local development port */
REACT_APP_API_URL=http://localhost:9000 /* Backend API URL */
REACT_APP_ROUTER_URL="http://localhost:6969" /* Router URL */
REACT_APP_DOCS_URL= "" /* docs markdown file url */

HTTPS=false /* specify HTTPS */
SSL_CRT_FILE=
SSL_KEY_FILE=



### Start development server

```bash
npm start
```

Open [http://localhost:18000](http://localhost:18000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### Create a production build

```bash
npm run build
```

Builds the app for production to the `build` folder using esbuild and Babel.

### Accounts Setup

- Signup for a new account

- Login with created account details
