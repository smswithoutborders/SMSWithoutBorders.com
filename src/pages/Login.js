import React, { useState } from "react";
import tw, { styled } from "twin.macro";
import logo from "images/logo.png";
import PasswordStrengthBar from "react-password-strength-bar";
import flags from 'react-phone-number-input/flags';
import { FiLogIn } from "react-icons/fi";
import { Button, toaster } from 'evergreen-ui';
import { userLogin, resetPassword, verifyResetCode, changePassword } from 'services/auth.service';
import { Link } from "react-router-dom";
import { ToggleButton, Loader, PageAnimationWrapper, useTitle, PhoneNumberInput } from "components";
import { useAppContext } from 'App';
import { getToken, setToken, removeToken } from "services/storage.service";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Container = tw.div`relative min-h-screen bg-white text-white font-medium flex justify-center `;
const Content = tw.div` m-0 text-gray-900  md:flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-1/3 2xl:w-1/4 p-2 sm:p-12`;
const LogoImage = tw.img`h-40 mx-auto block mb-10`;
const MainContent = tw.div`flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-bold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto px-4 sm:px-3`;
const Input = tw.input`relative w-full rounded-md! py-2 px-3 mb-2 text-gray-700 border border-gray-400 focus:(border-0 border-primary-900 ring-0 outline-none)`;
const Label = tw.label`block font-light mb-2`;
const FormGroup = tw.div`relative mb-4`;
const ErrorMessage = tw.p`text-sm text-red-900 mb-4`;
const SubmitButton = tw(Button)`w-full rounded-lg py-2`;
const VerifyButton = tw.button`block font-bold text-white text-center rounded-md w-2/3 lg:w-1/3 mx-auto px-3 py-2  text-base bg-primary-900`;
const IllustrationContainer = tw.div`lg:flex flex-1 bg-primary-200 hidden`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`w-full bg-center bg-no-repeat bg-cover `}
`;

const LogInSchema = yup.object().shape({
  phone_number: yup.string().required('Please Enter your Phone Number'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Please enter your password'),
});

const Login = () => {

  useTitle("login");

  const { dispatch } = useAppContext()
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [page, setPage] = useState(0);

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

  if (loading) return <Loader />;

  if (page === 1) return <PhoneNumberPage setLoading={setLoading} setPage={setPage} />

  if (page === 2) return <CodeVerifyPage setLoading={setLoading} setPage={setPage} />

  if (page === 3) return <ResetPasswordPage setLoading={setLoading} setPage={setPage} />;

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
                    Sign In
                  </SubmitButton>
                </Form>

                <p
                  onClick={() => setPage(1)}
                  tw="text-primary-900 text-center my-4 cursor-pointer"
                >
                  Forgot Password
                </p>

                <p tw="mt-4 text-sm text-gray-600 text-center">
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


const ResetPasswordSchema = yup.object().shape({
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Please enter password'),
  confirmPassword: yup.string().min(8, 'Password must be at least 8 characters').required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
});


const PhoneNumberPage = ({ setLoading, setPage }) => {

  const [number, setNumber] = useState();
  const handlePhoneVerify = (evt) => {

    evt.preventDefault();

    setLoading(true);

    resetPassword(number)
      .then(response => {
        if (response.status === 200) {
          toaster.success(`Success, We found your account`, {
            description: "A verification code has been sent to your phone"
          });
          setToken(response.data);
          setPage(2);
          setLoading(false);
        }
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              toaster.danger("An error occured", {
                description: "Its not your its Us. Please try again"
              });
              break;

            case 401:
              toaster.danger("Sorry We did not find your account", {
                description: "please sign up to create one"
              });
              break;

            case 403:
              toaster.notify("Account already verified", {
                description: "Please login"
              });
              break;

            case 409:
              toaster.danger("An error occured", {
                description: "An account with this number already exists.Please Log In instead"
              });
              break;

            case 500:
              toaster.danger("An error occured", {
                description: "Its not you its Us. We are working to resolve it. Please try again"
              });
              break;

            default:
              toaster.danger("Something went wrong", {
                description: "Please try again"
              });
          }
          setLoading(false);

        } else if (error.request) {
          toaster.danger("Network error", {
            description: "Please check your network and try again"
          });
          setLoading(false);
        } else {
          toaster.danger("Network error", {
            description: "Please check your network and try again"
          });
          setLoading(false);
        }
      });
  }

  return (
    <PageAnimationWrapper>
      <div tw="grid place-items-center h-screen">
        <div tw=" h-56 lg:w-1/3 mx-auto">
          <Heading tw="text-gray-700 text-center">Phone Number</Heading>
          <FormContainer>
            <Form onSubmit={(evt) => handlePhoneVerify(evt)}>
              <FormGroup>
                <PhoneNumberInput
                  tw="text-gray-700 p-3"
                  flags={flags}
                  international
                  countryCallingCodeEditable={false}
                  placeholder="Enter your phone number"
                  defaultCountry="CM"
                  value={number}
                  type="tel"
                  onChange={setNumber}
                />
              </FormGroup>

              <VerifyButton type="submit">
                continue
              </VerifyButton>
            </Form>
          </FormContainer>
        </div>

      </div>
    </PageAnimationWrapper>
  )
}

const CodeVerifyPage = ({ setLoading, setPage }) => {

  const [code, setCode] = useState();
  const [resend, setResend] = useState(false);

  //enable reset code button after sometime
  setTimeout(() => {
    setResend(true)
  }, 30000);

  const handleCodeVerification = (evt) => {

    evt.preventDefault();

    setLoading(true);

    const session = getToken();

    verifyResetCode(code, session.session_id, session.svid)
      .then(response => {
        if (response.status === 200) {
          toaster.success(`Success, Code Verified`);
          setToken(response.data);
          setPage(3);
          setLoading(false);
        }
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              toaster.danger("An error occured", {
                description: "Its not your its Us. Please try again"
              });
              break;

            case 401:
              toaster.danger("Invalid code provided", {
                description: "please try again"
              });
              break;

            case 403:
              toaster.notify("Account already verified", {
                description: "Please login"
              });
              break;

            case 409:
              toaster.danger("An error occured", {
                description: "An account with this number already exists.Please Log In instead"
              });
              break;

            case 500:
              toaster.danger("An error occured", {
                description: "Its not you its Us. We are working to resolve it. Please try again"
              });
              break;

            default:
              toaster.danger("Something went wrong", {
                description: "Please try again"
              });
          }

        } else if (error.request) {
          toaster.danger("Network error", {
            description: "Please check your network and try again"
          });
        } else {
          toaster.danger("Network error", {
            description: "Please check your network and try again"
          })
        }
        setLoading(false);
      })
  }


  return (
    <PageAnimationWrapper>
      <div tw="grid place-items-center h-screen text-center">
        <div tw=" h-56 lg:w-1/3 mx-auto">
          <Heading tw="text-gray-700">Enter verification code</Heading>
          <p tw="text-gray-700 my-2">A verification code has been sent to your phone</p>

          <FormContainer>
            <Form onSubmit={(evt) => handleCodeVerification(evt)}>
              <FormGroup>
                <Input
                  tw="p-3"
                  type="number"
                  name="code"
                  min={0}
                  required
                  placeholder="2FA CODE"
                  onChange={(evt) => setCode(evt.target.value)}
                />
              </FormGroup>
              <div tw="flex flex-col md:flex-row">

                {resend && (
                  <VerifyButton
                    tw="bg-white text-primary-900 mt-3 md:mt-0 order-1 md:order-none"
                    onClick={() => setPage(1)}
                  >
                    resend code
                  </VerifyButton>
                )}

                <VerifyButton type="submit">
                  continue
                </VerifyButton>
              </div>
            </Form>
          </FormContainer>
        </div>

      </div>
    </PageAnimationWrapper>
  )
}

const ResetPasswordPage = ({ setLoading, setPage }) => {

  useTitle("Reset Password");
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(ResetPasswordSchema)
  });

  const handleResetPassword = (data) => {
    setLoading(true);
    const session = getToken();
    changePassword(session.auth_key, data.password)
      .then(response => {
        toaster.success("Password Changed successfully please login");
        removeToken();
        setPage(0);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          toaster.danger("Request Error", {
            description: "Sorry we could not change your password. Please check your network connection and try again"
          });
        } else if (error.request) {
          toaster.danger("Network Error", {
            description: "We could not change your password. Please check your network and reload this page"
          });
        } else {
          toaster.danger("Profile Error", {
            description: "An internal error occured. Please log out and login again"
          });
        }
        setLoading(false);
      });
  }


  return (
    <PageAnimationWrapper>
      <div tw="md:border p-4 md:p-12 m-2">
        <div tw="w-full text-gray-800 text-center">
          <Heading>Reset Password</Heading>
          <p tw="my-2">Please use the form below to change your password</p>
        </div>

        <FormContainer tw="md:w-1/2 lg:w-1/3 mx-auto text-gray-900">
          <Form onSubmit={handleSubmit(handleResetPassword)}>
            <FormGroup>
              <Label>New Password</Label>
              <div tw="relative">
                <Input
                  tw="mb-2"
                  type={toggle ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                />
                <ToggleButton
                  toggleFunc={setToggle}
                  value={toggle}
                />
              </div>
              {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
              <PasswordStrengthBar password={watch("password")} />
            </FormGroup>


            <FormGroup>
              <Label>Confirm Password</Label>
              <div tw="relative">
                <Input
                  tw="mb-2"
                  type={toggle2 ? "text" : "password"}
                  placeholder="retype password"
                  {...register("confirmPassword")}
                />
                <ToggleButton
                  toggleFunc={setToggle2}
                  value={toggle2}
                />
              </div>
              {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
              <PasswordStrengthBar password={watch("confirmPassword")} />
            </FormGroup>

            <VerifyButton tw="lg:w-1/2" type="submit">
              Change Password
            </VerifyButton>
          </Form>
        </FormContainer>
      </div>
    </PageAnimationWrapper>
  );
}

export default Login;