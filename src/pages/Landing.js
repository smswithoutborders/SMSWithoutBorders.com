import React from "react";
import phone from "images/phone.png";
import swobflow from "images/swobflow.gif";
import { PageAnimationWrapper } from "components";
import { DiOpensource } from "react-icons/di";
import { IoAccessibility, IoLogoGooglePlaystore } from "react-icons/io5";
import { GiCheckboxTree } from "react-icons/gi";
import { GoMarkGithub } from "react-icons/go";
import {
  FiUserPlus,
  FiLogIn,
  FiDownload,
  FiShield,
  FiSave,
} from "react-icons/fi";

const Landing = () => {
  return (
    <PageAnimationWrapper>
      <div className="w-full bg-primary-200 lg:py-10">
        <div className="container grid max-w-screen-xl grid-cols-2 mx-auto prose place-items-center">
          <div className="col-span-full lg:col-span-1">
            <img
              src={phone}
              className="h-[550px] w-[280px] mx-auto lg:-rotate-25"
              alt="SMSwithoutborders App"
            />
          </div>
          <div className="order-first p-8 col-span-full lg:col-span-1 md:order-last">
            <h1>Stay Productive</h1>
            <p>
              In this age of communication, keep in touch with your contacts
              across the internet without access to an active internet
              connection. Store your access to your favourite communications
              platforms while online, use them while offline.
            </p>
            <div className="flex flex-row justify-start w-full mt-4">
              <a
                className="inline-flex items-center justify-center px-4 py-2 mb-4 mr-2 font-bold no-underline bg-white rounded-lg appearance-none md:mr-4 hover:shadow-xl"
                href="https://play.google.com/store/apps/details?id=com.afkanerd.sw0b"
                target="_blank"
                rel="noreferrer"
              >
                <IoLogoGooglePlaystore size={28} />
                <div className="ml-2">
                  <small className="my-0 text-xs font-light md:text-base">
                    Get SWOB
                  </small>
                  <p className="my-0">Play Store</p>
                </div>
              </a>
              <a
                className="inline-flex items-center justify-center px-4 py-2 mb-4 font-bold no-underline bg-white rounded-lg appearance-none md:mr-4 hover:shadow-xl"
                href="https://github.com/smswithoutborders/SMSwithoutBorders-Android/releases"
                target="_blank"
                rel="noreferrer"
              >
                <GoMarkGithub size={28} />
                <div className="ml-2">
                  <small className="my-0 text-xs font-light md:text-base">
                    Get SWOB
                  </small>
                  <p className="my-0">Github</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="container grid max-w-screen-xl grid-cols-2 mx-auto prose place-items-center">
          <div className="px-8 text-center col-span-full">
            <h2 className="text-4xl font-black">How it works</h2>
            <p className="">
              Using SWOB is as easy as authenticating your credentials
            </p>
          </div>
          <div className="p-8 col-span-full lg:col-span-1">
            <div className="flex items-center ml-auto">
              <div className="p-8 mr-4 text-blue-800 bg-white rounded-full shadow-xl">
                <FiUserPlus className="w-7 h-7 lg:w-10 lg:h-10" />
              </div>
              <div className="">
                <h3>Sign Up </h3>
                <p>Signup for a SWOB account</p>
              </div>
            </div>
            <div className="flex items-center ml-auto">
              <div className="p-8 mr-4 text-blue-800 bg-white rounded-full shadow-xl">
                <FiSave className="w-7 h-7 lg:w-10 lg:h-10" />
              </div>
              <div className="">
                <h3>Goto Wallet, </h3>
                <p>
                  select and store the platform for which you want access for
                  later offline uses
                </p>
              </div>
            </div>
            <div className="flex items-center ml-auto">
              <div className="p-8 mr-4 text-blue-800 bg-white rounded-full shadow-xl">
                <FiDownload className="w-7 h-7 lg:w-10 lg:h-10" />
              </div>
              <div className="">
                <h3>Get the SWOB app from the Playstore</h3>
                <p>
                  Goto your SWOB profile online and click on Sync. Use your SWOB
                  app to scan your QR code
                </p>
              </div>
            </div>
            <div className="flex items-center ml-auto">
              <div className="p-8 mr-4 text-blue-800 bg-white rounded-full shadow-xl">
                <FiLogIn className="w-7 h-7 lg:w-10 lg:h-10" />
              </div>
              <div className="">
                <h3>Use App</h3>
                <p>
                  Enter your password in the app and begin transmitting messages
                  while offline using SMS messages
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-1">
            <img
              src={swobflow}
              className="h-[550px] w-[280px] mx-auto"
              alt="How swob works"
            />
          </div>
        </div>
      </div>

      <div className="w-full py-10 bg-gray-100">
        <div className="container max-w-screen-xl p-8 mx-auto prose">
          <h2 className="text-4xl font-black text-center">Why use SWOB?</h2>

          <div>
            <div className="flex items-center justify-between">
              <div
                className="p-8 mr-4 text-blue-800 bg-white rounded-full shadow-xl sm:mr-10"
              >
                <IoAccessibility className="w-7 h-7 lg:w-10 lg:h-10" />
              </div>
              <div className="">
                <h3>Accessibility</h3>
                <p>
                  SWOB’s mobile app allows users to have offline communication
                  wherever they are. With as simple as having an SMS message
                  smartphone you can maintain communications with your online
                  platforms
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="">
                <h3>Security</h3>
                <p>
                  SWOB transmits messages in securely encrypted formats. This
                  secures every communication from being accessed by
                  intermediate parties while in transit.
                </p>
              </div>
              <div
                className="order-first p-8 mr-4 text-blue-800 bg-white rounded-full shadow-xl sm:ml-10 sm:order-none"
              >
                <FiShield className="w-7 h-7 lg:w-10 lg:h-10" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div
                className="p-8 mr-4 text-blue-800 bg-white rounded-full shadow-xl sm:mr-10"
              >
                <DiOpensource className="w-7 h-7 lg:w-12 lg:h-12" />
              </div>
              <div className="">
                <h3>Open source</h3>
                <p>
                  Every component of SWOB is open sourced! From the mobile app
                  to the routing mechanisms we use to get your SMS messages to
                  reach your intended platforms.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="">
                <h3>Decentralized</h3>
                <p>
                  SWOB is built to work in decentralized models. Anyone can host
                  a SWOB server. It’s as easy as understanding how to use it
                </p>
              </div>
              <div
                className="order-first p-8 mr-4 text-blue-800 bg-white rounded-full shadow-xl sm:ml-10 sm:order-none"
              >
                <GiCheckboxTree className="w-7 h-7 lg:w-10 lg:h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default Landing;
