import React, { useState, useEffect } from 'react';

import DashHeader from '../../components/DashHeader';
import { DashCard } from '../../components/Card';
import { getToken } from '../../services/auth.service';
import { getProviders, getPlatformOauthToken, revokeToken } from '../../services/wallet.service';
import {
    Accordion,
    AccordionItem,
    AccordionSkeleton,
    Button,
    InlineNotification,
    Modal,
    TextInput
} from 'carbon-components-react';
import { Save16, TrashCan16 } from "@carbon/icons-react";

let notificationProps = {
    kind: "info",
    lowContrast: true,
    role: 'alert',
    title: 'Alert',
    subtitle: 'some message',
    iconDescription: 'Notification',
    statusIconDescription: 'Notification status icon',
    hideCloseButton: false
};

const Wallet = () => {

    const [tokens, setTokens] = useState();
    const [providers, setProviders] = useState();
    const [password, setPassword] = useState();
    const [revokedTokenDetails, setRevokedTokenDetails] = useState(
        {
            provider: "",
            platform: ""
        });

    const [alert, setAlert] = useState(
        {
            loading: true,
            notify: false,
            modal: false
        });

    const AUTH_KEY = getToken()

    const getPlatformToken = (provider, platform) => {
        getPlatformOauthToken(AUTH_KEY, provider, platform)
            .then(response => console.log(platform, response))
            .catch((error) => {
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    notificationProps.kind = "error";
                    notificationProps.title = "An error occurred";
                    notificationProps.subtitle = "please try again";
                    setAlert({ loading: false, notify: true });

                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);
                    notificationProps.kind = "error";
                    notificationProps.title = "Oops sorry";
                    notificationProps.subtitle = "Its an issue on our end. Please try again";
                    setAlert({ loading: false, notify: true });
                } else {
                    // Something happened in setting up the request and triggered an Error
                    notificationProps.kind = "info";
                    notificationProps.title = "Tokens";
                    notificationProps.subtitle = "There are currently no stored tokens";
                    setAlert({ loading: false, notify: true });
                }
            });
    }

    const getGoogleToken = () => {
        window.auth2.grantOfflineAccess()
            .then(response => console.log(response));
    }

    const initGoogleAPI = () => {
        let CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        window.gapi.load('auth2', function () {
            window.auth2 = window.gapi.auth2.init({
                client_id: CLIENT_ID,
                // scope: 'gmail read'
            });
        });
    }

    useEffect(() => {
        getProviders(AUTH_KEY)
            .then(response => {
                let tokens = response.data.user_provider;
                let providers = response.data.default_provider;

                if (providers.length) {
                    setProviders(providers);
                }
                if (tokens.length) {
                    setTokens(tokens);
                }
                setAlert({ loading: false, notify: false });
            })
            .catch((error) => {
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    notificationProps.kind = "error";
                    notificationProps.title = "An error occurred";
                    notificationProps.subtitle = "please try again";
                    setAlert({ loading: false, notify: true });

                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);
                    notificationProps.kind = "error";
                    notificationProps.title = "Network error";
                    notificationProps.subtitle = "Its an issue on our end. Please reload this page and try again";
                    setAlert({ loading: false, notify: true });
                } else {
                    // Something happened in setting up the request and triggered an Error
                    notificationProps.kind = "info";
                    notificationProps.title = "Tokens";
                    notificationProps.subtitle = "There are currently no stored tokens";
                    setAlert({ loading: false, notify: true });
                }
            });

            //give the google client some time to load
            setTimeout(() => {
                initGoogleAPI();
            }, 3000)
        

    }, [AUTH_KEY]);

    const handleRevokeToken = (provider, platform) => {
        revokeToken(AUTH_KEY, password, provider, platform)
            .then(response => {
                if (response.status === 200) {
                    notificationProps.kind = "success";
                    notificationProps.title = "Success";
                    notificationProps.subtitle = "Token deleted successfully";
                    setTokens(0);
                    setAlert({ loading: false, notify: true });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                }
            })
            .catch((error) => {
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    console.log(error.response);
                    if (error.response.status === 401) {
                        notificationProps.kind = "error";
                        notificationProps.title = error.response.statusText;
                        notificationProps.subtitle = "wrong password provided";
                        setAlert({ loading: false, notify: true });
                    }
                    setAlert({ loading: false, notify: true });

                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);
                    notificationProps.kind = "error";
                    notificationProps.title = "Network error";
                    notificationProps.subtitle = "Its an issue on our end. Please reload this page and try again";
                    setAlert({ loading: false, notify: true });
                } else {
                    // Something hinfoappened in setting up the request and triggered an Error
                    notificationProps.kind = "error";
                    notificationProps.title = "An error occurred";
                    notificationProps.subtitle = "please try again";
                    setAlert({ loading: false, notify: true });
                }
            });

    }

    return (
        <>
            <div className="bx--grid">
                <div className="bx--row">
                    <DashHeader
                        title="Your"
                        subtitle="Wallet"
                        description="Save your tokens for rainy days"
                        className="bx--col"
                    />
                    {alert.notify ?
                        <div className="bx--col">
                            <InlineNotification {...notificationProps} />
                        </div>
                        : null
                    }
                </div>
                <div className="bx--row">
                    <div className="bx--col-lg">
                        <DashCard>
                            <h4>Providers</h4>
                            <br />
                            {alert.loading ?
                                <AccordionSkeleton open count={3} />
                                :
                                <>
                                    {providers ?
                                        <>
                                            {providers.map(provider => {
                                                switch (provider.provider) {
                                                    case "google":
                                                        return (
                                                            <Accordion size="xl" key={provider.provider}>
                                                                <AccordionItem title={provider.provider}>
                                                                    <p>Store your Google token which will be used for authentication on your behalf in the event
                                                            of an internet shutdown.</p>
                                                                    <br />
                                                                    <p>You can define how this token will be used by setting the scopes of access</p>
                                                                    <br />

                                                                    <h5>Platform</h5>
                                                                    <p>{provider.platform}</p>
                                                                    <br />

                                                                    <Button
                                                                        size="sm"
                                                                        renderIcon={Save16}
                                                                        onClick={() => getPlatformToken(provider.provider, provider.platform)}
                                                                    >
                                                                        Store
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        kind="secondary"
                                                                        renderIcon={Save16}
                                                                        onClick={() => getGoogleToken()}
                                                                    >
                                                                        Store
                                                                    </Button>
                                                                </AccordionItem>
                                                            </Accordion>
                                                        );
                                                    case "twitter":
                                                        return (
                                                            <Accordion size="xl" key={provider.provider}>
                                                                <AccordionItem title={provider.provider}>
                                                                    <p>Store your Twitter token which will be used for authentication on your behalf in the event
                                                            of an internet shutdown.</p>
                                                                    <br />
                                                                    <p>You can define how this token will be used by setting the scopes of access</p>
                                                                    <br />

                                                                    <h5>Platform</h5>
                                                                    <p>{provider.platform}</p>
                                                                    <br />

                                                                    <Button
                                                                        size="sm"
                                                                        renderIcon={Save16}
                                                                        onClick={() => getPlatformToken(provider.provider, provider.platform)}
                                                                    >
                                                                        Store
                                                        </Button>
                                                                </AccordionItem>
                                                            </Accordion>
                                                        );
                                                        // eslint-disable-next-line no-unreachable
                                                        break;
                                                    default:
                                                        return (
                                                            <Accordion size="xl" key={provider.provider}>
                                                                <AccordionItem title={provider.provider}>
                                                                    <h5>Platform</h5>
                                                                    <p>{provider.platform}</p>
                                                                    <br />

                                                                    <Button
                                                                        size="sm"
                                                                        renderIcon={Save16}
                                                                        onClick={() => getPlatformToken(provider.provider, provider.platform)}
                                                                    >
                                                                        Store
                                                        </Button>
                                                                </AccordionItem>
                                                            </Accordion>
                                                        );
                                                }
                                            })
                                            }
                                        </>
                                        :
                                        <p>No available providers</p>
                                    }
                                </>
                            }
                        </DashCard>
                    </div>

                    <div className="bx--col-lg">
                        <DashCard>
                            <h4>Saved tokens</h4>
                            <br />
                            {alert.loading ?
                                <AccordionSkeleton open count={3} />
                                :
                                <>
                                    {tokens ?
                                        <>
                                            {tokens.map(token => (
                                                <Accordion size="xl" key={token.provider}>
                                                    <AccordionItem title={token.provider}>
                                                        <h5>Platform</h5>
                                                        <p>{token.platform}</p>
                                                        <br />
                                                        <Button
                                                            kind="danger"
                                                            size="sm"
                                                            renderIcon={TrashCan16}
                                                            onClick={() => {
                                                                setRevokedTokenDetails({
                                                                    provider: token.provider,
                                                                    platform: token.platform
                                                                });
                                                                setAlert({ modal: true });
                                                            }}
                                                        >
                                                            Revoke
                                                        </Button>
                                                    </AccordionItem>
                                                </Accordion>
                                            ))}
                                        </>
                                        :
                                        <p>No stored tokens</p>
                                    }
                                </>
                            }
                        </DashCard>
                    </div>
                </div>
            </div>

            <Modal
                open={alert.modal}
                modalLabel="Confirm action"
                danger
                preventCloseOnClickOutside
                onRequestSubmit={() => {
                    handleRevokeToken(revokedTokenDetails.provider, revokedTokenDetails.platform);
                    setAlert({ modal: false, loading: true })
                }}
                onRequestClose={() => setAlert({ modal: false })}
                primaryButtonText="Confirm"
                secondaryButtonText="Cancel">

                <h4>Are you sure you want to delete this token from your account?</h4>
                <br />
                <p>Please enter you password to Confirm </p>
                <br />
                <TextInput.PasswordInput
                    data-modal-primary-focus
                    id="passwordField"
                    onBlur={(evt) => setPassword(evt.target.value)}
                    labelText="Password"
                    placeholder="Enter your password"
                />
            </Modal>
        </>
    );
}

export default Wallet;