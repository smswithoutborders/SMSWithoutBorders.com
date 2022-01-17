import React from "react";
import tw from "twin.macro";
import { PageAnimationWrapper, useTitle } from "components";
import { Link } from "react-router-dom";

const Heading = tw.h1`text-9xl font-black mb-8 tracking-wider`;
const Description = tw.p`mb-8 text-base md:text-lg leading-relaxed`;
const Container = tw.div`container grid place-items-center px-5 mx-auto py-12 lg:px-16 lg:py-24 text-gray-900 h-screen lg:mb-36 text-center`;
const Button = tw(
  Link
)`block w-1/2 mx-auto my-8 px-6 py-4 text-lg text-white bg-primary-900 appearance-none hocus:text-white hocus:no-underline rounded-md`;

const NotFound = () => {
  useTitle("404 Not Found");
  return (
    <PageAnimationWrapper>
      <Container>
        <div tw="p-8">
          <Heading>
            4<span tw="text-primary-900">0</span>4
          </Heading>
          <Description>Sorry this page is unavailable right now</Description>
          <Button to="/dashboard">Back</Button>
        </div>
      </Container>
    </PageAnimationWrapper>
  );
};

export default NotFound;
