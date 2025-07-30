document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const topicButtons = document.querySelectorAll('.topic-navigation button');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const backToStartBtn = document.querySelector('.back-to-start');
    const navigationButtonsContainer = document.querySelector('.navigation-buttons');

    let currentSlideIndex = 0;

    // Função para mostrar um slide específico
    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        currentSlideIndex = index;
        updateNavigationButtons();
    }

    // Função para atualizar a visibilidade dos botões de navegação
    function updateNavigationButtons() {
        if (slides[currentSlideIndex].id === 'slide-intro') {
            navigationButtonsContainer.style.display = 'none'; // Oculta botões Anterior/Próximo na introdução
        } else {
            navigationButtonsContainer.style.display = 'flex'; // Mostra em outros slides

            // Oculta "Anterior" no primeiro slide de conteúdo
            if (currentSlideIndex === 1) { // Considerando que o slide-intro é o 0 e o primeiro conteúdo é o 1
                prevBtn.style.display = 'none';
            } else {
                prevBtn.style.display = 'block';
            }

            // Oculta "Próximo" no último slide
            if (currentSlideIndex === slides.length - 1) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'block';
            }
        }
    }

    // Event listeners para os botões de tópico
    topicButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const targetSlide = document.getElementById(targetId);
            if (targetSlide) {
                const index = Array.from(slides).indexOf(targetSlide);
                showSlide(index);
            }
        });
    });

    // Event listeners para os botões Anterior/Próximo
    prevBtn.addEventListener('click', () => {
        if (currentSlideIndex > 1) { // Impede de ir para antes do primeiro slide de conteúdo
            showSlide(currentSlideIndex - 1);
        } else if (currentSlideIndex === 1) { // Volta para o slide de introdução se estiver no primeiro conteúdo
            showSlide(0);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSlideIndex < slides.length - 1) {
            showSlide(currentSlideIndex + 1);
        }
    });

    // Event listener para o botão "Voltar ao Início" no slide final
    if (backToStartBtn) {
        backToStartBtn.addEventListener('click', () => {
            showSlide(0); // Volta para o slide de introdução
        });
    }

    // Inicia mostrando o primeiro slide
    showSlide(0);
});