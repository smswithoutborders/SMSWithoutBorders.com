# handle copying of ssl certs to keys folder
# keys folder copied to apache2/confs in docker image

# create keys directory
mkdir keys
# check and set keys
if  [[ -e $SWOB_SSL_CRT_FILE ]]; then
    cp $SWOB_SSL_CRT_FILE ./keys/server.crt
fi

if  [[ -e $SWOB_SSL_KEY_FILE ]]; then
    cp $SWOB_SSL_KEY_FILE ./keys/server.key
fi
