/**
 * RemotelyAligned Session Manager
 * Manages Client and Admin authentication states, permissions, route guarding, and active sessions
 */

const SessionManager = {
  SESSION_KEY: "remotelyaligned_session_user",

  // Retrieve current active user session or null if unauthenticated
  getCurrentUser() {
    try {
      const raw = localStorage.getItem(this.SESSION_KEY) || localStorage.getItem("jobword_session_user");
      if (!raw) return null;
      const user = JSON.parse(raw);
      if (user && user.isLoggedIn) {
        return user;
      }
      return null;
    } catch (e) {
      return null;
    }
  },

  isLoggedIn() {
    const user = this.getCurrentUser();
    return !!(user && user.isLoggedIn);
  },

  isAdmin() {
    const user = this.getCurrentUser();
    return !!(user && user.isLoggedIn && user.role === "admin");
  },

  // Authorize session and persist to storage
  login(email, password, role = "candidate") {
    let name = "Alexander Vance";
    let avatar = "AV";

    if (role === "admin") {
      name = "Director Marcus Sterling";
      avatar = "MS";
    } else if (email) {
      const userPart = email.split("@")[0].replace(/[._-]/g, " ");
      name = userPart.replace(/\b\w/g, l => l.toUpperCase());
      const words = name.split(" ");
      avatar = words.length > 1 ? (words[0][0] + words[1][0]).toUpperCase() : name.substring(0, 2).toUpperCase();
    }

    const user = {
      isLoggedIn: true,
      name: name,
      email: email || "alexander.vance@executive.io",
      role: role, // 'candidate', 'employer', or 'admin'
      token: "jwt_session_" + Date.now(),
      avatar: avatar,
      loggedInAt: new Date().toISOString()
    };

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    return user;
  },

  logout(redirectTarget = null) {
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem("jobword_session_user");

    const isInAdmin = window.location.pathname.includes("/admin/");
    const defaultRedirect = isInAdmin ? "../client/login.html" : "login.html";
    window.location.href = redirectTarget || defaultRedirect;
  },

  // Route guard for protected candidate / client pages (e.g. dashboard, post-job)
  requireAuth(requiredRole = null) {
    const user = this.getCurrentUser();
    const isInAdmin = window.location.pathname.includes("/admin/");
    const loginPath = isInAdmin ? "../client/login.html" : "login.html";

    if (!user || !user.isLoggedIn) {
      // Immediately stop rendering protected content
      if (document.documentElement) {
        document.documentElement.style.display = "none";
      }
      const currentUrl = encodeURIComponent(window.location.href);
      const roleParam = requiredRole ? `&role=${requiredRole}` : "";
      window.location.replace(`${loginPath}?redirect=${currentUrl}${roleParam}&reason=auth_required`);
      return false;
    }

    if (requiredRole && requiredRole === "admin" && user.role !== "admin") {
      if (document.documentElement) {
        document.documentElement.style.display = "none";
      }
      window.location.replace(`${loginPath}?role=admin&reason=admin_required`);
      return false;
    }

    return true;
  },

  // Route guard specifically for administrative console
  requireAdmin() {
    return this.requireAuth("admin");
  },

  // Synchronize dynamic headers & action buttons across public and protected pages
  syncNavbars() {
    const user = this.getCurrentUser();
    const navActions = document.querySelectorAll(".nav-actions");
    const topBarRights = document.querySelectorAll(".top-bar-right");
    const isInAdmin = window.location.pathname.includes("/admin/");

    // Handle .nav-actions
    navActions.forEach(container => {
      if (!user || !user.isLoggedIn) {
        // Unauthenticated view
        container.innerHTML = `
          <a href="${isInAdmin ? '../client/login.html' : 'login.html'}" class="btn btn-outline btn-sm">Sign In</a>
          <a href="${isInAdmin ? '../client/login.html?redirect=post-job.html&role=employer' : 'login.html?redirect=post-job.html&role=employer'}" class="btn btn-primary btn-sm">+ Post a Job</a>
        `;
      } else {
        // Authenticated view
        const targetDash = user.role === "admin"
          ? (isInAdmin ? "dashboard.html" : "../admin/dashboard.html")
          : (isInAdmin ? "../client/dashboard.html" : "dashboard.html");

        container.innerHTML = `
          <div class="user-nav-profile" style="display: flex; align-items: center; gap: 0.75rem;">
            <a href="${targetDash}" class="user-nav-badge" style="display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: var(--primary-900, #0f1c3f); font-weight: 600; font-size: 0.875rem;">
              <div class="user-nav-avatar" style="width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #1e3a8a 0%, #12959f 100%); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; box-shadow: 0 2px 6px rgba(18, 149, 159, 0.3);">
                ${user.avatar}
              </div>
              <span class="user-nav-name" style="max-width: 130px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${user.name}</span>
            </a>
            <button type="button" class="btn btn-outline btn-sm logout-btn" onclick="SessionManager.logout()" style="padding: 0.3rem 0.65rem; font-size: 0.775rem;">
              Sign Out
            </button>
          </div>
        `;
      }
    });

    // Handle top-bar links
    topBarRights.forEach(bar => {
      if (!user || !user.isLoggedIn) {
        bar.innerHTML = `
          <a href="${isInAdmin ? '../client/login.html?redirect=post-job.html&role=employer' : 'login.html?redirect=post-job.html&role=employer'}">For Employers</a>
          <a href="${isInAdmin ? '../client/login.html?redirect=dashboard.html' : 'login.html?redirect=dashboard.html'}">Candidate Portal</a>
          <a href="${isInAdmin ? '../client/login.html?role=admin' : 'login.html?role=admin'}" style="color: #60a5fa; font-weight: 700;">⚙ Admin Console</a>
          <a href="${isInAdmin ? '../client/login.html' : 'login.html'}">Sign In</a>
        `;
      } else {
        const isAdm = user.role === "admin";
        bar.innerHTML = `
          <span>Signed in as <strong>${user.name}</strong> (${user.role.toUpperCase()})</span>
          ${isAdm ? `<a href="${isInAdmin ? 'dashboard.html' : '../admin/dashboard.html'}" style="color: #60a5fa; font-weight: 700;">Admin Dashboard</a>` : `<a href="${isInAdmin ? '../client/dashboard.html' : 'dashboard.html'}">Candidate Dashboard</a>`}
          <a href="#" onclick="event.preventDefault(); SessionManager.logout();" style="color: #f87171;">Sign Out</a>
        `;
      }
    });

    // Handle public menu "Dashboard" link behavior
    const menuLinks = document.querySelectorAll(".nav-menu a");
    menuLinks.forEach(link => {
      if (link.textContent.trim().toLowerCase().includes("dashboard")) {
        if (!user || !user.isLoggedIn) {
          // If not logged in, clicking dashboard leads to login
          link.href = isInAdmin ? "../client/login.html?redirect=dashboard.html" : "login.html?redirect=dashboard.html";
        }
      }
    });
  }
};

// Automatically synchronize navbars on DOM ready
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    SessionManager.syncNavbars();
  });
}
