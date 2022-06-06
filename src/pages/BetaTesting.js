import React from "react";
import { PageAnimationWrapper } from "components";
import { Link } from "react-router-dom";
import PlayStoreLogo from "images/playstore.svg";
import Wallet from "images/wallet-mobile.png";
import AppPlayStore from "images/app-playstore.jpg";
import AppHome from "images/app-home.jpg";
import AppSync from "images/app-sync.jpg";
import WalletSync from "images/wallet-sync.jpg";
import AppSyncButton from "images/sync-button.jpg";

const Downloads = () => {
  return (
    <PageAnimationWrapper>
      <div className="max-w-screen-xl px-8 pt-20 pb-24 mx-auto prose prose-invert md:px-16">
        <h1 className="md:text-5xl">SWOB v2 Beta testing</h1>
        <p className="">
          Please follow the instructions below on how to test SMSWithoutBorders
        </p>
      </div>

      <div className="w-full min-h-screen pt-8 bg-white">
        <div className="max-w-screen-xl p-6 mx-4 -mt-16 prose bg-white md:mx-auto rounded-3xl md:p-12">
          <h2>1&#41; Create an account</h2>
          <p>
            Create your account &nbsp;
            <Link to="/sign-up" target="_blank">
              here
            </Link>
            &nbsp; if you don't have one already
          </p>
          <h2>2&#41; login to your account</h2>
          <p>
            Login to our account so that you can add platforms &nbsp;
            <Link to="/login" target="_blank">
              login here
            </Link>
            &nbsp;
          </p>
          <h2>3&#41; Store platforms</h2>
          <p>
            Store google, twitter and telegram so that you can use the SWOB app
            offline. Click on each platform to see the store button
          </p>
          <p>
            <span className="text-blue-800">Note :</span> Storing twitter on
            your phone may require you to click the store button twice if you
            have the twitter app already installed
          </p>
          <img src={Wallet} alt="wallet page" />
          <h2>4&#41; Download app</h2>
          <p>
            After storing all the platforms, logout from your account and head
            over to the playstore to download the app. Click on the button
            bellow to open playstore
          </p>
          <a
            className="inline-flex items-center justify-center px-8 py-3 text-white no-underline bg-black appearance-none rounded-3xl"
            href="https://play.google.com/store/apps/details?id=com.afkanerd.sw0b"
            target="_blank"
            rel="noreferrer"
          >
            <img src={PlayStoreLogo} alt="playstore" className="m-0 w-9" />
            <span>Google Play</span>
          </a>
          <p>Once there you should see the following screen</p>
          <img src={AppPlayStore} alt="google play store" />
          <p>
            If you do not have the (Beta) near the app name, scroll down and
            select join. This will take some time about 5mins to 30mins to add
            you to the beta program. After that, you should be able to install
            the new app. After installing, open the app and confirm you have the
            screen below to make sure you have the latest version
          </p>
          <img src={AppHome} alt="app home page" />
          <h2>5&#41; Synchronize your account</h2>
          <p>
            In the app click on the Synchronize button then continue. This will
            open a page for you to login. After login, scroll down and click/tap
            on the sync button to access the Synchronization page.
          </p>
          <img src={AppSync} alt="app home page" />
          <img src={WalletSync} alt="app home page" />
          <p>
            {" "}
            Once on the Synchronization page, scroll down and click sync. This
            will then open the page below.
          </p>
          <img src={AppSyncButton} alt="app home page" />

          <p>
            Click on open app and enter your password to finish Synchronization.
          </p>

          <h2>5&#41; Go offline!!!</h2>
          <p>
            You can now use SMSWithoutBorders offline. turn off your internet
            connection. Activate a text bundle and send messages on all the
            platforms you have stored. We don't mind if you tag us while you're
            at it :)
          </p>
          <h2>6&#41; We need your feedback!</h2>
          <p>
            Thank you so much for taking the time to test the app. We appreciate
            your time and support
          </p>
          <p>
            Please answer these{" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSffQxtaWNAPOoN-XAdEorCDVchFRsINGTTrYc9Pboa3jC67ZA/viewform"
              target="_blank"
              rel="noreferrer"
              className="text-blue-800"
            >
              few questions{" "}
            </a>
            about your experience and we will send you a reward. Be sure to
            provide your Mobile money number
          </p>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default Downloads;
