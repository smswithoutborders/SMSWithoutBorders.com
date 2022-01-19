import React from "react";
import { PageAnimationWrapper, useTitle, Button } from "components";
import { useNavigate } from "react-router-dom";

// 404 page, uses react-router to move the user back 1 step
const NotFound = () => {
  useTitle("404 Not Found");
  const navigate = useNavigate();
  return (
    <PageAnimationWrapper>
      <div className="container grid h-screen px-5 py-12 mx-auto text-center text-gray-900 place-items-center lg:px-16 lg:py-24 lg:mb-36">
        <div className="p-8">
          <h1 className="mb-8 font-black tracking-wider text-8xl">
            4<span className="text-blue-800">0</span>4
          </h1>
          <p className="mb-8 text-base leading-relaxed md:text-lg">
            Sorry this page is unavailable right now
          </p>
          <Button className="mx-auto" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default NotFound;
