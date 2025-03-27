document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.querySelector('.burger-btn');
    const header = document.querySelector('.header');
    const mainContent = document.querySelector('.main-content');
    const instructionsLink = document.getElementById('instructionsLink');
    const instructionsModal = document.getElementById('instructionsModal');
    const gamePreview = document.querySelector('.game-preview-container');
    const gameContainer = document.getElementById('gameContainer');
    const gameCloseBtn = document.querySelector('.game-close-btn');
    const closeButtons = document.querySelectorAll('.close');
    const gameFrame = document.getElementById('gameFrame');
    const mySitesLink = document.querySelector('.nav-menu a[href="#mySites"]');
    const mySitesModal = document.getElementById('mySitesModal');
    const orderSiteLink = document.querySelector('.nav-menu a[href="#orderSite"]');
    const orderSiteModal = document.getElementById('orderSiteModal');
    const emailButton = document.querySelector('.order-button[href^="mailto:"]');
    const emailModal = document.getElementById('emailModal');
    const closeEmailModal = emailModal.querySelector('.close');
    const videoModal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const videoLinks = document.querySelectorAll('.video-link');
    const closeVideoBtn = document.querySelector('.close-video');

    // Обробка кліку по бургер-меню
    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('active');
        header.classList.toggle('active');
        mainContent.classList.toggle('shifted');
    });

    // Відкриття модального вікна з інструкціями
    if (instructionsLink) {
        instructionsLink.addEventListener('click', (e) => {
            e.preventDefault();
            instructionsModal.style.display = 'block';
        });
    }

    // Закриття модального вікна
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                if (modal === videoModal) {
                    videoFrame.src = '';
                }
            }
        });
    });

    // Закриття модального вікна при кліку поза ним
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            if (e.target === videoModal) {
                videoFrame.src = '';
            }
        }
    });

    // Запуск гри при кліку на превью
    if (gamePreview) {
        gamePreview.addEventListener('click', function() {
            gamePreview.style.display = 'none';
            gameContainer.style.display = 'block';
            gameFrame.src = 'Game for 2/start_game.bat';
        });
    }

    // Закриття вікна гри
    if (gameCloseBtn) {
        gameCloseBtn.addEventListener('click', function() {
            gameContainer.style.display = 'none';
            gamePreview.style.display = 'block';
            gameFrame.src = '';
        });
    }

    // Обробка посилань на сайти
    if (mySitesLink) {
        mySitesLink.addEventListener('click', (e) => {
            e.preventDefault();
            mySitesModal.style.display = 'block';
        });
    }

    if (orderSiteLink) {
        orderSiteLink.addEventListener('click', (e) => {
            e.preventDefault();
            orderSiteModal.style.display = 'block';
        });
    }

    // Обробка кнопки email
    if (emailButton) {
        emailButton.addEventListener('click', function(event) {
            event.preventDefault();
            emailModal.style.display = 'block';
        });
    }

    // Обробка відео
    videoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Запобігаємо поширенню події
            const videoId = link.getAttribute('data-video-id');
            videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            videoModal.style.display = 'block';
        });
    });

    // Функція для отримання ID відео з YouTube посилання
    function getYouTubeVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // Обробник кліків по відео
    document.querySelectorAll('.video-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const videoUrl = this.getAttribute('data-video-id');
            const videoId = getYouTubeVideoId(videoUrl);
            
            if (videoId) {
                videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                videoModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Блокуємо прокрутку сторінки
            }
        });
    });

    // Закриття модального вікна
    closeVideoBtn.addEventListener('click', function() {
        videoModal.style.display = 'none';
        videoFrame.src = ''; // Очищаємо src відео
        document.body.style.overflow = ''; // Відновлюємо прокрутку сторінки
    });

    // Закриття модального вікна при кліку поза відео
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
            videoFrame.src = '';
            document.body.style.overflow = '';
        }
    });

    // Закриття модального вікна при натисканні клавіші Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.style.display === 'block') {
            videoModal.style.display = 'none';
            videoFrame.src = '';
            document.body.style.overflow = '';
        }
    });
}); 