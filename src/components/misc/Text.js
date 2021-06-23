import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";

export const HeadingRow = tw.div`flex`;
export const Heading = tw.h2`text-3xl sm:text-5xl font-bold tracking-wide leading-tight mb-5`;
export const Description = tw.p`text-base lg:text-lg leading-relaxed tracking-wide text-gray-700 mt-8`;
export const DonateButton = tw(Link)`w-full mt-8 px-8 py-3 font-bold rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 block text-center`;
export const Text = styled.div`
  ${tw`text-lg  text-gray-700`}
  p {
    ${tw`mt-2 leading-loose`}
  } 
  h1 {
    ${tw`text-3xl font-bold mt-10 `}
  }
  h2 {
    ${tw`text-2xl font-bold mt-8`}
  }
  h3 {
    ${tw`text-xl font-bold mt-6`}
  }
  strong {
    ${tw``}
  }
  ul {
    ${tw`list-disc list-inside`}
    li {
      ${tw`ml-2 mb-3`}
      p {
        ${tw`mt-0 inline leading-normal`}
      }
    }
  }
  dt {
    ${tw`font-bold mb-2`}
  }
  dd {
    margin: 0;
    padding: 0 0 1.5em 0;
  }
`;