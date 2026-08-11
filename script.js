/**
 * ===================================
 * مركز الأمير للتكييف - Main JavaScript
 * SEO Optimized | PWA Ready | AI Search
 * Developer: المهندس محمد حماد
 * ===================================
 */

// ===================================
// DOM Content Loaded
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMobileMenu();
    initHeroSlider();
    initScrollAnimations();
    initCounterAnimation();
    initPortfolioFilter();
    initContactForms();
    initBackToTop();
    initFAQAccordion();
    initAISearch();
    initPWAInstall();
    
    console.log('%c ❤️ مركز الأمير للتكييف | برمجة وتطوير: المهندس محمد حماد ', 
        'background: #0e4d64; color: white; padding: 12px 25px; border-radius: 8px; font-size: 14px; font-weight: bold;');
});

// ===================================
// Navbar Scroll Effect
// ===================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===================================
// Mobile Menu Toggle
// ===================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        const isOpen = navLinks.classList.contains('active');
        this.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===================================
// Hero Slider with Auto-play
// ===================================
function initHeroSlider() {
    const slider = document.getElementById('heroSlider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.hero-slide');
    const dots = slider.querySelectorAll('.slider-dot');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    
    let currentSlide = 0;
    let slideInterval;
    const totalSlides = slides.length;
    
    function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => {
            dot.classList.remove('active');
            dot.setAttribute('aria-selected', 'false');
        });
        
        currentSlide = (index + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        dots[currentSlide].setAttribute('aria-selected', 'true');
    }
    
    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }
    
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(slideInterval);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoPlay(); nextSlide(); startAutoPlay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoPlay(); prevSlide(); startAutoPlay(); });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(index);
            startAutoPlay();
        });
    });
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });
    
    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) nextSlide(); // Swipe left
            else prevSlide(); // Swipe right
        }
    }
    
    // Start auto-play
    startAutoPlay();
}

// ===================================
// AI Search with Knowledge Base
// ===================================
function initAISearch() {
    const aiBtn = document.getElementById('aiSearchBtn');
    const panel = document.getElementById('aiSearchPanel');
    const form = document.getElementById('aiSearchForm');
    const input = document.getElementById('aiSearchInput');
    const results = document.getElementById('aiSearchResults');
    const suggestions = document.querySelectorAll('.suggestion-tag');
    
    if (!aiBtn || !panel) return;
    
    // Toggle panel
    aiBtn.addEventListener('click', () => {
        panel.classList.toggle('active');
        panel.setAttribute('aria-hidden', !panel.classList.contains('active'));
        if (panel.classList.contains('active')) {
            input.focus();
        }
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && !aiBtn.contains(e.target)) {
            panel.classList.remove('active');
            panel.setAttribute('aria-hidden', 'true');
        }
    });
    
    // Knowledge Base for AI Search
    const knowledgeBase = {
        'أسعار': {
            answer: 'أسعارنا تنافسة ومتناسب مع جودة عالية! 💰\n\n• تنظيف تكييف سبليت: من 150 ج.م\n• صيانة تكييف شاملة: من 200 ج.م\n• تركيب تكييف جديد: حسب نوع التكييف\n• صيانة ثلاجة/غسالة: من 200 ج.م\n\n📞 للحصول على سعر دقيق، اتصل بنا على: 01027834901',
            link: 'contact.html'
        },
        'سعر': {
            answer: knowledgeBase['أسعار'].answer,
            link: 'contact.html'
        },
        'مناطق': {
            answer: 'نغطي خدماتنا تشمل 4 محافظات رئيسية: 🗺️\n\n✅ **محافظة الدقهلية**\n   المنزلة، دمياط الجديدة، السنبلاوين، المنصورة،Mit Ghamr، بنها\n\n✅ **محافظة دمياط**\n   دمياط، راس البر، كفر البطيخ\n\n✅ **محافظة بورسعيد**\n   بورسعيد، العاشر من رمضان، بورفؤاد\n\n✅ **محافظة الشرقية**\n   الزقازيق، أبو حماد، بلبيس، منيا القمح',
            link: 'contact.html#areas'
        },
        'منطقة': {
            answer: knowledgeBase['مناطق'].answer,
            link: 'contact.html#areas'
        },
        'ماركات': {
            answer: 'نصلح جميع الماركات العالمية! 🌟\n\n**ماركات التكييف:**\nشارب، تورنيدو، سامسونج، كاريير، ال جي، توشيبا، زانوسي، ايديال، وايت ويل، كريازي، يونيون اير، بيكو، بوش، فريش، أوشن، أريستون، الكتروستار، هاير، هيتاشي\n\n**الأجهزة المنزلية:**\nنوفروت، إل جي، سامسونج، توشيبا، زيروكس، وغيرها',
            link: 'services.html#brands'
        },
        'ماركة': {
            answer: knowledgeBase['ماركات'].answer,
            link: 'services.html#brands'
        },
        'موعد': {
            answer: 'نحن نلتزم بالمواعيد! 🕠\n\n**ساعات العمل:**\n• السبت - الأربعاء: 8:00 ص - 10:00 م\n• الخميس: 8:00 ص - 11:00 م\n• الجمعة: 2:00 م - 10:00 م\n\n⚡ **الصيانة العاجلة:** متاحة 24/7!\n\n**وقت الاستجابة:**\n• عادي: خلال 24 ساعة\n• طوارئ: في أقرب وقت ممكن',
            link: 'contact.html'
        },
        'موعد الصيانة': {
            answer: knowledgeBase['موعد'].answer,
            link: 'contact.html'
        },
        'طوارئ': {
            answer: 'خدمة الطوارئ متاحة 24 ساعة! 🚨\n\nلحالات الطوارئ (تكييف معطل، تسريب مياه، etc.):\n\n📞 **اتصل مباشرة:** 01027834901\n💬 **أو واتساب:** wa.me/201027834901\n\nسنصل إليك في أسرع وقت ممكن!',
            link: 'tel:+201027834901'
        },
        'عنوان': {
            answer: 'عنواننا: 📍\n\n**مركز الأمير للتكييف وصيانة الأجهزة المنزلية**\n\nشارع حسن طوبار\nالمنزلة، الدقهلية\nمصر\n\n🗺️ [الحصول على الاتجاهات](contact.html)',
            link: 'contact.html'
        },
        'هاتف': {
            answer: 'أرقام التواصل: 📞\n\n**الهاتف:** 01027834901\n**واتساب:** wa.me/201027834901\n**البريد:** mohammedfarid.alamir@icloud.com\n\n📱 [اتصل الآن](tel:+201027834901)',
            link: 'tel:+201027834901'
        },
        'تنظيف': {
            answer: 'خدمة تنظيف التكييفات الاحترافية! ❄️\n\n**ما يشمل التنظيف:**\n✓ فك وتنظيف الفلاتر بالكامل\n✓ تنظيف المبادل الحراري\n✓ تعقيم الوحدة بمادة مضادة للبكتيريا\n✓ تنظيف مجرى تصريف المياه\n✓ تنظيف الوحدة الخارجية\n✓ فحص وتشغيل الجهاز\n\n**الفوائد:**\n• هواء أنقى وأكثر صحة\n• توفير حتى 30% في استهلاك الكهرباء\n• إطالة عمر التكييف\n\n💰 السعر يبدأ من 150 ج.م',
            link: 'services.html#ac-cleaning'
        },
        'تركيب': {
            answer: 'خدمة تركيب التكييفات الاحترافية! 🔧\n\n**أنواع التكييفات التي نركبها:**\n• سبليت (Split)\n• شباك (Window)\n• مركزي (Central)\n• صناعي (Commercial)\n\n**ما يشمل التركيب:**\n✓ تركيب الوحدة الداخلية والخارجية\n✓ تمديد وتوصيل المواسير\n✓ شحن الغاز (الفريون)\n✓ اختبار التشغيل والضبط\n✓ ضمان على التركيب\n\n📞 احصل على عرض سعر مجاني!',
            link: 'services.html#ac-installation'
        },
        'ضمان': {
            answer: 'نقدم ضمان حقيقي على جميع أعمالنا! ✅\n\n**مدة الضمان:**\n• تنظيف تكييف: شهر واحد\n• صيانة بسيطة: 3 أشهر\n• استبدال قطع: حسب القطعة\n• تركيب: سنة كاملة\n\n**شروط الضمان:**\n✓ يجب عدم التعديل على الجهاز\n✓ المشكلة نفسها التي تم إصلاحها\n✓ الإيصال بالفاتورة الأصلية',
            link: 'about.html'
        },
        'default': {
            answer: 'شكراً لسؤالك! 😊\n\nيمكنني مساعدتك في:\n\n• 📋 **الخدمات**: صيانة، تنظيف، تركيب\n• 🏭 **الماركات**: جميع الماركات العالمية\n• 📍 **المناطق**: الدقهلية، دمياط، بورسعيد، الشرقية\n• ⏰ **المواعيد**: ساعات العمل والاستجابة\n• 💰 **الأسعار**: أسعار تنافسة\n\n❓ اسألني عن أي شيء محدد لأحصل لك على إجابة أفضل!\n\n📞 أو اتصل مباشرة: 01027834901',
            link: 'contact.html'
        }
    };
    
    // Form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = input.value.trim().toLowerCase();
        
        if (!query) {
            showNotification('يرجى كتابة سؤالك', 'warning');
            return;
        }
        
        // Search in knowledge base
        let result = null;
        for (const [key, value] of Object.entries(knowledgeBase)) {
            if (query.includes(key)) {
                result = value;
                break;
            }
        }
        
        if (!result) result = knowledgeBase['default'];
        
        // Display result
        results.innerHTML = `
            <div class="ai-result">
                <div class="ai-result-header">
                    <i class="fas fa-robot"></i>
                    <span>إجابة الذكاء الاصطناعي</span>
                </div>
                <div class="ai-result-body">${formatAnswer(result.answer)}</div>
                <a href="${result.link}" class="ai-result-link">المزيد من التفاصيل <i class="fas fa-arrow-left"></i></a>
            </div>
        `;
        results.classList.add('show');
        
        // Add styles if not exists
        if (!document.getElementById('ai-search-styles')) {
            addAISearchStyles();
        }
    });
    
    // Suggestion tags
    suggestions.forEach(tag => {
        tag.addEventListener('click', () => {
            input.value = tag.dataset.query;
            form.dispatchEvent(new Event('submit'));
        });
    });
    
    function formatAnswer(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/•/g, '<i class="fas fa-check" style="color: var(--success); margin-left: 5px;"></i>')
            .replace(/\n/g, '<br>');
    }
    
    function addAISearchStyles() {
        const style = document.createElement('style');
        style.id = 'ai-search-styles';
        style.textContent = `
            .ai-result { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
            .ai-result-header { display: flex; align-items: center; gap: 10px; padding: 15px; background: var(--gradient-cool); color: white; font-weight: 700; font-size: 14px; }
            .ai-result-body { padding: 18px; font-size: 14px; line-height: 1.9; color: var(--text-color); }
            .ai-result-link { display: inline-flex; align-items: center; gap: 6px; padding: 12px 20px; margin: 15px; background: var(--primary-color); color: white; border-radius: 25px; font-size: 13px; font-weight: 600; text-decoration: none; transition: transform 0.3s; }
            .ai-result-link:hover { transform: translateX(-5px); }
        `;
        document.head.appendChild(style);
    }
}

// ===================================
// Scroll Animations
// ===================================
function initScrollAnimations() {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                
                if (entry.target.closest('.services-grid')) {
                    entry.target.closest('.services-grid').querySelectorAll('.service-card')
                        .forEach((card, i) => setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, i * 100));
                }
                
                if (entry.target.closest('.portfolio-grid-page')) {
                    entry.target.closest('.portfolio-grid-page').querySelectorAll('.portfolio-item-page:not(.hidden)')
                        .forEach((item, i) => setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, i * 100));
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section, .stats-section, .pricing-card, .testimonial-card, .info-card, .faq-item, .area-card, .brand-item')
        .forEach(el => observer.observe(el));
    
    // Initial state for animated elements
    document.querySelectorAll('.service-card, .portfolio-item-page, .stat-card, .pricing-card, .testimonial-card, .info-card, .faq-item, .area-card, .brand-item')
        .forEach(el => {
            el.style.opacity = '0';
            el.style.transform = el.classList.contains('portfolio-item-page') ? 'scale(0.95)' : 'translateY(20px)';
            el.style.transition = 'all 0.5s ease';
        });
}

// ===================================
// Counter Animation
// ===================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    let animated = false;
    
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString('ar-EG');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString('ar-EG') + '+';
                }
            };
            
            updateCounter();
        });
    };
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.3 }).observe(statsSection);
    }
}

// ===================================
// Portfolio Filter
// ===================================
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item-page');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.animation = 'fadeInUp 0.5s ease forwards';
                    }, index * 80);
                } else {
                    item.classList.add('hidden');
                    item.style.animation = '';
                }
            });
        });
    });
}

// ===================================
// Contact Forms
// ===================================
function initContactForms() {
    const mainForm = document.getElementById('contactFormPage');
    
    if (mainForm) {
        mainForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Newsletter forms
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                showNotification('تم الاشتراك بنجاح! 🎉', 'success');
                emailInput.value = '';
            } else {
                showNotification('يرجى إدخال البريد الإلكتروني', 'error');
            }
        });
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    
    if (!data.name || !data.phone || !data.message) {
        showNotification('يرجى ملء جميع الحقول المطلوبة (*)', 'error');
        return;
    }
    
    if (!/^[\d\s\+]{10,15}$/.test(data.phone.replace(/\s/g, ''))) {
        showNotification('يرجى إدخال رقم هاتف صحيح', 'error');
        return;
    }
    
    if (data.email && data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
        return;
    }
    
    const btn = form.querySelector('.btn-submit-page');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>جاري الإرسال...</span>';
    btn.disabled = true;
    
    setTimeout(() => {
        showNotification('تم إرسال رسالتك بنجاح! ✅ سنتواصل معك قريباً.', 'success');
        form.reset();
        btn.innerHTML = originalHTML;
        btn.disabled = false;
    }, 2000);
}

// ===================================
// FAQ Accordion
// ===================================
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });
}

// ===================================
// Back to Top Button
// ===================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===================================
// PWA Install Prompt
// ===================================
let deferredPrompt;

function initPWAInstall() {
    const installBtn = document.getElementById('pwaInstallBtn');
    if (!installBtn) return;
    
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install button
        installBtn.style.display = 'flex';
        
        console.log('PWA install prompt available');
    });
    
    // Handle install button click
    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) {
            showNotification('التثبيت غير مدعوم في هذا المتصفح', 'warning');
            return;
        }
        
        // Show the install prompt
        deferredPrompt.prompt();
        
        // Wait for user response
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('PWA installed successfully');
            showNotification('تم تثبيت التطبيق بنجاح! 🎉', 'success');
            installBtn.style.display = 'none';
        } else {
            console.log('PWA installation dismissed');
        }
        
        deferredPrompt = null;
    });
    
    // Hide button if already installed
    window.addEventListener('appinstalled', () => {
        console.log('App already installed');
        installBtn.style.display = 'none';
    });
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = { success: 'check-circle', error: 'exclamation-circle', warning: 'exclamation-triangle', info: 'info-circle' };
    
    notification.innerHTML = `
        <i class="fas fa-${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '90px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : type === 'warning' ? '#f39c12' : '#3498db',
        color: 'white',
        padding: '15px 28px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontFamily: 'Cairo, sans-serif',
        fontSize: '15px',
        fontWeight: '600',
        boxShadow: '0 10px 35px rgba(0,0,0,0.2)',
        zIndex: '99999',
        maxWidth: '90%',
        animation: 'slideDown 0.4s ease forwards'
    });
    
    if (!document.getElementById('notif-styles')) {
        const style = document.createElement('style');
        style.id = 'notif-styles';
        style.textContent = `
            @keyframes slideDown { from { opacity: 0; transform: translateX(-50%) translateY(-20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
            @keyframes slideUp { from { opacity: 1; transform: translateX(-50%) translateY(0); } to { opacity: 0; transform: translateX(-50%) translateY(-20px); } }
            @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = document.getElementById('navbar')?.offsetHeight || 70;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });
});

// ===================================
// Parallax Effect
// ===================================
window.addEventListener('scroll', () => {
    document.querySelectorAll('.shape').forEach((shape, i) => {
        shape.style.transform = `translateY(${window.scrollY * ((i + 1) * 0.05)}px)`;
    });
});

// ===================================
// Image Hover Effects
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.animated-image-container').forEach(container => {
        container.addEventListener('mouseenter', () => {
            container.querySelector('.animated-image')?.style.setProperty('transform', 'scale(1.05)');
        });
        container.addEventListener('mouseleave', () => {
            container.querySelector('.animated-image')?.style.setProperty('transform', '');
        });
    });
});

// ===================================
// Console Easter Egg
// ===================================
console.log(`
%c   
   ♥ ♥ ♥
 ♥     ♥
♥       ♥
 ♥     ♥
   ♥ ♥ ♥

مركز الأمير للتكييف وصيانة الأجهزة المنزلية
تحت إدارة: مهندس محمد الأمير

برمجة وتطوير ❤️ المهندس محمد حماد
Facebook: https://www.facebook.com/en.mohamed.nasr
WhatsApp: wa.me/201279934735
`, 'color: #17a2b8; font-size: 13px; font-weight: bold;');
