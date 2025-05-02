import { useState } from "react";
import useAuth from "./useAuth";

const useRole = () => {
    const { user } = useAuth();
    const [role, setRole] = useState();

    //  fetch user info using logged in user email

    return role;
};

export default useRole;