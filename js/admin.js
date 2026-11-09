document.addEventListener('DOMContentLoaded', () => {
    if (!App.requiredAuth()) return;
    const tbody = document.querySelector('#users-body');
    const modal = document.querySelector('#confirm-modal');
    const modalText = document.querySelector('#confirm-text');
    const confirmButton = document.querySelector('#confirm-action');
    const cancelButton = document.querySelector('#cancel-action');
    let pendingUser = null;

    function render() {
        tbody.innerHTML = '';
        MockDB.users.array.forEach(user => {
            const tr = document.createElement('tr');
            const userTd = document.createElement('td');
            const userCell = document.createElement('div');
            userCell.className = 'user-cell';
            const avatar = document.createElement('span');
            avatar.className = 'avatar';
            avatar.textContent = App.initials(user.username);
            const name = document.createElement('strong');
            name.textContent = user.username;
            userCell.append(avatar, name);
            userTd.appendChild(userCell);

            const membership = document.createElement('td');
            membership.innerHTML = user.isPremium ? '<span class="badge badge--premium">Premium</span>' : '<span class="badge">Standard</span>';

            const role = document.createElement('td');
            role.innerHTML = user.isAdmin ? '<span class="badge badge--admin">Admin</span>' : 'User';

            const action = document.createElement('td');
            const button = document.createElement('button');
            button.className = 'btn btn--small btn--secondary';
            button.textContent = user.isPremium ? 'Revoke premium' : 'Make premium';
            button.addEventListener('click', () => openConfirm(user));
            action.appendChild(button);

            tr.append(userTd, membership, role, action);
            tbody.appendChild(tr);
        });
    }

    function openConfirm(user) {
        pendingUser = user;
        const verb = user.isPremium ? 'revoke Premium access from' : 'grant Premium access to';
        modalText.textContent = `You are about to ${verb} ${user.username}.`;
        modal.hidden = false;
        confirmButton.focus();
    }

    function closeConfirm() {
        modal.hidden = true;
        pendingUser = null;
    }

    cancelButton.addEventListener('click', closeConfirm);
    modal.addEventListener('click', event => { if (event.target === modal) closeConfirm(); });
    confirmButton.addEventListener('click', () => {
        if (!pendingUser) return;
        pendingUser.isPremium = !pendingUser.isPremium;
        App.showToast(`Premium status updated for ${pendingUser.username}.`);
        closeConfirm();
        render();
    });

    render();
});