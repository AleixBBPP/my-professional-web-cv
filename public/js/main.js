// ====================================
// MAIN.JS - PORTFOLIO LANDING PAGE
// ====================================

// ====================================
// INICIALIZACIÓN
// ====================================
document.addEventListener('DOMContentLoaded', () => {
    try {
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) loader.classList.add('hidden');
        }, 500);

        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }

        initSmoothScroll();
        initNavbar();
        initThemeToggle();
        initScrollProgress();
        initBackToTop();

        renderHome();
        renderStats();
        renderAreas();
        renderAbout();
        renderExperience();
        renderContact();
        renderFooter();


    } catch (error) {
        console.error('Error al inicializar la web:', error);
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }
});

// ====================================
// SMOOTH SCROLL Y NAVEGACIÓN
// ====================================
function initSmoothScroll() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                const menuToggle = document.getElementById('menu-toggle');
                const navMenu = document.getElementById('nav-menu');

                if (menuToggle) {
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }

                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            const home = document.querySelector('#home');
            if (home) {
                home.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavOnScroll);
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('.section');
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ====================================
// NAVBAR
// ====================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

            const expanded = menuToggle.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        });
    }
}

// ====================================
// THEME TOGGLE
// ====================================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const themeIcon = themeToggle.querySelector('.theme-icon');
    let savedTheme = 'dark';

    try {
        savedTheme = localStorage.getItem('theme') || 'dark';
    } catch (e) {
        savedTheme = 'dark';
    }

    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeIcon) {
    themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', savedTheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);

        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {}

        if (themeIcon) {
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', newTheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
        }
    });
}

// ====================================
// HOME SECTION
// ====================================
function renderHome() {
    const heroContent = document.getElementById('hero-content');
    if (!heroContent || !window.CONFIG) return;

    heroContent.innerHTML = `
        <div class="hero-shell">
            <div class="hero-copy">
                <span class="hero-kicker">Análisis · Economía · Empresas · Instituciones</span>

                <h1 class="hero-greeting">
                    Analista de economía, empresas e instituciones.
                </h1>

                <p class="hero-subtitle">
                    Analizo empresas, mercados, instituciones, políticas públicas e inteligencia artificial
                    para comprender sistemas complejos y tomar mejores decisiones.
                </p>

                <div class="hero-cta">
                    <a href="#contact" class="btn btn-primary">Contactar</a>
                    <a href="${CONFIG.social.linkedin}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">LinkedIn</a>
                </div>
            </div>

            <div class="hero-visual">
                <div class="hero-avatar-wrap">
                    <img
                        src="${CONFIG.personal.avatar}"
                        alt="${CONFIG.personal.name}"
                        width="320"
                        height="320"
                        fetchpriority="high"
                        decoding="async"
                        onerror="this.src='https://placehold.co/320x320/0b0f14/f5f7fa?text=Aleix+Bosch'"
                    >
                </div>
            </div>
        </div>
    `;
}

// ====================================
// STATS SECTION
// ====================================
function renderStats() {
    const statsGrid = document.getElementById('stats-grid');
    if (!statsGrid || !CONFIG.stats || CONFIG.stats.length === 0) return;

    statsGrid.innerHTML = CONFIG.stats.map((stat, index) => `
        <div class="stat-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="stat-card-top">
                <span class="stat-icon" aria-hidden="true">${stat.icon}</span>
                <span class="stat-number" data-target="${stat.number}">${stat.suffix}</span>
            </div>
            <div class="stat-card-body">
                <span class="stat-label">${stat.label}</span>
                <p class="stat-description">${stat.description}</p>
            </div>
        </div>
    `).join('');

    animateStats();
}

function animateStats() {
    const statsGrid = document.getElementById('stats-grid');
    if (!statsGrid) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');

                statNumbers.forEach((statNumber, index) => {
                    const target = parseInt(statNumber.dataset.target, 10);
                    const suffix = statNumber.textContent.replace(/[0-9]/g, '');
                    const duration = 1600;
                    const startTime = performance.now();
                    const delay = index * 120;

                    const step = (now) => {
                        const elapsed = now - startTime - delay;
                        if (elapsed < 0) {
                            requestAnimationFrame(step);
                            return;
                        }

                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 4);
                        const current = Math.floor(eased * target);
                        statNumber.textContent = current + suffix;

                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            statNumber.textContent = target + suffix;
                        }
                    };

                    requestAnimationFrame(step);
                });

                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25, rootMargin: '0px 0px -50px 0px' });

    observer.observe(statsGrid);
}

function renderAreas() {
    const areasGrid = document.getElementById('areas-grid');
    if (!areasGrid || !CONFIG.areas || CONFIG.areas.length === 0) return;

    areasGrid.innerHTML = CONFIG.areas.map((area, index) => `
        <div class="area-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <span class="area-icon" aria-hidden="true">${area.icon}</span>
            <div class="area-card-body">
                <h3 class="area-title">${area.title}</h3>
                <p class="area-description">${area.description}</p>
            </div>
        </div>
    `).join('');
}


// ====================================
// ABOUT SECTION
// ====================================
function renderAbout() {
    const aboutContent = document.getElementById('about-content');
    if (!aboutContent || !CONFIG.about) return;

    const bioHTML = CONFIG.about.bio.map(paragraph => `<p>${paragraph}</p>`).join('');

    aboutContent.innerHTML = `
        <div class="about-grid" data-aos="fade-up">
            <div class="about-image">
                <img
                    src="${CONFIG.about.image}"
                    alt="Foto de ${CONFIG.personal.name} trabajando"
                    width="520"
                    height="640"
                    loading="lazy"
                    decoding="async"
                    onerror="this.src='https://placehold.co/520x640/121821/f5f7fa?text=Sobre+Mi'"
                >
            </div>

            <div class="about-text">
                <h3>Conoce más sobre mí</h3>
                ${bioHTML}
            </div>
        </div>

        <div class="skills-section">
            <h3 class="section-title" data-aos="fade-up">Habilidades y competencias</h3>
            ${renderSkillsCategories()}
        </div>
    `;
}

function renderSkillsCategories() {
    if (!CONFIG.skills) return '';

    return `
        <div class="skills-categories-grid" data-aos="fade-up" data-aos-delay="100">
            ${Object.entries(CONFIG.skills).map(([category, skills]) => `
                <div class="skill-category-card">
                    <h4 class="skill-category-title">${category}</h4>
                    <ul class="skill-list">
                        ${skills.map(skill => `
                            <li class="skill-list-item">
                                <span class="skill-icon">${skill.icon}</span>
                                <span class="skill-name">${skill.name}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    `;
}

// ====================================
// EXPERIENCE SECTION
// ====================================
function renderExperience() {
    const experienceContent = document.getElementById('experience-content');
    if (!experienceContent) return;

    if (!CONFIG.experience || CONFIG.experience.length === 0) {
        experienceContent.innerHTML = '<p>No hay experiencia disponible.</p>';
        return;
    }

    experienceContent.innerHTML = `
        <div class="experience-timeline">
            ${CONFIG.experience.map((exp, index) => `
                <div class="experience-item" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="experience-icon">${exp.icon}</div>

                    <div class="experience-content">
                        <div class="experience-header">
                            <h3 class="experience-title">${exp.title}</h3>
                            <span class="experience-period">${exp.period}</span>
                        </div>

                        <p class="experience-company">
                            ${exp.company}${exp.location ? ` • ${exp.location}` : ''}
                        </p>

                        <p class="experience-description">${exp.description}</p>

                        ${exp.achievements && exp.achievements.length > 0 ? `
                            <ul class="experience-achievements">
                                ${exp.achievements.map(achievement => `
                                    <li>${achievement}</li>
                                `).join('')}
                            </ul>
                        ` : ''}

                        ${exp.technologies && exp.technologies.length > 0 ? `
                            <div class="experience-tags">
                                ${exp.technologies.map(tech => `
                                    <span class="experience-tag">${tech}</span>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('')}
        </div>

        <p class="experience-linkedin" data-aos="fade-up">
            <a href="${CONFIG.social.linkedin || '#'}" target="_blank" rel="noopener noreferrer">
                Más en LinkedIn
                <span aria-hidden="true">→</span>
            </a>
        </p>
    `;
}

// ====================================
// CONTACT SECTION
// ====================================
function renderContact() {
    const contactContent = document.getElementById('contact-content');
    if (!contactContent) return;

    contactContent.innerHTML = `
        <div class="contact-grid">
            <form
                class="contact-form"
                id="contact-form"
                action="https://formsubmit.co/${CONFIG.personal.email}"
                method="POST"
                data-aos="fade-right"
            >
                <input type="hidden" name="_subject" value="Nuevo mensaje desde Portfolio">
                <input type="hidden" name="_captcha" value="false">
                <input type="hidden" name="_next" value="${window.location.href}#contact">

                <div class="form-group">
                    <label for="name">Nombre *</label>
                    <input type="text" id="name" name="name" required>
                </div>

                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required>
                </div>

                <div class="form-group">
                    <label for="subject">Asunto</label>
                    <input type="text" id="subject" name="subject">
                </div>

                <div class="form-group">
                    <label for="message">Mensaje *</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>

                <button type="submit" class="btn btn-submit">Enviar mensaje</button>
            </form>

            <div class="contact-info" data-aos="fade-left">
                <div class="contact-info-item">
                    <span class="contact-icon">📧</span>
                    <div class="contact-details">
                        <h4>Email</h4>
                        <a href="mailto:${CONFIG.personal.email}">${CONFIG.personal.email}</a>
                    </div>
                </div>

                ${CONFIG.personal.phone ? `
                <div class="contact-info-item">
                    <span class="contact-icon">📱</span>
                    <div class="contact-details">
                        <h4>Teléfono</h4>
                        <a href="tel:${CONFIG.personal.phone}">${CONFIG.personal.phone}</a>
                    </div>
                </div>` : ''}

                <div class="contact-info-item">
                    <span class="contact-icon">📍</span>
                    <div class="contact-details">
                        <h4>Ubicación</h4>
                        <p>${CONFIG.personal.location}</p>
                    </div>
                </div>

                <div class="contact-social">
                    <h4>Sígueme</h4>
                    <div class="social-links">
                        ${Object.entries(CONFIG.social)
                            .filter(([platform, value]) => value && platform !== 'github')
                            .map(([platform, url]) => `
                                <a href="${url}" target="_blank" rel="noopener noreferrer" class="social-link" title="${platform}">
                                    ${getSocialIcon(platform)}
                                </a>
                            `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getSocialIcon(platform) {
    const icons = {
        github: '⚡',
        linkedin: '💼',
        twitter: '🐦',
        instagram: '📷'
    };
    return icons[platform] || '🔗';
}

// ====================================
// FOOTER
// ====================================
function renderFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;

    const currentYear = new Date().getFullYear();

    footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>${CONFIG.personal.name}</h4>
                    <p>${CONFIG.personal.title}</p>
                    <p style="margin-top: 0.5rem; color: var(--color-text-secondary); font-size: 0.95rem;">
                        ${CONFIG.personal.location}
                    </p>
                </div>

                <div class="footer-section">
                    <h4>Navegación</h4>
                    <ul class="footer-links">
                        <li><a href="#home">Inicio</a></li>
                        <li><a href="#about">Sobre mí</a></li>
                        <li><a href="#experience">Experiencia</a></li>
                        <li><a href="#contact">Contacto</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h4>Contacto rápido</h4>
                    <ul class="footer-links">
                        <li><a href="mailto:${CONFIG.personal.email}">${CONFIG.personal.email}</a></li>
                        ${CONFIG.personal.phone ? `<li><a href="tel:${CONFIG.personal.phone}">${CONFIG.personal.phone}</a></li>` : ''}
                    </ul>
                </div>

                <div class="footer-section">
                    <h4>Sígueme</h4>
                    <div class="social-links">
                        ${Object.entries(CONFIG.social)
                            .filter(([platform, value]) => value && platform !== 'github')
                            .map(([platform, url]) => `
                                <a href="${url}" target="_blank" rel="noopener noreferrer" class="social-link" title="${platform}">
                                    ${getSocialIcon(platform)}
                                </a>
                            `).join('')}
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; ${currentYear} ${CONFIG.personal.name}. Todos los derechos reservados.</p>
                <p>Diseñado y desarrollado con intención</p>
            </div>
        </div>
    `;
}


// ====================================
// SCROLL PROGRESS BAR
// ====================================
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
        progressBar.style.width = scrolled + '%';
    });
}

// ====================================
// BACK TO TOP BUTTON
// ====================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
