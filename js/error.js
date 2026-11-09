document.addEventListener('DOMContentLoaded', () => {
    const code = new URLSearchParams(location.search).get('code') || '404';
    const messages = {
        '403': ['403', 'Access denied', 'You do not have permission to open this page or resource.'],
        '404': ['404', 'Page not found', 'The page or photograph you requested does not exist.'],
        '500': ['500', 'Something went wrong', 'An unexpected error occurred. Please try again.']
    };
    const [number, title, text] = messages[code] || messages['404'];
    document.querySelector('#error-code').textContent = number;
    document.querySelector('#error-title').textContent = title;
    document.querySelector('#error-text').textContent = text;
})