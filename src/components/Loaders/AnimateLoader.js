import React from "react";
import PropTypes from "prop-types";
import tw from "twin.macro";
import { Spinner } from "evergreen-ui";

const LoadingContainer = tw.div`grid place-items-center text-gray-700`;

const AnimateLoader = ({ message }) => {
    return (
        <LoadingContainer tw="h-screen">
            <div>
                <Spinner tw="mx-auto" />
                <p tw="mt-2">{message || "Loading please wait"}</p>
            </div>
        </LoadingContainer>
    );
}

export const InlineLoader = ({ message }) => {
    return (
        <LoadingContainer tw="h-80">
            <div>
                <Spinner tw="mx-auto" />
                <p tw="mt-2">{message || "Loading please wait"}</p>
            </div>
        </LoadingContainer>
    );
}

AnimateLoader.propTypes = {
    message: PropTypes.string
}

InlineLoader.propTypes = {
    message: PropTypes.string
}

export default AnimateLoader;