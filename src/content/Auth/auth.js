import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, TextInput, Button, Loading, Link, InlineNotification } from 'carbon-components-react';
import { Login24, Information20 } from '@carbon/icons-react';
import { setToken, registerUser, userLogin } from '../../services/auth.service';

let notificationProps = {
    kind: "info",
    lowContrast: true,
    role: 'alert',
    title: 'Missing configuration',
    subtitle: 'You do not have a cloud API specified in your .env file.',
    iconDescription: 'Notification',
    statusIconDescription: 'Notification status icon',
    hideCloseButton: false
};

const Login = ({ setIsLoggedIn }) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [registered, setRegistered] = useState(true);
    const [alert, setAlert] = useState(
        {
            loading: false,
            notify: false
        }
    );

    const formProps = {
        onSubmit: async (e) => {
            e.preventDefault();
            setAlert({ loading: true, notify: false });
            userLogin(username, password)
                .then(response => {
                    if (response.status === 200) {
                        notificationProps.kind = "success";
                        notificationProps.title = "Success";
                        notificationProps.subtitle = "Login successful";
                        setAlert({ loading: false, notify: true });
                        setTimeout(() => {
                            //use placeholder token value for now
                            setToken(response.data.auth_key);
                            setIsLoggedIn(true);
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
                                notificationProps.kind = "error";
                                notificationProps.title = "Something went wrong";
                                notificationProps.subtitle = "Its not you its Us. Please try again";
                                setAlert({ loading: false, notify: true });
                                break;

                            case 401:
                                notificationProps.kind = "error";
                                notificationProps.title = "Forbidden";
                                notificationProps.subtitle = "Account is unauthorized. Sign Up to create account";
                                setAlert({ loading: false, notify: true });
                                break;

                            case 500:
                                notificationProps.kind = "error";
                                notificationProps.title = "Something went wrong";
                                notificationProps.subtitle = "Its not you its Us. We are working to resolve this";
                                setAlert({ loading: false, notify: true });
                                break;

                            default:
                                setAlert({ loading: false, notify: true });
                        }

                    } else if (error.request) {
                        /*
                         * The request was made but no response was received, `error.request`
                         * is an instance of XMLHttpRequest in the browser and an instance
                         * of http.ClientRequest in Node.js
                         */
                        notificationProps.kind = "error";
                        notificationProps.title = "Network error";
                        notificationProps.subtitle = "Please check your network and try again";
                        setAlert({ loading: false, notify: true });
                    } else {
                        // Something happened in setting up the request and triggered an Error
                        notificationProps.kind = "error";
                        notificationProps.title = "Network error";
                        notificationProps.subtitle = "Please check your network and try again";
                        setAlert({ loading: false, notify: true });
                    }
                });
        },
    };

    if (registered) {
        return (
            <div className="bx--grid bx--grid--full-width login-page__container">
                <div className="bx--row">
                    <div className="bx--col-lg-8">
                        {alert.notify ?
                            <InlineNotification {...notificationProps} />
                            : ""
                        }
                        <h1>Log in</h1>
                        <br />
                        <p>
                            <Information20 className="login-centered-icon" /> Don't have an account?
                            <Link onClick={() => setRegistered(false)}> Sign Up</Link>
                        </p>
                        <br />
                        <Form {...formProps}>
                            <FormGroup legendText="">
                                <TextInput
                                    invalidText="Invalid error message."
                                    labelText="User Name"
                                    placeholder="enter username"
                                    id="username"
                                    onChange={evt => setUsername(evt.target.value)}
                                    required
                                />
                                <br />
                                <TextInput.PasswordInput
                                    invalidText="Invalid error message."
                                    labelText="Password"
                                    placeholder="enter password"
                                    id="password"
                                    onChange={evt => setPassword(evt.target.value)}
                                    required
                                />
                            </FormGroup>

                            {alert.loading ?
                                <>
                                    <Loading
                                        description="loading"
                                        withOverlay={false}
                                        small
                                        className="login-centered-icon"
                                    />
                                    <span> Verifying information</span>
                                </> :
                                <Button
                                    className="submit-button"
                                    kind="primary"
                                    type="submit"
                                    renderIcon={Login24}
                                >
                                    Continue
                                </Button>
                            }
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
    return (<SignUp setRegistered={setRegistered} />);
};

const SignUp = ({ setRegistered }) => {

    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [alert, setAlert] = useState(
        {
            loading: false,
            notify: false
        }
    );

    const formProps = {
        onSubmit: async (e) => {
            e.preventDefault();
            setAlert({ loading: true, notify: false });
            registerUser(phone, password)
                .then(response => {
                    if (response.status === 200) {
                        notificationProps.kind = "success";
                        notificationProps.title = "Success";
                        notificationProps.subtitle = phone + " account created";
                        setAlert({ loading: false, notify: true });
                        setTimeout(() => {
                            setRegistered(true);
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
                                notificationProps.kind = "error";
                                notificationProps.title = "Something went wrong";
                                notificationProps.subtitle = "Its not you its Us. Please try again";
                                setAlert({ loading: false, notify: true });
                                break;

                            case 409:
                                notificationProps.kind = "error";
                                notificationProps.title = "Something went wrong";
                                notificationProps.subtitle = "An account with this number already exists. Log In instead";
                                setAlert({ loading: false, notify: true });
                                break;

                            case 500:
                                notificationProps.kind = "error";
                                notificationProps.title = "Something went wrong";
                                notificationProps.subtitle = "Its not you its Us. We are working to resolve this";
                                setAlert({ loading: false, notify: true });
                                break;

                            default:
                                setAlert({ loading: false, notify: true });
                        }

                    } else if (error.request) {
                        /*
                         * The request was made but no response was received, `error.request`
                         * is an instance of XMLHttpRequest in the browser and an instance
                         * of http.ClientRequest in Node.js
                         */
                        notificationProps.kind = "error";
                        notificationProps.title = "Network error";
                        notificationProps.subtitle = "Please check your network and try again";
                        setAlert({ loading: false, notify: true });
                    } else {
                        // Something happened in setting up the request and triggered an Error
                        notificationProps.kind = "error";
                        notificationProps.title = "Network error";
                        notificationProps.subtitle = "Please check your network and try again";
                        setAlert({ loading: false, notify: true });
                    }
                });
        },
    };

    return (
        <div className="bx--grid bx--grid--full-width login-page__container">
            <div className="bx--row">
                <div className="bx--col-lg-8">
                    {alert.notify ?
                        <InlineNotification {...notificationProps} />
                        : ""
                    }
                    <br />
                    <h1>Sign Up</h1>
                    <br />
                    <p>
                        <Information20 className="login-centered-icon" /> Already have an account?
                        <Link onClick={() => setRegistered(true)}> Log In</Link>
                    </p>
                    <br />
                    <Form {...formProps}>
                        <FormGroup legendText="">
                            <TextInput
                                invalidText="Invalid error message."
                                labelText="Phone"
                                placeholder="enter phone number"
                                id="phone_number"
                                onChange={evt => setPhone(evt.target.value)}
                                required
                            />
                            <br />
                            <TextInput.PasswordInput
                                invalidText="Invalid error message."
                                labelText="Password"
                                placeholder="enter password"
                                id="password"
                                onChange={evt => setPassword(evt.target.value)}
                                required
                            />
                        </FormGroup>

                        {alert.loading ?
                            <>
                                <Loading
                                    description="loading"
                                    withOverlay={false}
                                    small
                                    className="login-centered-icon"
                                />
                                <span> loading, please be patient</span>
                            </> :
                            <Button
                                className="submit-button"
                                kind="primary"
                                type="submit"
                                renderIcon={Login24}
                            >
                                Continue
                            </Button>
                        }
                    </Form>
                </div>
            </div>
        </div>
    );
};

Login.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired
}

SignUp.propTypes = {
    setRegistered: PropTypes.func.isRequired
}

export default Login;