const galleryImages = [
    {
        src: 'img/48956-Forza-Horizon-5.jpg',
        alt: 'Forza Horizon 5 – неонова гонка'
    },
    {
        src: 'img/FH-c977df2df1595b8792c4-1024x576.jpg',
        alt: 'Forza Horizon 6 – Mt. Fuji'
    },
    {
        src: 'img/forza-horizon-6-setting-leaks-xbox-tokyo-game-show-2025-4.jpg',
        alt: 'Forza Horizon 6 – нічний фестиваль'
    }
];

// Додаємо зображення у галерею при відкритті секції
function showSection(sectionId) {
    const sections = ['home', 'about', 'gallery'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });
    const activeSection = document.getElementById(sectionId);
    if (activeSection) activeSection.classList.add('active');

    // Якщо відкривається галерея — оновити її вміст
    if (sectionId === 'gallery') {
        const gallerySection = document.getElementById('gallery');
        if (gallerySection) {
            gallerySection.innerHTML = '<h2>Галерея</h2>';
            const galleryWrapper = document.createElement('div');
            galleryWrapper.className = 'gallery-wrapper';
            galleryImages.forEach(img => {
                const image = document.createElement('img');
                image.src = img.src;
                image.alt = img.alt;
                galleryWrapper.appendChild(image);
            });
            gallerySection.appendChild(galleryWrapper);
            addGalleryListeners();
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onload = () => showSection('home');

// --- Модальне вікно для перегляду зображень ---
let currentImgIndex = 0;

function openModal(index) {
    currentImgIndex = index;
    let modal = document.getElementById('img-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'img-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <img class="modal-img" src="" alt="">
            <button class="modal-arrow left">&#8592;</button>
            <button class="modal-arrow right">&#8594;</button>
        `;
        document.body.appendChild(modal);

        // Стилі для модального вікна
        const style = document.createElement('style');
        style.innerHTML = `
            #img-modal {
                position: fixed; z-index: 9999; left: 0; top: 0; width: 100vw; height: 100vh;
                background: rgba(20,22,30,0.92); display: flex; align-items: center; justify-content: center;
                flex-direction: column; animation: fadeIn 0.2s;
            }
            #img-modal .modal-img {
                max-width: 90vw; max-height: 80vh; border-radius: 18px; box-shadow: 0 4px 32px #ff3cac88;
                margin-bottom: 16px; transition: box-shadow 0.2s;
            }
            #img-modal .modal-arrow {
                position: absolute; top: 50%; transform: translateY(-50%);
                background: rgba(30,42,56,0.7); color: #fff; border: none; font-size: 2.5rem;
                border-radius: 50%; width: 56px; height: 56px; cursor: pointer; z-index: 2;
                transition: background 0.2s;
            }
            #img-modal .modal-arrow.left { left: 32px; }
            #img-modal .modal-arrow.right { right: 32px; }
            #img-modal .modal-arrow:hover { background: #ff3cac; }
            #img-modal .modal-overlay {
                position: absolute; left: 0; top: 0; width: 100vw; height: 100vh; z-index: 1;
            }
        `;
        document.head.appendChild(style);

        // Обробники подій
        modal.querySelector('.modal-arrow.left').onclick = (e) => { e.stopPropagation(); showModalImg(currentImgIndex - 1); };
        modal.querySelector('.modal-arrow.right').onclick = (e) => { e.stopPropagation(); showModalImg(currentImgIndex + 1); };
        modal.querySelector('.modal-overlay').onclick = closeModal;
        modal.querySelector('.modal-img').onclick = (e) => e.stopPropagation();
        modal.onclick = closeModal;

        document.addEventListener('keydown', modalKeyHandler);
    }
    showModalImg(currentImgIndex);
    modal.style.display = 'flex';
}

function showModalImg(index) {
    if (index < 0) index = galleryImages.length - 1;
    if (index >= galleryImages.length) index = 0;
    currentImgIndex = index;
    const modal = document.getElementById('img-modal');
    if (modal) {
        const img = modal.querySelector('.modal-img');
        img.src = galleryImages[index].src;
        img.alt = galleryImages[index].alt;
    }
}

function closeModal() {
    const modal = document.getElementById('img-modal');
    if (modal) modal.style.display = 'none';
}

function modalKeyHandler(e) {
    const modal = document.getElementById('img-modal');
    if (!modal || modal.style.display !== 'flex') return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') showModalImg(currentImgIndex + 1);
    if (e.key === 'ArrowLeft') showModalImg(currentImgIndex - 1);
}

// Додаємо обробник на зображення галереї
function addGalleryListeners() {
    const gallerySection = document.getElementById('gallery');
    if (!gallerySection) return;
    const imgs = gallerySection.querySelectorAll('img');
    imgs.forEach((img, idx) => {
        img.style.cursor = 'zoom-in';
        img.onclick = (e) => {
            e.stopPropagation();
            openModal(idx);
        };
    });
}

function showGift() {
    const msg = document.getElementById('gift-message');
    if (msg) {
        msg.textContent = 'Ви отримали Bugatti Chiron!!';
        msg.style.display = 'block';
    }
}