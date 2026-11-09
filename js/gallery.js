document.addEventListener('DOMContentLoaded', () => {
    if (!App.requireAuth()) return;

    const grid = document.querySelector('#gallery-grid');
    const skeleton = document.querySelector('#gallery-skeleton');
    const empty = document.querySelector('#gallery-empty');
    const search = document.querySelector('#gallery-search');
    const chips = {...document.querySelectorAll('[data-filter]')};
    let activeFilter = 'all';
    const premiumChip = document.querySelector('[data-filter="premium"');
    if (premiumChip) premiumChip.hidden = !App.currentUser().isPremium;

    function visibleMedia() {
        const user = App.currentUser();
        return MockDB.media.filter(item => !item.premium || user.isPremium);
    }

    function render() {
        const query = search?.value.trim().toLowerCase() || '';
        let items = visibleMedia().filter(item => {
            const matchesQuery = `${item.title} ${item.description} ${item.uploader}`.toLowerCase().includes(query);
            const matchesFilter = activeFilter === 'all' || (activeFilter === 'premium' ? item.premium : !item.premium);
            return matchesQuery && matchesFilter;
        });

        grid.innerHTML = '';
        empty.hidden = items.length > 0;
        items.forEach(item => grid.appendChild(photoCard(item)));
    }

    function photoCard(item) {
        const article = document.createElement('article');
        article.className = 'photo-card';

        const img = document.createElement('img');
        img.className = 'photo-card__image';
        img.src = item.src;
        img.alt = item.title;
        img.loading = 'lazy';

        const body = document.createElement('div');
        body.className = 'photo-card__body';

        const meta = document.createElement('div');
        meta.className = 'photo-card__meta';
        const author = document.createElement('span');
        author.className = 'photo-card__author';
        author.textContent = `@${item.uploader}`;
        meta.appendChild(author);

        if (item.premium) {
            const badge = document.createElement('span');
            badge.className = 'badge badge--premium';
            badge.textContent = 'Premium';
            meta.appendChild(badge);
        }

        const title = document.createElement('h2');
        title.className = 'photo-card__title';
        title.textContent = item.title;

        const desc = document.createElement('p');
        desc.className = 'photo-card__desc';
        desc.textContent = item.description;

        const link = document.createElement('a');
        link.className = 'photo-card__link';
        link.href = `photo.html?id=${item.id}`;
        link.textContent = 'View photograph'

        body.append(meta, title, desc, link);
        article.append(img, body);
        return article;
    }

    setTimeout(() => {
        skeleton.hidden = true;
        grid.hidden = false;
        render();

    }, 450);

    search?.addEventListener('input', render);
    chips.forEach(chip => chip.addEventListener('click', () =>{
        activeFilter = chip.dataset.filter;
        chips.forEach(button => button.setAttribute('aria-pressed', String(button === chip)));
        render();
    }));
});