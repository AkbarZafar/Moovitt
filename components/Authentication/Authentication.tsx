import React, { useState } from "react"
import { Login } from "./Login";
import { ConfirmSignUp, SignUp } from "./SignUp";
import { AuthPage } from "./util";


export const Authentication = () => {
    const [page, setPage] = useState(AuthPage.Login);

    switch (page) {
        case AuthPage.SignUp:
            return <SignUp showPage={setPage} />
        case AuthPage.Login:
            return <Login showPage={setPage} />
        case AuthPage.ConfirmSignUp:
            return <ConfirmSignUp showPage={setPage} />
        default:
            return <Login showPage={setPage} />
    }
}