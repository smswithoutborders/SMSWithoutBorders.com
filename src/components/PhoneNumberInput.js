import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import "styled-components/macro";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

const StyledInput = styled(PhoneInput)`
  ${tw`border border-gray-400 hocus:(border-2 border-blue-800) rounded-md mb-2 px-3`}
  ${(props) => props.error && tw`border-red-500`}
  .PhoneInputCountrySelect {
    ${tw`border-none hocus:border-none mr-8`}
  }
  .PhoneInputCountryIcon {
    ${tw`border-none hocus:border-none h-5 w-7`}
  }
  .PhoneInputInput {
    ${tw`border-none focus:(border-none outline-none ring-0) appearance-none placeholder-gray-400`}
  }
  .PhoneInputCountryIcon {
    ${tw``}
  }
`;

export const PhoneNumberInput = (props) => {
  return <StyledInput flags={flags} {...props} />;
};
