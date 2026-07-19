// تفعيل مكتبة الأنيميشن AOS
AOS.init({
    once: true, // الأنيميشن يشتغل مرة واحدة بس لما تنزل بالماوس
    offset: 100, // يبدأ الأنيميشن قبل ما العنصر يظهر بـ 100 بيكسل
});
// إجبار الموقع على الفتح من الأعلى دائماً عند التحميل أو التحديث
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
// دالة عداد الأرقام (الخبرة والمواقع)
const counters = document.querySelectorAll('.stat-number');
let started = false; 

function startCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; 
        const increment = target / (duration / 16); 
        
        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
}

// مراقبة الشاشة لتشغيل العداد عند الوصول لقسم الإحصائيات
window.addEventListener('scroll', () => {
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos - 50 && !started) {
            startCounters();
            started = true;
        }
    }
});

// معالجة نموذج إرسال الواتساب
document.getElementById('whatsappForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    const size = document.getElementById('size').value;

    const whatsappNumber = "201121143111"; 

    const message = `مرحباً شركة اركسترا (Arkestra)، أريد حجز معاينة مجانية من فضلكم.

👤 الاسم: ${name}
📞 الهاتف: ${phone}
📍 المكان: ${location}
📏 مساحة الوحدة: ${size} متر مربع`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
});
// ==================== برمجة الماوس الفخم ====================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// حركة الماوس
window.addEventListener('mousemove', function(e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // النقطة تتحرك فوراً
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // الدائرة الخارجية تتحرك بتأخير بسيط (Animation ناعم)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// تأثير التكبير عند الوقوف على الروابط والأزرار
const interactiveElements = document.querySelectorAll('a, button, input');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hovering');
    });
});
// ==================== تأثير الزر المغناطيسي (Magnetic Button) ====================
const magnetBtn = document.querySelector('.btn');

if(magnetBtn) {
    magnetBtn.addEventListener('mousemove', function(e) {
        const position = magnetBtn.getBoundingClientRect();
        // حساب المسافة بين الماوس ومنتصف الزر
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        
        // تحريك الزر بنسبة بسيطة في اتجاه الماوس
        magnetBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px) scale(1.05)`;
    });

    magnetBtn.addEventListener('mouseleave', function(e) {
        // رجوع الزر لمكانه الطبيعي بنعومة عند ابتعاد الماوس
        magnetBtn.style.transform = 'translate(0px, 0px) scale(1)';
    });
}
// ==================== شاشة التحميل (Preloader) ====================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    // تأخير مقصود (1.8 ثانية) لإعطاء تأثير فخم قبل ظهور الموقع
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1800); 
});

// ==================== شريط تقدم التمرير (Scroll Progress) ====================
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('progressBar');
    
    // حساب المسافة التي نزلها المستخدم مقسومة على إجمالي طول الصفحة
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // تطبيق النسبة المئوية على عرض الشريط
    progressBar.style.width = scrolled + "%";
});
document.addEventListener("DOMContentLoaded", () => {
    // كود تشغيل الأسئلة الشائعة (FAQ)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // إغلاق أي سؤال آخر مفتوح
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // فتح أو إغلاق السؤال الحالي
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                // إعطاء الإجابة الطول الحقيقي بتاعها عشان تفتح
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                // إخفاء الإجابة
                answer.style.maxHeight = null;
            }
        });
    });
});
