import React, { useState, useEffect } from 'react';
import tw from "twin.macro";
import PageAnimationWrapper from "helpers/PageAnimationWrapper";
import AnimateLoader from 'components/Loaders/AnimateLoader';
import useTitle from 'helpers/useTitle';
import { getProviders, getPlatformOauthToken, savePlatformOauthToken, revokeToken } from 'services/wallet.service';
import { Button, toaster, Dialog, TextInputField } from 'evergreen-ui';
import { FiSave, FiTrash2 } from "react-icons/fi";
import { Panel, Placeholder } from "rsuite";
import { ToggleButton } from "components/misc/Buttons";
import { useAppContext } from 'App';

const StoreButton = tw(Button)`rounded-md`;
const Heading = tw.h1`font-bold sm:text-5xl text-3xl mb-4`;
const Description = tw.p`mb-8 text-base md:text-lg leading-relaxed`;
const PlatformTitle = tw.h4`text-lg font-medium`;
const PlatformDescription = tw.p`mb-2`;
const SubHeading = tw.h3`text-lg font-bold`;
const Card = tw.div`h-full`;
const Column = tw.div`p-4 md:w-1/2 w-full`;
const Row = tw.div`flex flex-wrap -m-4 mt-12`;
const Container = tw.div`container px-5 mx-auto py-12 lg:px-16 lg:py-24 text-gray-900 h-screen lg:mb-36`;
const StoreContainer = tw.div`flex flex-wrap items-center justify-between`;
const Input = tw(TextInputField)`w-full rounded-lg py-3`;
const Accordion = tw(Panel)`border border-gray-200 shadow-md`;
const { Paragraph } = Placeholder;

const Wallet = () => {

    const { state, dispatch } = useAppContext();
    const { token, id } = state;
    const [tokens, setTokens] = useState();
    const [providers, setProviders] = useState();
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [revokedTokenDetails, setRevokedTokenDetails] = useState(
        {
            provider: "",
            platform: ""
        });

    const [alert, setAlert] = useState(
        {
            loading: false,
            platforms: true,
            modal: false
        });

    //used to check password length when user revokes token prevents error 400 from BE
    const validatePassword = () => {
        if (password.length >= 8) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    useTitle("Wallet (Store Access)");

    useEffect(() => {
        getProviders(id, token)
            .then(response => {
                let tokens = response.data.user_provider;
                let providers = response.data.default_provider;
                if (providers.length) {
                    setProviders(providers);
                }
                if (tokens.length) {
                    setTokens(tokens);
                }
                setAlert({ platforms: false });
            })
            .catch((error) => {
                if (error.response) {
                    toaster.danger("Request Error", {
                        description: "Sorry we could not process your request. Please check your network connection and try again"
                    });

                } else if (error.request) {
                    setAlert({ loading: false });
                    toaster.danger("Network Error", {
                        description: "We could not fetch your tokens. Please check your network and reload this page"
                    });
                } else {
                    toaster.danger("No Tokens", {
                        description: "You haven't stored any tokens. Please add them"
                    });
                }
                setAlert({ platforms: false });
            });
    }, [token, id]);

    const getPlatformToken = (provider, platform) => {
        setAlert({ loading: true })
        getPlatformOauthToken(id, token, provider, platform)
            .then(response => {
                //set new token
                dispatch({
                    type: "LOGIN",
                    payload: {
                        id: id,
                        token: response.data.auth_key
                    }
                });
                //open authorization window
                openSignInWindow(response.data.url);
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
        revokeToken(password, provider, platform)
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

    const openSignInWindow = (url) => {
        // remove any existing event listeners
        window.removeEventListener('message', receiveMessage);

        if (windowObjectReference === null || windowObjectReference.closed) {
            /* if the pointer to the window object in memory does not exist
             or if such pointer exists but the window was closed */
            windowObjectReference = window.open(url, '_blank');
        } else if (previousUrl !== url) {
            /* if the resource to load is different,
             then we load it in the already opened secondary window and then
             we bring such window back on top/in front of its parent window. */
            windowObjectReference = window.open(url, '_blank');
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
            savePlatformOauthToken(id, token, "google", "gmail", data.code)
                .then(response => {
                    setAlert({ loading: false });
                    toaster.success("Token stored successfully");
                    dispatch({
                        type: "LOGIN",
                        payload: {
                            id: id,
                            token: response.data.auth_key
                        }
                    });
                    setAlert({ loading: false, notify: false });
                    window.location.reload();
                }).catch((error) => {
                    toaster.danger("An error occured", {
                        description: "Please Check your network connection and try again"
                    })
                });
        }
    };

    if (alert.loading) {
        return <AnimateLoader />
    }

    return (
        <>
            <PageAnimationWrapper>
                <Container>

                    <Heading>Wallet</Heading>
                    <Description>Save your tokens for rainy days</Description>

                    <Row>
                        <Column>
                            {alert.platforms ? (
                                <Paragraph style={{ marginTop: 30 }} rows={5} active />
                            ) : (
                                <Card>
                                    <SubHeading>Providers</SubHeading>
                                    <br />
                                    {providers ? (
                                        <>
                                            {providers.map(provider => {
                                                return (
                                                    <Accordion header={< PlatformTitle > {provider?.provider}</PlatformTitle>} key={provider?.provider} collapsible={true} bordered>
                                                        <p>Store your {provider?.provider} token which will be used for authentication on your behalf in the event
                                                            of an internet shutdown.</p>
                                                        <br />
                                                        <p>You can define how this token will be used by setting the scopes of access</p>
                                                        <br />
                                                        <StoreContainer>
                                                            <div>
                                                                <PlatformTitle>Description</PlatformTitle>
                                                                <PlatformDescription>{provider?.description}</PlatformDescription>

                                                                <PlatformTitle>Platform</PlatformTitle>
                                                                <PlatformDescription>{provider?.platforms[0].name}</PlatformDescription>

                                                                <PlatformTitle>Type</PlatformTitle>
                                                                <PlatformDescription>{provider?.platforms[0].type}</PlatformDescription>
                                                            </div>
                                                            <StoreButton
                                                                type="submit"
                                                                appearance="primary"
                                                                height={40}
                                                                iconBefore={FiSave}
                                                                isLoading={alert.loading}
                                                                onClick={() => getPlatformToken(provider?.provider, provider?.platforms[0].name)}
                                                            >
                                                                <span>{alert.loading ? "Storing" : "Store"}</span>
                                                            </StoreButton>
                                                        </StoreContainer>
                                                    </Accordion>
                                                )
                                            })}
                                        </>
                                    ) : (
                                        <p>No available providers</p>
                                    )}
                                </Card>
                            )}
                        </Column>
                        <Column>
                            {alert.platforms ? (
                                <Paragraph style={{ marginTop: 30 }} rows={5} active />
                            ) : (
                                <Card>
                                    <SubHeading>Saved tokens</SubHeading>
                                    <br />
                                    {tokens ? (
                                        <>
                                            {tokens.map(token => (
                                                <Accordion header={< PlatformTitle > {token.provider}</PlatformTitle>} key={token.provider} collapsible bordered>
                                                    <StoreContainer>
                                                        <div>
                                                            <PlatformTitle>Description</PlatformTitle>
                                                            <PlatformDescription>{token.description}</PlatformDescription>

                                                            <PlatformTitle>Platform</PlatformTitle>
                                                            <PlatformDescription>{token.platforms[0].name}</PlatformDescription>

                                                            <PlatformTitle>Email address</PlatformTitle>
                                                            <PlatformDescription>{token.email}</PlatformDescription>
                                                        </div>
                                                        <StoreButton
                                                            type="submit"
                                                            appearance="primary"
                                                            intent="danger"
                                                            height={40}
                                                            disabled={id ? false : true}
                                                            iconBefore={FiTrash2}
                                                            isLoading={alert.loading}
                                                            onClick={() => {
                                                                setRevokedTokenDetails({
                                                                    provider: token.provider,
                                                                    platform: token.platforms[0].name
                                                                });
                                                                setAlert({ modal: true });
                                                            }}
                                                        >
                                                            <span>{alert.loading ? "Revoking" : "Revoke"}</span>
                                                        </StoreButton>
                                                    </StoreContainer>
                                                </Accordion>
                                            ))}
                                        </>
                                    ) : (
                                        <p>No stored tokens</p>
                                    )}
                                </Card>
                            )}
                        </Column>
                    </Row>
                </Container>

                <Dialog
                    isShown={alert.modal}
                    title="Confirm action"
                    intent="danger"
                    hasClose={false}
                    shouldCloseOnOverlayClick={false}
                    shouldCloseOnEscapePress={false}
                    isConfirmDisabled={isValid ? false : true}
                    onConfirm={() => {
                        handleRevokeToken(revokedTokenDetails.provider, revokedTokenDetails.platform);
                        setAlert({ loading: true })
                    }}
                    onCloseComplete={() => setAlert({ modal: false })}
                    confirmLabel="confirm revoke"
                >
                    <h4 tw="text-xl font-medium">Are you sure you want to delete this token from your account? This cannot be reversed</h4>
                    <br />
                    <p>Please enter you password to Confirm </p>
                    <br />
                    <div tw="relative">
                        <Input
                            type={toggle ? "text" : "password"}
                            label="Password"
                            placeholder="Password"
                            inputHeight={40}
                            required
                            minLength="8"
                            onChange={(evt) => {
                                setPassword(evt.target.value);
                                validatePassword();
                            }}
                        />
                        <ToggleButton
                            toggleFunc={setToggle}
                            value={toggle}
                        />
                    </div>
                </Dialog>
            </PageAnimationWrapper>
        </>
    );
}

export default Wallet;