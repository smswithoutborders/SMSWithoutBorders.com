#!/bin/sh

# config files
DEV_ENV_FILE=.env.development.local
PROD_ENV_FILE=.env.production.local

CONFIGS="\n
	PORT=${PORT:-18000}\n
	GENERATE_SOURCEMAP=false\n
	REACT_APP_API_URL=${SWOB_BE_HOST:-http://localhost:9000}\n
	REACT_APP_API_VERSION=${SWOB_BE_VERSION:-v2}\n
	REACT_APP_GATEWAY_SERVER=${SWOB_GS_HOST:-http://localhost:15000}\n
	REACT_APP_GATEWAY_SERVER_VERSION=${SWOB_GS_VERSION:-v2}\n
	REACT_APP_RECAPTCHA_ENABLE=${SWOB_RECAPTCHA_ENABLE:-false}\n
	REACT_APP_RECAPTCHA_SITE_KEY=${SWOB_RECAPTCHA_SITE_KEY:-}\n
	REACT_APP_RECAPTCHA_API_URL=https://www.google.com/recaptcha/api.js\n
	REACT_APP_TUTORIAL_URL=https://smswithoutborders.github.io/docs/tutorials/getting-started\n
	REACT_APP_GATEWAY_TUTORIAL_URL=https://github.com/smswithoutborders/SMSWithoutBorders-Gateway-Client/blob/master/src/README.md\n
	REACT_APP_PRIVACY_POLICY_URL=https://raw.githubusercontent.com/smswithoutborders/smswithoutborders.com/staging/docs/privacy-policy\n
	HTTPS=${SWOB_SSL_ENABLE:-false}\n
	SSL_CRT_FILE=${SWOB_SSL_CRT_FILE:-}\n
	SSL_KEY_FILE=${SWOB_SSL_KEY_FILE:-}\n
"

# only recreate dev config if not exist
if ! [ -e $DEV_ENV_FILE ]; then
    echo -e $CONFIGS > $DEV_ENV_FILE
fi

# Always update prod config
echo -e $CONFIGS > $PROD_ENV_FILE
