import React, { useState, useEffect } from 'react';
import tw from "twin.macro"
import { Button, Avatar, toaster, Spinner, Pane } from "evergreen-ui";
import { IoMdSync } from "react-icons/io";
import PageAnimationWrapper from "helpers/PageAnimationWrapper";

import { getProfileInfo, getProfile, setProfile } from "services/profile.service";

const SyncButton = tw(Button)`rounded-md`;
const SectionContainer = tw.section`container mx-auto flex px-5 md:px-8 py-24 md:flex-row flex-col items-center font-bold`;
const ImageContainer = tw.div`lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0`
const DetailsContainer = tw.div`lg:flex-grow md:w-1/2 flex flex-col md:items-start md:text-left items-center text-center`;
const Image = tw(Avatar)`object-cover object-center block mx-auto`;
const Heading = tw.h1`font-bold sm:text-4xl text-3xl mb-4 font-bold text-gray-900`;
const Description = tw.h3`text-lg leading-relaxed text-gray-800`;
const Meta = tw.p`font-light leading-relaxed text-gray-700 mb-4`;

const Profile = () => {

    const [profile, setProfileState] = useState(getProfile);
    const [loading, setLoading] = useState(false);

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

    return (
        <>
            <PageAnimationWrapper>

                {loading ? (
                    <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
                        <Spinner />
                    </Pane>
                ) : (
                        <SectionContainer>
                            <ImageContainer>
                                <Image name={profile?.phone_number} size={250} />
                            </ImageContainer>
                            <DetailsContainer>
                                <Heading> Welcome, {profile?.phone_number} </Heading>
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
                                >
                                    Sync
                        </SyncButton>
                            </DetailsContainer>
                        </SectionContainer>
                    )
                }
            </PageAnimationWrapper>
        </>
    );
};

export default Profile;