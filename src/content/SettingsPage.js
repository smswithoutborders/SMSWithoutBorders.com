import React, { useState } from 'react';
import tw, { styled } from "twin.macro";
import PageAnimationWrapper from "helpers/PageAnimationWrapper";
import PasswordStrengthBar from 'react-password-strength-bar';
import useTitle from 'helpers/useTitle';
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import flags from 'react-phone-number-input/flags'
import 'react-phone-number-input/style.css'
import { InlineLoader } from 'components/Loaders/AnimateLoader';
import { toaster } from 'evergreen-ui';
import { FiUser, FiTrash2, FiSettings, FiPlusCircle } from 'react-icons/fi';
import { changePassword, deleteAccount, addPhoneNumber, verifyPhoneNumber } from 'services/profile.service';
import { getToken, setToken, removeToken } from "services/storage.service";
import { ToggleButton } from "components/misc/Buttons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppContext } from 'App';

const Heading = tw.h1`font-bold text-4xl mb-4 inline-flex items-center`;
const Description = tw.p`mb-8 text-base md:text-lg leading-relaxed`;
const Title = tw.h2`text-2xl font-bold`;
const Container = tw.div`container px-5 mx-auto py-12 lg:px-16 lg:py-24 text-gray-900 lg:mb-36`;
const FormContainer = tw.div`w-full lg:w-2/3 mx-auto items-center justify-center mt-8 text-gray-900`;
const Form = tw.form`mx-auto sm:px-3`;
const Input = tw.input`relative w-full rounded-md p-3 mb-2 text-gray-700 border border-gray-400 hocus:border-primary-900`;
const Label = tw.label`block font-light mb-2`;
const FormGroup = tw.div`relative mb-4`;
const ErrorMessage = tw.p`text-sm text-red-900 mb-4`;
const SubmitButton = tw.button`inline-flex items-center justify-center text-center rounded-md md:w-1/2 mx-auto p-3  bg-primary-900 text-white font-medium`

const NavButton = styled.button`
  ${tw`inline-flex w-full h-16 items-center transition duration-300 bg-gray-100 hover:bg-primary-800 hocus:outline-none hocus:text-white text-gray-900 font-medium p-4 no-underline appearance-none mb-2`}
  ${({ active }) => active && tw`bg-primary-900 text-white`}
`;

const PhoneNumberInput = styled(PhoneInput)`
    ${tw`p-3 border border-gray-400 hocus:border-primary-900 rounded-md mb-2`}
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


const SettingsPage = () => {
    useTitle("Settings");
    const [page, setPage] = useState(0);
    return (
        <PageAnimationWrapper>
            <Container>
                <div tw="text-center md:text-left">
                    <Heading><FiSettings /> &nbsp; Settings </Heading>
                    <Description>Manage your account</Description>
                </div>
                <div tw="flex flex-col md:flex-row flex-wrap">
                    <div tw="flex flex-row md:flex-col w-full md:w-1/3">
                        <NavButton
                            active={page === 1}
                            onClick={() => setPage(1)}
                        >
                            <FiPlusCircle size={20} tw="mr-2" /> Add Phone Number
                        </NavButton>
                        <NavButton
                            active={page === 2}
                            onClick={() => setPage(2)}
                        >
                            <FiUser size={20} tw="mr-2" /> Change Password
                        </NavButton>
                        <NavButton
                            active={page === 3}
                            onClick={() => setPage(3)}
                        >
                            <FiTrash2 size={20} tw="mr-2" /> Delete Account
                        </NavButton>
                    </div>

                    <div tw="w-full md:w-2/3">
                        {page === 0 && (
                            <div tw="grid place-items-center">
                                <div tw="p-8 text-center h-80">
                                    <FiSettings size={100} tw="mx-auto mb-4" />
                                    <Description>Please Select A setting from the menu</Description>
                                </div>
                            </div>
                        )}
                        {page === 1 && <NewNumber />}
                        {page === 2 && <ChangePassword />}
                        {page === 3 && <DeleteAccount />}

                    </div>
                </div>
            </Container>
        </PageAnimationWrapper>
    );
}

const ChangePasswordSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
    new_password: yup.string().min(8, 'Password must be at least 8 characters').required('Please enter password'),
    confirmPassword: yup.string().min(8, 'Password must be at least 8 characters').required('Please confirm your password')
        .oneOf([yup.ref('new_password'), null], 'Passwords do not match')
});

const ChangePassword = () => {

    useTitle("Change Password");
    const { state, handleLogOut } = useAppContext();
    const { token, id } = state;
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [toggle3, setToggle3] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(ChangePasswordSchema)
    });

    const handleChangePassword = (data) => {
        setLoading(true);
        console.log(data)
        changePassword(id, token, data.password, data.new_password)
            .then(response => {
                toaster.success("Password Changed successfully please login");
                setTimeout(() => { handleLogOut() }, 1000);
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

    if (loading) return <InlineLoader />;

    return (
        <PageAnimationWrapper>
            <div tw="md:border p-4 m-2">
                <div tw="w-full text-gray-800 text-center">
                    <Title>Change Password</Title>
                    <p tw="my-2">Please use the form below to change your password</p>
                </div>

                <FormContainer>
                    <Form onSubmit={handleSubmit(handleChangePassword)}>
                        <FormGroup>
                            <Label>Current Password</Label>
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
                        </FormGroup>


                        <FormGroup>
                            <Label>New Password</Label>
                            <div tw="relative">
                                <Input
                                    tw="mb-2"
                                    type={toggle2 ? "text" : "password"}
                                    placeholder="New Password"
                                    {...register("new_password")}
                                />
                                <ToggleButton
                                    toggleFunc={setToggle2}
                                    value={toggle2}
                                />
                            </div>
                            {errors.new_password && <ErrorMessage>{errors.new_password.message}</ErrorMessage>}
                            <PasswordStrengthBar password={watch('new_password')} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Confirm Password</Label>
                            <div tw="relative">
                                <Input
                                    tw="mb-2"
                                    type={toggle3 ? "text" : "password"}
                                    placeholder="retype password"
                                    {...register("confirmPassword")}
                                />
                                <ToggleButton
                                    toggleFunc={setToggle3}
                                    value={toggle3}
                                />
                            </div>
                            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
                            <PasswordStrengthBar password={watch("confirmPassword")} />
                        </FormGroup>

                        <SubmitButton type="submit">
                            Change Password
                        </SubmitButton>
                    </Form>
                </FormContainer>
            </div>
        </PageAnimationWrapper>
    );
}

const DeleteAccountSchema = yup.object().shape({
    password: yup.string().required('Password is required')
});

const DeleteAccount = () => {

    useTitle("Delete Account");

    const { state, handleLogOut } = useAppContext();
    const { token, id } = state;
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(DeleteAccountSchema)
    });

    const handleChangePassword = (data) => {
        setLoading(true);
        deleteAccount(id, token, data.password)
            .then(response => {
                toaster.success("Account Deleted", {
                    description: "We are sad to see you go"
                });
                setTimeout(() => { handleLogOut() }, 1000);
            })
            .catch((error) => {
                if (error.response) {
                    toaster.danger("Request Error", {
                        description: "Sorry we could not delete your account. Please check your network connection and try again"
                    });
                } else if (error.request) {
                    toaster.danger("Network Error", {
                        description: "We could not delete your account. Please check your network and reload this page"
                    });
                } else {
                    toaster.danger("Profile Error", {
                        description: "We could not delete your account. Please check your network and reload this page"
                    });
                }
                setLoading(false);
            });
    }

    if (loading) return <InlineLoader />;

    return (
        <PageAnimationWrapper>
            <div tw="md:border p-4 m-2">
                <div tw="w-full text-gray-800 text-center">
                    <Title tw="text-red-900">Delete Account</Title>
                    <p tw="my-2">This action cannot be reversed. Please enter your password to confirm</p>
                </div>

                <FormContainer>
                    <Form onSubmit={handleSubmit(handleChangePassword)}>
                        <FormGroup>
                            <Label>Current Password</Label>
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
                        </FormGroup>

                        <SubmitButton
                            tw="bg-red-900"
                            type="submit"
                        >
                            <FiTrash2 size={20} /> &nbsp; Delete Account
                        </SubmitButton>
                    </Form>
                </FormContainer>
            </div>
        </PageAnimationWrapper>
    );
}


const NewNumberSchema = yup.object().shape({
    phone_number: yup.string().required('Please enter a valid phone number')
});

const NewNumber = () => {

    useTitle("Add Phone Number");
    const { state } = useAppContext();
    const { token, id } = state;
    const [page, setPage] = useState(0);
    const [code, setCode] = useState();

    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(NewNumberSchema)
    });

    const handleAddNumber = (data) => {
        setLoading(true);

        let splitNumber = parsePhoneNumber(data.phone_number);
        data.phone_number = splitNumber.nationalNumber;
        data.country_code = "+" + splitNumber.countryCallingCode;

        addPhoneNumber(id, token, data.country_code, data.phone_number)
            .then(response => {
                if (response.status === 200) {
                    toaster.success("Success", {
                        description: "A verification code has been sent to your phone"
                    });
                    setToken(response.data);
                    setPage(2);
                    setLoading(false);
                }
            })
            .catch((error) => {
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
                                description: "An account with this number already exists"
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

    const handleCodeVerification = (evt) => {

        evt.preventDefault();

        setLoading(true);

        const session = getToken();

        verifyPhoneNumber(code, session.session_id, session.svid)
            .then(response => {
                if (response.status === 200) {
                    toaster.success("Success, Code Verified", {
                        description: "Your new phone number has been added"
                    });
                    removeToken()
                    setPage(0);
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

    if (page === 2) {
        return (
            <PageAnimationWrapper>
                <div tw="md:border p-4 m-2">
                    <div tw="w-full text-gray-800 text-center">
                        <Title>Enter Verification Code</Title>
                        <p tw="my-2">Please enter the code sent to you to confirm this operation</p>
                    </div>
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

                            <SubmitButton type="submit">
                                continue
                            </SubmitButton>

                        </Form>
                    </FormContainer>
                </div>
            </PageAnimationWrapper>
        )
    }

    if (loading) return <InlineLoader />;

    return (
        <PageAnimationWrapper>
            <div tw="md:border p-4 m-2">
                <div tw="w-full text-gray-800 text-center">
                    <Title>Add Phone Number</Title>
                    <p tw="my-2">Here, you can add a new phone number to your account</p>
                </div>

                <FormContainer>
                    <Form onSubmit={handleSubmit(handleAddNumber)}>
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

                        <SubmitButton type="submit">
                            <FiPlusCircle size={20} /> &nbsp; Add Number
                        </SubmitButton>
                    </Form>
                </FormContainer>
            </div>
        </PageAnimationWrapper>
    );
}




export default SettingsPage;