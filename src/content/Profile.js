import React from 'react';
import tw from "twin.macro"
import { Button, Avatar} from "evergreen-ui";
import { IoMdSync } from "react-icons/io";
import PageAnimationWrapper from "helpers/PageAnimationWrapper";

const SyncButton = tw(Button)`rounded-md`;
const SectionContainer = tw.section`container mx-auto flex px-5 md:px-8 py-24 md:flex-row flex-col items-center font-bold`;
const ImageContainer = tw.div`lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0`
const DetailsContainer = tw.div`lg:flex-grow md:w-1/2 flex flex-col md:items-start md:text-left items-center text-center`;
const Image = tw(Avatar)`object-cover object-center block mx-auto`;
const Heading = tw.h1`font-medium sm:text-4xl text-3xl mb-4 font-medium text-gray-900`;
const Description = tw.p`mb-8 leading-relaxed text-gray-900`;

const Profile = () => {
    return (
        <>
            <PageAnimationWrapper>
                <SectionContainer>
                    <ImageContainer>
                        <Image name="User Name" size={250} />
                    </ImageContainer>
                    <DetailsContainer>
                        <Heading> Welcome, (User Name) </Heading>
                        <Description>Account details go here</Description>
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