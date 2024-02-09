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
                    class="rounded bg-primary px-3 py-2 hover:bg-primary/80"
                    hx-target="body"
                    hx-boost="false"
                >
                    dashboard issssat
                </a>
            )}
            <a
                class="rounded bg-primary text-secondary px-3 py-2 hover:bg-primary/80"
                href="/select-server"
            >
                select -server
            </a>

            <a
                hx-get="/auth"
                class="rounded bg-primary text-secondary px-3 py-2 hover:bg-primary/80"
                hx-target="body"
            >
                Login
            </a>
        </main>
    );
}
