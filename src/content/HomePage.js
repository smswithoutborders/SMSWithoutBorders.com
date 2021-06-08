import React from "react";
import tw from "twin.macro";
import logo from "images/logo.png"
import PageAnimationWrapper from "helpers/PageAnimationWrapper";

import { MainNavbar, Footer } from "components";
import { FiMail, FiMessageSquare, FiUserPlus, FiLogIn, FiDownload } from "react-icons/fi";
import { GoMarkGithub } from "react-icons/go";

const SectionContainer = tw.section`container mx-auto flex px-5 py-24 md:flex-row flex-col items-center h-screen`;
const ImageContainer = tw.div`md:w-1/2 mb-10 md:mb-0`;
const DetailsContainer = tw.div`md:w-1/2 p-2 flex flex-col md:items-start `;
const Heading = tw.h1`font-bold text-4xl sm:text-5xl  mb-8 font-bold text-gray-900`;
const DescLink = tw.a`inline-flex items-center text-base mb-3 text-gray-900 cursor-pointer hocus:text-primary-900`;
const Description = tw.h3`text-lg leading-relaxed text-gray-800 mb-5`;
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
                            height={375}
                            width={375}
                        />
                    </ImageContainer>
                    <DetailsContainer>
                        <Heading>Coming Soon ...</Heading>
                        <Description>Our project idea is to provide an Android app which securely allows users to use SMS capable phones to send out email messages and communicate with other online platforms in the event of an internet shutdown; where tools for circumventing censorship will not work, as most of these tools rely on some internet connection.</Description>
                        <Description>This project is aimed for developing countries where SMS messages remain widely used for communication and region wide internet shutdowns due to political uprisings have been observed.</Description>

                        <DescLink href="mailto:info@smswithoutborders.com" target="_blank" rel="noreferrer"><FiMail size={20} /> &nbsp; info@smswithoutborders.com</DescLink>
                        <DescLink><FiMessageSquare size={20} /> &nbsp; IRC: freenode/#afkanerd</DescLink>
                        <DescLink href="https://github.com/smswithoutborders" target="_blank" rel="noreferrer"><GoMarkGithub size={20} /> &nbsp; @smswithoutborders</DescLink>
                    </DetailsContainer>
                </SectionContainer>

                <section tw="text-gray-600">
                    <div tw="container px-5 py-24 mx-auto">
                        <Heading tw="text-center mb-20">How it works</Heading>
                        <div tw="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                            <div tw="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-primary-100 text-primary-900 flex-shrink-0">
                                <FiUserPlus tw="sm:w-16 sm:h-16 w-10 h-10" />
                            </div>
                            <div tw="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                                <h2 tw="text-gray-900 text-lg font-bold mb-2">Sign Up </h2>
                                <p tw="leading-relaxed text-base">Sign up and save your tokens</p>
                            </div>
                        </div>
                        <div tw="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                            <div tw="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                                <h2 tw="text-gray-900 text-lg font-bold mb-2">Download and synchronize the App</h2>
                                <p tw="leading-relaxed text-base">So that you can begin sending out emails via SMS</p>

                            </div>
                            <div tw="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-primary-100 text-primary-900 flex-shrink-0">
                                <FiDownload tw="sm:w-16 sm:h-16 w-10 h-10" />

                            </div>
                        </div>
                        <div tw="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
                            <div tw="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-primary-100 text-primary-900 flex-shrink-0">
                                <FiLogIn tw="sm:w-16 sm:h-16 w-10 h-10" />
                            </div>
                            <div tw="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                                <h2 tw="text-gray-900 text-lg font-bold mb-2">Login to the App</h2>
                                <p tw="leading-relaxed text-base">and enjoy smswithout borders</p>

                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </PageAnimationWrapper>
        </>
    );
};

export default HomePage;
