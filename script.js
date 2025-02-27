document.addEventListener('DOMContentLoaded', function() {
  const header = document.getElementById('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const headerList = document.querySelector('.header__list');
  const headerLinks = document.querySelectorAll('.header__links, .header__button, .logo');
  const videos = document.querySelectorAll('.jobs__item video');

  // Função para calcular o final da seção hero
  function getHeroEndPosition() {
    const hero = document.querySelector('.hero');
    return hero.offsetTop + hero.offsetHeight;
  }

  // Função para atualizar as classes
  function updateHeaderClasses() {
    const heroEndPosition = getHeroEndPosition();
    const isScrolled = window.scrollY > heroEndPosition - header.offsetHeight;
    
    header.classList.toggle('scrolled', isScrolled);
    headerList.classList.toggle('scrolled', isScrolled);
  }

  // Efeito de scroll
  window.addEventListener('scroll', updateHeaderClasses);

  // Toggle do menu
  menuToggle.addEventListener('click', function() {
    headerList.classList.toggle('open');
    updateHeaderClasses(); // Atualiza as classes imediatamente após abrir/fechar o menu
  });

  // Inicializa as classes
  updateHeaderClasses();
  
  headerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Fecha o menu se estiver aberto (para mobile)
        headerList.classList.remove('open');
        
        // Scroll suave para a seção
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  videos.forEach(video => {
    video.addEventListener('play', function() {
      pauseOtherVideos(this);
    });
  });
  
  function pauseOtherVideos(currentVideo) {
    videos.forEach(video => {
      if (video !== currentVideo) {
        video.pause();
        video.currentTime = 0; // Reinicia o vídeo
      }
    });
  }
});