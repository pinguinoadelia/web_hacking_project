document.addEventListener('DOMContentLoaded', () => {
    if(!App.requireAuth()) return;
    const user = App.currentUser()
    document.querySelector('#profile-username').textContent = user.username;
    document.querySelector('#profile-initials').textContent = App.initials(user.username);
    document.querySelector('#profile-membership').textContent = user.isPremium ? 'Premium' : 'Standard';
    document.querySelector('#profile-role').textContent = user.isAdmin ? 'Administrator' : 'User';
    document.querySelector('#profile-count').textContent = MockDB.media.filter(item => item.uploaderId === user.id).length;
})