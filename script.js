document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('infoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.getElementById('closeModal');

    const data = {
        start: {
            title: "Le Déclenchement de la Révolution",
            content: "À minuit le 1er Novembre 1954, des vagues d'attaques armées coordonnées ont été déclenchées à travers l'Algérie, marquant le début officiel de la lutte armée pour l'indépendance nationale."
        },
        about: {
            title: "À Propos du 1er Novembre",
            content: "Le CRUA et le FLN ont rédigé la déclaration historique du 1er Novembre 1954 pour unir le peuple algérien autour de l'objectif suprême : la restauration de l'État algérien souverain."
        },
        heroes: {
            title: "Les Héros de la Révolution",
            content: "Hommage aux Six Chefs Historiques : Mustapha Ben Boulaïd, Didouche Mourad, Krim Belkacem, Rabah Bitat, Larbi Ben M'hidi et Mohamed Boudiaf."
        },
        oran: {
            title: "Wilaya V - L'Oranie (Oran)",
            content: "Sous la direction du martyr Larbi Ben M'hidi, la Wilaya V a joué un rôle stratégique dans l'organisation et la logistique des opérations armées dans l'ouest algérien."
        },
        alger: {
            title: "Wilaya IV - Alger / Algérois",
            content: "Placée sous la responsabilité de Rabah Bitat, la Wilaya IV constituait le cœur politique, urbain et stratégique de la Révolution."
        },
        kabylie: {
            title: "Wilaya III - La Kabylie",
            content: "Dirigée par Krim Belkacem, la Wilaya III dans le relief montagneux était parmi les zones les mieux structurées et armées dès le lancement de l'insurrection."
        },
        constantine: {
            title: "Wilaya II - Nord-Constantinois",
            content: "Commandée par Didouche Mourad puis Zighoud Youcef, c'est le théâtre des offensives historiques du 20 août 1955."
        },
        aures: {
            title: "Wilaya I - Les Aurès",
            content: "Commandée par Mustapha Ben Boulaïd, la région des Aurès est le berceau militaire où ont retenti les tout premiers coups de feu de la Révolution."
        }
    };

    // دالة إظهار النافذة باستعمال الكلاس active لدعم الانيميشن
    function showModal(key) {
        if (data[key]) {
            modalTitle.textContent = data[key].title;
            modalContent.textContent = data[key].content;
            modal.classList.add('active');
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

    if (startBtn) startBtn.addEventListener('click', (e) => { e.stopPropagation(); showModal('start'); });
    if (aboutBtn) aboutBtn.addEventListener('click', (e) => { e.stopPropagation(); showModal('about'); });
    if (heroesBtn) heroesBtn.addEventListener('click', (e) => { e.stopPropagation(); showModal('heroes'); });
    if (quickViewBtn) quickViewBtn.addEventListener('click', (e) => { e.stopPropagation(); showModal('about'); });

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
    // نحدد العنصر الرئيسي للصفحة
    const docEl = document.documentElement;
    const isFullscreen = document.fullscreenElement || 
                         document.webkitFullscreenElement || 
                         document.mozFullScreenElement || 
                         document.msFullscreenElement;

    if (!isFullscreen) {
        // دخول وضع الشاشة الكاملة
        if (docEl.requestFullscreen) {
            docEl.requestFullscreen();
        } else if (docEl.webkitRequestFullscreen) { /* Chrome, Safari, Opera */
            docEl.webkitRequestFullscreen();
        } else if (docEl.mozRequestFullScreen) { /* Firefox */
            docEl.mozRequestFullScreen();
        } else if (docEl.msRequestFullscreen) { /* IE/Edge */
            docEl.msRequestFullscreen();
        }
    } else {
        // الخروج من وضع الشاشة الكاملة
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

// الاستماع لتغير حالة الشاشة الكاملة لتحديث نص الزر بدقة
function updateFullscreenBtnText() {
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
    if (fullscreenBtn) {
        fullscreenBtn.textContent = isFullscreen ? '⛶ EXIT FULLSCREEN' : '⛶ FULLSCREEN';
    }
}

// ربط الحدثين معاً (click و touchend) لضمان العمل على الهواتف فوراً
if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFullscreen();
    });
}

// تحديث النص سواء خرج المستخدم بالزر أو بزر النظام للخروج من Fullscreen
document.addEventListener('fullscreenchange', updateFullscreenBtnText);
document.addEventListener('webkitfullscreenchange', updateFullscreenBtnText)});