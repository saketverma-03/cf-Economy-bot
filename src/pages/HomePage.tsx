export default function HomePage() {
  return (
    <main class={"grid h-screen  w-full place-content-center"}>
      <a
        href="/dashboard"
        class="rounded bg-primary px-3 py-2 hover:bg-primary/80"
      >
        Go to dashboard 
      </a>
      <button hx-get="/dashboard" hx-swap="outerHTML">
      </button>
      <div x-data="{open: false}" class="relative">
        <button
          x-on:click="open = !open"
          class="border border-slate-700 px-3 py-2 hover:bg-foreground/10"
        >
          Hidden btn
        </button>
        <button
          x-show="open"
          class="absolute bottom-0 left-0 translate-y-full bg-primary px-3 py-2 transition-all hover:bg-primary/80"
        >
          Hidden btn
        </button>
      </div>
    </main>
  );
}
