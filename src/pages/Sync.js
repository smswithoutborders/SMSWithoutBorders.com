import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { IoMdSync } from "react-icons/io";
import { authSelector } from "features";
import { useSelector } from "react-redux";
import { useSyncQuery, useGetPlatformsQuery } from "services";
import {
  Alert,
  QRCode,
  Button,
  PageAnimationWrapper,
  useTitle,
  InlineLoader,
} from "components";

const Sync = () => {
  useTitle("Synchronize Accounts");
  const auth = useSelector(authSelector);
  const { data: platforms = {} } = useGetPlatformsQuery(auth);
  const { savedPlatforms = [] } = platforms;
  //only run if there are saved platforms
  const { data = {}, isError } = useSyncQuery(auth, {
    refetchOnMountOrArgChange: true,
    skip: savedPlatforms.length ? false : true,
  });
  const { status = "disconnected", qrLink = "" } = data;

  useEffect(() => {
    if (isError) {
      toast.error("Sorry an error occured please try again");
    }
  }, [isError]);

  // Only allow sync if at least 1 platform is saved
  if (!savedPlatforms.length) {
    return (
      <PageAnimationWrapper>
        <div className="grid max-w-screen-md min-h-screen grid-cols-2 px-6 py-20 mx-auto prose md:px-8">
          <div className="text-center col-span-full">
            <h1 className="inline-flex items-center mb-0 text-4xl font-bold">
              <IoMdSync size={48} className="mr-2" /> Synchronize Accounts
            </h1>

            <div className="max-w-screen-sm mx-auto my-4">
              <Alert
                kind="primary"
                message="Sorry it seems you havent stored any tokens"
                hideCloseButton
              />
            </div>
            <div className="my-8">
              <span>Please click on the link below to store tokens &nbsp; </span>
              <details>
                <summary className="text-blue-800">learn more</summary>
                Synchronization becomes available only after you perform an
                action that updates your security configurations. An example is
                storing access in the wallet.
              </details>
            </div>

            <Link
              to="/dashboard/wallet"
              className="inline-flex items-center justify-center px-6 py-2 text-white no-underline bg-blue-800 rounded-lg outline-none focus:outline-none hover:bg-blue-900"
            >
              Store Access Now
            </Link>
          </div>
        </div>
      </PageAnimationWrapper>
    );
  }

  return (
    <PageAnimationWrapper>
      <div className="grid max-w-screen-xl min-h-screen grid-cols-2 px-6 py-20 mx-auto prose md:px-8">
        <div className="col-span-full lg:col-span-1">
          <h1 className="inline-flex items-center mb-0 text-4xl font-bold">
            <IoMdSync size={48} className="mr-2" /> Synchronize Accounts
          </h1>

          <p>This lets you use the SW/OB secure gateway for all messages</p>
          <p>
            Synchronization becomes available only after you perform an action
            that updates your security configurations. An example is storing
            access in the wallet.
          </p>
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
        </div>
      </div>
    </PageAnimationWrapper>
  );
};
export default Sync;
