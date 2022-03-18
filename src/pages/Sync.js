import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { IoMdSync } from "react-icons/io";
import { authSelector } from "features";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  useTitle(t("sync.page-title"));
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
      toast.error(t("error-messages.general-error-message"));
    }
  }, [isError, t]);

  // Only allow sync if at least 1 platform is saved
  if (!savedPlatforms.length) {
    return (
      <PageAnimationWrapper>
        <div className="grid max-w-screen-md min-h-screen grid-cols-2 px-6 py-20 mx-auto prose md:px-8">
          <div className="text-center col-span-full">
            <h1 className="inline-flex items-center mb-0 text-4xl font-bold">
              <IoMdSync size={48} className="mr-2" />
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
      <div className="grid max-w-screen-xl min-h-screen grid-cols-2 px-6 py-20 mx-auto prose md:px-8">
        <div className="col-span-full lg:col-span-1">
          <h1 className="inline-flex items-center mb-0 text-4xl font-bold">
            <IoMdSync size={48} className="mr-2" />
            <span>{t("sync.heading")}</span>
          </h1>

          <p>{t("sync.section-2.paragraph-1")}</p>
          <p>{t("sync.section-2.paragraph-2")}</p>
          <p>{t("sync.section-2.paragraph-3")}</p>
          <ol>
            <li>{t("sync.section-2.sync-steps.1")}</li>
            <li>{t("sync.section-2.sync-steps.2")}</li>
            <li>{t("sync.section-2.sync-steps.3")}</li>
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
                <span className="ml-1">{t("labels.sync")}</span>
              </Button>
            </div>
          ) : (
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
    </PageAnimationWrapper>
  );
};
export default Sync;
