import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import illustration from "images/login-illustration.svg";
import logo from "images/logo.png";
import { FiLogIn } from "react-icons/fi";
import { Button, TextInputField } from 'evergreen-ui'

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-2 sm:p-12`;
const LogoImage = tw.img`h-60 mx-auto block`;
const MainContent = tw.div`flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-bold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto`;
const Input = tw(TextInputField)`w-full rounded-lg`;
const SubmitButton = tw(Button)`w-full rounded-lg`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-primary-400 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

const Login = () => (

  <AnimationRevealPage>
    <Container>
      <Content>
        <MainContainer>
          <LogoImage src={logo} />
          <MainContent>
            <Heading>Sign In</Heading>
            <FormContainer>
              <Form>
                <Input
                  type="text"
                  label="Phone number"
                  placeholder="Phone number"
                  inputHeight={40}
                  required
                />

                <Input
                  type="password"
                  label="Password"
                  placeholder="Password"
                  inputHeight={40}
                  required
                />

                <SubmitButton
                  type="submit"
                  appearance="primary"
                  height={40}
                  iconBefore={FiLogIn}>
                  <span className="text">Sign In</span>
                </SubmitButton>
              </Form>
              <p tw="mt-8 text-sm text-gray-600 text-center">
                Dont have an account?{" "}
                <a href="/sign-up">
                  Sign Up
                 </a>
              </p>
            </FormContainer>
          </MainContent>
        </MainContainer>
        <IllustrationContainer>
          <IllustrationImage imageSrc={illustration} />
        </IllustrationContainer>
      </Content>
    </Container>
  </AnimationRevealPage>
);

export default Login;