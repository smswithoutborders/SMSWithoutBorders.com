import React from "react";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";


// mocks to clear errors
jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str) => str,
            i18n: {
                changeLanguage: () => new Promise(() => { }),
            },
        };
    },
}));

// all providers in one place
const ProvidersWrapper = ({ children }) => {
    return children
}

// custom renderer using our providers
const customRenderer = (ui, options) => render(ui, { wrapper: ProvidersWrapper, ...options })

// re-export everything
export * from "@testing-library/react";
// overide render with custom
export { customRenderer as render, userEvent }