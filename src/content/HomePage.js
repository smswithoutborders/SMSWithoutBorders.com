import React from "react";
import tw from "twin.macro";
import phone from "images/phone.png";
import PageAnimationWrapper from "helpers/PageAnimationWrapper";

import { MainNavbar, Footer } from "components";
import { FiMail, FiMessageSquare, FiUserPlus, FiLogIn, FiDownload, FiShield, FiSave } from "react-icons/fi";
import { GoMarkGithub } from "react-icons/go";
import { DiOpensource } from "react-icons/di";
import { IoAccessibility } from "react-icons/io5";
import { GiCheckboxTree } from "react-icons/gi";

const Container = tw.section`px-8 mx-auto text-gray-900`;
const TextContainer = tw.div`flex-grow sm:text-left text-center mt-6 sm:mt-0`;
const SectionContainer = tw.section`mx-auto flex px-8 md:px-8 py-12 md:flex-row flex-col items-center bg-primary-600`;
const ImageContainer = tw.div`md:w-1/2 mb-10 md:mb-0`;
const DetailsContainer = tw.div`md:w-1/2 p-2 flex flex-col  mb-12 md:items-start order-first md:order-last`;
const Heading = tw.h1`font-heading font-black text-4xl sm:text-5xl  mb-8  text-gray-900`;
const SubHeading = tw.h2`text-gray-900 text-xl font-bold mb-2`;
const DescLink = tw.a`inline-flex items-center text-base mb-3 text-gray-900 cursor-pointer hocus:text-primary-900`;
const Description = tw.h3`text-lg leading-relaxed text-gray-800 mb-5`;
const Image = tw.img`block mx-auto shadow-lg rounded-2xl transform md:-rotate-25  md:mt-8 md:-mb-24`;
const Button = tw.button`inline-flex items-center transition duration-300 bg-primary-900 hocus:bg-gray-700 hocus:outline-none hocus:text-white text-white font-medium  px-6 py-4 rounded no-underline items-center appearance-none`;
const DescItem = tw.div`flex items-center lg:w-3/5 mx-auto pb-10 border-gray-200 sm:flex-row flex-col`;
const IconBlock = tw.div`sm:w-32 sm:h-32 h-24 w-24 inline-flex items-center justify-center rounded-full bg-white shadow-xl text-primary-900 flex-shrink-0`;
const Text = tw.p`leading-relaxed text-base`;

const HomePage = () => {

    return (
        <>
            <PageAnimationWrapper tw="h-screen">
                <MainNavbar />
                <SectionContainer>
                    <ImageContainer>
                        <Image
                            src={phone}
                            alt="SMSWithoutBorders Logo"
                            height={250}
                            width={250}
                        />
                    </ImageContainer>
                    <DetailsContainer>
                        <Heading>Stay Productive</Heading>
                        {/* <Description>Our project idea is to provide an Android app which securely allows users to use SMS capable phones to send out email messages and communicate with other online platforms in the event of an internet shutdown; where tools for circumventing censorship will not work, as most of these tools rely on some internet connection.</Description> */}
                        <Description>This project is aimed for developing countries where SMS messages remain widely used for communication and region wide internet shutdowns due to political uprisings have been observed.</Description>
                        {/*
                        <DescLink href="mailto:info@smswithoutborders.com" target="_blank" rel="noreferrer"><FiMail size={20} /> &nbsp; info@smswithoutborders.com</DescLink>
                        <DescLink><FiMessageSquare size={20} /> &nbsp; IRC: freenode/#afkanerd</DescLink>
                        <DescLink href="https://github.com/smswithoutborders" target="_blank" rel="noreferrer"><GoMarkGithub size={20} /> &nbsp; @smswithoutborders</DescLink> */}
                        <Button><FiDownload size={16} /> &nbsp; Get SWOB</Button>
                    </DetailsContainer>
                </SectionContainer>

                <Container>
                    <div tw="py-20">
                        <Heading tw="text-center">How it works</Heading>
                        <SubHeading tw="text-center font-normal">Using SWOB is as easy as authenticating your credentials</SubHeading>
                    </div>
                    <DescItem>
                        <IconBlock tw="sm:mr-10">
                            <FiUserPlus size={48} />
                        </IconBlock>
                        <TextContainer>
                            <SubHeading>Sign Up </SubHeading>
                            <Text>Signup for a SWOB account</Text>
                        </TextContainer>
                    </DescItem>
                    <DescItem>
                        <TextContainer>
                            <SubHeading>Goto Wallet, </SubHeading>
                            <Text>select and store the platform for which you want access for later offline
                                uses</Text>
                        </TextContainer>
                        <IconBlock tw="sm:ml-10 sm:order-none order-first  ">
                            <FiSave size={48} />
                        </IconBlock>
                    </DescItem>
                    <DescItem>
                        <IconBlock tw="sm:mr-10">
                            <FiDownload size={48} />
                        </IconBlock>
                        <TextContainer>
                            <SubHeading>Get the SWOB app from the Playstore</SubHeading>
                            <Text>Goto your SWOB profile online and click on Sync. Use your SWOB app to scan your QR code</Text>
                        </TextContainer>
                    </DescItem>
                    <DescItem>
                        <TextContainer>
                            <SubHeading>Use App</SubHeading>
                            <Text>Enter your password in the app and begin transmitting messages while offline using SMS messages</Text>
                        </TextContainer>
                        <IconBlock tw="sm:ml-10 sm:order-none order-first  ">
                            <FiLogIn size={48} />
                        </IconBlock>
                    </DescItem>
                </Container>

                <Container tw="bg-gray-100">
                    <div tw="py-16">
                        <Heading tw="text-center">Why use SWOB?</Heading>
                    </div>
                    <DescItem>
                        <IconBlock tw="sm:mr-10">
                            <IoAccessibility size={48} />
                        </IconBlock>
                        <TextContainer>
                            <SubHeading>Accessibility </SubHeading>
                            <Text>SWOB’s mobile app allows users to have offline communication wherever they
                                are. With as simple as having an SMS message smartphone you can maintain
                                communications with your online platforms</Text>
                        </TextContainer>
                    </DescItem>
                    <DescItem>
                        <TextContainer>
                            <SubHeading>Security</SubHeading>
                            <Text>SWOB transmits messages in securely encrypted formats. This secures every
                                communication from being accessed by intermediate parties while in transit.</Text>
                        </TextContainer>
                        <IconBlock tw="sm:ml-10 sm:order-none order-first  ">
                            <FiShield size={48} />
                        </IconBlock>
                    </DescItem>
                    <DescItem>
                        <IconBlock tw="sm:mr-10">
                            <DiOpensource size={64} />
                        </IconBlock>
                        <TextContainer>
                            <SubHeading>Open source</SubHeading>
                            <Text>Every component of SWOB is open sourced! From the mobile app to the routing
                                mechanisms we use to get your SMS messages to reach your intended
                                platforms.</Text>
                        </TextContainer>
                    </DescItem>
                    <DescItem>
                        <TextContainer>
                            <SubHeading>Decentralized</SubHeading>
                            <Text>SWOB is built to work in decentralized models. Anyone can host a SWOB server.
                                It’s as easy as understanding how to use it</Text>
                        </TextContainer>
                        <IconBlock tw="sm:ml-10 sm:order-none order-first  ">
                            <GiCheckboxTree size={48} />
                        </IconBlock>
                    </DescItem>
                </Container>
                <Footer />
            </PageAnimationWrapper>
        </>
    );
};

export default HomePage;
