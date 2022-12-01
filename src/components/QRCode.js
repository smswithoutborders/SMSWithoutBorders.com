import React, { useEffect, createRef } from "react";
import PropTypes from "prop-types";
import QRious from "qrious";

export const QRCode = ({ size, value, ...rest }) => {
  const canvasRef = createRef();

  useEffect(() => {
    new QRious({
      element: canvasRef.current,
      value: value,
      size: size,
    });
  }, [value, size, canvasRef]);

  return <canvas aria-label="qr-code" ref={canvasRef} {...rest}></canvas>;
};

QRCode.defaultProps = {
  size: 300,
  value: "SMSWithoutBorders",
};

QRCode.propTypes = {
  size: PropTypes.number,
  value: PropTypes.string,
};
