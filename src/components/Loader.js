import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const LoadingContainer = styled.div.attrs({
  className: "grid place-items-center text-gray-600 mx-auto w-full",
})``;

const Spinner = styled.div.attrs({
  className:
    "animate-spin rounded-full h-16 w-16 border-b-2 border-gray-600 mb-4",
})``;

export const Loader = ({ message }) => {
  return (
    <LoadingContainer className="h-screen">
      <div>
        <Spinner className="mx-auto" />
        <p className="mt-2">{message || "Loading please wait"}</p>
      </div>
    </LoadingContainer>
  );
};

export const InlineLoader = ({ message }) => {
  return (
    <LoadingContainer className="h-80">
      <div>
        <Spinner className="mx-auto" />
        <p className="mt-2">{message || "Loading please wait"}</p>
      </div>
    </LoadingContainer>
  );
};

Loader.propTypes = {
  message: PropTypes.string,
};

InlineLoader.propTypes = {
  message: PropTypes.string,
};
