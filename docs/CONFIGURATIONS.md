# Setup Guide

Please follow the instructions below to setup this project

## Install dependencies

```bash
yarn install
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
* REACT_APP_API_VERSION -> API version
* REACT_APP_GATEWAY_SERVER ->  Gateway server url
* REACT_APP_GATEWAY_SERVER_VERSION -> Gateway server version
* REACT_APP_DOCS_URL -> Link to hosted privacy policy markdown file
* REACT_APP_RECAPTCHA -> Enable or disable recaptcha, make sure this setting is also toggled on the API
* REACT_APP_RECAPTCHA_SITE_KEY -> reCAPTCHAv2 site key obtained from [google](https://www.google.com/recaptcha/admin)
* REACT_APP_RECAPTCHA_API_URL -> API script src from reCaptchav2 setup [documentation](https://developers.google.com/recaptcha/docs/display)
* REACT_APP_TUTORIAL_URL -> Link to the getting started tutorial
* REACT_APP_GATEWAY_TUTORIAL_URL -> Link to gateway client setup tutorial
* HTTPS -> Enable or disable https
* SSL_CRT_FILE -> Location of SSL CRT file
* SSL_KEY_FILE -> Location of SSL Key file

## Start development server

```bash
yarn start
```

Open [http://localhost:18000](http://localhost:18000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

## Create a production build

```bash
yarn build
```

Builds the app for production. Check the `build` folder for deployable files once complete.

## Deployment

For a Linux/Ubuntu server running apache2 web server, follow these steps to deploy the site

* Enable rewrite module
  
```bash
sudo a2enmod rewrite
```

* Open apache configuration file at /etc/apache2/apache2.conf
* Change the AllowOverride permission from none to all

```bash
<Directory /var/www/>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
</Directory>
```

* Copy contents of build folder to server root normally located at /var/www/html. Ensure the .htaccess file is copied over. The .htaccess file is quite important as specified [here](https://create-react-app.dev/docs/deployment/#static-server)

```bash
sudo cp -r build/. /var/www/html
```

* restart apache2

```bash
sudo systemctl restart apache2
```
