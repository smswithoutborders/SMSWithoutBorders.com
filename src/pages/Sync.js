import React, { useCallback, Fragment, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { IoMdSync } from "react-icons/io";
import { useDeviceDetection } from "hooks";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useSynchronizeMutation, useGetPlatformsQuery } from "services";
import { authSelector, syncSelector, updateSync } from "features";
import {
  Alert,
  QRCode,
  Button,
  Loader,
  PageAnimationWrapper,
} from "components";
import { useTitle } from "hooks";
import SyncTutorial from "./tutorials/SyncTutorial";

const Sync = () => {
  const { t } = useTranslation();
  useTitle(t("sync.page-title"));
  const auth = useSelector(authSelector);
  const isMobile = useDeviceDetection();
  const syncState = useSelector(syncSelector);
  const dispatch = useDispatch();
  const [synchronize, { isLoading: fetchingURL }] = useSynchronizeMutation();
  const { data: platforms = {}, isFetching } = useGetPlatformsQuery(auth);
  const { savedPlatforms = [] } = platforms;
  const { status, qrLink, mobileLink } = syncState;
  const [tutorial, setTutorial] = useState(false);

  // enabled is used to start the sync tutorial

  const handleSync = useCallback(async () => {
    dispatch(
      updateSync({
        status: "loading",
      })
    );
    try {
      const response = await synchronize(auth);
      //using redux matcher to update state on matchFulfilled here
      if (!response.error) {
        const { syncURL } = response.data;
        const ws = new WebSocket(syncURL);
        ws.onopen = () => {
          toast.success(t("sync.alerts.sync-started"));
          window.scrollTo(0, 0);
          dispatch(
            updateSync({
              status: "connected",
            })
          );
        };
        // listen to data sent from the websocket server
        ws.onmessage = (evt) => {
          if (evt.data === "200- ack") {
            toast.success(t("sync.alerts.sync-complete"));
            dispatch(
              updateSync({
                status: "complete",
              })
            );
          } else if (evt.data === "201- pause") {
            toast.success(t("sync.alerts.sync-scanned"));
            dispatch(
              updateSync({
                status: "scanned",
              })
            );
          } else {
            const { qr_url, mobile_url } = JSON.parse(evt.data);
            dispatch(
              updateSync({
                qrLink: qr_url,
                mobileLink: mobile_url,
              })
            );
          }
        };

        ws.onclose = () => {
          toast.success(t("sync.alerts.sync-closed"));
          dispatch(
            updateSync({
              status: "disconnected",
            })
          );
        };

        ws.onerror = () => {
          toast.error(t("sync.alerts.sync-error"));
          dispatch(
            updateSync({
              status: "disconnected",
            })
          );
        };
      } else {
        toast.error(t("error-messages.general-error-message"));
        dispatch(
          updateSync({
            status: "disconnected",
          })
        );
      }
    } catch (error) {
      toast.error(t("error-messages.general-error-message"));
    }
  }, [auth, synchronize, t, dispatch]);

  if (isFetching || status === "loading" || status === "scanned" || fetchingURL)
    return <Loader />;
  // Only allow sync if at least 1 platform is saved
  if (!savedPlatforms?.length) {
    return (
      <PageAnimationWrapper>
        <div className="grid max-w-screen-md min-h-[768px] grid-cols-2 px-6 py-20 mx-auto prose md:px-8">
          <div className="text-center col-span-full">
            <h1 className="inline-flex items-center gap-2 mb-0 text-2xl font-bold md:text-3xl">
              <IoMdSync size={42} />
              <span>{t("sync.heading")}</span>
            </h1>

            <div className="max-w-screen-sm mx-auto my-4">
              <Alert
                kind="primary"
                message={t("sync.alerts.no-platforms")}
                hideCloseButton
              />
            </div>
            <div className="my-8">
              <span>{t("sync.section-1.details")} &nbsp;</span>
              <details>
                <summary className="text-blue-800">
                  {t("sync.section-1.summary.caption")}
                </summary>
                {t("sync.section-1.summary.details")}
              </details>
            </div>

            <Link
              to="/dashboard/wallet"
              className="inline-flex items-center justify-center px-6 py-2 text-white no-underline bg-blue-800 rounded-lg outline-none focus:outline-none hover:bg-blue-900"
            >
              {t("sync.section-1.cta-button-text")}
            </Link>
          </div>
        </div>
      </PageAnimationWrapper>
    );
  }

  return (
    <PageAnimationWrapper>
      <div className="max-w-screen-md min-h-[768px] px-6 mx-auto my-10 md:my-20 prose text-center md:px-8">
        <h1 className="inline-flex items-center mb-0 text-[1.4rem] font-bold md:text-3xl">
          <IoMdSync size={42} className="mr-2" />
          <span>{t("sync.heading")}</span>
        </h1>

        {/* only show instructions if disconnected */}
        {status === "disconnected" && (
          <div className="tutorial-instructions">
            {/* <p>{t("sync.section-2.paragraph-1")}</p> */}
            <p>{t("sync.section-2.paragraph-2")}</p>
          </div>
        )}

        {/* if desktop show QR */}
        {(tutorial || status === "connected") && !isMobile && (
          <Fragment>
            <p>{t("sync.alerts.scan-code")}</p>
            <QRCode
              size={300}
              value={tutorial ? "tutorial" : qrLink}
              className="p-2 mx-auto border rounded-lg shadow qr-code"
            />
            <p className="flex justify-center gap-2 mx-auto text-md">
              <span className="font-bold">
                {t("sync.section-2.status.heading")} :{" "}
              </span>
              <span className="font-normal">
                {t(`sync.section-2.status.${status}`)}
              </span>
            </p>
          </Fragment>
        )}

        {/* if mobile show button */}
        {(tutorial || status === "connected") && isMobile && (
          <div className="">
            <p>{t("sync.alerts.click-button")}</p>
            <Button
              className="open-app-button"
              onClick={() => window.location.replace(mobileLink)}
            >
              <IoMdSync size={22} />
              <span>{t("labels.open-app")}</span>
            </Button>
          </div>
        )}

        {/* only show actions if disconnected */}
        {status === "disconnected" && (
          <div className="flex items-center justify-center max-w-md gap-2 mx-auto my-8">
            <Button className="sync-button" onClick={() => handleSync()}>
              <IoMdSync size={22} />
              <span>{t("labels.sync")}</span>
            </Button>
            <Button
              outline
              className="tutorial-button"
              onClick={() => setTutorial(true)}
            >
              {t("labels.tutorial")}
            </Button>
          </div>
        )}
      </div>
      <SyncTutorial start={tutorial} stopFunc={setTutorial} />
    </PageAnimationWrapper>
  );
};

export default Sync;
