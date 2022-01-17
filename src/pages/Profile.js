import React, { useState, useEffect } from 'react';
import tw from "twin.macro"
import axios from "axios";
import QRCode from 'qrcode.react';
import { Loader, PageAnimationWrapper, useTitle } from 'components';
import { Avatar, toaster, Spinner, Pane } from 'evergreen-ui';
import { IoMdSync, IoMdArrowBack } from "react-icons/io";
import { getProfileInfo } from "services/profile.service";
import { getLocalState } from "services/storage.service";
import { useAppContext } from 'App';

const SectionContainer = tw.section`p-8 mx-auto flex flex-col lg:flex-wrap content-center md:flex-row bg-gray-100 md:h-screen`;
const ImageContainer = tw.div`md:w-1/2 mb-4 md:mb-0`;
const DetailsContainer = tw.div`md:w-1/2 flex flex-col text-center md:text-left p-4 lg:-ml-16`;
const Image = tw(Avatar)`block mx-auto md:ml-auto `;
const Heading = tw.h1`font-bold sm:text-4xl text-2xl mb-4 text-gray-900`;
const ProfileName = tw.span`font-light`;
const Description = tw.h3`text-lg font-bold leading-relaxed text-gray-800 mb-1`;
const QRContainer = tw(QRCode)`block mx-auto border shadow-lg rounded-xl p-4 bg-white`;
const Meta = tw.p`font-light leading-relaxed text-gray-700 mb-4`;
const SyncButton = tw.button`inline-flex items-center text-center rounded-md text-white p-4 mb-4 md:mb-0 bg-primary-900 font-bold`;
const ButtonGroup = tw.div`flex flex-col md:flex-row items-center mt-4`;

const Profile = () => {
    useTitle("Your Profile")
    const { dispatch, state } = useAppContext();
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


    useEffect(() => {
        if (!Object.keys(userProfile).length > 0) {
            setLoading(true);
            getProfileInfo(id, token)
                .then(response => {
                    dispatch({
                        type: "SETUSERPROFILE", payload: {
                            name: response.data.name,
                            last_login: response.data.last_login,
                            created: response.data.created
                        }
                    });
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

        let ROUTER_URL = import.meta.env.VITE_ROUTER_URL;

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
            }

            ws.onmessage = evt => {
                // listen to data sent from the websocket server
                // eslint-disable-next-line eqeqeq
                if (evt.data == "200- acked") {
                    setSyncState(syncState => {
                        return { ...syncState, acked: true, open: false }
                    });
                    toaster.success("Sync complete");
                    // eslint-disable-next-line eqeqeq
                } else if (evt.data == "201- paused") {
                    setSyncState(syncState => {
                        return { ...syncState, paused: true, connected: false };
                    });
                } else {
                    setSyncState(syncState => {
                        return { ...syncState, loading: false, connected: true, qrLink: evt.data };
                    });
                }
            }

            ws.onclose = () => {
                setSyncState(false);
            }

            ws.onerror = (err) => {
                toaster.danger("An error occured", {
                    description: "Please sync again"
                });
            }
        }).catch((error) => {
            if (error.response) {
                toaster.danger("Request Error", {
                    description: "Sorry we could not sync your profile. Please check your network connection and try again"
                });

            } else if (error.request) {
                toaster.danger("Network Error", {
                    description: "We could not sync your profile. Please check your network and try again"
                });

            } else {
                toaster.danger("Profile Error", {
                    description: "We could not sync your profile. Please check your network, log out and login again"
                });
            }
            setSyncState({ open: false });
        });
    }

    if (loading) {
        return (
            <Loader />
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
                                height={300}
                                width={300}
                                tw="bg-white border border-gray-100 shadow-lg rounded-lg p-4 mx-auto">
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
                        <ButtonGroup>
                            <SyncButton
                                tw="bg-red-900"
                                onClick={() => {
                                    setSyncState(false);
                                    syncState.ws.close();
                                    toaster.notify("Sync session closed");
                                }}
                            >
                                <IoMdArrowBack size={24} /> &nbsp; stop sync
                            </SyncButton>
                        </ButtonGroup>
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
                        <SyncButton onClick={() => handleSync()}>
                            <IoMdSync size={24} /> &nbsp; sync with app
                        </SyncButton>
                    </ButtonGroup>
                </DetailsContainer>
            </SectionContainer>
        </PageAnimationWrapper>
    );
};

export default Profile;
