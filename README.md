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

The .env file in project root contains all modifiable system variables.

Cloud API URL address and Google Client ID can be set here

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

## Built With

Some awesome components we used:

- [treact components](https://owaiskhan.me/post/free-tailwindcss-react-ui-kit)

- [Evergreen UI](https://github.com/segmentio/evergreen)

- [Tail Blocks](https://tailblocks.cc/)

- [React Icons](https://react-icons.github.io)

- [React Router](https://reactrouter.com)
