import React, { useState, useEffect } from 'react';

import DashHeader from '../../components/DashHeader';
import { DashCard } from '../../components/Card';
import { getToken } from '../../services/auth.service';
import { getStoredTokens, getPlatformOauthToken } from '../../services/wallet.service';
import { Accordion, AccordionItem, AccordionSkeleton, Button, InlineNotification } from 'carbon-components-react';
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

    const [googleToken, setGoogleToken] = useState();
    const [alert, setAlert] = useState(
        {
            loading: true,
            notify: false
        }
    );

    const AUTH_KEY = getToken()

    const getGoogleToken = () => {
        getPlatformOauthToken(AUTH_KEY, "google", "gmail")
            .then(response => console.log("google", response));
    }

    useEffect(() => {
        getStoredTokens(AUTH_KEY, 'google')
            .then(response => {
                setGoogleToken(response.data.user_token[0]);
                setAlert(false);
            })
            .catch((error) => {
                // Error 😨
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
                    notificationProps.subtitle = "an error occured";
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

    return (
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
                        <Accordion size="xl">
                            <AccordionItem title="Google">
                                <p>Store your Google token which will be used for authentication on your behalf in the event
                                    of an internet shutdown.</p>
                                <br />
                                <p>You can define how this token will be used by setting the scopes of access</p>
                                <br />
                                <Button
                                    renderIcon={Save16}
                                    onClick={() => getGoogleToken()}
                                >
                                    Store
                                </Button>
                            </AccordionItem>
                            <AccordionItem title="Twitter">
                                <p>Store your twitter token which will be used for authentication on your behalf in the event of an internet blackout.</p>
                                <br />
                                <Button
                                    renderIcon={Save16}
                                    disabled
                                >
                                    Store
                                </Button>
                            </AccordionItem>

                        </Accordion>
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
                                {googleToken ?
                                    <Accordion size="xl">
                                        <AccordionItem title="Google">
                                            <h5>Platform</h5>
                                            <p>{googleToken.platform}</p>
                                            <br />
                                            <h5>Token</h5>
                                            <p style={{ "word-wrap": "break-word" }}>
                                                {googleToken.token.access_token}
                                            </p>
                                            <br />
                                            <h5>Expiry date</h5>
                                            <p>{googleToken.token.expiry_date}</p>
                                            <br />
                                            <h5>Scopes</h5>
                                            {googleToken.token.scope.map(scope => (
                                                <p key={scope}>{scope}</p>
                                            ))}
                                            <br />
                                            <Button
                                                kind="danger"
                                                renderIcon={TrashCan16}
                                            >
                                                Delete
                                            </Button>
                                        </AccordionItem>
                                    </Accordion>
                                    :
                                    <p>No tokens stored</p>
                                }
                            </>
                        }
                    </DashCard>
                </div>
            </div>
        </div>
    );
}

export default Wallet;