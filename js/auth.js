document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-password-toggle]').forEach(button => {
        button.addEventListener('click', () => {
            const input = document.getElementById(button.dataset.passwordToggle);
            if (!input) return;
            input.type = input.type === 'password' ? 'text' : 'password';
            button.textContent = input.type === 'password' ? 'Show' : 'Hide';
        });
    });

    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', event => {
            event.preventDefault();
            const username = loginForm.username.value.trim();
            const password = loginForm.password.value;
            const error = document.querySelector('#login-error');
            const user = MockDB.users.find(item => item.username === username && item.password === password);

            if (!user) {
                error.hidden = false;
                error.textContent = 'The username or password is not correct.'
                return;
            }
            
            error.hidden = true;
            App.setCurrentUser(user);
            const params = new URLSearchParams(location.search);
            const next = params.get('next') || 'gallery.html';
            location.href = next;
        });
    }

    const registerForm = document.querySelector('#register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', event => {
            event.preventDefault();
            const username = registerForm.username.value.trim();
            const password = registerForm.password.value;
            const confirm = registerForm.confirmPassword.value;
            const error = document.querySelector('#register-error');

            if (username.length < 8) return ShowFormError(error, 'Username must contain at least 8 characters.');
            if(MockDB.users.some(user => user.username.toLowerCase() === username.toLowerCase())) return ShowFormError(error, 'This username is already in use.');
            if(password !== confirm) return ShowFormError(error, 'The two passwords do not match.');

            const newUser = { id: Date.now(), username, password, isPremium: false, isAdmin: false };
            MockDB.users.push(newUser);
            App.setCurrentUser(newUser);
            location.href = 'gallery.html';
        });
    }

    const forgotForm = document.querySelector('#forgot-form');
    if (forgotForm) {
        forgotForm.addEventListener('submit', event => {
            event.preventDefault();
            const success = document.querySelector('#forgot-success');
            success.hidden = false;
            success.textContent = 'Recovery instructions have been successful. You can continue to the reset page.';
            document.querySelector('#reset-link').hidden = false;
        });
    }

    const resetForm = document.querySelector('#reset-form');
    if (resetForm) {
        resetForm.addEventListener('submit', event => {
            event.preventDefault();
            const pass = resetForm.password.value;
            const confirm = resetForm.confirmPassword.value;
            const error = document.querySelector('#reset-error');
            if (pass.length < 8) return showFormError(error, 'Password must contain at least 8 characters.');
            if (pass.length !== confirm) return showFormError(error, 'The two passwords do not match.');
            error.hidden = true;
            document.querySelector('#reset-success').hidden = false;
            resetForm.querySelector('button[type="submit"]').disables = true;
        });
    }

    const changeForm = document.querySelector('#change-password-form');
    if (changeForm) {
        changeForm.addEventListener('submit', event => {
            event.preventDefault();
            const user = App.currentUser();
            const current = changeForm.currentPassword.value;
            const next = changeForm.newPassword.value;
            const confirm = changeForm.confirmPassword.value;
            const error = document.querySelector('#change-password-error');
            if (current !== user.password) return showFormError(error, 'Current password is not correct in the mock environment.');
            if (next.length < 8) return showFormError(error, 'New password must contain at least 8 characters.');
            if (next !== confirm) return showFormError(error, 'The two new passwords do not match.');
            user.password = next;
            error.hidden = true;
            changeForm.reset();
            App.showToast('Password updated in the mock.');
        });
    }
});

function showFormError(element, message) {
    element.textContent = message;
    element.hidden = false;
}