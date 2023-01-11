# Setup Guide

Please follow the instructions below to setup this project

## Requirements

- [Node.js LTS](https://nodejs.org/en/download/) >= v14
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [GNU make](https://www.gnu.org/software/make/)
- [Docker](https://www.docker.com/)

## Install dependencies

```bash
yarn install
```

## Configure environment variables

Create development and production .env configuration files with defaults

```bash
make config
```

SMSWithoutBorders global config variables can also be passed in to override the default config

```bash
SWOB_BE_HOST=http://localhost:9000 SWOB_RECAPTCHA_ENABLE=true SWOB_RECAPTCHA_SITE_KEY=skfhk123 <command>
```

Where command could be any one defined under scripts in package.json or Makefile target e.g `yarn start`, `make build`

**.env.development.local** is used in development environments and **.env.production.local** is used when creating production builds.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), which specifies variable naming conventions

Below are the defaults. a reference is also kept in [env.example](../env.example)

| Variable                         | Description                                                                                                 | Default value                                                                                           | Override                |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------- |
| PORT                             | development port                                                                                            | 18000                                                                                                   | PORT                    |
| GENERATE_SOURCEMAP               | Generate or ignore sourcemaps                                                                               | false                                                                                                   | N/A                     |
| REACT_APP_API_URL                | Backend API URL                                                                                             | <http://localhost:9000>                                                                                 | SWOB_BE_HOST            |
| REACT_APP_API_VERSION            | Backend API version                                                                                         | v2                                                                                                      | SWOB_BE_VERSION         |
| REACT_APP_GATEWAY_SERVER         | Gateway server API URL                                                                                      | <http://localhost:15000>                                                                                | SWOB_GS_HOST            |
| REACT_APP_GATEWAY_SERVER_VERSION | Gateway server version                                                                                      | v2                                                                                                      | SWOB_GS_VERSION         |
| REACT_APP_RECAPTCHA_ENABLE       | Enable or disable recaptcha, make sure this setting is also toggled on the API                              | false                                                                                                   | SWOB_RECAPTCHA_ENABLE   |
| REACT_APP_RECAPTCHA_SITE_KEY     | reCAPTCHAv2 site key obtained from [google](https://www.google.com/recaptcha/admin)                         | N/A                                                                                                     | SWOB_RECAPTCHA_SITE_KEY |
| REACT_APP_RECAPTCHA_API_URL      | API script src from reCaptchav2 setup [documentation](https://developers.google.com/recaptcha/docs/display) | <https://www.google.com/recaptcha/api.js>                                                               | N/A                     |
| REACT_APP_TUTORIAL_URL           | Link to the getting started tutorial                                                                        | <https://smswithoutborders.github.io/docs/tutorials/getting-started>                                    | N/A                     |
| REACT_APP_GATEWAY_TUTORIAL_URL   | Link to gateway client setup tutorial                                                                       | <https://github.com/smswithoutborders/SMSWithoutBorders-Gateway-Client/blob/alpha_stable/src/README.md> | N/A                     |
| REACT_APP_PRIVACY_POLICY_URL     | Link to hosted privacy policy markdown file(s)                                                              | <https://raw.githubusercontent.com/smswithoutborders/smswithoutborders.com/dev/docs/privacy-policy>     | N/A                     |
| REACT_APP_MAX_IDLE_TIME          | Max user Idle time duration                                                                                 | 720000ms                                                                                                | SWOB_MAX_IDLE_TIME      |
| HTTPS                            | Enable or disable https                                                                                     | false                                                                                                   | SWOB_SSL_ENABLE         |
| SSL_CRT_FILE                     | Location of SSL CRT file                                                                                    | N/A                                                                                                     | SWOB_SSL_CRT_FILE       |
| SSL_KEY_FILE                     | Location of SSL Key file                                                                                    | N/A                                                                                                     | SWOB_SSL_KEY_FILE       |

## Note (Windows users only)
 - The project uses a **Makefile** to generate configs for the project. For this to work properly, ensure you have **Make** installed via **Chocolatey** on your windows machine, if not,  run the following command in Windows Powershell (admin mode) 

```bash
choco install make
```
- We use Bash and Shell environments from development to production, hence ensure you are using either Windows Command Prompt or Git bash terminal for development

## Start development server

```bash
yarn start
```

**Note** configs are checked and regenerated each time yarn start is run. .env.development will not be overriten if it already exists but .env.production will.

Open [http://localhost:18000](http://localhost:18000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

## Create a production build

For docker, see docker section below.

Create an optimized production build that can be hosted on servers. This step uses the variables in **.env.production.local**

```bash
yarn build or make build
```

Check the `build` folder for deployable files once complete.

## Deployment

### Standard deployment with apache

For a Linux/Ubuntu server running apache2 web server, follow these steps to deploy the site

- Enable rewrite module

```bash
sudo a2enmod rewrite
```

- Open apache configuration file at /etc/apache2/apache2.conf
- Change the AllowOverride permission from none to all

```bash
<Directory /var/www/>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
</Directory>
```

- Copy contents of build folder to server root normally located at /var/www/html. Ensure the .htaccess file is copied over. The .htaccess file is quite important as specified [here](https://create-react-app.dev/docs/deployment/#static-server)

```bash
sudo cp -r build/. /var/www/html
```

- restart apache2

```bash
sudo systemctl restart apache2
```

### Docker

#### Development image

There is a make script you can run. Also, SWOB env overrides can be passed directly to this command. See configuring env variables above.

```bash
make image
```

You can also pass other SWOB env variable to be used instead of the defaults.

```bash
SWOB_RECAPTCHA_ENABLE=true \
SWOB_RECAPTCHA_SITE_KEY=somekeyhere \
make image
```

#### Production image

In production, SSL keys are required. You can pass them in as build args

```bash
docker build -t swob-fe \
--target production \
--build-arg SWOB_BE_HOST=http://localhost:9000 \
--build-arg SWOB_GS_HOST=http://localhost:15000 \
--build-arg SWOB_RECAPTCHA_ENABLE=true \
--build-arg SWOB_RECAPTCHA_SITE_KEY= \
--build-arg SWOB_SESSION_TIME=2700000 \
--build-arg SWOB_IDLE_TIME=900000 \
--build-arg SWOB_SSL_ENABLE=true \
--build-arg SWOB_SSL_CRT_FILE=path/to/server.crt \
--build-arg SWOB_SSL_KEY_FILE=path/to/server.key .
```

A full list of all env variables can be found under `configure env variables` section above

Once build completes, a `swob-fe:latest` image is created. The image exposes ports `80` and `443` which can be mapped as required

You can test the image by running `make container` and visit `http://localhost:18000`and `https://localhost:18001` in the browser or deploying with your own docker config options
