import React, { useCallback, Fragment } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { IoMdSync } from "react-icons/io";
import { useDeviceDetection } from "hooks";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useSynchronizeMutation, useGetPlatformsQuery } from "services";
import {
  authSelector,
  syncSelector,
  updateSync,
  syncTutorialSelector,
  updateSyncTutorial,
} from "features";
import {
  Alert,
  QRCode,
  Button,
  Loader,
  InlineLoader,
  PageAnimationWrapper,
} from "components";
import { useTitle } from "hooks";

import SyncTutorial from "./tutorials/SyncTutorial";
import MobileSyncTutorial from "./tutorials/MobileSyncTutorial";

const Sync = () => {
  const { t } = useTranslation();
  useTitle(t("sync.page-title"));
  const isMobile = useDeviceDetection();
  const auth = useSelector(authSelector);
  const syncState = useSelector(syncSelector);
  const tutorial = useSelector(syncTutorialSelector);
  const dispatch = useDispatch();
  const [synchronize, { isLoading: fetchingURL }] = useSynchronizeMutation();
  const { data: platforms = {}, isFetching } = useGetPlatformsQuery(auth);
  const { savedPlatforms = [] } = platforms;
  const { status, qrLink, mobileLink } = syncState;

  function startTutorial() {
    dispatch(
      updateSyncTutorial({
        enabled: true,
      })
    );
  }

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

  if (isFetching) return <Loader />;
  // Only allow sync if at least 1 platform is saved
  if (!savedPlatforms?.length) {
    return (
      <PageAnimationWrapper>
        <div className="grid max-w-screen-md min-h-screen grid-cols-2 px-6 py-20 mx-auto prose md:px-8">
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

  // if a mobile device
  if (isMobile) {
    return (
      <PageAnimationWrapper>
        <div className="max-w-screen-md min-h-screen px-6 mx-auto my-20 prose md:px-8">
          {status !== "connected" &&
          status !== "loading" &&
          !tutorial.showButton ? (
            <Fragment>
              <h1 className="inline-flex items-center mb-0 text-[1.4rem] font-bold md:text-3xl">
                <IoMdSync size={42} className="mr-2" />
                <span>{t("sync.heading")}</span>
              </h1>

              <div className="tutorial-instructions">
                <p>{t("sync.section-2.paragraph-1")}</p>
                <p>{t("sync.section-2.paragraph-2")}</p>
              </div>

              <div className="flex flex-col items-center px-6 my-8 space-y-4 lg:hidden">
                <Button
                  className="w-full mobile-sync-button"
                  onClick={() => handleSync()}
                >
                  <IoMdSync size={22} />
                  <span className="ml-1">{t("labels.sync")}</span>
                </Button>
                <Button
                  outline
                  className="w-full mobile-tutorial-button"
                  onClick={() => startTutorial()}
                >
                  {t("labels.tutorial")}
                </Button>
              </div>
            </Fragment>
          ) : status === "loading" || status === "scanned" || fetchingURL ? (
            <Loader />
          ) : status === "connected" || tutorial.showButton ? (
            <div className="text-center mt-36">
              <h3>{t("sync.section-3.details")}</h3>
              <Button
                className="mt-4 open-app-button"
                onClick={() => window.location.replace(mobileLink)}
              >
                <IoMdSync size={22} />
                <span className="ml-1">{t("labels.open-app")}</span>
              </Button>
            </div>
          ) : null}
        </div>
        <MobileSyncTutorial />
      </PageAnimationWrapper>
    );
  }

  return (
    <PageAnimationWrapper>
      <div className="grid max-w-screen-xl min-h-screen grid-cols-2 px-6 mx-auto my-20 prose md:px-8">
        <div className="col-span-full lg:col-span-1">
          <h1 className="inline-flex items-center mb-0 text-[1.4rem] font-bold md:text-3xl">
            <IoMdSync size={42} className="mr-2" />
            <span>{t("sync.heading")}</span>
          </h1>

          <div className="tutorial-instructions">
            <p>{t("sync.section-2.paragraph-1")}</p>
            <p>{t("sync.section-2.paragraph-2")}</p>
          </div>

          {!tutorial.showQR && (
            <div className="flex flex-col items-center px-6 my-8 space-y-4 lg:hidden">
              <Button
                className="w-full mobile-sync-button"
                onClick={() => handleSync()}
              >
                <IoMdSync size={22} />
                <span>{t("labels.sync")}</span>
              </Button>
              <Button
                outline
                className="w-full mobile-tutorial-button"
                onClick={() => startTutorial()}
              >
                {t("labels.tutorial")}
              </Button>
            </div>
          )}
        </div>

        <div className="col-span-full lg:col-span-1">
          {tutorial.showQR && (
            <QRCode
              value="tutorial"
              size={300}
              className="block mx-auto border rounded-lg shadow tutorial-qr"
            />
          )}

          {status === "connected" && (
            <QRCode
              value={qrLink}
              size={300}
              className="block mx-auto border rounded-lg shadow"
            />
          )}

          {status === "disconnected" && !tutorial.showQR && !isMobile && (
            <div className="mx-auto border border-gray-300  w-[300px] h-[300px] rounded-lg shadow-md flex flex-col align-center justify-center px-16 space-y-4">
              <Button
                className="mt-4 desktop-sync-button"
                onClick={() => handleSync()}
              >
                <IoMdSync size={22} />
                <span>{t("labels.sync")}</span>
              </Button>
              <Button
                outline
                className="desktop-tutorial-button"
                onClick={() => startTutorial()}
              >
                {t("labels.tutorial")}
              </Button>
            </div>
          )}
          {(status === "loading" || status === "scanned" || fetchingURL) && (
            <InlineLoader />
          )}

          <div className="mx-auto text-center">
            <p className="font-bold text-md">
              <span>{t("sync.section-2.status.heading")} : </span> &nbsp;
              <span className="font-normal">
                {t(`sync.section-2.status.${status}`)}
              </span>
            </p>
          </div>
        </div>
      </div>
      <SyncTutorial />
    </PageAnimationWrapper>
  );
};

export default Sync;
