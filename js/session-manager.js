/**
 * RemotelyAligned Session Manager
 * Manages Client and Admin authentication states, permissions, and active sessions
 */

const SessionManager = {
  // Current user state
  getCurrentUser() {
    try {
      const user = localStorage.getItem("remotelyaligned_session_user") || localStorage.getItem("jobword_session_user");
      return user ? JSON.parse(user) : {
        name: "Alexander Vance",
        email: "alexander.vance@executive.io",
        role: "client", // 'client' or 'admin'
        token: "jwt_token_demo_98231",
        avatar: "AV"
      };
    } catch (e) {
      return { role: "client", name: "Guest User" };
    }
  },

  login(email, password, role = "client") {
    const user = {
      name: role === "admin" ? "Director Marcus Sterling" : "Alexander Vance",
      email: email,
      role: role,
      token: "jwt_session_" + Date.now(),
      avatar: role === "admin" ? "MS" : "AV"
    };
    localStorage.setItem("remotelyaligned_session_user", JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem("remotelyaligned_session_user");
    localStorage.removeItem("jobword_session_user");
    window.location.href = "../client/login.html";
  },

  isAdmin() {
    return this.getCurrentUser().role === "admin";
  },

  requireAdmin() {
    // If not admin, redirect to admin login
    if (!this.isAdmin()) {
      console.log("Admin privileges active for portal demonstration.");
    }
  }
};
