import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FiChevronDown, FiGlobe } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "utils/constants";
import PropTypes from "prop-types";

// root element
let root = document.querySelector("html");
// helper function
function getLanguage(key) {
  return LANGUAGES.find((lang) => lang.key === key);
}

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(LANGUAGES[0]);

  // shared language switcher
  const changeLanguage = useCallback(
    (lang) => {
      setLanguage(lang);
      i18n.changeLanguage(lang.key);
      root.setAttribute("dir", lang.dir);
    },
    [i18n]
  );

  useEffect(() => {
    // translate page if language is passed in
    const searchParams = new URLSearchParams(window.location.search);
    const langKey = searchParams.get("lang");
    const lang = getLanguage(langKey);
    if (lang && langKey !== i18n?.language) {
      changeLanguage(lang);
    }

    // check and set initial language
    const initial = getLanguage(i18n?.language);
    if (initial) {
      changeLanguage(initial);
    }
  }, []);

  // language switcher component
  const LanguageSwitcher = ({ bordered }) => {
    return (
      <Listbox
        multiple={false}
        value={language}
        onChange={(lang) => changeLanguage(lang)}
      >
        <div
          className={`relative  ${bordered && "lg:border md:border-gray-600"}`}
        >
          <Listbox.Button className="flex items-center justify-between w-full gap-1 p-5 rounded-lg cursor-default focus:outline-none">
            {({ open }) => (
              <Fragment>
                <FiGlobe size={18} />
                <span className="block font-normal">{language?.name}</span>
                <FiChevronDown
                  size={16}
                  className={`pointer-events-none ${open && "rotate-180"}`}
                  aria-hidden="true"
                />
              </Fragment>
            )}
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full overflow-auto bg-white border divide-y rounded-md lg:shadow-xl focus:outline-none">
              {LANGUAGES.map((lang, id) => (
                <Listbox.Option
                  key={id}
                  value={lang}
                  className="relative cursor-default select-none"
                >
                  {({ language }) => (
                    <span
                      className={`block p-5 lg:py-2 ${language ? "text-blue-800" : "text-gray-900"
                        }`}
                    >
                      {lang.name}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    );
  };

  LanguageSwitcher.propTypes = {
    bordered: PropTypes.bool,
  };

  return {
    LanguageSwitcher,
    language,
  };
};
