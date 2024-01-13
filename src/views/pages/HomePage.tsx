export default function HomePage() {
  return (
    <main class={"grid h-screen  w-full place-content-center"}>
      <a
        href="/dashboard"
        class="rounded bg-primary px-3 py-2 hover:bg-primary/80"
        hx-target="body"
      >
        Go to dashboard 4d5
      </a>
    </main>
  );
}
