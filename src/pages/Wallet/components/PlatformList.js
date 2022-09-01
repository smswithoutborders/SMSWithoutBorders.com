import React, { Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Button } from "components";
import { Disclosure } from "@headlessui/react";
import { FiSave, FiTrash2, FiChevronDown, FiGrid } from "react-icons/fi";
import Info from "./Info";

// where logos are stored
const LOGO_HOST = process.env.REACT_APP_API_URL;

const PlatformList = ({
  platforms = [],
  saved = false,
  callbackFn = () => null,
}) => {
  const { t, i18n } = useTranslation();

  if (!platforms.length) {
    return <p>{t("wallet.alerts.no-available-platforms")}</p>;
  } else if (saved) {
    /* saved platforms */
    return (
      <Fragment>
        {platforms.map((platform) => (
          <Disclosure key={platform.name}>
            {({ open }) => (
              <Fragment>
                <Disclosure.Button className="flex items-center justify-between w-full p-4 mb-4 text-left rounded-lg shadow-md">
                  <div className="flex flex-row items-center">
                    {platform.logo ? (
                      <img
                        src={`${LOGO_HOST}${platform.logo}`}
                        alt={`${platform.name} logo`}
                        className="w-8 h-8 my-0 mr-4"
                      />
                    ) : (
                      <FiGrid
                        title={`${platform.name} logo`}
                        className="w-8 h-8 my-0 mr-4"
                      />
                    )}
                    <h3 className="my-0 font-normal capitalize">
                      {platform.name}
                    </h3>
                  </div>
                  <FiChevronDown
                    className={clsx(
                      "w-5 h-5 text-blue-800",
                      open && "transform rotate-180"
                    )}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="p-4 mb-4 border border-gray-100 rounded-lg shadow">
                  <h3 className="mt-0">{t("wallet.labels.description")}</h3>
                  <p>{platform.description[i18n?.resolvedLanguage] ?? ""}</p>
                  <Button
                    danger
                    onClick={() => {
                      callbackFn(platform.initialization_url);
                    }}
                  >
                    <FiTrash2 />
                    <span className="ml-1">
                      {t("wallet.section-2.cta-button-text")}
                    </span>
                  </Button>
                </Disclosure.Panel>
              </Fragment>
            )}
          </Disclosure>
        ))}
      </Fragment>
    );
  } else {
    /* unsaved platforms */
    return (
      <Fragment>
        {platforms.map((platform) => (
          <Disclosure key={platform.name}>
            {({ open }) => (
              <Fragment>
                <Disclosure.Button className="flex items-center justify-between w-full p-4 mb-4 text-left rounded-lg shadow-md">
                  <div className="flex flex-row items-center">
                    {platform.logo ? (
                      <img
                        src={`${LOGO_HOST}${platform.logo}`}
                        alt={`${platform.name} logo`}
                        className="w-8 h-8 my-0 mr-4"
                      />
                    ) : (
                      <FiGrid
                        title={`${platform.name} logo`}
                        className="w-8 h-8 my-0 mr-4"
                      />
                    )}
                    <h3 className="my-0 font-normal capitalize">
                      {platform.name}
                    </h3>
                  </div>
                  <FiChevronDown
                    className={clsx(
                      "w-5 h-5 text-blue-800",
                      open && "transform rotate-180"
                    )}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="p-4 mb-4 border border-gray-100 rounded-lg shadow">
                  <h3 className="mt-0"> {t("wallet.labels.description")}</h3>
                  <p>{platform.description[i18n?.resolvedLanguage] ?? ""}</p>
                  <Info platform={platform.name} />
                  <Button
                    onClick={() =>
                      callbackFn(platform.name, platform.initialization_url)
                    }
                  >
                    <FiSave />
                    <span className="ml-1">
                      {t("wallet.section-1.cta-button-text")}
                    </span>
                  </Button>
                </Disclosure.Panel>
              </Fragment>
            )}
          </Disclosure>
        ))}
      </Fragment>
    );
  }
};

PlatformList.propTypes = {
  saved: PropTypes.bool,
  platforms: PropTypes.array.isRequired,
  callbackFn: PropTypes.func.isRequired,
};

export default PlatformList;
