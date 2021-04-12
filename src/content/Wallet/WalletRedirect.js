import React, { useEffect } from 'react';

const WalletRedirect = () => {
    useEffect(() => {
        // get the URL parameters which will include the auth token
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");

        if (window.opener) {
            // send them to the opening window
            window.opener.postMessage(
                {
                    code: code,
                    source: "smswithoutborders"
                });
            // set user key which will be used to identify the origin of this message
            // close the popup
            window.close();
        }
    });
    // some text to show the user
    return <p>Please wait...</p>;
};
export default WalletRedirect;