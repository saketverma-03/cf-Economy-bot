/**
 * TODO:
 * Login Logout detect login functonality
 * */
export default function HomePage(props: { isAuthenticatd: boolean }) {
    const { isAuthenticatd } = props;
    // redirect from discord page needs to be handled (access token and refresh token to be stored.)
    return (
        <main class={'grid h-screen  w-full place-content-center'}>
            {isAuthenticatd && (
                <a
                    href="/dashboard"
                    class="btn"
                    hx-target="body"
                    hx-boost="false"
                >
                    dashboard issssat
                </a>
            )}
            <a class="btn btn-secondary" href="/select-server">
                select -server
            </a>

            <a hx-get="/auth" class="btn btn-primary" hx-target="body">
                Login
            </a>
        </main>
    );
}
