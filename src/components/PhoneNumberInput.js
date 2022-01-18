import styled from "styled-components";
import tw from "twin.macro";
import "styled-components/macro";
import PhoneInput from "react-phone-number-input";

export const PhoneNumberInput = styled(PhoneInput)`
  ${tw`border border-gray-400 hocus:border-primary-900 rounded-md mb-2 px-3`}
  .PhoneInputCountrySelect {
    ${tw`border-0 hocus:border-0 mr-8`}
  }
  .PhoneInputCountryIcon {
    ${tw`border-0 hocus:border-none h-5 w-7`}
  }
  .PhoneInputInput {
    ${tw`border-0 focus:(border-0 outline-none ring-0) appearance-none placeholder-gray-400`}
  }
  .PhoneInputCountryIcon {
    ${tw``}
  }
`;
