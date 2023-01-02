// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import "@testing-library/jest-dom";

// mock fetch call
global.fetch = jest.fn();

// mocks to clear errors
jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: { type: "3rdParty", init: jest.fn() },
}));

// mock i18n
jest.mock("i18n", () => ({
  use: () => this,
  init: () => {},
  t: (k) => k,
  changeLanguage: () => new Promise(() => {}),
}));
