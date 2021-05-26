import React, { useState, useEffect } from 'react';
import tw from "twin.macro"
import { Button, Avatar, toaster, Spinner, Pane } from "evergreen-ui";
import { IoMdSync, IoMdArrowBack } from "react-icons/io";
import QRCode from 'qrcode.react';
import PageAnimationWrapper from "helpers/PageAnimationWrapper";
import { getProfileInfo, getProfile, setProfile } from "services/profile.service";

const SyncButton = tw(Button)`rounded-md`;
const SectionContainer = tw.section`container mx-auto flex px-5 md:px-4 py-24 lg:py-36 md:flex-row flex-col items-center font-bold`;
const ImageContainer = tw.div`md:w-1/2 mb-10 md:mb-0`
const DetailsContainer = tw.div`md:w-1/2 flex flex-col md:items-start md:text-left items-center text-center`;
const Image = tw(Avatar)`object-cover object-center block mx-auto`;
const Heading = tw.h1`font-bold sm:text-4xl text-3xl mb-4 font-bold text-gray-900`;
const ProfileName = tw.span`font-light`;
const Description = tw.h3`text-lg leading-relaxed text-gray-800`;
const QRContainer = tw(QRCode)`object-cover object-center block mx-auto`;
const Meta = tw.p`font-light leading-relaxed text-gray-700 mb-4`;

const Profile = () => {

    const [profile, setProfileState] = useState(getProfile);
    const [loading, setLoading] = useState(false);
    const [sync, setSync] = useState(false);

    useEffect(() => {
        if (!profile) {
            setLoading(true);
            getProfileInfo()
                .then(response => {
                    setProfileState(response.data);
                    setProfile(response.data);
                    setLoading(false);
                    window.location.reload();
                })
                .catch((error) => {
                    if (error.response) {
                        /*
                         * The request was made and the server responded with a
                         * status code that falls out of the range of 2xx
                         */
                        setLoading(false);
                        toaster.danger("Request Error", {
                            description: "Sorry we could not locate your profile. Please check your network connection and reload this page"
                        });

                    } else if (error.request) {
                        /*
                         * The request was made but no response was received, `error.request`
                         * is an instance of XMLHttpRequest in the browser and an instance
                         * of http.ClientRequest in Node.js
                         */
                        console.log(error.request);
                        setLoading(false);
                        toaster.danger("Network Error", {
                            description: "We could not fetch your profile. Please check your network and reload this page"
                        });
                    } else {
                        // Something happened in setting up the request and triggered an Error
                        setLoading(false);
                        toaster.danger("Profile Error", {
                            description: "An internal error occured. Please log out and login again"
                        });
                    }
                });
        }
    }, [profile]);


    if (loading) {
        return (
            <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
                <Spinner />
            </Pane>
        )
    }

    if (sync) {
        return (
            <PageAnimationWrapper>
                <SectionContainer>
                    <ImageContainer>
                        <QRContainer
                            value="http://smswithoutborders.com"
                            size={250}
                        />
                    </ImageContainer>
                    <DetailsContainer>
                        <Heading>Sync Mobile</Heading>
                        <Description>Please scan the QR code to sync with App</Description>
                        <Meta>This lets you use the SW/OB secure gateway for all messages</Meta>
                        <br />
                        <Description>Status</Description>
                        <Meta>pending</Meta>
                        <br />
                        <SyncButton
                            iconBefore={IoMdArrowBack}
                            appearance="default"
                            height="40"
                            onClick={() => setSync(!sync)}
                        >
                            profile
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
                    <Image name={profile?.name} size={250} />
                </ImageContainer>
                <DetailsContainer>
                    <Heading> Welcome, <ProfileName>{profile?.name}</ProfileName> </Heading>
                    <Description>Join Date</Description>
                    <Meta>{new Date(profile?.created).toLocaleString()}</Meta>
                    <br />
                    <Description>Last Login</Description>
                    <Meta>{new Date(profile?.last_login).toLocaleString()}</Meta>
                    <br />
                    <SyncButton
                        iconBefore={IoMdSync}
                        appearance="primary"
                        height="40"
                        onClick={() => setSync(!sync)}
                    >
                        sync
                        </SyncButton>
                </DetailsContainer>
            </SectionContainer>
        </PageAnimationWrapper>
    );
};

export default Profile;