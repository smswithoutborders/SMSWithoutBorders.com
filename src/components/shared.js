// file for minimal components
import styled from "styled-components";
import clsx from "clsx";

export const Button = styled.button.attrs(
  ({ className, disabled, outline }) => ({
    className: clsx(
      "px-8 py-2 outline-none rounded-lg focus:outline-none justify-center inline-flex items-center",
      disabled
        ? "text-gray-500 bg-gray-200"
        : "text-white bg-blue-800 hover:bg-blue-900",
      outline &&
        "bg-transparent border border-blue-800 text-blue-800 hover:bg-blue-900 hover:text-white",
      className
    ),
  })
)``;

export const ErrorMessage = styled.small.attrs({
  className: "text-red-500 mt-2",
})``;

export const FormGroup = styled.div.attrs({
  className: "relative mb-4",
})``;

export const Input = styled.input.attrs((props) => ({
  className: clsx(
    "w-full text-sm px-3 py-2 block rounded-md border-gray-400 text-gray-500 shadow-sm",
    props.error
      ? "border-red-500 focus:border-red-500"
      : " focus:border-blue-800"
  ),
}))``;

export const Label = styled.label.attrs({
  className: "leading-7 text-gray-600",
})``;

export const CheckBox = styled.input.attrs((props) => ({
  type: "checkbox",
  className: clsx(
    "rounded border-gray-400 text-blue-800 shadow-sm focus:border-blue-500 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50",
    props.error && "border-red-500 focus:border-red-500"
  ),
}))``;

export const AuthContainer = styled.div.attrs(({ className }) => ({
  className: clsx("bg-cover bg-center", className),
}))`
  ${({ imageSrc }) =>
    `background-image: url("${
      imageSrc ||
      "https://source.unsplash.com/1600x900/?humanitarian,revolution,research,books,STEM,science"
    }");`}
`;
