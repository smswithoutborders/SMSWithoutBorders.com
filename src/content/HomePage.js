import React from "react";
import tw from "twin.macro";
import logo from "images/logo.png"
import PageAnimationWrapper from "helpers/PageAnimationWrapper";

import { MainNavbar } from "components";
import { FiMail, FiMessageSquare } from "react-icons/fi";
import { GoMarkGithub } from "react-icons/go";

const SectionContainer = tw.section`container mx-auto flex px-5 py-24 md:flex-row flex-col items-center`;
const ImageContainer = tw.div`md:w-3/6 mb-10 md:mb-0`;
const DetailsContainer = tw.div`md:w-4/6 p-2 flex flex-col md:items-start `;
const Heading = tw.h1`font-bold text-4xl sm:text-5xl  mb-8 font-bold text-gray-900`;
// const Description = tw.p`text-base leading-relaxed text-gray-800 font-light`;
const DescLink = tw.p`inline-flex items-center text-base ml-4 text-gray-900 cursor-pointer hocus:text-primary-900`;
const Image = tw.img`object-cover object-center block mx-auto shadow-lg rounded-2xl`;

const HomePage = () => {

    return (
        <>
            <PageAnimationWrapper>
                <MainNavbar />
                <SectionContainer>
                    <ImageContainer>
                        <Image
                            src={logo}
                            alt="SMSWithoutBorders Logo"
                            height={400}
                            width={400}
                        />
                    </ImageContainer>
                    <DetailsContainer>
                        <Heading>Coming Soon ...</Heading>
                        <DescLink href="mailto:info@smswithoutborders.com"><FiMail size={20} /> &nbsp; info@smswithoutborders.com</DescLink>
                        <DescLink><FiMessageSquare size={20} /> &nbsp; IRC: freenode/#afkanerd</DescLink>
                        <DescLink><GoMarkGithub size={20} /> &nbsp; IRC: freenode/#afkanerd</DescLink>
                    </DetailsContainer>
                </SectionContainer>

                {/* <footer>
                    <p>&copy; {new Date().getFullYear()} Powered by <a href="https://afkanerd.io" target="_blank" rel="noreferrer">Afkanerd</a></p>
                </footer> */}
            </PageAnimationWrapper>
        </>
    );
};

export default HomePage;
