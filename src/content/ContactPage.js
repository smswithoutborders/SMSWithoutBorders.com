import React from "react";
import tw from "twin.macro";
import PageAnimationWrapper from "helpers/PageAnimationWrapper";
import { FiMail, FiGlobe, FiMessageSquare } from "react-icons/fi";
import { MainNavbar, Footer } from "components";

const Container = tw.section`md:px-8 mx-auto text-gray-900 h-screen md:pt-24`;
const TextContainer = tw.div`flex-grow text-left mt-6 sm:mt-0`;
const Heading = tw.h1`font-black text-4xl sm:text-5xl mb-8  text-gray-900`;
const SubHeading = tw.h2`text-gray-900 text-sm md:text-base mb-2 leading-relaxed font-bold`;
const DescItem = tw.div`flex flex-row items-center pb-5 border-gray-200 lg:mx-auto `;
const IconBlock = tw.div`h-16 w-16 mr-2 sm:mr-4 inline-flex items-center justify-center rounded-full bg-white shadow-xl text-primary-900 flex-shrink-0`;
const Text = tw.p`leading-relaxed text-sm md:text-base`;
const Column = tw.div`mx-auto h-full flex flex-col lg:flex-row items-start px-4`;
const Row = tw.div`w-full`;

const ContactPage = () => {
    return (
        <>
            <MainNavbar />
            <PageAnimationWrapper>
                <Container>
                    <Row tw="pt-20 pb-12">
                        <Heading tw="text-center">Contact Us</Heading>
                        <SubHeading tw="text-center font-normal">Using SWOB is as easy as authenticating your credentials</SubHeading>
                    </Row>

                    <Column>
                        <DescItem>
                            <IconBlock>
                                <FiMail size={28} />
                            </IconBlock>

                            <TextContainer>
                                <Text>Email</Text>
                                <SubHeading>developers@smswithoutborders.com </SubHeading>
                            </TextContainer>
                        </DescItem>
                        <DescItem>
                            <IconBlock>
                                <FiMessageSquare size={28} />
                            </IconBlock>
                            <TextContainer>
                                <Text>IRC</Text>
                                <SubHeading>freenode/#afkanerd</SubHeading>
                            </TextContainer>
                        </DescItem>
                        <DescItem>
                            <IconBlock>
                                <FiGlobe size={28} />
                            </IconBlock>
                            <TextContainer>
                                <Text>website</Text>
                                <SubHeading>https://smswithoutborders.com</SubHeading>
                            </TextContainer>
                        </DescItem>
                    </Column>
                </Container>
            </PageAnimationWrapper>
            <Footer />
        </>
    )
}

export default ContactPage;