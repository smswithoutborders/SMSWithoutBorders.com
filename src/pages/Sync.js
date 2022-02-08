import React, { useState } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import { Button, PageAnimationWrapper, useTitle } from "components";
import { IoMdSync } from "react-icons/io";
import toast from "react-hot-toast";

const Sync = () => {
  useTitle("Synchronize with App");
  const [syncState, setSyncState] = useState({
    ws: null,
    open: false,
    connected: false,
    loading: false,
    paused: false,
    acked: false,
    qrLink: "",
  });

  async function handleSync() {
    setSyncState({ open: true, loading: true });

    let ROUTER_URL = process.env.REACT_APP_ROUTER_URL;

    // let authObj = getLocalState();
    let authObj = {};
    let AUTH_KEY = authObj?.token;
    let AUTH_ID = authObj?.id;

    axios
      .post(ROUTER_URL + "/sync/sessions", {
        auth_key: AUTH_KEY,
        id: AUTH_ID,
      })
      .then((response) => {
        let ws = new WebSocket(response.data.url);

        ws.onopen = () => {
          //set ws reference in state
          setSyncState((syncState) => {
            return { ...syncState, ws: ws };
          });
        };

        ws.onmessage = (evt) => {
          // listen to data sent from the websocket server
          // eslint-disable-next-line eqeqeq
          if (evt.data == "200- acked") {
            setSyncState((syncState) => {
              return { ...syncState, acked: true, open: false };
            });
            toast.success("Sync complete");
            // eslint-disable-next-line eqeqeq
          } else if (evt.data == "201- paused") {
            setSyncState((syncState) => {
              return { ...syncState, paused: true, connected: false };
            });
          } else {
            setSyncState((syncState) => {
              return {
                ...syncState,
                loading: false,
                connected: true,
                qrLink: evt.data,
              };
            });
          }
        };

        ws.onclose = () => {
          setSyncState(false);
        };

        ws.onerror = (err) => {
          toast.error("An error occured", {
            description: "Please sync again",
          });
        };
      })
      .catch((error) => {
        if (error.response) {
          toast.error(
            "Request Error \n Sorry we could not sync your profile. Please check your network connection and try again"
          );
        } else if (error.request) {
          toast.error(
            "Network Error \n We could not sync your profile. Please check your network and try again"
          );
        } else {
          toast.error(
            "Profile Error \n We could not sync your profile. Please check your network, log out and login again"
          );
        }
        setSyncState({ open: false });
      });
  }

  // if (syncState.open) {
  return (
    <PageAnimationWrapper>
      {/* {syncState.connected && <QRCode value={syncState.qrLink} size={300} />}

        {(syncState.loading || syncState.paused) && (
          <Pane
              display="flex"
              alignItems="center"
              justifyContent="center"
              height={300}
              width={300}
              tw="bg-white border border-gray-100 shadow-lg rounded-lg p-4 mx-auto">
              <Spinner />
          </Pane>
        )} */}

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
            <li>Open SMSwithoutborders app on your phone</li>
            <li>Tap the Synchronize button</li>
            <li>Point your phone to this screen to capture the code</li>
          </ol>

          <Button className="mt-4" onClick={() => handleSync()}>
            <IoMdSync size={22} />
            <span className="ml-1">sync</span>
          </Button>
        </div>

        <div className="col-span-full lg:col-span-1">
          {/* <img
              className="h-[550px] w-[280px] mx-auto lg:-rotate-25"
              alt="SMSwithoutborders App"
            /> */}
          <QRCode
            value="howdy heyjkfsj jfjsjslkjfskjfsjfjk"
            size={300}
            className="block p-4 mx-auto border shadow-lg rounded-xl"
          />

          <div className="mx-auto text-center">
            <h3 className="mt-4 mb-0">Status</h3>
            <p>{syncState.paused ? "syncing" : "pending"}</p>
          </div>
        </div>
      </div>
    </PageAnimationWrapper>
  );
  // }
};
export default Sync;
