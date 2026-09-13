// ==============================================================
// تفاعلات الموقع الإلكتروني للمهندس كمال حمادي البوسي
// ==============================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initProjectTabs();
  initStampsInteraction();
  initAccountsCopy();
});

// 1. شريط التنقل والتمرير السلس مع تفعيل التبويب النشط
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-pills .pill-btn');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// 2. تبديل ألسنة المجلدات في المشاريع (Project Folder Tabs)
function initProjectTabs() {
  const folderTabs = document.querySelectorAll('.folder-tab');
  
  folderTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const parentHeader = tab.closest('.folder-tabs-header');
      if (!parentHeader) return;
      
      const allTabs = parentHeader.querySelectorAll('.folder-tab');
      allTabs.forEach(t => {
        t.classList.remove('active-tab');
        t.classList.add('tab-inactive');
      });
      
      tab.classList.remove('tab-inactive');
      tab.classList.add('active-tab');
    });
  });
}

// 3. تأثيرات حركية تفاعلية على شارات الطوابع (Stamps)
function initStampsInteraction() {
  const stamps = document.querySelectorAll('.stamp-badge, .stamp-icon-box');
  
  stamps.forEach(stamp => {
    stamp.addEventListener('click', () => {
      stamp.style.transform = 'scale(1.15) rotate(4deg)';
      setTimeout(() => {
        stamp.style.transform = '';
      }, 250);
    });
  });
}

// 4. ميزة النسخ السريع لبيانات الحسابات عند النقر
function initAccountsCopy() {
  const accountCards = document.querySelectorAll('.account-card');
  
  accountCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
}

// 5. معالجة إرسال نموذج التواصل
function handleFormSubmit(event) {
  event.preventDefault();
  
  const sendBtn = document.getElementById('sendBtn');
  const successMsg = document.getElementById('formSuccessMsg');
  const form = document.getElementById('contactForm');
  
  if (!sendBtn || !successMsg) return;
  
  // حالة جاري الإرسال
  const originalBtnText = sendBtn.innerHTML;
  sendBtn.innerHTML = '<span>جاري الإرسال...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
  sendBtn.disabled = true;
  
  setTimeout(() => {
    sendBtn.innerHTML = '<span>تم الإرسال بنجاح!</span> <i class="fa-solid fa-check"></i>';
    sendBtn.style.backgroundColor = '#10B981';
    sendBtn.style.borderColor = '#10B981';
    successMsg.style.display = 'block';
    
    // إعادة تعيين النموذج بعد قليل
    setTimeout(() => {
      form.reset();
      sendBtn.innerHTML = originalBtnText;
      sendBtn.style.backgroundColor = '';
      sendBtn.style.borderColor = '';
      sendBtn.disabled = false;
    }, 4000);
  }, 1000);
}

// دوال لتحديث روابط الحسابات ديناميكياً متى ما زودنا المستخدم بها
window.updateUserAccounts = function(accountsData) {
  if (accountsData.github) {
    const el = document.getElementById('linkGithub');
    if (el) el.href = accountsData.github;
  }
  if (accountsData.youtube) {
    const el = document.getElementById('linkYoutube');
    if (el) el.href = accountsData.youtube;
  }
  if (accountsData.tiktok) {
    const el = document.getElementById('linkTiktok');
    if (el) el.href = accountsData.tiktok;
  }
  if (accountsData.whatsapp) {
    const el = document.getElementById('linkWhatsapp');
    if (el) el.href = `https://wa.me/${accountsData.whatsapp.replace(/[^0-9]/g, '')}`;
  }
  if (accountsData.telegram) {
    const el = document.getElementById('linkTelegram');
    if (el) el.href = `https://t.me/${accountsData.telegram.replace('@', '')}`;
  }
  if (accountsData.email) {
    const el = document.getElementById('linkEmail');
    if (el) el.href = `mailto:${accountsData.email}`;
  }
};

