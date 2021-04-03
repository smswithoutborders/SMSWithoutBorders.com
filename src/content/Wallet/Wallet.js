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
    const [alert, setAlert] = useState(
        {
            loading: true,
            notify: false,
            modal: false
        }
    );

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

    }, [AUTH_KEY]);


    const getPassword = (provider, platform) => {
        console.log(provider, platform);
        setAlert({ modal: true });
        //now password is filled and modal is closed we can delete the token
        if (password) {
            setTimeout(() => {
                handleRevokeToken(provider, platform)
            }, 3000)
        }
    }

    const handleRevokeToken = (provider, platform) => {
        revokeToken(AUTH_KEY, password, provider, platform)
            .then(response => {
                console.log(response);
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
                                <p>No available providers</p>}
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
                                                            onClick={() => getPassword(token.provider, token.platform)}
                                                        >
                                                            Delete
                                                    </Button>
                                                    </AccordionItem>
                                                </Accordion>
                                            ))}
                                        </>
                                        :
                                        <p>No tokens stored</p>
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
                onRequestSubmit={() => setAlert({ modal: false })}
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
                    onChange={(evt) => setPassword(evt.target.value)}
                    labelText="Password"
                    placeholder="Enter your password"
                />
            </Modal>
        </>
    );
}

export default Wallet;