
document.addEventListener('alpine:init', () => {
  Alpine.data('commands', () => ({
    init() {
      console.log("intiated")
    },
    roles: ["a1"],
    addRole(role) { this.roles.push(role) },
    show() { console.log(this.roles) }

  }))
})

console.log("dashboard")
