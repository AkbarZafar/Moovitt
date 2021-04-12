
export enum AuthPage {
    Login,
    SignUp,
    ConfirmSignUp
}

export interface IShowAuthPage {
    showPage: (page: AuthPage) => void
}