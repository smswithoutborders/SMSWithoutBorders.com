import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import illustration from "images/signup-illustration.svg";
import logo from "images/logo.png";
import { FiUserPlus } from "react-icons/fi";
import { Button, TextInputField, toaster, Checkbox } from 'evergreen-ui';
import PasswordStrengthBar from 'react-password-strength-bar';
import { registerUser } from 'services/auth.service';
import { Link } from "react-router-dom";
import useTitle from "helpers/useTitle";

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
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-primary-300 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

const PrivacyTerms = (
  <p tw="text-xs mb-4">
    <span>I agree to abide by SMSWithoutborders &nbsp;</span>
    <a
      href="https://smswithoutborders.com/privacy-policy"
      target="_blank"
      rel="noreferrer"
      tw="border-gray-500 no-underline">
      privacy policy
  </a>
  </p>
);

const SignUp = () => {

  useTitle("Sign Up");

  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [terms, setTerms] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);

  const formProps = {
    onSubmit: async (e) => {
      e.preventDefault();
      setLoading(true);

      if (password !== password2) {
        setIsInvalid(true);
        setLoading(false);
        return
      }

      registerUser(phone, password)
        .then(response => {
          if (response.status === 200) {
            setLoading(false);
            toaster.success("Success", {
              description: `Your account ${phone} has been created`
            });
            setTimeout(() => {
              // setRegistered(true);
            }, 3000);
          }
        })
        .catch(error => {
          if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            switch (error.response.status) {
              case 400:
                setLoading(false);
                toaster.danger("Something went wrong", {
                  description: "Its not your its Us. Please try again"
                });
                break;

              case 409:
                setLoading(false);
                toaster.danger("Something went wrong", {
                  description: "An account with this number already exists.Please Log In instead"
                });
                break;

              case 500:
                setLoading(false);
                toaster.danger("Something went wrong", {
                  description: "Its not you its Us. We are working to resolve it. Please try again"
                });
                break;

              default:
                setLoading(false);
                toaster.danger("Something went wrong", {
                  description: "Please try again"
                });
            }

          } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            setLoading(false);
            toaster.danger("Network error", {
              description: "Please check your network and try again"
            });
          } else {
            // Something happened in setting up the request and triggered an Error
            setLoading(false);
            toaster.danger("Network error", {
              description: "Please check your network and try again"
            });
          }
        });
    },
  };

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoImage src={logo} />
            <MainContent>
              <Heading>Sign Up</Heading>
              <FormContainer>
                <Form {...formProps}>
                  <Input
                    type="text"
                    label="Phone number"
                    placeholder="Phone number"
                    inputHeight={40}
                    required
                    onChange={evt => setPhone(evt.target.value)}
                  />

                  <Input
                    type="password"
                    label="Password"
                    placeholder="Password"
                    inputHeight={40}
                    required
                    minlength="16"
                    onChange={evt => {
                      setPassword(evt.target.value);
                      setConfirmPassword(true);
                    }}
                  />
                  <PasswordStrengthBar password={password} />

                  {confirmPassword ? (
                    <>
                      <Input
                        type="password"
                        label="Confirm Password"
                        placeholder="retype password"
                        inputHeight={40}
                        required
                        minlength="16"
                        onChange={evt => {
                          setPassword2(evt.target.value);
                          setIsInvalid(false);
                        }}
                        isInvalid={isInvalid}
                      />
                      <PasswordStrengthBar password={password2} />
                    </>) : null
                  }

                  <Checkbox
                    label={PrivacyTerms}
                    checked={terms}
                    onChange={(evt) => setTerms(evt.target.checked)}
                  />


                  <SubmitButton
                    type="submit"
                    appearance="primary"
                    height={40}
                    iconBefore={loading ? null : FiUserPlus}
                    isLoading={loading}
                    disabled={!terms}
                  >
                    <span className="text">{loading ? "Registering" : "Sign Up"}</span>
                  </SubmitButton>
                </Form>

                <p tw="my-8 text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link to="/" tw="border-b border-gray-500 border-dotted">
                    Sign In
                  </Link>
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
  )
};

export default SignUp;