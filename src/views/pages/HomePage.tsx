import {config} from "@config/index";

export default function HomePage() {
    // redirect from discord page needs to be handled (access token and refresh token to be stored.)
  return (
    <main class={"grid h-screen  w-full place-content-center"}>
      <a
        href="/dashboard"
        class="rounded bg-primary px-3 py-2 hover:bg-primary/80"
        hx-target="body"
      >
        Go to dashboard 4d5
      </a>

      <a
        href={`https://discord.com/api/oauth2/authorize?client_id=${config.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth&scope=identify`}
        class="rounded bg-primary px-3 py-2 hover:bg-primary/80"
        hx-target="body"
      >
        Login
      </a>
    </main>
  );
}
