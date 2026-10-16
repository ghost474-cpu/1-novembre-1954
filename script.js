document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('infoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.getElementById('closeModal');

    // ربط عناوين النوافذ بمسارات ملفات النصوص الخارجية (.txt)
    const data = {
        start: {
            title: "Le Déclenchement de la Révolution",
            file: "All.txt"
        },
        about: {
            title: "À Propos du 1er Novembre",
            file: "start.txt"
        },
        heroes: {
            title: "Les Héros de la Révolution",
            file: "heroes.txt"
        },
        oran: {
            title: "Wilaya V - L'Oranie (Oran)",
            file: "Oran.txt"
        },
        alger: {
            title: "Wilaya IV - Alger / Algérois",
            file: "Alger.txt"
        },
        kabylie: {
            title: "Wilaya III - La Kabylie",
            file: "Kabile.txt"
        },
        constantine: {
            title: "Wilaya II - Nord-Constantinois",
            file: "Constantine.txt"
        },
        aures: {
            title: "Wilaya I - Les Aurès",
            file: "Aures.txt"
        },
        chronology: {
            title: "Chronologie de la Révolution",
            file: "heroes.txt"
        },
        credit: {
            title: "Conditions Générales d'Utilisation et Mentions Légales",
            file: "condition.txt"
        },
        contact: {
            title: "Contactez-Nous / Support",
            file: "contact.txt"
        }
    };

    // دالة جلب النص ديناميكياً من ملف الـ txt وإظهار النافذة
async function showModal(key) {
    if (data[key]) {
        modalTitle.textContent = data[key].title;
        modalContent.innerHTML = "Chargement en cours...";
        modal.classList.add('active');

        try {
            const response = await fetch(data[key].file);
            if (!response.ok) throw new Error("Fichier introuvable");
            const text = await response.text();

            // معالجة السطور وتحويلها إلى عناصر HTML منسقة
            const lines = text.split('\n');
            let htmlOutput = '';
            let inList = false;
            let listType = 'ul'; // 'ul' للقوائم المنقطة أو 'ol' للقوائم المرقّمة

            lines.forEach(line => {
                const trimmed = line.trim();
                if (!trimmed) return;

                // التحقق مما إذا كان السطر يبدأ برقم (قائمة مرقّمة)
                const isOrdered = /^\d+[\.\)]\s+/.test(trimmed);
                // التحقق مما إذا كان السطر يبدأ بنقطة أو مطة (قائمة منقطة)
                const isUnordered = /^[\-\*•]\s+/.test(trimmed);

                if (isOrdered || isUnordered) {
                    const currentType = isOrdered ? 'ol' : 'ul';
                    const itemContent = trimmed.replace(/^(\d+[\.\)]|[\-\*•])\s+/, '');

                    if (!inList) {
                        inList = true;
                        listType = currentType;
                        htmlOutput += `<${listType} class="modal-list">`;
                    } else if (listType !== currentType) {
                        htmlOutput += `</${listType}><${currentType} class="modal-list">`;
                        listType = currentType;
                    }

                    htmlOutput += `<li>${itemContent}</li>`;
                } else {
                    if (inList) {
                        htmlOutput += `</${listType}>`;
                        inList = false;
                    }
                    htmlOutput += `<p class="modal-paragraph">${trimmed}</p>`;
                }
            });

            if (inList) {
                htmlOutput += `</${listType}>`;
            }

            modalContent.innerHTML = htmlOutput;
        } catch (error) {
            modalContent.textContent = "Erreur lors du chargement du contenu historique.";
            console.error(error);
        }
    }
}

    // دالة إخفاء النافذة
    function hideModal() {
        modal.classList.remove('active');
    }

    // أحداث الإغلاق
    if (closeModal) {
        closeModal.addEventListener('click', (e) => {
            e.stopPropagation();
            hideModal();
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    // أحداث الفتح للأزرار الرئيسية
    const startBtn = document.getElementById('startBtn');
    const aboutBtn = document.getElementById('aboutBtn');
    const heroesBtn = document.getElementById('heroesBtn');
    const quickViewBtn = document.getElementById('quickViewBtn');
    const chronology = document.getElementById('heroesBtn-2');
    const credit = document.getElementById('creditsBtn');
    const contact = document.getElementById('contactBtn');

    if (startBtn) startBtn.addEventListener('click', (e) => { e.stopPropagation(); showModal('start'); });
    if (aboutBtn) aboutBtn.addEventListener('click', (e) => { e.stopPropagation(); showModal('about'); });
    if (heroesBtn) heroesBtn.addEventListener('click', (e) => { e.stopPropagation(); showModal('heroes'); });
    if (quickViewBtn) quickViewBtn.addEventListener('click', (e) => { e.stopPropagation(); showModal('about'); });
    if (chronology) chronology.addEventListener('click', (e) => { e.stopPropagation(); showModal('chronology'); });
    if (credit) credit.addEventListener('click', (e) => { e.stopImmediatePropagation(); showModal('credit');});
    if (contact) contact.addEventListener('click', (e) => { e.stopImmediatePropagation(); showModal('contact');});


    // أحداث الفتح للـ Hotspots على الخريطة
    document.querySelectorAll('.hotspot').forEach(spot => {
        spot.addEventListener('click', (e) => {
            e.stopPropagation();
            const region = spot.getAttribute('data-region');
            showModal(region);
        });
    });

    // زر الشاشة الكاملة المتوافق مع جميع الهواتف والمتصفحات
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    function toggleFullscreen() {
        const docEl = document.documentElement;
        const isFullscreen = document.fullscreenElement || 
                             document.webkitFullscreenElement || 
                             document.mozFullScreenElement || 
                             document.msFullscreenElement;

        if (!isFullscreen) {
            if (docEl.requestFullscreen) {
                docEl.requestFullscreen();
            } else if (docEl.webkitRequestFullscreen) {
                docEl.webkitRequestFullscreen();
            } else if (docEl.mozRequestFullScreen) {
                docEl.mozRequestFullScreen();
            } else if (docEl.msRequestFullscreen) {
                docEl.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    function updateFullscreenBtnText() {
        const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
        if (fullscreenBtn) {
            fullscreenBtn.textContent = isFullscreen ? '⛶ EXIT FULLSCREEN' : '⛶ FULLSCREEN';
        }
    }

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFullscreen();
        });
    }

    document.addEventListener('fullscreenchange', updateFullscreenBtnText);
    document.addEventListener('webkitfullscreenchange', updateFullscreenBtnText);

});

// نظام تبديل الصور والوصف التلقائي (Slideshow)
const slides = document.querySelectorAll('.slideshow-container .slide');
const slideCaption = document.getElementById('slideCaption');

const captions = [
    "Moudjahidines de l'ALN dressant le drapeau algérien.",
    "Vestiges et destructions matérielles de la guerre.",
    "Foule en liesse lors des manifestations populaires.",
    "Portrait des six chefs historiques du FLN (1954).",
    "Unité de l'Armée de Libération Nationale dans le maquis.",
    "Femme et enfants devant un mur arborant le célèbre slogan de la Révolution."
];

let currentSlide = 0;
const slideInterval = 4000; // 4 ثوانٍ لكل صورة

function nextSlide() {
    if (slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
    
    if (slideCaption && captions[currentSlide]) {
        slideCaption.textContent = captions[currentSlide];
    }
}

if (slides.length > 1) {
    setInterval(nextSlide, slideInterval);
}

const heroesBtn = document.getElementById('heroesBtn-2');
const quickViewBtn = document.getElementById('quickViewBtn');

function handleScreenChange() {
    // التحقق من الشرط مرة واحدة
    if (window.innerHeight < 580) {
        // إذا كان ارتفاع الشاشة أقل من 580: أظهر العنصرين
        if (heroesBtn) heroesBtn.style.display = '';
        if (quickViewBtn) quickViewBtn.style.display = '';
    } else {
        // إذا كان ارتفاع الشاشة 580 أو أكثر: أخفِ العنصرين
        if (heroesBtn) heroesBtn.style.display = 'none';
        if (quickViewBtn) quickViewBtn.style.display = 'none';
    }
}

// مراقبة تغيير حجم الشاشة مرة واحدة فقط
window.addEventListener('resize', handleScreenChange);

// تنفيذها فوراً عند تحميل الصفحة لضبط الحالة الأولية
handleScreenChange();

// جلب رابط الصفحة الحالية والنص المراد مشاركته
const currentUrl = encodeURIComponent(window.location.href);
const shareMessage = encodeURIComponent("Découvrez cette archive interactive dédiée à la Révolution Algérienne !");

// دالة فتح نافذة المشاركة المنبثقة
function openShareWindow(shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=450,scrollbars=yes,resizable=yes');
}

// عناصر الأزرار
const shareFbBtn = document.getElementById('shareFbBtn');
const shareXBtn = document.getElementById('shareXBtn');
const shareInBtn = document.getElementById('shareInBtn');

// 1. رابط فيسبوك
if (shareFbBtn) {
    shareFbBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`);
    });
}

// 2. رابط إكس (تويتر)
if (shareXBtn) {
    shareXBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openShareWindow(`https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareMessage}`);
    });
}

// 3. رابط لينكد إن
if (shareInBtn) {
    shareInBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openShareWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`);
    });
}

// Console Academic Credit & Ownership Message
console.log(
    "%c 🇩🇿 ARCHIVE HISTORIQUE - RÉVOLUTION ALGÉRIENNE %c\n\n" +
    "%cProjet Académique & Historique — Projet Scolaire\n\n" +
    "Bonjour et bienvenue dans la console de développement !\n" +
    "Ce site web interactif a été conçu et développé entièrement par nos soins dans le cadre d'un projet scolaire/académique.\n\n" +
    "👨‍💻 Développeur principal & Designer : AMEUR HOUSSEM.\n" +
    "🤝 Co-auteurs / Collaborateurs : ZAKI, MOUADH, YOUSSEF.\n\n" +
    "📌 Objectif du projet : Créer une plateforme numérique interactive, moderne et fonctionnelle pour commémorer la mémoire de la Révolution Algérienne (1954-1962).\n" +
    "📄 Droits & Propriété : Tous les choix d'architecture, d'interface et de code source attestent de l'originalité de ce travail académique.\n\n" +
    "« Un seul héros, le peuple. »",
    
    // شريط العنوان العلوي (أخضر بنص أبيض مميز)
    "background: #006633; color: #ffffff; font-size: 13px; font-weight: bold; padding: 6px 12px; border-radius: 4px;",
    "",
    // تنسيق النص الرئيسي (رمادي فاتح وأسلوب أكاديمي منظم)
    "color: #d1d5db; font-size: 11px; line-height: 1.6; font-family: monospace;"
);