import React from "react";
import { Loader, PageAnimationWrapper, useTitle, Button } from "components";
import { IoMdSync } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useGetMetricsQuery } from "services";
import { authSelector } from "features";
import { formatUTCDate } from "utils";
import { Link } from "react-router-dom";

const Dashboard = () => {
  useTitle("Dashboard");
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
      <div className="p-8 my-24 prose">
        <h2>An error occured</h2>
        <p className="">
          Sorry we could not locate your metrics. If error persists, please
          contact support
        </p>
        <Button onClick={() => refetch()}>try again</Button>
      </div>
    );
  }

  return (
    <PageAnimationWrapper>
      <div className="p-8 mx-auto my-24 prose text-center">
        <BsPersonCircle size={96} className="inline-block mb-8" />
        <h1 className="text-3xl">
          Hello!, <span className="font-medium">Welcome</span>
        </h1>
        <div className="my-8">
          <h3>Join Date</h3>
          <p>{formatUTCDate(metrics?.createdAt)}</p>
          <h3>Last Login</h3>
          <p>{formatUTCDate(metrics?.updatedAt)}</p>
          <Link
            to="/dashboard/sync"
            className="inline-flex items-center px-8 py-2 my-4 text-white no-underline bg-blue-800 rounded-md appearance-none hover:bg-blue-900"
          >
            <IoMdSync size={20} /> &nbsp; sync
          </Link>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default Dashboard;
