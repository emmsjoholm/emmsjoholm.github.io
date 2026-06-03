/* Ladda header */
fetch('includes/header.html').then(res => res.text()).then(html => {
    document.getElementById('header').innerHTML = html;
    /* Hämta menyelement och aktuell sida */
    const hamburger = document.querySelector('.hamburger-btn');
    const overlay = document.getElementById('nav-overlay');
    const currentPage = window.location.pathname.split('/').pop();
    /* Markera aktiv sida i desktop-menyn */
    document.querySelectorAll('.desktop-nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });
    /* Öppna/stäng hamburgermenyn */
    hamburger.addEventListener('click', () => {
        const isOpen = overlay.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
        overlay.setAttribute('aria-hidden', !isOpen);
    });
    /* Stäng meny via stängknappen */
    document.querySelector('.close-btn').addEventListener('click', () => {
        overlay.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
        overlay.setAttribute('aria-hidden', true);
    });
    /* Hantera dropdown-menyer */
    document.querySelectorAll('.dropdown-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const dropdown = btn.closest('li').querySelector('.nav-dropdown, .desktop-dropdown-menu');
            if (!dropdown) return;
            const isOpen = dropdown.classList.toggle('active');
            btn.classList.toggle('active');
            btn.setAttribute('aria-expanded', isOpen);
        });
    });
});
/* Ladda footer */
fetch('includes/footer.html').then(res => res.text()).then(html => document.getElementById('footer').innerHTML = html);
/* Karusell – körs bara om elementen finns på sidan */
const track = document.querySelector('.stratus-carousel-track');
if (track) {
    const imgs = document.querySelectorAll('.stratus-carousel-img');
    const dots = document.querySelectorAll('.dot');
    let current = 0;
    /* Byt till vald bild och uppdatera indikatorer */
    function goTo(index) {
        current = index;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }
    /* Nästa bild */
    document.querySelector('.stratus-carousel-btn--next').addEventListener('click', () => {
        goTo(current === imgs.length - 1 ? 0 : current + 1);
    });
    /* Föregående bild */
    document.querySelector('.stratus-carousel-btn--prev').addEventListener('click', () => {
        goTo(current === 0 ? imgs.length - 1 : current - 1);
    });
    /* Navigering via prickar */
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
}