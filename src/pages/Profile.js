import React from "react";
import { Loader, PageAnimationWrapper, useTitle, Button } from "components";
import { IoMdSync } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "services";
import { authSelector } from "features";
import { Link } from "react-router-dom";

const Profile = () => {
  useTitle("Profile");
  const auth = useSelector(authSelector);
  /*
   Once this query runs profile is also updated in state
   check the profile slice for more details
  */
  const {
    data: profile = {},
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetProfileQuery(auth);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="p-8 my-24 prose">
        <h2>An error occured</h2>
        <p className="">
          Sorry we could not locate your profile. If error persists, please
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
          Hello!, <span className="font-medium">{profile?.name}</span>
        </h1>
        <div className="my-8">
          <h3>Join Date</h3>
          <p>{new Date(profile?.created).toLocaleString()}</p>
          <h3>Last Login</h3>
          <p>{new Date(profile?.last_login).toLocaleString()}</p>
          <Link
            to="sync"
            className="inline-flex items-center px-8 py-2 my-4 text-white no-underline bg-blue-800 rounded-md appearance-none hover:bg-blue-900"
          >
            <IoMdSync size={20} /> &nbsp; sync with app
          </Link>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default Profile;
