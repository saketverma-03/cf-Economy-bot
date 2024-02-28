/* eslint-disable no-undef */

document.addEventListener('alpine:init', () => {
    Alpine.data('permsData', () => ({
        async init() {
            this.roles = await (await fetch('/community/permissions')).json();
            console.log(this.roles);
        },
        async handleSubmit() {
            // submit logic here
            const res = await fetch('/community/permissions', {
                method: 'PUT',
                body: JSON.stringify(this.roles),
            });
            console.log(res);
        },
        async getRoles() {
            const temp = await this.roles;
            if (!temp.perms) return [];
            const lol = Object.entries(temp.perms);
            return lol;
        },
        roles: [],
        perms: new Map(),
        isLoading: true,
        getNameById(id) {
            for (const role of this.roles.roles) {
                if (role.id == id) return role.name;
            }
        },
        toogleProperty(role, cmd) {
            this.roles.perms[role].includes(cmd)
                ? this.removeCommand(role, cmd)
                : this.addCommand(role, cmd);
        },
        addCommand(role, cmd) {
            this.roles.perms[role].push(cmd);

            console.log(this.roles);
        },
        removeCommand(role, cmd) {
            const tempRoles = this.roles.perms[role].filter(
                (item) => item !== cmd,
            );
            this.roles.perms[role] = tempRoles;
            console.log(this.roles);
        },
    }));
});
