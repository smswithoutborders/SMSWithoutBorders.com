import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import tw from "twin.macro";
import "styled-components/macro";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

const StyledInput = styled(PhoneInput)`
  ${tw`border-2 border-gray-300 hocus:(border-2 border-blue-800) rounded-md mb-2 px-3 py-0.5`}
  ${({ invalid }) => invalid && tw`border-red-500`}
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

export const PhoneNumberInput = ({ invalidText, helperText, ...rest }) => {
  return (
    <Fragment>
      <StyledInput
        type="tel"
        flags={flags}
        international
        countryCallingCodeEditable={false}
        defaultCountry="CM"
        {...rest}
      />
      <div className="flex flex-col mt-2">
        <small className="text-red-600">{invalidText}</small>
        <small className="text-gray-500">{helperText}</small>
      </div>
    </Fragment>
  );
};

PhoneNumberInput.propTypes = {
  invalidText: PropTypes.string,
  helperText: PropTypes.string,
};
