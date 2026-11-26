/**
 * RemotelyAligned - Enterprise Job Portal Main JavaScript
 * Interactive controllers for navigation, dynamic filters, job cards, modals, and toasts
 */

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileNavigation();
  initBookmarkListeners();
  initToast();
  initHomeJobs();
  initJobsPage();
  initJobDetailPage();
  initPostJobPage();
  initDashboardPage();
  initAuthPage();
});

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(message, type = "success") {
  let toast = document.getElementById("remotelyaligned-toast") || document.getElementById("jobword-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "remotelyaligned-toast";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }

  const icon = type === "success" ? "✓" : "ℹ";
  toast.className = `toast-notice ${type} show`;
  toast.innerHTML = `<span style="font-weight: 800; color: #38bdf8;">${icon}</span> <span>${message}</span>`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

function initToast() {
  // Container will be created dynamically when showToast is invoked
}

/* ==========================================================================
   Sticky Header & Scroll Behavior
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/* ==========================================================================
   Mobile Navigation Menu Toggle
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.querySelector(".mobile-nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    const isOpen = navMenu.classList.contains("open");
    toggleBtn.setAttribute("aria-expanded", isOpen);
    toggleBtn.innerHTML = isOpen ? "✕" : "☰";
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      toggleBtn.innerHTML = "☰";
    }
  });
}

/* ==========================================================================
   Job Card HTML Generator
   ========================================================================== */
function createJobCardHTML(job) {
  const isSaved = typeof JobStorage !== "undefined" && JobStorage.isJobSaved(job.id);
  const bookmarkClass = isSaved ? "saved" : "";
  const bookmarkIcon = isSaved ? "★" : "☆";

  return `
    <div class="job-card ${job.isUrgent ? 'featured-card' : ''}" data-id="${job.id}">
      <div class="job-card-header">
        <div class="company-logo" style="background-color: ${job.logoBg}; color: #ffffff;">
          ${job.logoText}
        </div>
        <div class="job-header-info">
          <div class="job-company-name">
            ${job.company}
            ${job.isUrgent ? '<span class="badge badge-urgent">Urgent</span>' : ''}
          </div>
          <h3 class="job-title">
            <a href="job-detail.html?id=${job.id}">${job.title}</a>
          </h3>
        </div>
        <button class="bookmark-btn ${bookmarkClass}" data-job-id="${job.id}" title="Save Job" aria-label="Save Job">
          ${bookmarkIcon}
        </button>
      </div>

      <div class="job-card-meta">
        <div class="meta-item">
          <span style="color: var(--accent-blue); font-weight: bold;">📍</span>
          <span>${job.location}</span>
        </div>
        <div class="meta-item">
          <span style="color: var(--accent-blue); font-weight: bold;">💼</span>
          <span>${job.type}</span>
        </div>
        <div class="meta-item">
          <span style="color: var(--accent-blue); font-weight: bold;">⏱</span>
          <span>${job.postedDate}</span>
        </div>
      </div>

      <div class="job-card-footer">
        <div class="job-tags">
          <span class="badge badge-fulltime">${job.categoryName}</span>
          <span class="badge badge-${job.badgeType}">${job.experience}</span>
        </div>
        <div class="job-salary">
          ${job.salaryDisplay}
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   Bookmark / Save Job Event Delegation
   ========================================================================== */
function initBookmarkListeners() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".bookmark-btn");
    if (!btn) return;
    e.preventDefault();

    const jobId = btn.dataset.jobId;
    if (!jobId || typeof JobStorage === "undefined") return;

    const isNowSaved = JobStorage.toggleSaveJob(jobId);
    if (isNowSaved) {
      btn.classList.add("saved");
      btn.innerHTML = "★";
      showToast("Job opportunity saved to your profile shortlist.");
    } else {
      btn.classList.remove("saved");
      btn.innerHTML = "☆";
      showToast("Job removed from saved listings.", "info");
    }

    // If on dashboard, re-render saved jobs list if applicable
    if (document.getElementById("dashboard-saved-container")) {
      renderDashboardSavedJobs();
    }
  });
}

/* ==========================================================================
   Homepage Controller
   ========================================================================== */
function initHomeJobs() {
  const container = document.getElementById("home-featured-jobs");
  if (!container || typeof JOB_DATABASE === "undefined") return;

  // Render the top 6 jobs
  const featuredJobs = JOB_DATABASE.slice(0, 6);
  container.innerHTML = featuredJobs.map(createJobCardHTML).join("");

  // Tab Filtering on Homepage
  const tabs = document.querySelectorAll(".home-job-tabs .tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const filterType = tab.dataset.filter;
      let filtered = JOB_DATABASE;
      if (filterType === "recent") {
        filtered = JOB_DATABASE.slice(0, 6);
      } else if (filterType === "remote") {
        filtered = JOB_DATABASE.filter(j => j.type === "Remote" || j.location.includes("Remote"));
      } else if (filterType === "fulltime") {
        filtered = JOB_DATABASE.filter(j => j.type === "Full Time");
      }
      container.innerHTML = filtered.map(createJobCardHTML).join("");
    });
  });
}

/* ==========================================================================
   Jobs Listing Page Controller (jobs.html)
   ========================================================================== */
function initJobsPage() {
  const container = document.getElementById("jobs-page-listing");
  if (!container || typeof JOB_DATABASE === "undefined") return;

  const searchInput = document.getElementById("filter-keyword");
  const locationInput = document.getElementById("filter-location");
  const salaryRange = document.getElementById("salary-range");
  const salaryValueDisplay = document.getElementById("salary-val-display");
  const categoryCheckboxes = document.querySelectorAll(".category-filter-checkbox");
  const typeCheckboxes = document.querySelectorAll(".type-filter-checkbox");
  const sortSelect = document.getElementById("sort-select");
  const viewToggleButtons = document.querySelectorAll(".view-toggle-btn");
  const resultsCount = document.getElementById("results-count-number");
  const resetBtn = document.getElementById("reset-filters-btn");

  // Read URL query parameters for initial search keywords
  const urlParams = new URLSearchParams(window.location.search);
  const initialKeyword = urlParams.get("keyword");
  const initialCategory = urlParams.get("category");
  const initialLocation = urlParams.get("location");

  if (initialKeyword && searchInput) searchInput.value = initialKeyword;
  if (initialLocation && locationInput) locationInput.value = initialLocation;
  if (initialCategory) {
    categoryCheckboxes.forEach(cb => {
      if (cb.value === initialCategory) cb.checked = true;
    });
  }

  function applyFilters() {
    const keyword = (searchInput ? searchInput.value : "").trim().toLowerCase();
    const locationVal = (locationInput ? locationInput.value : "").trim().toLowerCase();
    const minSalary = salaryRange ? parseInt(salaryRange.value, 10) : 0;

    const selectedCategories = Array.from(categoryCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    const selectedTypes = Array.from(typeCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase());

    let results = JOB_DATABASE.filter(job => {
      // Keyword match (title, company, overview)
      const matchesKeyword = !keyword ||
        job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        job.overview.toLowerCase().includes(keyword);

      // Location match
      const matchesLocation = !locationVal ||
        job.location.toLowerCase().includes(locationVal);

      // Category match
      const matchesCategory = selectedCategories.length === 0 ||
        selectedCategories.includes(job.category);

      // Job type match
      const matchesType = selectedTypes.length === 0 ||
        selectedTypes.includes(job.type.toLowerCase());

      // Salary minimum
      const matchesSalary = job.salaryMax >= minSalary;

      return matchesKeyword && matchesLocation && matchesCategory && matchesType && matchesSalary;
    });

    // Sorting
    const sortVal = sortSelect ? sortSelect.value : "newest";
    if (sortVal === "salary-high") {
      results.sort((a, b) => b.salaryMax - a.salaryMax);
    } else if (sortVal === "salary-low") {
      results.sort((a, b) => a.salaryMin - b.salaryMin);
    }

    if (resultsCount) {
      resultsCount.textContent = results.length;
    }

    if (results.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
          <div style="font-size: 2.5rem; color: var(--primary); margin-bottom: 1rem;">🔍</div>
          <h3 style="margin-bottom: 0.5rem;">No Opportunities Matching Criteria</h3>
          <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 1.5rem;">
            Try adjusting your salary threshold, removing specific category constraints, or searching with broader keywords.
          </p>
          <button id="empty-reset-btn" class="btn btn-outline">Clear All Filter Parameters</button>
        </div>
      `;
      const emptyReset = document.getElementById("empty-reset-btn");
      if (emptyReset) {
        emptyReset.addEventListener("click", resetAllFilters);
      }
    } else {
      container.innerHTML = results.map(createJobCardHTML).join("");
    }
  }

  function resetAllFilters() {
    if (searchInput) searchInput.value = "";
    if (locationInput) locationInput.value = "";
    if (salaryRange) {
      salaryRange.value = 50000;
      if (salaryValueDisplay) salaryValueDisplay.textContent = "$50k+";
    }
    categoryCheckboxes.forEach(cb => cb.checked = false);
    typeCheckboxes.forEach(cb => cb.checked = false);
    if (sortSelect) sortSelect.value = "newest";
    applyFilters();
  }

  // Event Listeners
  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (locationInput) locationInput.addEventListener("input", applyFilters);
  if (sortSelect) sortSelect.addEventListener("change", applyFilters);
  if (resetBtn) resetBtn.addEventListener("click", resetAllFilters);

  if (salaryRange && salaryValueDisplay) {
    salaryRange.addEventListener("input", () => {
      const val = parseInt(salaryRange.value, 10);
      salaryValueDisplay.textContent = `$${Math.round(val / 1000)}k+`;
      applyFilters();
    });
  }

  categoryCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
  typeCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));

  // View Mode Switcher
  viewToggleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      viewToggleButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.dataset.mode;
      if (mode === "grid") {
        container.classList.add("grid-view");
      } else {
        container.classList.remove("grid-view");
      }
    });
  });

  // Initial render
  applyFilters();
}

/* ==========================================================================
   Job Detail Page & Apply Modal Controller (job-detail.html)
   ========================================================================== */
function initJobDetailPage() {
  const detailTitle = document.getElementById("job-detail-title");
  if (!detailTitle || typeof JOB_DATABASE === "undefined") return;

  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get("id") || "job-101";

  const job = JOB_DATABASE.find(j => j.id === jobId) || JOB_DATABASE[0];

  // Populate Header
  detailTitle.textContent = job.title;
  const companyEl = document.getElementById("job-detail-company");
  if (companyEl) companyEl.textContent = job.company;

  const logoEl = document.getElementById("job-detail-logo");
  if (logoEl) {
    logoEl.textContent = job.logoText;
    logoEl.style.backgroundColor = job.logoBg;
    logoEl.style.color = "#ffffff";
  }

  const locEl = document.getElementById("job-detail-location");
  if (locEl) locEl.textContent = job.location;

  const typeEl = document.getElementById("job-detail-type");
  if (typeEl) typeEl.textContent = job.type;

  const salaryEl = document.getElementById("job-detail-salary");
  if (salaryEl) salaryEl.textContent = job.salaryDisplay;

  const dateEl = document.getElementById("job-detail-date");
  if (dateEl) dateEl.textContent = job.postedDate;

  // Overview content
  const overviewEl = document.getElementById("job-detail-overview");
  if (overviewEl) overviewEl.textContent = job.overview;

  // Responsibilities
  const respContainer = document.getElementById("job-detail-responsibilities");
  if (respContainer) {
    respContainer.innerHTML = job.responsibilities.map(r => `<li>${r}</li>`).join("");
  }

  // Requirements
  const reqContainer = document.getElementById("job-detail-requirements");
  if (reqContainer) {
    reqContainer.innerHTML = job.requirements.map(r => `<li>${r}</li>`).join("");
  }

  // Benefits
  const benContainer = document.getElementById("job-detail-benefits");
  if (benContainer) {
    benContainer.innerHTML = job.benefits.map(b => `<li>${b}</li>`).join("");
  }

  // Apply Modal Handlers
  const openModalBtn = document.getElementById("open-apply-modal-btn");
  const modal = document.getElementById("apply-job-modal");
  const closeModalBtn = document.getElementById("close-apply-modal-btn");
  const applyForm = document.getElementById("apply-job-form");

  if (openModalBtn && modal) {
    openModalBtn.addEventListener("click", () => {
      if (typeof SessionManager !== "undefined" && !SessionManager.isLoggedIn()) {
        showToast("Please sign in to submit your executive application.", "info");
        setTimeout(() => {
          const currentUrl = encodeURIComponent(window.location.href);
          window.location.href = `login.html?redirect=${currentUrl}&reason=auth_required`;
        }, 1200);
        return;
      }

      // Pre-fill user data
      if (typeof SessionManager !== "undefined") {
        const user = SessionManager.getCurrentUser();
        if (user) {
          const nameInput = document.getElementById("applicant-name");
          const emailInput = document.getElementById("applicant-email");
          if (nameInput && !nameInput.value) nameInput.value = user.name;
          if (emailInput && !emailInput.value) emailInput.value = user.email;
        }
      }

      modal.classList.add("active");
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }

  if (applyForm) {
    applyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const applicantName = document.getElementById("applicant-name").value;
      if (typeof JobStorage !== "undefined") {
        JobStorage.addApplication(job.title, job.company, applicantName);
      }
      modal.classList.remove("active");
      showToast(`Application successfully transmitted to ${job.company}!`);
      applyForm.reset();
    });
  }

  // Related jobs
  const relatedContainer = document.getElementById("related-jobs-container");
  if (relatedContainer) {
    const related = JOB_DATABASE.filter(j => j.id !== job.id).slice(0, 2);
    relatedContainer.innerHTML = related.map(createJobCardHTML).join("");
  }
}

/* ==========================================================================
   Post A Job Page (post-job.html)
   ========================================================================== */
function initPostJobPage() {
  const form = document.getElementById("post-job-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("job-post-title").value;
    const company = document.getElementById("company-name").value;

    showToast(`Vacancy "${title}" for ${company} submitted for enterprise review.`);
    setTimeout(() => {
      window.location.href = "jobs.html";
    }, 1500);
  });
}

/* ==========================================================================
   Candidate & Employer Dashboard Controller (dashboard.html)
   ========================================================================== */
function initDashboardPage() {
  const appTableBody = document.getElementById("dashboard-applications-body");
  if (!appTableBody || typeof JobStorage === "undefined") return;

  // Populate logged-in user profile info
  if (typeof SessionManager !== "undefined") {
    const user = SessionManager.getCurrentUser();
    if (user) {
      const nameEl = document.querySelector(".dashboard-user-name");
      const avatarEl = document.querySelector(".dashboard-avatar");
      const roleEl = document.querySelector(".dashboard-user-role");
      if (nameEl) nameEl.textContent = user.name;
      if (avatarEl) avatarEl.textContent = user.avatar;
      if (roleEl) roleEl.textContent = user.role === "admin" ? "System Administrator" : "Executive Talent Member";
    }
  }

  renderDashboardApplications();
  renderDashboardSavedJobs();

  // Tab controls on dashboard
  const navTabs = document.querySelectorAll(".dash-menu-link[data-tab]");
  navTabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      navTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const targetId = tab.dataset.tab;
      document.querySelectorAll(".dashboard-tab-content").forEach(c => c.style.display = "none");
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.style.display = "block";
    });
  });
}

function renderDashboardApplications() {
  const tbody = document.getElementById("dashboard-applications-body");
  if (!tbody || typeof JobStorage === "undefined") return;

  const applications = JobStorage.getApplications();
  const countEl = document.getElementById("dash-stat-applied");
  if (countEl) countEl.textContent = applications.length;

  tbody.innerHTML = applications.map(app => `
    <tr>
      <td><strong>${app.jobTitle}</strong></td>
      <td>${app.company}</td>
      <td>${app.appliedDate}</td>
      <td><span class="badge ${app.statusClass}">${app.status}</span></td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="showToast('Status request sent to HR team.', 'info')">
          Check Status
        </button>
      </td>
    </tr>
  `).join("");
}

function renderDashboardSavedJobs() {
  const container = document.getElementById("dashboard-saved-container");
  if (!container || typeof JobStorage === "undefined" || typeof JOB_DATABASE === "undefined") return;

  const savedIds = JobStorage.getSavedJobs();
  const countEl = document.getElementById("dash-stat-saved");
  if (countEl) countEl.textContent = savedIds.length;

  const savedJobs = JOB_DATABASE.filter(j => savedIds.includes(j.id));
  if (savedJobs.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); padding: 1.5rem 0;">No opportunities saved yet. Browse jobs to add listings to your shortlist.</p>`;
  } else {
    container.innerHTML = savedJobs.map(createJobCardHTML).join("");
  }
}

/* ==========================================================================
   Authentication & Route Controller (login.html)
   ========================================================================== */
function initAuthPage() {
  const authForm = document.getElementById("auth-login-form");
  if (!authForm) return;

  const urlParams = new URLSearchParams(window.location.search);
  const redirectTarget = urlParams.get("redirect");
  const requestedRole = urlParams.get("role");
  const authReason = urlParams.get("reason");

  // Display notice banner if redirected for required authentication
  const authHeader = document.querySelector(".auth-header");
  if (authHeader && authReason && !document.getElementById("auth-guard-notice")) {
    const notice = document.createElement("div");
    notice.id = "auth-guard-notice";
    notice.style.cssText = "background: #eff6ff; border: 1px solid #bfdbfe; color: #1e3a8a; border-radius: 8px; padding: 0.85rem 1rem; margin-top: 1rem; font-size: 0.875rem; text-align: left; display: flex; align-items: center; gap: 0.5rem;";
    
    if (authReason === "admin_required" || requestedRole === "admin") {
      notice.innerHTML = `<i class="bi bi-shield-lock-fill" style="font-size: 1.1rem; color: #2563eb;"></i> <span><strong>Administrator Credentials Required:</strong> Please authenticate with director credentials to enter the executive console.</span>`;
    } else {
      notice.innerHTML = `<i class="bi bi-lock-fill" style="font-size: 1.1rem; color: #2563eb;"></i> <span><strong>Restricted Access:</strong> You must sign in to view the executive dashboard, manage active applications, or post requisitions.</span>`;
    }
    authHeader.appendChild(notice);
  }

  // Pre-select role tab if specified
  const roleButtons = document.querySelectorAll(".auth-role-btn");
  let activeRole = "candidate";

  if (requestedRole) {
    activeRole = requestedRole;
    roleButtons.forEach(b => {
      b.classList.toggle("active", b.dataset.role === requestedRole);
    });
    const title = document.getElementById("auth-form-title");
    if (title) {
      if (requestedRole === "admin") title.textContent = "Executive Administrator Sign In";
      else if (requestedRole === "employer") title.textContent = "Employer Portal Login";
      else title.textContent = "Candidate Account Login";
    }
  }

  roleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      roleButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeRole = btn.dataset.role;
      const title = document.getElementById("auth-form-title");
      if (title) {
        if (activeRole === "admin") title.textContent = "Executive Administrator Sign In";
        else if (activeRole === "employer") title.textContent = "Employer Portal Login";
        else title.textContent = "Candidate Account Login";
      }

      // Populate sample credentials for convenience
      const emailInput = document.getElementById("auth-email");
      if (emailInput) {
        if (activeRole === "admin") {
          emailInput.value = "admin@remotelyaligned.com";
        } else if (activeRole === "employer") {
          emailInput.value = "recruiting@apexglobal.tech";
        } else {
          emailInput.value = "alexander.vance@executive.io";
        }
      }
    });
  });

  // Handle Form Submission
  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("auth-email").value.trim();
    const password = document.getElementById("auth-password").value;

    const user = SessionManager.login(email, password, activeRole);
    showToast(`Access granted. Welcome, ${user.name}!`);

    setTimeout(() => {
      if (redirectTarget) {
        window.location.href = decodeURIComponent(redirectTarget);
      } else if (activeRole === "admin") {
        window.location.href = "../admin/dashboard.html";
      } else {
        window.location.href = "dashboard.html";
      }
    }, 800);
  });
}
