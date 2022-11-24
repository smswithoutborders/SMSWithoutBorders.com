import React from "react";
import { useTranslation } from "react-i18next";
import { BsArrowRight } from "react-icons/bs";
import PropTypes from "prop-types";
import clsx from "clsx";

export const TutorialCard = ({ title, link, caption, className }) => {
  const { t } = useTranslation();
  return (
    <div
      className={clsx(
        "p-8 border border-gray-300 shadow my-2 lg:py-12 rounded-2xl",
        className
      )}
    >
      <span className="font-light">{t("labels.tutorial")}</span>
      <h3 className="my-4">{title}</h3>
      <a
        className="flex items-center justify-between py-3 text-lg text-blue-800 no-underline appearance-none group"
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        <span className="mr-2 group-hover:mr-4">{caption}</span>
        <BsArrowRight size={20} />
      </a>
    </div>
  );
};

TutorialCard.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
  caption: PropTypes.string,
  className: PropTypes.string,
};
