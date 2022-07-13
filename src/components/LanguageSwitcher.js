import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const languages = [
  { name: "English", key: "en" },
  { name: "Français", key: "fr" },
];

export const LanguageSwitcher = ({ bordered }) => {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState({});

  const changeLanguage = useCallback(
    (lang) => {
      setSelected(lang);
      i18n.changeLanguage(lang.key);
    },
    [i18n]
  );

  useEffect(() => {
    const initial = languages.find((lang) => lang.key === i18n.language);
    setSelected(initial);
  }, [i18n]);

  return (
    <Listbox
      multiple={false}
      value={selected}
      onChange={(lang) => changeLanguage(lang)}
    >
      <div
        className={`relative mt-1 ${
          bordered && "md:border md:border-gray-700"
        }`}
      >
        <Listbox.Button className="flex items-center justify-between w-full p-4 space-x-2 rounded-lg cursor-default focus:outline-none">
          {({ open }) => (
            <Fragment>
              <span className="block font-normal">{selected.name}</span>
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
          <Listbox.Options className="absolute w-full overflow-auto bg-white divide-y rounded-md shadow-lg focus:outline-none">
            {languages.map((lang, id) => (
              <Listbox.Option
                key={id}
                value={lang}
                className="relative px-4 py-3 cursor-default select-none"
              >
                {({ selected }) => (
                  <span
                    className={`block ${
                      selected ? "text-blue-800" : "text-gray-900"
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
