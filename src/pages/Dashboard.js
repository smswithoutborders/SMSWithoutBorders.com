import React from "react";
import { Loader, PageAnimationWrapper, useTitle } from "components";
import { IoMdSync } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useGetMetricsQuery } from "services";
import { authSelector } from "features";
import { useTranslation } from "react-i18next";
import { formatUTCDate } from "utils";
import { Link } from "react-router-dom";
import Error from "./Error";

const Dashboard = () => {
  const { t } = useTranslation();
  useTitle(t("dashboard.page-title"));
  const auth = useSelector(authSelector);
  /*
   Once this query runs metrics is also updated in state
   check the metrics slice for more details
  */
  const {
    data: metrics = {},
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetMetricsQuery(auth);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Error message={t("dashboard.alerts.load-error")} callBack={refetch} />
    );
  }

  return (
    <PageAnimationWrapper>
      <div className="p-8 mx-auto my-24 prose text-center">
        <BsPersonCircle size={96} className="inline-block mb-8" />
        <h1 className="text-3xl">
          <span>{t("dashboard.greeting-1")}, </span>
          <span className="font-medium">{t("dashboard.greeting-2")}</span>
        </h1>
        <div className="my-8">
          <h3>{t("dashboard.join-date")}</h3>
          <p>{formatUTCDate(metrics?.createdAt)}</p>
          <h3>{t("dashboard.last-login")}</h3>
          <p>{formatUTCDate(metrics?.updatedAt)}</p>
          <Link
            to="/dashboard/sync"
            className="inline-flex items-center px-8 py-2 my-4 text-white no-underline bg-blue-800 rounded-md appearance-none hover:bg-blue-900"
          >
            <IoMdSync size={20} />
            <span className="ml-1">{t("labels.sync")}</span>
          </Link>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default Dashboard;
