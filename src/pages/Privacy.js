import React from "react";
import ReactMarkdown from "react-markdown";
import { PageAnimationWrapper, Button, Loader } from "components";
import { useGetDocsQuery } from "services";

const Privacy = () => {
  const {
    data = "",
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetDocsQuery();

  if (isLoading || isFetching) {
    return <Loader light />;
  }

  if (isError) {
    return (
      <div className="p-8 py-12 prose">
        <h3>An error occured</h3>
        <p className="">
          Sorry we could not load the most recent privacy page. If error
          persists, please contact support
        </p>
        <Button onClick={() => refetch()}>reload</Button>
      </div>
    );
  }
  return (
    <PageAnimationWrapper>
      <div className="p-6 bg-white md:p-8">
        <div className="max-w-screen-xl mx-auto prose text-gray-900">
          <ReactMarkdown>{data}</ReactMarkdown>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default Privacy;
