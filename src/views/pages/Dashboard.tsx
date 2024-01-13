export default function Dashboard() {

    return <><main class="w-full max-w-6xl mt-8" x-data="commands" >
      <h1 class="text-3xl font-bold mb-6">Give command access to roles</h1>
      <h2 class="font-semibold mb-4"><span class="text-xl"> Admin </span><span class="text-sm text-primary-foreground/70 inline-block">
        ( admins have access to all the commands ) </span></h2>
      <div>
        <h3 class="text-xl font-semibold">Role 1</h3>
        <button x-on:click="addRole('saket')" type="button" class="py-3 px-4 hover:bg-primary/50 hover:text-primary-foreground inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-500" >
          Button
        </button>
      </div>
      <button x-on:click="show">Add role 1,2,4 3 3 ,45 </button>
    <button class="px-3 py-2 m-4 rounded-lg" x-data="{show: true}" x-on:click="show = !show" x-bind:class="show ? 'bg-slate-800 opacity-50' : 'bg-green-800'" >btn-2</button>

      <script
        src="../../public/assits/js/dashboard.js"
      />
    </main >
  </>
}  
