import React from "react";
import tw from "twin.macro";
import { Spinner } from "evergreen-ui";

const LoadingContainer = tw.div`grid place-items-center`;

const AnimateLoader = () => {
    return (
        <LoadingContainer tw="h-screen">
            <div>
                <Spinner tw="mx-auto" />
                <p tw="mt-2">Loading please wait</p>
            </div>
        </LoadingContainer>
    );
}

export const InlineLoader = () => {
    return (
        <LoadingContainer tw="h-80">
            <div>
                <Spinner tw="mx-auto" />
                <p tw="mt-2">Loading please wait</p>
            </div>
        </LoadingContainer>
    );
}

export default AnimateLoader;