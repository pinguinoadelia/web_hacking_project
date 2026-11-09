document.addEventListener('DOMContentLoaded', () => {
    if (!App.requireAuth()) return;
    const input = document.querySelector('#image-file');
    const zone = document.querySelector('#dropzone');
    const placeholder = document.querySelector('#dropzone-placeholder');
    const preview = document.querySelector('#upload-preview');
    const form = document.querySelector('#upload-form');
    let selectedFile = null;

    function loadFile(file) {
        if (!file) return;
        selectedFile = file;
        const reader = new FileReader();
        reader.onload = () => {
            preview.src = reader.result;
            preview.hidden = false;
            placeholder.hidden = true;
        };
        reader.readAsDataURL(file);
    }

    input.addEventListener('change', () => loadFile(input.files[0]));
    zone.addEventListener('dragover', event => { event.preventDefault(); zone.classList.add('is-dragover'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('is-dragover'));
    zone.addEventListener('drop', event => {
        event.preventDefault();
        zone.classList.remove('is-dragover');
        loadFile(event.dataTransfer.files[0]);
    });

    form.addEventListener('submit', event => {
        event.preventDefault();
        const error = document.querySelector('#upload-error');
        if (!selectedFile) {
            error.hidden = false;
            error.textContent = 'Choose an image before publishing.';
            return;
        }
        const description = form.description.value.trim();
        if (!description) {
            error.hidden = false;
            error.textContent = 'Add a short description.';
            return;
        }
        error.hidden = true;

        const user = App.currentUser();
        const objectUrl = URL.createObjectURL(selectedFile);
        MockDB.media.unshift({
            id: Date.now(),
            uploaderId: user.id,
            uploader: user.username,
            title: form.title.value.trim() || 'Untitled photograph',
            description,
            premium: form.querySelector('input[name="visibility"]:checked')?.value === 'premium',
            createdAt: new Date().toISOString().slice(0, 10),
            src: objectUrl
        });

        App.showToast('Photograph added to the mock');
        form.reset();
        selectedFile = null;
        preview.hidden = true;
        placeholder.hidden = false;
        setTimeout(() => location.href = 'gallery.html', 450);
    });
});