document.addEventListener('DOMContentLoaded', () => {
    if(!App.requireAuth()) return;
    const id = Number(new URLSearchParams(location.search).get('id'));
    const user = App.currentUser();
    const item = MockDB.media.find(media => media.id === id);

    if(!item) {
        location.href = 'error.html?code=404';
        return;
    }

    if(item.premium && !user.isPremium) {
        location.href = 'error.html?code=403';
        return;
    }

    document.querySelector('#detail-image').src = item.src;
    document.querySelector('#detail-image').alt = item.title;
    document.querySelector('#detail-title').textContent = item.title;
    document.querySelector('#detail-description').textContent = item.description;
    document.querySelector('#detail-author').textContent = `@${item.uploader}`;
    document.querySelector('#detail-date').textContent = App.formatDate(item.createdAt);
    const badge = document.querySelector('#detail-badge');
    badge.hidden = !item.premium;

    const download = document.querySelector('#download-image');
    download.href = item.src;
    download.setAttribute('download', `${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`);
})