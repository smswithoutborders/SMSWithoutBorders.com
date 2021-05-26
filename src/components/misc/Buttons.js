import { useState } from "react";
import tw from "twin.macro";
import { FiEye, FiEyeOff } from "react-icons/fi";

const IconButton = tw.span`absolute inset-y-0 right-5 flex items-center  cursor-pointer`;

const ToggleButton = () => {
    const [toggle, setToggle] = useState(false);
    return (
        <IconButton onClick={() => setToggle(!toggle)}>
            {toggle ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </IconButton>
    )
}

export { ToggleButton }