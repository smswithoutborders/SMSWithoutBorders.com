import React, { useState, useEffect } from 'react';
import tw from "twin.macro";
import PageAnimationWrapper from "helpers/PageAnimationWrapper";
import AnimateLoader from 'components/Loaders/AnimateLoader';
import useTitle from 'helpers/useTitle';
import { getProviders, getPlatformOauthToken, revokeToken } from 'services/wallet.service';
import { Button, toaster, Dialog } from 'evergreen-ui';
import { FiSave, FiTrash2 } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { Panel, Placeholder } from "rsuite";
import { ToggleButton } from "components/misc/Buttons";
import { useAppContext } from 'App';

const StoreButton = tw(Button)`rounded-md`;
const Heading = tw.h1`font-bold text-4xl mb-4 inline-flex items-center`;
const Description = tw.p`mb-8 text-base md:text-lg leading-relaxed`;
const PlatformTitle = tw.h4`text-lg font-medium`;
const PlatformDescription = tw.p`mb-2`;
const SubHeading = tw.h3`text-lg font-bold`;
const Card = tw.div`h-full`;
const Column = tw.div`p-4 md:w-1/2 w-full`;
const Row = tw.div`flex flex-wrap -m-4 mt-12`;
const Container = tw.div`container px-5 mx-auto py-12 lg:px-16 lg:py-24 text-gray-900 h-screen lg:mb-36`;
const StoreContainer = tw.div`flex flex-wrap items-center justify-between`;
const Input = tw.input`relative w-full rounded-md py-2 px-3 mb-2 text-gray-700 border border-gray-400 hocus:border-primary-900`;
const Label = tw.label`block font-light mb-2`;
const Accordion = tw(Panel)`border border-gray-200 shadow-md`;
const { Paragraph } = Placeholder;

const Wallet = () => {

    const { state } = useAppContext();
    const { token, id } = state;
    const [tokens, setTokens] = useState();
    const [providers, setProviders] = useState();
    const [password, setPassword] = useState("");
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
                //open authorization window
                window.open(response.data.url, '_self');
            })
            .catch((error) => {
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    toaster.danger("An error occurred", {
                        description: "Please try again"
                    })
                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    toaster.danger("Network Error", {
                        description: "Please Check your network connection and try again"
                    })
                } else {
                    // Something happened in setting up the request and triggered an Error
                    toaster.danger("There are currently no stored Tokens",)
                }
                setAlert({ loading: false });
            });
    };

    const handleRevokeToken = (provider, platform) => {
        setAlert({ loading: true })
        revokeToken(id, token, password, provider, platform)
            .then(response => {
                if (response.status === 200) {
                    setTokens(0);
                    toaster.success('Token deleted successfully', {
                        description: "Please wait while we update your information"
                    });
                    setTimeout(() => {
                        window.location.reload();
                        setAlert({ loading: false });
                    }, 1500)
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

    if (alert.loading) {
        return <AnimateLoader />
    }

    return (
        <>
            <PageAnimationWrapper>
                <Container>

                    <Heading><IoWalletOutline /> &nbsp; Wallet</Heading>
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
                    isConfirmDisabled={password.length > 8 ? false : true}
                    onConfirm={() => handleRevokeToken(revokedTokenDetails.provider, revokedTokenDetails.platform)}
                    onCloseComplete={() => setAlert({ modal: false })}
                    confirmLabel="confirm revoke"
                >
                    <h4 tw="text-xl font-medium">Are you sure you want to delete this token from your account? This cannot be reversed</h4>
                    <br />
                    <p>Please enter you password to Confirm </p>
                    <br />
                    <Label>Password</Label>
                    <div tw="relative">
                        <Input
                            type={toggle ? "text" : "password"}
                            placeholder="Password"
                            inputHeight={40}
                            required
                            minLength="8"
                            onChange={(evt) => setPassword(evt.target.value)}
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