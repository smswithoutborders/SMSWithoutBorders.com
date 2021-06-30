import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import PageAnimationWrapper from "helpers/PageAnimationWrapper.js";
import useTitle from "helpers/useTitle";
import logo from "images/logo.png";
import { Container as ContainerBase } from "components/misc/Layouts";
import { FiLogIn } from "react-icons/fi";
import { Button, toaster } from 'evergreen-ui';
import { userLogin } from 'services/auth.service';
import { Link } from "react-router-dom";
import { ToggleButton } from "components/misc/Buttons";
import { useAppContext } from "App";
import PhoneInput from "react-phone-number-input";
import AnimateLoader from "components/Loaders/AnimateLoader";
import flags from 'react-phone-number-input/flags'
import 'react-phone-number-input/style.css'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const Container = tw(ContainerBase)`min-h-screen bg-white text-white font-medium flex justify-center `;
const Content = tw.div` m-0 text-gray-900  md:flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-1/3 2xl:w-1/4 p-2 sm:p-12`;
const LogoImage = tw.img`h-60 mx-auto block`;
const MainContent = tw.div`flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-bold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto px-4 sm:px-3`;
const Input = tw.input`relative w-full rounded-md py-2 px-3 mb-2 text-gray-700 border border-gray-400 hocus:border-primary-900`;
const Label = tw.label`block font-light mb-2`;
const FormGroup = tw.div`relative mb-4`;
const ErrorMessage = tw.p`text-sm text-red-900 mb-4`;
const SubmitButton = tw(Button)`w-full rounded-lg py-2`;
const IllustrationContainer = tw.div`lg:flex flex-1 bg-primary-200 hidden`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw` w-full bg-cover bg-center bg-no-repeat`}
`;

const PhoneNumberInput = styled(PhoneInput)`
    ${tw`p-2 border border-gray-400 hocus:border-primary-900 rounded-md mb-2`}
  .PhoneInputCountrySelect {
    ${tw`border-none hocus:border-none mr-8 p-4`}
  }
  .PhoneInputCountryIcon {
    ${tw`border-none hocus:border-none h-5 w-7`}
  }
  .PhoneInputInput {
    ${tw`focus:border-none focus:outline-none appearance-none placeholder-gray-400`}
  }
  .PhoneInputCountryIcon {
    ${tw``}
  }
`;


const LogInSchema = yup.object().shape({
  phone_number: yup.string().required('Please Enter your Phone Number'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Please enter your password'),
});

const Login = () => {

  useTitle("SWOB LogIn");

  const { dispatch } = useAppContext()
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(LogInSchema)
  });

  const handleLogin = (data) => {

    setLoading(true);
    userLogin(data.phone_number, data.password)
      .then(response => {
        if (response.status === 200) {

          toaster.success('Login successful', {
            description: "You will be redirected shortly"
          });

          setTimeout(() => {
            dispatch({
              type: "LOGIN",
              payload: {
                id: response.data.id,
                token: response.data.auth_key
              }
            })
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
              toaster.danger('Something went wrong', {
                description: 'We are working to resolve this. Please try again'
              });
              break;
            case 401:
              toaster.danger('Forbidden', {
                description: 'Account is unauthorized. Sign Up to create account'
              });
              break;
            case 500:
              toaster.danger('Something went wrong', {
                description: 'We are working to resolve this.  Please try again'
              });
              break;
            default:
              toaster.danger('Something went wrong', {
                description: 'We are working to resolve this.  Please try again'
              });
          }
          setLoading(false);
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          setLoading(false);
          toaster.danger('Network error', {
            description: 'Please check your network and try again'
          });
        } else {
          // Something happened in setting up the request and triggered an Error
          setLoading(false);
          toaster.danger('Network error', {
            description: 'Please check your network and try again'
          });
        }
      })
  };

  if (loading) return <AnimateLoader />;

  return (
    <PageAnimationWrapper>
      <Container>
        <Content>
          <MainContainer>
            <LogoImage src={logo} />
            <MainContent>
              <Heading>Sign In</Heading>
              <FormContainer>
                <Form onSubmit={handleSubmit(handleLogin)}>
                  <FormGroup>
                    <Label>Phone Number</Label>
                    <Controller
                      control={control}
                      name="phone_number"
                      render={({ field: { value, onChange } }) => (
                        <PhoneNumberInput
                          flags={flags}
                          international
                          countryCallingCodeEditable={false}
                          placeholder="Enter your phone number"
                          defaultCountry="CM"
                          value={value}
                          type="tel"
                          autoComplete
                          onChange={onChange}
                        />
                      )}
                    />
                    {errors.phone_number && <ErrorMessage>{errors.phone_number.message}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Password</Label>
                    <div tw="relative">
                      <Input
                        type={toggle ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        {...register("password")}
                      />
                      <ToggleButton
                        toggleFunc={setToggle}
                        value={toggle}
                      />
                    </div>
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                  </FormGroup>


                  <SubmitButton
                    type="submit"
                    appearance="primary"
                    height={40}
                    iconBefore={loading ? null : FiLogIn}
                  >
                    <span className="text">"Sign In"</span>
                  </SubmitButton>
                </Form>
                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Dont have an account? &nbsp;
                  <Link to="/sign-up" tw="text-primary-900">
                    Sign Up
                  </Link>
                </p>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            {/* <IllustrationImage imageSrc={illustration} /> */}
            <IllustrationImage imageSrc="https://source.unsplash.com/1600x900/?humanitarian,revolution,research,books,STEM,science" />
          </IllustrationContainer>
        </Content>
      </Container>
    </PageAnimationWrapper>
  )
};

export default Login;