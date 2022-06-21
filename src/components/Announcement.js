import React from "react";
import { Link } from "react-router-dom";

export const Announcement = () => {
  return (
    <div className="px-4 py-3 text-white bg-black">
      <p className="text-base font-medium leading-7 text-center traking-wide">
        SMSWithoutBorders v2 Beta is now available. You can be an early tester
        &nbsp;
        <Link className="underline" to="/beta">
          Learn more &rarr;
        </Link>
      </p>
    </div>
  );
};
