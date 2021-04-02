import React, { useState, useEffect } from 'react';

import DashHeader from '../../components/DashHeader';
import { DashCard } from '../../components/Card';
import { getToken } from '../../services/auth.service';
import { getStoredTokens, getPlatformOauthToken } from '../../services/wallet.service';

import { Accordion, AccordionItem, Button } from 'carbon-components-react';

const AUTH_KEY = getToken()

const getTwitterToken = () => {
    getPlatformOauthToken(AUTH_KEY, "twitter")
        .then(response => console.log("twitter", response));
}

const getGoogleToken = () => {
    getPlatformOauthToken(AUTH_KEY, "google", "gmail")
        .then(response => console.log("google", response));
}

const Wallet = () => {
    const [googleToken, setGoogleToken] = useState()


    useEffect(() => {
        getStoredTokens(AUTH_KEY, 'google')
            .then(response => {
                console.log('google', response.data.user_token[0])
                setGoogleToken(response.data.user_token[0]);
            });
    }, []);



    return (
        <div className="bx--grid">
            <div className="bx--row">
                <DashHeader
                    title="Your"
                    subtitle="Wallet"
                    description="Save your tokens for rainy days"
                    className="bx--col"
                />
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
                                    size="sm"
                                    onClick={() => getGoogleToken()}
                                >
                                    Store
                                </Button>
                            </AccordionItem>
                            <AccordionItem title="Twitter">
                                <p>
                                    Store your twitter token which will be used for authentication on your behalf in the event of an internet blackout.

                                </p>
                                <br />
                                <Button
                                    size="sm"
                                    onClick={() => getTwitterToken()}
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

                        {googleToken ?
                            <Accordion size="xl">
                                <AccordionItem title={googleToken.provider}>
                                    <h5>Platform</h5>
                                    <p>{googleToken.platform}</p>
                                    <br />
                                    <h5>Token</h5>
                                    <p>{googleToken.token.access_token}</p>
                                    <br />
                                    <h5>Expiry date</h5>
                                    <p>{googleToken.token.expiry_date}</p>
                                    <br />
                                    <h5>Scopes</h5>
                                    {googleToken.token.scope.map(scope => (
                                        <p>{scope}</p>
                                    ))}
                                    <br />
                                    <Button
                                        size="sm"
                                        kind="danger"
                                    >
                                        Delete
                                  </Button>
                                </AccordionItem>
                            </Accordion>
                            :
                            <p>No tokens stored</p>
                        }
                    </DashCard>
                </div>
            </div>
        </div>
    );
}

export default Wallet;