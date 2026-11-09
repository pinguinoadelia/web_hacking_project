(function () {
    const SESSION_KEY = 'photos_mock_user_id';

    function currentUser() {
        const id = Number(sessionStorage.getItem(SESSION_KEY));
        return window.MockDB?.users.find(user => user.id === id) || null;
    }

    function setCurrentUser(user) {
        if (user) sessionStorage.setItem(SESSION_KEY, String(user.id));
        else sessionStorage.removeItem(SESSION_KEY);
        renderNavigation();
    } 

    function initials(username = '?') {
        return username.slice(0, 2).toUpperCase();
    }

    function escapeText(value) {
        return String(value ?? '');
    }

    function formatDate(isoDate) {
        return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric'}).format(new Date(isoDate));
    }

    function showToast(message) {
        let stack = document.querySelector('.toast-stack');
        if (!stack) {
            stack = document.createElement('div');
            stack.className = 'toast-stack';
            stack.setAttribute('aria-live', 'polite');
            document.body.appendChild(stack);
        }
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        stack.appendChild(toast);
        setTimeout(() => toast.remove(), 3200);
    }

    function renderNavigation() {
        const user = currentUser();
        document.querySelectorAll('[data-nav-auth]').forEach(el => el.hidden = !user);
        document.querySelectorAll('[data-nav-guest]').forEach(el => el.hidden = Boolean(user));
        document.querySelectorAll('[data-nav-admin]').forEach(el => el.hidden = !(user && user.isAdmin));

        document.querySelectorAll('[data-current-username]').forEach(el => el.textContent = user?.username || '');
        document.querySelectorAll('[data-current-initials]').forEach(el => {el.textContent = initials(user?.username || '?');});
    }

    function logout() {
        setCurrentUser(null);
        window.location.href = 'login.html';
    }

    function requireAuth() {
        if (!currentUser()) {
            const here = encodeURIComponent(window.location.pathname.split('/').pop() || 'gallery.html');
            window.location.href = `login.html?next=${here}`;
            return false;
        }
        return true;
    }

    function requireAdmin() {
        const user = currentUser();
        if (!user) {
            window.location.href = 'login.html?next=admin.html';
            return false;
        }
        if (!user.isAdmin) {
            window.location.href = 'error.html?code=403';
            return false;
        }
        return true;
    }

    function markCurrentNav() {
        const page = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === page) link.setAttribute('aria-current', 'page');
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderNavigation();
        markCurrentNav();
        document.querySelectorAll('[data-logout]').forEach(btn => btn.addEventListener('click', logout));
        document.querySelectorAll('[data-year]').forEach(el => {el.textContent = new Date().getFullYear();});
    });

    window.App = { currentUser, setCurrentUser, requireAuth, requireAdmin, showToast, formatDate, escapeText, initials};
})();