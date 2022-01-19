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
    return <Loader message="fetching docs ..." />;
  }

  if (isError) {
    return (
      <div className="p-8 py-12 prose">
        <h3>An error occured</h3>
        <p className="">
          Sorry we could not get the latest docs. If error persists, please
          contact support
        </p>
        <Button onClick={() => refetch()}>reload</Button>
      </div>
    );
  }
  return (
    <PageAnimationWrapper>
      <div className="p-8 py-12 mx-auto prose max-w-max">
        <ReactMarkdown>{data}</ReactMarkdown>
      </div>
    </PageAnimationWrapper>
  );
};

export default Privacy;
