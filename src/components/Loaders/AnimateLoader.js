import React from "react";
import tw from "twin.macro";
import { Spinner } from "evergreen-ui";

const LoadingContainer = tw.div`h-screen grid place-items-center`;

const AnimateLoader = () => {
    return (
        <LoadingContainer>
            <div>
                <Spinner tw="mx-auto" />
                <p tw="mt-2">Loading please wait</p>
            </div>
        </LoadingContainer>
    );
}

export default AnimateLoader;