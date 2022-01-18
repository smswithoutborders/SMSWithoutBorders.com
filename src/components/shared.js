// file for minimal components
import styled from "styled-components";
import clsx from "clsx";

export const Button = styled.button.attrs(({ className, disabled }) => ({
  className: clsx(
    "px-8 py-2 border-0 rounded-lg focus:outline-none justify-center flex items-center",
    disabled
      ? "text-gray-500 bg-gray-300"
      : "text-white bg-blue-800 hover:bg-blue-900",
    className
  ),
}))``;
