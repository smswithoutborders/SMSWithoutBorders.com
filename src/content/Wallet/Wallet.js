import React, { useState, useEffect } from 'react';

import DashHeader from '../../components/DashHeader';
import { DashCard } from '../../components/Card';
import { getToken } from '../../services/auth.service';
import { getStoredTokens, getPlatformOauthToken } from '../../services/wallet.service';
import { Accordion, AccordionItem, AccordionSkeleton, Button } from 'carbon-components-react';
import { Save16, TrashCan16 } from "@carbon/icons-react";


const Wallet = () => {

    const [googleToken, setGoogleToken] = useState();
    const [alert, setAlert] = useState(true);

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
                        {alert ?
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
                                            <p>{googleToken.token.access_token}</p>
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