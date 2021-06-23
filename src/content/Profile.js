import React, { useState, useEffect } from 'react';
import tw from "twin.macro"
import axios from "axios";
import QRCode from 'qrcode.react';
import PageAnimationWrapper from "helpers/PageAnimationWrapper";
import AnimateLoader from 'components/Loaders/AnimateLoader';
import useTitle from "helpers/useTitle";
import { ToggleButton } from "components/misc/Buttons";
import { Button, Avatar, toaster, Spinner, Pane, Dialog, TextInputField } from 'evergreen-ui';
import { IoMdSync, IoMdArrowBack } from "react-icons/io";
import { getProfileInfo, changePassword } from "services/profile.service";
import { getLocalState } from "services/storage.service";
import { useAppContext } from 'App';


const SectionContainer = tw.section`p-8 mx-auto flex flex-col lg:flex-wrap content-center md:flex-row bg-gray-100 h-screen`;
const ImageContainer = tw.div`md:w-1/2 mb-4 md:mb-0`;
const DetailsContainer = tw.div`md:w-1/2 flex flex-col text-center md:text-left p-4 lg:-ml-16`;
const Image = tw(Avatar)`block mx-auto md:ml-auto `;
const Heading = tw.h1`font-bold sm:text-4xl text-2xl mb-4 font-bold text-gray-900`;
const ProfileName = tw.span`font-light`;
const Description = tw.h3`text-lg font-bold leading-relaxed text-gray-800 mb-1`;
const QRContainer = tw(QRCode)`block mx-auto border shadow-lg rounded-xl p-4`;
const Meta = tw.p`font-light leading-relaxed text-gray-700 mb-4`;
const SyncButton = tw(Button)`rounded-md w-2/3 lg:w-1/3 md:h-12 mb-4 md:mb-0`;
const ButtonGroup = tw.div`flex flex-col md:flex-row items-center mt-4`;
const Input = tw(TextInputField)`w-full rounded-lg py-3`;

const Profile = () => {
    useTitle("Your Profile")
    const { dispatch, state, handleLogOut } = useAppContext();
    const { userProfile, token, id } = state;
    const [loading, setLoading] = useState(false);
    const [syncState, setSyncState] = useState({
        ws: null,
        open: false,
        connected: false,
        loading: false,
        paused: false,
        acked: false,
        qrLink: ""
    });
    const [modal, setModal] = useState(false);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    //used to check password length when user revokes token prevents error 400 from BE
    const validatePassword = () => {
        if (newPassword.length >= 8) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }
    const handleChangePassword = () => {
        setLoading(true);
        changePassword(id, token, password, newPassword)
            .then(response => {
                toaster.success("Password Changed successfully please login");
                setTimeout(() => { handleLogOut() }, 1000);
            })
            .catch((error) => {
                if (error.response) {
                    toaster.danger("Request Error", {
                        description: "Sorry we could not change your password. Please check your network connection and try again"
                    });
                } else if (error.request) {
                    toaster.danger("Network Error", {
                        description: "We could not change your password. Please check your network and reload this page"
                    });
                } else {
                    toaster.danger("Profile Error", {
                        description: "An internal error occured. Please log out and login again"
                    });
                }
                setLoading(false);
            });
    }


    useEffect(() => {
        if (!Object.keys(userProfile).length > 0) {
            setLoading(true);
            getProfileInfo(id, token)
                .then(response => {
                    dispatch({ type: "SETUSERPROFILE", payload: response.data });
                    setLoading(false);
                })
                .catch((error) => {
                    if (error.response) {
                        toaster.danger("Request Error", {
                            description: "Sorry we could not locate your profile. Please check your network connection and try again"
                        });

                    } else if (error.request) {
                        toaster.danger("Network Error", {
                            description: "We could not fetch your profile. Please check your network and reload this page"
                        });
                    } else {
                        toaster.danger("Profile Error", {
                            description: "An internal error occured. Please log out and login again"
                        });
                    }
                    setLoading(false);
                });
        }
    }, [userProfile, token, id, dispatch]);

    const handleSync = () => {
        setSyncState({ open: true, loading: true });

        let ROUTER_URL = process.env.REACT_APP_ROUTER_URL;

        let authObj = getLocalState();
        let AUTH_KEY = authObj?.token;
        let AUTH_ID = authObj?.id;

        axios.post(ROUTER_URL + "/sync/sessions", {
            auth_key: AUTH_KEY,
            id: AUTH_ID
        }).then(response => {

            let ws = new WebSocket(response.data.url);

            ws.onopen = () => {

                //set ws reference in state
                setSyncState(syncState => {
                    return { ...syncState, ws: ws };
                });
                toaster.notify("Sync started", {
                    description: "Please scan the qr code"
                });
            }

            ws.onmessage = evt => {
                // listen to data sent from the websocket server
                // eslint-disable-next-line eqeqeq
                if (evt.data == "200- acked") {
                    setSyncState(syncState => {
                        return { ...syncState, acked: true }
                    });
                    toaster.success("Sync complete");
                    // eslint-disable-next-line eqeqeq
                } else if (evt.data == "201- paused") {
                    setSyncState(syncState => {
                        return { ...syncState, paused: true };
                    });
                } else {
                    setSyncState(syncState => {
                        return { ...syncState, loading: false, connected: true, qrLink: evt.data };
                    });
                }
            }

            ws.onclose = () => {
                toaster.notify("Sync session expired", {
                    description: "Please sync again"
                });
                setSyncState(false);
            }

            ws.onerror = (err) => {
                toaster.danger("An error occured", {
                    description: "Please sync again"
                });
            }
        }).catch((error) => {
            if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                toaster.danger("Request Error", {
                    description: "Sorry we could not sync your profile. Please check your network connection and try again"
                });

            } else if (error.request) {
                /*
                 * The request was made but no response was received, `error.request`
                 * is an instance of XMLHttpRequest in the browser and an instance
                 * of http.ClientRequest in Node.js
                 */
                console.log(error.request);
                toaster.danger("Network Error", {
                    description: "We could not sync your profile. Please check your network and try again"
                });

            } else {
                // Something happened in setting up the request and triggered an Error
                toaster.danger("Profile Error", {
                    description: "We could not sync your profile. Please check your network, log out and login again"
                });
            }
            setSyncState({ open: false });
        });
    }

    if (loading) {
        return (
            <AnimateLoader />
        )
    }

    if (syncState.open) {
        return (
            <PageAnimationWrapper>
                <SectionContainer>
                    <ImageContainer>
                        {syncState.connected && (
                            <QRContainer
                                value={syncState.qrLink}
                                size={300}
                            />
                        )}

                        {(syncState.loading || syncState.paused) && (
                            <Pane
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                height={275}
                                width={275}
                                tw="border border-gray-100 shadow-lg rounded-lg p-4 mx-auto">
                                <Spinner />
                            </Pane>
                        )}

                    </ImageContainer>
                    <DetailsContainer>
                        <Heading>Sync Mobile</Heading>
                        <Description>Please scan the QR code to sync with App</Description>
                        <Meta>This lets you use the SW/OB secure gateway for all messages</Meta>
                        <br />
                        <Description>Status</Description>
                        <Meta>{syncState.paused ? "syncing" : "pending"}</Meta>
                        <br />
                        <SyncButton
                            iconBefore={IoMdArrowBack}
                            height="40"
                            appearance="primary"
                            intent="danger"
                            onClick={() => {
                                setSyncState(false);
                                syncState.ws.close();
                            }}
                        >
                            stop sync
                        </SyncButton>
                    </DetailsContainer>
                </SectionContainer>
            </PageAnimationWrapper>
        )
    }

    return (
        <PageAnimationWrapper>
            <SectionContainer>
                <ImageContainer>
                    <Image tw="hidden md:block" name={userProfile?.name} size={250} />
                    <Image tw="md:hidden" name={userProfile?.name} size={180} />
                </ImageContainer>
                <DetailsContainer>
                    <Heading> Welcome, <ProfileName>{userProfile?.name}</ProfileName> </Heading>
                    <Description>Join Date</Description>
                    <Meta>{new Date(userProfile?.created).toLocaleString()}</Meta>
                    <Description>Last Login</Description>
                    <Meta>{new Date(userProfile?.last_login).toLocaleString()}</Meta>
                    <ButtonGroup>
                        <SyncButton
                            iconBefore={IoMdSync}
                            appearance="primary"
                            height="40"
                            onClick={() => handleSync()}
                        >
                            sync with app
                        </SyncButton>

                        <SyncButton
                            iconBefore={IoMdSync}
                            appearance="default"
                            height="40"
                            tw="md:ml-4"
                            onClick={() => setModal(true)}
                        >
                            reset password
                        </SyncButton>
                    </ButtonGroup>
                </DetailsContainer>
            </SectionContainer>

            <Dialog
                isShown={modal}
                title="Change your password"
                hasClose={false}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEscapePress={false}
                isConfirmDisabled={isValid ? false : true}
                onConfirm={() => { handleChangePassword(); setModal(false) }}
                onCloseComplete={() => setModal(false)}
                confirmLabel="confirm change"
            >
                <div tw="relative">
                    <Input
                        type={toggle ? "text" : "password"}
                        label="Current Password"
                        placeholder="Enter current password"
                        inputHeight={40}
                        required
                        minLength="8"
                        onChange={(evt) => {
                            setPassword(evt.target.value);
                        }}
                    />
                    <ToggleButton
                        toggleFunc={setToggle}
                        value={toggle}
                    />
                </div>
                <div tw="relative">
                    <Input
                        type={toggle2 ? "text" : "password"}
                        label="New Password"
                        placeholder="Enter new password"
                        inputHeight={40}
                        required
                        minLength="8"
                        onChange={(evt) => {
                            setNewPassword(evt.target.value);
                            validatePassword();
                        }}
                    />

                    <ToggleButton
                        toggleFunc={setToggle2}
                        value={toggle2}
                    />
                </div>

            </Dialog>
        </PageAnimationWrapper>
    );
};

export default Profile;
