// src/styles/GlobalStyles.tsx
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle`
    html{
        scroll-behaviour: smooth;
        height: 100%
    }
    body {
        min-height: 100%;
        ${tw`antialiased`}
    }
`
const GlobalStyles = () => (
    <>
        <BaseStyles />
        <CustomStyles />
    </>
)

export default GlobalStyles