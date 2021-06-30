import React, { useState } from 'react';
import tw from "twin.macro";
import PageAnimationWrapper from "helpers/PageAnimationWrapper";
import PasswordStrengthBar from 'react-password-strength-bar';
import { InlineLoader } from 'components/Loaders/AnimateLoader';
import useTitle from 'helpers/useTitle';
import { toaster } from 'evergreen-ui';
import { FiUser, FiTrash2, FiSettings } from 'react-icons/fi';
import { changePassword } from 'services/profile.service';
import { ToggleButton } from "components/misc/Buttons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppContext } from 'App';

const Heading = tw.h1`font-bold text-4xl mb-4 inline-flex items-center`;
const Description = tw.p`mb-8 text-base md:text-lg leading-relaxed`;
const Title = tw.h2`text-2xl font-bold`;
const Container = tw.div`container px-5 mx-auto py-12 lg:px-16 lg:py-24 text-gray-900 lg:mb-36`;
const NavButton = tw.button`inline-flex w-full h-16 items-center transition duration-300 bg-gray-100 hocus:bg-primary-900 hocus:outline-none hocus:text-white text-gray-900 font-medium p-4 no-underline appearance-none mb-2`;
const FormContainer = tw.div`w-full lg:w-2/3 mx-auto flex-1 mt-8 text-gray-900`;
const Form = tw.form`mx-auto sm:px-3`;
const Input = tw.input`relative w-full rounded-md p-3 mb-2 text-gray-700 border border-gray-400 hocus:border-primary-900`;
const Label = tw.label`block font-light mb-2`;
const FormGroup = tw.div`relative mb-4`;
const ErrorMessage = tw.p`text-sm text-red-900 mb-4`;
const SubmitButton = tw.button`block text-center rounded-md md:w-1/2 mx-auto p-3  bg-primary-900 text-white`


const SettingsPage = () => {
    useTitle("Settings");
    const [page, setPage] = useState(0);
    return (
        <PageAnimationWrapper>
            <Container>
                <div tw="text-center md:text-left">
                    <Heading>Settings &nbsp; <FiSettings /></Heading>
                    <Description>Manage your account</Description>
                </div>
                <div tw="flex flex-col md:flex-row flex-wrap">
                    <div tw="flex flex-row md:flex-col flex-wrap w-full md:w-1/3">
                        <NavButton onClick={() => setPage(1)}><FiUser size={20} tw="mr-2" /> Change Password</NavButton>
                        <NavButton onClick={() => setPage(2)}><FiTrash2 size={20} tw="mr-2" /> Delete Account</NavButton>
                    </div>

                    <div tw="w-full md:w-2/3">
                        {page === 1 && <ChangePassword />}
                    </div>
                </div>
            </Container>
        </PageAnimationWrapper>
    );
}


const ChangePasswordSchema = yup.object().shape({
    password: yup.string().required('User Name is required'),
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
            <div tw="border p-4 mx-2">
                <div tw="w-full text-gray-800 text-center">
                    <Title>Change Password</Title>
                    <p tw="my-2">Please use the form below to change your password</p>
                </div>

                <FormContainer>
                    <Form onSubmit={handleSubmit(handleChangePassword)}>
                        <FormGroup>
                            <Label>Password</Label>
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

export default SettingsPage;