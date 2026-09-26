/**
 * Loyola Model High School (Montessori Wing) - Upgraded Application Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initMobileMenu();
  initAdmissionsForm();
  initToppersModal();
  initGalleryFilter();
  initParentPortal();
  initNoticeBoard();
  initFeedbackSystem();
  initContactForm();
});

// Toast Notification Utility
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  const icon = type === 'success' ? '✓' : 'ℹ';
  toast.innerHTML = `<span style="font-weight:bold;color:var(--loyola-gold);">${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Modal helper
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

window.closeModal = closeModal;
window.openModal = openModal;

// Scroll Reveal Observer
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
}

// Mobile Menu Drawer
function initMobileMenu() {
  const trigger = document.querySelector('.menu-trigger');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');

  if (trigger && drawer) {
    trigger.addEventListener('click', () => {
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close when clicking mobile nav links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (drawer) {
        drawer.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

// Online Admissions & Fee Calculator
function initAdmissionsForm() {
  const form = document.getElementById('admission-registration-form');
  const admissionSoughtSelect = document.getElementById('admission_sought');
  const feeEstimateVal = document.getElementById('fee-estimate-val');
  const ageCriteriaVal = document.getElementById('age-criteria-val');
  const curDateInput = document.getElementById('doj');

  if (curDateInput) {
    curDateInput.value = new Date().toISOString().split('T')[0];
  }

  const feeData = {
    'Nursery': { fee: '₹ 28,000 / annum', age: '2.5 to 3.5 years as of June 2026', terms: '3 installments' },
    'pp1': { fee: '₹ 32,000 / annum', age: '3.5 to 4.5 years as of June 2026', terms: '3 installments' },
    'pp2': { fee: '₹ 34,000 / annum', age: '4.5 to 5.5 years as of June 2026', terms: '3 installments' },
    'I': { fee: '₹ 38,000 / annum', age: '5.5 to 6.5 years (CBSE Curriculum)', terms: '3 installments' },
    'II': { fee: '₹ 40,000 / annum', age: '6.5 to 7.5 years (CBSE Curriculum)', terms: '3 installments' },
    'III': { fee: '₹ 42,000 / annum', age: '7.5 to 8.5 years (CBSE Curriculum)', terms: '3 installments' },
    'IV': { fee: '₹ 44,000 / annum', age: '8.5 to 9.5 years (CBSE Curriculum)', terms: '3 installments' },
    'V': { fee: '₹ 46,000 / annum', age: '9.5 to 10.5 years (CBSE Curriculum)', terms: '3 installments' },
    'VI': { fee: '₹ 48,000 / annum', age: '10.5 to 11.5 years (CBSE Curriculum)', terms: '3 installments' },
    'VII': { fee: '₹ 50,000 / annum', age: '11.5 to 12.5 years (CBSE Curriculum)', terms: '3 installments' },
    'VIII': { fee: '₹ 52,000 / annum', age: '12.5 to 13.5 years (CBSE Curriculum)', terms: '3 installments' },
    'IX': { fee: '₹ 56,000 / annum', age: '13.5 to 14.5 years (Telangana State Board)', terms: '3 installments' },
    'X': { fee: '₹ 60,000 / annum', age: '14.5+ years (Telangana State Board SSC)', terms: '3 installments' }
  };

  if (admissionSoughtSelect) {
    admissionSoughtSelect.addEventListener('change', () => {
      const selected = admissionSoughtSelect.value;
      if (feeData[selected]) {
        if (feeEstimateVal) feeEstimateVal.textContent = feeData[selected].fee + ' (' + feeData[selected].terms + ')';
        if (ageCriteriaVal) ageCriteriaVal.textContent = feeData[selected].age;
      } else {
        if (feeEstimateVal) feeEstimateVal.textContent = 'Select a class above to calculate';
        if (ageCriteriaVal) ageCriteriaVal.textContent = 'Please choose grade';
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const fatherName = document.getElementById('father_name').value.trim();
      const motherName = document.getElementById('mother_name').value.trim();
      const dob = document.getElementById('dob').value;
      const doj = document.getElementById('doj').value;
      const aadhar = document.getElementById('aadhar').value.trim();
      const lastClass = document.getElementById('last_class').value;
      const lastSchool = document.getElementById('school').value.trim();
      const admissionSought = document.getElementById('admission_sought').value;
      const secondLanguage = document.getElementById('seconds_language').value;
      const fatherOcc = document.getElementById('father_occupation').value.trim();
      const phone1 = document.getElementById('phone').value.trim();
      const phone2 = document.getElementById('mobile_number').value.trim();
      const email = document.getElementById('email').value.trim();
      const address = document.getElementById('address') ? document.getElementById('address').value.trim() : 'Vanasthalipuram, Hyderabad';
      const transport = document.querySelector('input[name="transport"]:checked')?.value || 'No';

      if (!name || !fatherName || !admissionSought || !phone1) {
        showToast('Please fill in all mandatory fields (*)', 'info');
        return;
      }

      // Generate Unique Application Number
      const appNumber = 'LMHS-2026-' + Math.floor(1000 + Math.random() * 9000);

      const applicationData = {
        appNumber,
        name,
        fatherName,
        motherName,
        dob,
        doj,
        aadhar,
        lastClass,
        lastSchool,
        admissionSought,
        secondLanguage,
        fatherOcc,
        phone1,
        phone2,
        email,
        address,
        transport,
        submittedAt: new Date().toLocaleString()
      };

      // Save to localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('loyola_admissions') || '[]');
        stored.push(applicationData);
        localStorage.setItem('loyola_admissions', JSON.stringify(stored));
      } catch (err) {
        console.error(err);
      }

      // Render Slip Modal
      renderApplicationSlip(applicationData);
      openModal('admission-slip-modal');
      showToast(`Application ${appNumber} submitted successfully!`, 'success');
      form.reset();
    });
  }
}

function renderApplicationSlip(data) {
  const container = document.getElementById('slip-content-body');
  if (!container) return;

  container.innerHTML = `
    <div class="application-slip">
      <div class="slip-header">
        <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:8px;">
          <img src="assets/img/loyola-school-logo.jpg" alt="Logo" style="height:60px;width:60px;border-radius:50%;object-fit:cover;">
          <div>
            <h2 class="slip-title">LOYOLA MODEL HIGH SCHOOL</h2>
            <div style="font-weight:700;color:var(--loyola-gold);font-size:0.85rem;letter-spacing:0.05em;">MONTESSORI WING · ESTABLISHED 1979</div>
            <div style="font-size:0.75rem;color:#475569;">Permanently Recognized by Govt. of Telangana | Vanasthalipuram, Hyderabad – 500070</div>
          </div>
        </div>
        <div style="background:#071527;color:#fff;display:inline-block;padding:4px 16px;border-radius:4px;font-size:0.8rem;font-weight:bold;margin-top:6px;">
          PROVISIONAL ADMISSION APPLICATION 2026–2027
        </div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;background:#f1f5f9;padding:10px 16px;border-radius:6px;margin-bottom:16px;">
        <div>
          <span style="font-size:0.78rem;color:#64748b;">Application Number:</span><br>
          <strong style="font-size:1.15rem;color:#0b1f3a;font-family:monospace;">${data.appNumber}</strong>
        </div>
        <div style="text-align:right;">
          <span style="font-size:0.78rem;color:#64748b;">Date of Submission:</span><br>
          <strong style="font-size:0.9rem;color:#0b1f3a;">${data.doj || data.submittedAt}</strong>
        </div>
      </div>

      <div class="slip-grid">
        <div class="slip-row"><span class="slip-label">Student Name:</span><span class="slip-val">${data.name}</span></div>
        <div class="slip-row"><span class="slip-label">Admission Sought For:</span><span class="slip-val" style="color:#0b1f3a;font-weight:800;">Class ${data.admissionSought}</span></div>
        <div class="slip-row"><span class="slip-label">Date of Birth:</span><span class="slip-val">${data.dob}</span></div>
        <div class="slip-row"><span class="slip-label">Aadhar Card No:</span><span class="slip-val">${data.aadhar || 'Pending Submission'}</span></div>
        <div class="slip-row"><span class="slip-label">Father's Name:</span><span class="slip-val">${data.fatherName}</span></div>
        <div class="slip-row"><span class="slip-label">Father's Occupation:</span><span class="slip-val">${data.fatherOcc || 'N/A'}</span></div>
        <div class="slip-row"><span class="slip-label">Mother's Name:</span><span class="slip-val">${data.motherName || 'N/A'}</span></div>
        <div class="slip-row"><span class="slip-label">Primary Mobile:</span><span class="slip-val">${data.phone1}</span></div>
        <div class="slip-row"><span class="slip-label">Secondary Mobile:</span><span class="slip-val">${data.phone2 || 'N/A'}</span></div>
        <div class="slip-row"><span class="slip-label">Email ID:</span><span class="slip-val">${data.email || 'N/A'}</span></div>
        <div class="slip-row"><span class="slip-label">Second Language:</span><span class="slip-val">${data.secondLanguage || 'Telugu'}</span></div>
        <div class="slip-row"><span class="slip-label">Class Last Studied:</span><span class="slip-val">${data.lastClass || 'N/A'}</span></div>
        <div class="slip-row"><span class="slip-label">Previous School:</span><span class="slip-val">${data.lastSchool || 'N/A'}</span></div>
        <div class="slip-row"><span class="slip-label">School Bus Transport:</span><span class="slip-val">${data.transport}</span></div>
      </div>

      <div style="margin-top:16px;background:#fff8eb;border:1px solid #fed7aa;padding:12px;border-radius:6px;font-size:0.8rem;color:#7c2d12;">
        <strong>Instructions for Parents:</strong> Please carry this application slip along with student Birth Certificate / Transfer Certificate, 3 passport size photos, and Aadhar copy to the School Admission Desk (Vanasthalipuram) between 9:00 AM – 3:30 PM for verification and fee payment.
      </div>

      <div class="slip-stamp-box">
        <div style="font-size:0.75rem;color:#64748b;">
          Contact Admission Desk: 040-24020175 / 9347086999<br>
          Email: loyola.montessori@gmail.com
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.85rem;font-weight:700;margin-bottom:28px;">For LOYOLA MODEL HIGH SCHOOL</div>
          <div style="font-size:0.75rem;color:#64748b;border-top:1px dashed #000;padding-top:4px;">Authorized Signatory / Principal</div>
        </div>
      </div>
    </div>
  `;
}

// Print application receipt
window.printApplicationSlip = function() {
  const content = document.getElementById('slip-content-body').innerHTML;
  const printWindow = window.open('', '_blank', 'width=850,height=900');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Loyola Model High School - Admission Application 2026-27</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 20px; color: #111; }
          .application-slip { border: 2px solid #0b1f3a; padding: 24px; border-radius: 8px; }
          .slip-title { margin: 0; color: #0b1f3a; }
          .slip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 20px; font-size: 13px; margin-top: 15px; }
          .slip-row { display: flex; justify-content: space-between; border-bottom: 1px dashed #ccc; padding: 4px 0; }
          .slip-label { color: #555; font-weight: 600; }
          .slip-val { font-weight: bold; }
          .slip-stamp-box { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; padding-top: 20px; }
        </style>
      </head>
      <body>
        ${content}
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};

// Interactive Toppers Showcase & Lightbox Zoom
let currentTopperIndex = 0;
let topperZoomLevel = 1.0;
const topperImages = [
  { src: 'assets/toppers/topper-banner1.jpg', title: 'Loyola SSC Board Toppers - Exemplary Academic Performers' },
  { src: 'assets/toppers/topper-banner2.jpg', title: 'Top Scorers & 10.0 GPA Distinctions in SSC State Examination' },
  { src: 'assets/toppers/topper-banner3.jpg', title: 'Subject Wise Centum Scorers & All-Round Distinction Achievers' }
];

function initToppersModal() {
  const zoomInBtn = document.getElementById('topperZoomIn');
  const zoomOutBtn = document.getElementById('topperZoomOut');
  const zoomResetBtn = document.getElementById('topperZoomReset');
  const prevBtn = document.getElementById('topperPrev');
  const nextBtn = document.getElementById('topperNext');
  const topperImg = document.getElementById('topperZoomableImg');

  if (zoomInBtn && topperImg) {
    zoomInBtn.addEventListener('click', () => {
      if (topperZoomLevel < 2.5) {
        topperZoomLevel += 0.25;
        topperImg.style.transform = `scale(${topperZoomLevel})`;
      }
    });
  }

  if (zoomOutBtn && topperImg) {
    zoomOutBtn.addEventListener('click', () => {
      if (topperZoomLevel > 0.75) {
        topperZoomLevel -= 0.25;
        topperImg.style.transform = `scale(${topperZoomLevel})`;
      }
    });
  }

  if (zoomResetBtn && topperImg) {
    zoomResetBtn.addEventListener('click', () => {
      topperZoomLevel = 1.0;
      topperImg.style.transform = `scale(${topperZoomLevel})`;
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentTopperIndex = (currentTopperIndex - 1 + topperImages.length) % topperImages.length;
      updateTopperModalView();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentTopperIndex = (currentTopperIndex + 1) % topperImages.length;
      updateTopperModalView();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('topper-zoom-modal');
    if (modal && modal.classList.contains('active')) {
      if (e.key === 'ArrowLeft') prevBtn?.click();
      if (e.key === 'ArrowRight') nextBtn?.click();
      if (e.key === 'Escape') closeModal('topper-zoom-modal');
    }
  });
}

window.openTopperGallery = function(index) {
  currentTopperIndex = index;
  updateTopperModalView();
  openModal('topper-zoom-modal');
};

function updateTopperModalView() {
  const item = topperImages[currentTopperIndex];
  const topperImg = document.getElementById('topperZoomableImg');
  const titleEl = document.getElementById('topperModalTitle');
  const counterEl = document.getElementById('topperModalCounter');

  if (topperImg) {
    topperZoomLevel = 1.0;
    topperImg.style.transform = 'scale(1.0)';
    topperImg.src = item.src;
  }
  if (titleEl) titleEl.textContent = item.title;
  if (counterEl) counterEl.textContent = `${currentTopperIndex + 1} / ${topperImages.length}`;
}

// Photo Gallery Filtering & Lightbox
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'bg-primary', 'text-primary-foreground'));
      btn.classList.add('active', 'bg-primary', 'text-primary-foreground');

      const filter = btn.dataset.filter;
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          setTimeout(() => item.style.opacity = '1', 10);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 200);
        }
      });
    });
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('span')?.textContent || 'Loyola School Life';
      openImageLightbox(img.src, caption);
    });
  });
}

function openImageLightbox(src, caption) {
  const lightbox = document.getElementById('custom-image-lightbox');
  const lbImg = document.getElementById('lightbox-target-img');
  const lbCaption = document.getElementById('lightbox-target-caption');

  if (lightbox && lbImg) {
    lbImg.src = src;
    if (lbCaption) lbCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

window.closeLightbox = function() {
  const lightbox = document.getElementById('custom-image-lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// Parent Portal Simulation
function initParentPortal() {
  const tabs = document.querySelectorAll('.portal-tab-btn');
  const contents = document.querySelectorAll('.portal-tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active', 'border-b-2', 'border-primary', 'font-bold', 'text-primary'));
      tab.classList.add('active', 'border-b-2', 'border-primary', 'font-bold', 'text-primary');

      const targetPane = tab.dataset.pane;
      contents.forEach(pane => {
        pane.style.display = pane.id === targetPane ? 'block' : 'none';
      });
    });
  });
}

// Notice Board & Circulars Modal
function initNoticeBoard() {
  // Notice clicks
  document.querySelectorAll('.notice-ticker-item').forEach(item => {
    item.addEventListener('click', () => {
      openModal('circulars-modal');
    });
  });
}

// Community Feedback
function initFeedbackSystem() {
  const feedbackForm = document.getElementById('community-feedback-form');
  const feedbackMarquee = document.getElementById('feedback-marquee-track');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const parentName = document.getElementById('fb-parent-name').value.trim() || 'Parent';
      const studentClass = document.getElementById('fb-student-class').value || 'Primary Wing';
      const comment = document.getElementById('fb-comment').value.trim();

      if (!comment) return;

      const p = document.createElement('div');
      p.className = 'feedback-ticker-entry';
      p.style.padding = '8px 0';
      p.style.borderBottom = '1px dashed #e2e8f0';
      p.innerHTML = `“${comment}” — <strong style="color:var(--loyola-navy);">${parentName}</strong> <small>(${studentClass})</small>`;

      if (feedbackMarquee) {
        feedbackMarquee.prepend(p);
      }

      showToast('Thank you! Your feedback has been shared with Loyola management.', 'success');
      feedbackForm.reset();
    });
  }
}

// Contact Us Form
function initContactForm() {
  const form = document.getElementById('school-contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const phone = document.getElementById('contact-phone').value.trim();
      const query = document.getElementById('contact-query').value.trim();

      if (!name || !phone) {
        showToast('Please provide your name and phone number', 'info');
        return;
      }

      showToast(`Thank you ${name}. Loyola Admissions Desk will call you at ${phone} shortly.`, 'success');
      form.reset();
    });
  }
}
