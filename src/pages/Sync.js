import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { IoMdSync } from "react-icons/io";
import { authSelector } from "features";
import { useSelector } from "react-redux";
import { useSyncQuery } from "services";
import {
  QRCode,
  Button,
  PageAnimationWrapper,
  useTitle,
  InlineLoader,
} from "components";

const Sync = () => {
  useTitle("Synchronize Accounts");
  const auth = useSelector(authSelector);
  const { data = {}, isError } = useSyncQuery(auth, {
    refetchOnMountOrArgChange: true,
  });
  const { status = "disconnected", qrLink = "" } = data;

  useEffect(() => {
    if (isError) {
      toast.error("Sorry an error occured please try again");
    }
  }, [isError]);

  return (
    <PageAnimationWrapper>
      <div className="grid max-w-screen-xl min-h-screen grid-cols-2 px-6 py-20 mx-auto prose md:px-8">
        <div className="col-span-full lg:col-span-1">
          <h1 className="inline-flex items-center mb-0 text-4xl font-bold">
            <IoMdSync /> &nbsp; Synchronize Accounts
          </h1>
          <p>This lets you use the SW/OB secure gateway for all messages</p>
          <p>
            Please follow these steps to sychronize your saved access with
            SMSwithoutborders mobile app.
          </p>
          <ol>
            <li>Open SMSWithoutBorders app on your phone</li>
            <li>Tap the Synchronize button</li>
            <li>Point your phone to this screen to capture the code</li>
          </ol>
        </div>

        <div className="col-span-full lg:col-span-1">
          {status === "connected" ? (
            <QRCode
              value={qrLink}
              size={300}
              className="block p-2 mx-auto border rounded-lg shadow"
            />
          ) : status === "disconnected" || isError ? (
            <div className="mx-auto border w-[300px] h-[300px] rounded-lg shadow p-2 grid place-items-center">
              <Button className="mt-4" onClick={() => window.location.reload()}>
                <IoMdSync size={22} />
                <span className="ml-1">sync</span>
              </Button>
            </div>
          ) : (
            <InlineLoader />
          )}

          <div className="mx-auto text-center">
            <p className="font-bold text-md">
              Status : &nbsp;
              <span className="font-normal">{status}</span>
            </p>
          </div>

          <span>{isError}</span>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};
export default Sync;
