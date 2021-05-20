import React, { useState } from "react";
import PageAnimationWrapper from "helpers/PageAnimationWrapper.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import illustration from "images/login-illustration.svg";
import logo from "images/logo.png";
import { FiLogIn } from "react-icons/fi";
import { Button, TextInputField, toaster } from 'evergreen-ui';
import { setToken, userLogin } from 'services/auth.service';
import { Link } from "react-router-dom";
import useTitle from "helpers/useTitle";

const Container = tw(ContainerBase)`min-h-screen bg-white text-white font-medium flex justify-center `;
const Content = tw.div`max-w-screen-xl m-0 text-gray-900  md:flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-2 sm:p-12`;
const LogoImage = tw.img`h-60 mx-auto block`;
const MainContent = tw.div`flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-bold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto px-4 sm:px-3`;
const Input = tw(TextInputField)`w-full rounded-lg`;
const SubmitButton = tw(Button)`w-full rounded-lg`;
const IllustrationContainer = tw.div` flex-1 bg-primary-900 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

const Login = () => {

  useTitle("Sign In");

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const formProps = {
    onSubmit: async (e) => {
      e.preventDefault();
      setLoading(true);
      userLogin(username, password)
        .then(response => {
          if (response.status === 200) {
            setLoading(false);
            toaster.success('Login successful', {
              description: "You will be redirected shortly"
            });
            setToken(response.data.auth_key);

            /*
              potential for improving UX here if the API responds fast then
              timeout won't be neccessary
             */

            setTimeout(() => {
              window.location.replace("/dashboard");
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
                toaster.danger('Something went wrong', {
                  description: 'Its not you its Us. Please try again'
                }
                );
                break;

              case 401:
                setLoading(false);
                toaster.danger('Forbidden', {
                  description: 'Account is unauthorized. Sign Up to create account'
                }
                );
                break;

              case 500:
                setLoading(false);
                toaster.danger('Something went wrong', {
                  description: 'Its not you its Us. We are working to resolve this'
                }
                );
                break;

              default:
                setLoading(false);
            }

          } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            setLoading(false);
            toaster.danger('Network error', {
              description: 'Please check your network and try again'
            }
            );

          } else {
            // Something happened in setting up the request and triggered an Error
            setLoading(false);
            toaster.danger('Network error', {
              description: 'Please check your network and try again'
            }
            );
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
              <Heading>Sign In</Heading>
              <FormContainer>
                <Form {...formProps}>
                  <Input
                    type="text"
                    label="Phone number"
                    placeholder="Phone number"
                    inputHeight={40}
                    required
                    onChange={evt => setUsername(evt.target.value)}
                  />

                  <Input
                    type="password"
                    label="Password"
                    placeholder="Password"
                    inputHeight={40}
                    required
                    onChange={evt => setPassword(evt.target.value)}
                  />


                  <SubmitButton
                    type="submit"
                    appearance="primary"
                    height={40}
                    iconBefore={loading ? null : FiLogIn}
                    isLoading={loading}
                  >
                    <span className="text">{loading ? "Signing In" : "Sign In"}</span>
                  </SubmitButton>
                </Form>
                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Dont have an account?{" "}
                  <Link to="/sign-up" tw="text-primary-900">
                    Sign Up
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
    </PageAnimationWrapper>
  )
};

export default Login;