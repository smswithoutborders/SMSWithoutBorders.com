import React from 'react';
import tw from "twin.macro"
import { Button } from "evergreen-ui";
import { IoMdSync } from "react-icons/io";
import PageAnimationWrapper from "helpers/PageAnimationWrapper";

const SyncButton = tw(Button)`rounded-md`;
const SectionContainer = tw.section`container mx-auto flex px-5 md:px-8 py-24 md:flex-row flex-col items-center font-bold`;
const ImageContainer = tw.div`lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0`
const DetailsContainer = tw.div`lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center`;
const Image = tw.img`object-cover object-center rounded`;
const Heading = tw.h1`font-medium sm:text-4xl text-3xl mb-4 font-medium text-gray-900`;
const Description = tw.p`mb-8 leading-relaxed`;

const Profile = () => {
    return (
        <>
            <PageAnimationWrapper>
                <SectionContainer>
                    <ImageContainer>
                        <Image alt="hero" src="https://dummyimage.com/720x600" />
                    </ImageContainer>
                    <DetailsContainer>
                        <Heading> Welcome, User Name </Heading>
                        <Description>Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</Description>
                        <SyncButton
                            iconBefore={IoMdSync}
                            appearance="primary"
                            height="40"
                        >
                            Sync
                            </SyncButton>
                    </DetailsContainer>
                </SectionContainer>
            </PageAnimationWrapper>
        </>
    );
};

export default Profile;