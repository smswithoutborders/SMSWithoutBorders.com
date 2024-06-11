import React, { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { Footer, Button, DashNavbar, PageAnimationWrapper } from "components";
import { Outlet, useNavigate } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
import { authSelector, logout as logoutAction } from "features";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { useLogoutMutation } from "services";
import { Loader } from "components";

const MAX_IDLE_TIME = process.env.REACT_APP_MAX_IDLE_TIME;

const DashboardLayout = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(authSelector);
  const [open, setOpen] = useState(false);
  const [logout, { isLoading }] = useLogoutMutation();

  // Close prompts
  function closePrompt() {
    reset();
    setOpen(false);
  }

  // handle logout()
  async function handleLogOut() {
    try {
      await logout(auth).unwrap();
      // check in features/reducers
      dispatch(logoutAction());
      toast.success(t("alert-messages.logout-successful"));
      navigate("/login", { replace: true, state: null });
    } catch (error) {
      // handle all api errors in utils/middleware
      // Force logout even if api call fails
      dispatch(logoutAction());
    }
  }

  const { reset } = useIdleTimer({
    timeout: MAX_IDLE_TIME,
    promptTimeout: 1000 * 60,
    debounce: 200,
    onAction: () => reset(),
    onPrompt: () => setOpen(true),
    onIdle: () => handleLogOut(),
  });

  if (isLoading) return <Loader />;

  return (
    <Fragment>
      <PageAnimationWrapper>
        <DashNavbar />
        <div style={{ paddingTop: "64px" }}> {/* Adjust the top padding as needed */}
          <Outlet />
          <Footer />
        </div>
      </PageAnimationWrapper>

      {/* Modal prompt for inactivity */}
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => closePrompt()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden prose align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title as="h3" className="mb-4">
                    {t("dashboard.alerts.idle.heading")}
                  </Dialog.Title>

                  <Dialog.Description>
                    {t("dashboard.alerts.idle.details")}
                  </Dialog.Description>

                  <Button onClick={() => closePrompt()}>
                    {t("labels.yes")}
                  </Button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

export default DashboardLayout;
