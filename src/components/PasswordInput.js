import React, { useState, forwardRef } from "react";
import { ToggleButton } from "./ToggleButton";
import { Input } from "./shared";

// Password Input Component
export const PasswordInput = forwardRef((props, ref) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="relative rounded-md">
      <Input type={toggle ? "text" : "password"} {...props} ref={ref} />
      <ToggleButton
        className="absolute top-3 right-3"
        toggleFunc={setToggle}
        value={toggle}
      />
    </div>
  );
});
