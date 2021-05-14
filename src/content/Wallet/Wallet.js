import React, { useState, useEffect } from 'react';
import tw from "twin.macro";
import { getToken, setToken, removeToken } from 'services/auth.service';
import { getProviders, getPlatformOauthToken, saveGoogleOauthToken, revokeToken } from 'services/wallet.service';
import { Modal, TextInput } from 'carbon-components-react';
import { Button, toaster, Dialog } from 'evergreen-ui';
import { FiSave, FiTrash2 } from "react-icons/fi";
import { Panel } from "rsuite";
import PageAnimationWrapper from "helpers/PageAnimationWrapper";

const StoreButton = tw(Button)`rounded-md`;
const Heading = tw.h1`font-medium sm:text-4xl text-3xl mb-4 font-medium `;
const Description = tw.p`mb-8 leading-relaxed`;
const PlatformTitle = tw.h4`text-lg font-medium`;
const SubHeading = tw.h3`text-lg font-bold`;
const Card = tw.div`h-full bg-white`;
const Column = tw.div`p-4 md:w-1/2 w-full`;
const Row = tw.div`flex flex-wrap -m-4 mt-12`;
const Container = tw.div`container px-5 mx-auto py-12  lg:p-12 text-gray-900`;
const StoreContainer = tw.div`flex flex-wrap items-center justify-between`;

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
            modal: false
        });

    let AUTH_KEY = getToken()

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
                setAlert({ loading: false });
            })
            .catch((error) => {
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    setAlert({ loading: false });
                    toaster.danger("Network Error", {
                        description: "Please check your network connection and reload this page"
                    });

                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);
                    setAlert({ loading: false });
                    toaster.danger("Network Error", {
                        description: "We could not process your request. Please reload this page and try again"
                    });
                } else {
                    // Something happened in setting up the request and triggered an Error
                    setAlert({ loading: false });
                    toaster.danger("No Tokens", {
                        description: "You haven't stored any tokens. Please add them"
                    });
                }
            });
    }, [AUTH_KEY]);

    const getPlatformToken = (provider, platform) => {
        setAlert({ loading: true })
        getPlatformOauthToken(AUTH_KEY, provider, platform)
            .then(response => {
                //set new token
                AUTH_KEY = response.data.auth_key;
                setToken(response.data.auth_key);
                //open authorization window
                openSignInWindow(response.data.url, "save-google-token");
            })
            .catch((error) => {
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    setAlert({ loading: false });
                    toaster.danger("An error occurred", {
                        description: "Please try again"
                    })

                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);
                    setAlert({ loading: false });
                    toaster.danger("Network Error", {
                        description: "Please Check your network connection and try again"
                    })
                } else {
                    // Something happened in setting up the request and triggered an Error
                    setAlert({ loading: false });
                    toaster.danger("There are currently no stored Tokens",)
                }
            });
    };

    const handleRevokeToken = (provider, platform) => {
        revokeToken(AUTH_KEY, password, provider, platform)
            .then(response => {
                if (response.status === 200) {
                    setTokens(0);
                    setAlert({ loading: false });
                    toaster.success('Token deleted successfully');
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
                        setAlert({ loading: false });
                        toaster.danger('wrong password provided');
                    }

                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    setAlert({ loading: false });
                    toaster.danger("Network Error", {
                        description: "Its an issue on our end. Please check your network and reload this page and try again"
                    });
                } else {
                    // Something hinfoappened in setting up the request and triggered an Error
                    setAlert({ loading: false });
                    toaster.danger("An error occured, please try again")
                }
            });
    };

    let windowObjectReference = null;
    let previousUrl = null;

    const openSignInWindow = (url, name) => {
        // remove any existing event listeners
        window.removeEventListener('message', receiveMessage);

        // window features
        const strWindowFeatures =
            'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

        if (windowObjectReference === null || windowObjectReference.closed) {
            /* if the pointer to the window object in memory does not exist
             or if such pointer exists but the window was closed */
            windowObjectReference = window.open(url, name, strWindowFeatures);
        } else if (previousUrl !== url) {
            /* if the resource to load is different,
             then we load it in the already opened secondary window and then
             we bring such window back on top/in front of its parent window. */
            windowObjectReference = window.open(url, name, strWindowFeatures);
            windowObjectReference.focus();
        } else {
            /* else the window reference must exist and the window
             is not closed; therefore, we can bring it back on top of any other
             window with the focus() method. There would be no need to re-create
             the window or to reload the referenced resource. */
            windowObjectReference.focus();
        }

        // add the listener for receiving a message from the popup
        window.addEventListener('message', event => receiveMessage(event), false);
        // assign the previous URL
        previousUrl = url;
    };

    const receiveMessage = (event) => {
        if (event.origin !== window.location.origin) {
            return;
        }
        const { data } = event; //extract data sent from popup
        if (data.source === 'smswithoutborders') {
            saveGoogleOauthToken(AUTH_KEY, "google", "gmail", data.code)
                .then(response => {
                    console.log(response);
                    setAlert({ loading: false });
                    toaster.success("Token stored successfully");
                    removeToken();
                    setToken(response.data.auth_key);
                    setAlert({ loading: false, notify: false });
                    window.location.reload();
                })
        }
    };

    return (
        <>
            <PageAnimationWrapper>
                <Container>

                    <Heading>Wallet</Heading>
                    <Description>Save your tokens for rainy days</Description>

                    <Row>
                        <Column>
                            <Card>
                                <SubHeading>Providers</SubHeading>
                                <br />
                                {providers ? (
                                    <>
                                        {providers.map(provider => {
                                            return (
                                                <Panel header={<PlatformTitle>{provider.provider}</PlatformTitle>} key={provider.provider} collapsible={true} bordered>
                                                    <p>Store your {provider.provider} token which will be used for authentication on your behalf in the event
                                                                        of an internet shutdown.</p>
                                                    <br />
                                                    <p>You can define how this token will be used by setting the scopes of access</p>
                                                    <br />
                                                    <StoreContainer>
                                                        <div>
                                                            <PlatformTitle>Platform</PlatformTitle>
                                                            <p>{provider.platform}</p>
                                                        </div>
                                                        <StoreButton
                                                            type="submit"
                                                            appearance="primary"
                                                            height={40}
                                                            iconBefore={FiSave}
                                                            isLoading={alert.loading}
                                                            onClick={() => getPlatformToken(provider.provider, provider.platform)}
                                                        >
                                                            <span>{alert.loading ? "Storing" : "Store"}</span>
                                                        </StoreButton>
                                                    </StoreContainer>
                                                </Panel>
                                            )
                                        })}
                                    </>
                                ) : (
                                        <p>No available providers</p>
                                    )
                                }
                            </Card>
                        </Column>
                        <Column>
                            <Card>
                                <SubHeading>Saved tokens</SubHeading>
                                <br />

                                {tokens ? (
                                    <>
                                        {tokens.map(token => (
                                            <Panel header={<PlatformTitle>{token.provider}</PlatformTitle>} key={token.provider} collapsible bordered>
                                                <StoreContainer>
                                                    <div>
                                                        <PlatformTitle>Platform</PlatformTitle>
                                                        <p>{token.platform}</p>
                                                    </div>
                                                    <StoreButton
                                                        type="submit"
                                                        appearance="primary"
                                                        intent="danger"
                                                        height={40}
                                                        iconBefore={FiTrash2}
                                                        isLoading={alert.loading}
                                                        onClick={() => {
                                                            setRevokedTokenDetails({
                                                                provider: token.provider,
                                                                platform: token.platform
                                                            });
                                                            setAlert({ modal: true });
                                                        }}
                                                    >
                                                        <span>{alert.loading ? "Revoking" : "Revoke"}</span>
                                                    </StoreButton>
                                                </StoreContainer>
                                            </Panel>
                                        ))}
                                    </>
                                ) : (
                                        <p>No stored tokens</p>
                                    )
                                }
                            </Card>
                        </Column>
                    </Row>
                </Container>

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

                    <SubHeading>Are you sure you want to delete this token from your account?</SubHeading>
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

                <Dialog
                    isShown={alert.modal}
                    title="Dialog title"
                    intent="danger"
                    onCloseComplete={() => setAlert({ modal: false })}
                    confirmLabel="Delete"
                >
                    Are you sure you want to delete this item?
                </Dialog>
            </PageAnimationWrapper>
        </>
    );
}

export default Wallet;