import React, { useState } from "react";
import PageAnimationWrapper from "helpers/PageAnimationWrapper.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
// import illustration from "images/signup-illustration.svg";
import logo from "images/logo.png";
import PasswordStrengthBar from 'react-password-strength-bar';
import useTitle from "helpers/useTitle";
import { FiUserPlus } from "react-icons/fi";
import { Button, TextInputField, toaster, Checkbox } from 'evergreen-ui';
import { registerUser } from 'services/auth.service';
import { Link } from "react-router-dom";
import { ToggleButton } from "components/misc/Buttons";


const Container = tw(ContainerBase)`min-h-screen bg-white text-white font-medium flex justify-center `;
const Content = tw.div` m-0 text-gray-900  md:flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-1/3 2xl:w-1/4 p-2 sm:p-12`;
const LogoImage = tw.img`h-60 mx-auto block`;
const MainContent = tw.div`flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-bold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto px-4 sm:px-3`;
const Input = tw(TextInputField)`w-full rounded-lg py-3`;
const SubmitButton = tw(Button)`w-full rounded-lg py-2`;
const IllustrationContainer = tw.div`lg:flex flex-1 bg-primary-200 hidden`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw` w-full bg-cover bg-center bg-no-repeat`}
`;

const PrivacyTerms = (
  <p tw="text-xs mb-4">
    <span>I agree to abide by SMSWithoutborders &nbsp;</span>
    <a
      href="https://smswithoutborders.com/privacy-policy"
      target="_blank"
      rel="noreferrer"
      tw="border-gray-500 text-primary-900 no-underline">
      privacy policy
    </a>
  </p>
);

const SignUp = () => {

  useTitle("SWOB Sign Up");
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [countryCode, setCountryCode] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [terms, setTerms] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);




  const formProps = {
    onSubmit: async (e) => {
      e.preventDefault();
      setLoading(true);

      if (password !== password2) {
        setIsInvalid(true);
        setLoading(false);
        return
      }

      registerUser(name, countryCode, phone, password)
        .then(response => {
          if (response.status === 200) {
            setLoading(false);
            toaster.success(`Success, Your account ${name} has been created`, {
              description: "You will be redirected soon"
            });

            //clean the form fields
            e.target.reset();

            setTimeout(() => {
              window.location.replace("/login")
            }, 1000);
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
    <PageAnimationWrapper>
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
                    label="Username"
                    placeholder="Enter your username"
                    inputHeight={40}
                    required
                    onChange={evt => setName(evt.target.value)}
                  />

                  <Input
                    type="text"
                    label="Country code"
                    placeholder="Enter your Country code"
                    inputHeight={40}
                    required
                    onChange={evt => setCountryCode(evt.target.value)}
                  />

                  <Input
                    type="text"
                    label="Phone number"
                    placeholder="Enter your phone number"
                    inputHeight={40}
                    required
                    onChange={evt => setPhone(evt.target.value)}
                  />

                  <div tw="relative">
                    <Input
                      type={toggle ? "text" : "password"}
                      label="Password"
                      placeholder="Password"
                      inputHeight={40}
                      required
                      minLength="8"
                      onChange={evt => {
                        setPassword(evt.target.value);
                        setConfirmPassword(true);
                      }}
                    />
                    <ToggleButton
                      toggleFunc={setToggle}
                      value={toggle}
                    />
                  </div>
                  <PasswordStrengthBar password={password} />

                  {confirmPassword ? (
                    <>
                      <div tw="relative">
                        <Input
                          type={toggle2 ? "text" : "password"}
                          label="Confirm Password"
                          placeholder="retype password"
                          inputHeight={40}
                          required
                          minLength="8"
                          isInvalid={isInvalid}
                          validationMessage={isInvalid ? "Passwords do not match" : null}
                          onChange={evt => {
                            setPassword2(evt.target.value);
                            setIsInvalid(false);
                          }}
                        />
                        <ToggleButton
                          toggleFunc={setToggle2}
                          value={toggle2}
                        />
                      </div>
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
                  <Link to="/login" tw="text-primary-900">
                    Sign In
                  </Link>
                </p>

              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            {/* <IllustrationImage imageSrc={illustration} /> */}
            <IllustrationImage imageSrc="https://source.unsplash.com/1600x900/?random" />
          </IllustrationContainer>
        </Content>
      </Container>
    </PageAnimationWrapper>
  )
};

export default SignUp;