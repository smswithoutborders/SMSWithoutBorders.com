import styled from "styled-components";
import tw from "twin.macro";
import "styled-components/macro";

export const HeadingRow = tw.div`flex`;
export const Heading = tw.h2`text-3xl sm:text-5xl font-bold tracking-wide leading-tight mb-5`;
export const Description = tw.p`text-base lg:text-lg leading-relaxed tracking-wide text-gray-700 mt-8`;

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
