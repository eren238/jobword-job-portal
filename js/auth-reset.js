/**
 * RemotelyAligned Auth & Password Reset Controller
 * Modeled for Executive Corporate Design System with Hostel-style Animated Alert Modal & OTP
 */

function getIconPath(name) {
  const path = window.location.pathname;
  if (path.includes('/admin/')) {
    return '../all-images/icon-images/' + name;
  }
  if (path.includes('/client/')) {
    return '../all-images/icon-images/' + name;
  }
  return 'all-images/icon-images/' + name;
}

function closeModal() {
  const alertEl = document.getElementById('alert');
  if (alertEl) {
    alertEl.classList.remove('alertModal');
  }
}

function alertModal(success, message, redirectUrl = "login.html") {
  let alertEl = document.getElementById('alert');
  if (!alertEl) {
    alertEl = document.createElement('div');
    alertEl.className = 'alert-overlay';
    alertEl.id = 'alert';
    document.body.appendChild(alertEl);
  }

  const successIcon = getIconPath("success.gif");
  const warningIcon = getIconPath("warning.gif");

  if (success === true || success === "true" || success === 1) {
    alertEl.innerHTML = `
      <div class="alert-container">
        <div class="image-wrapper">
          <img src="${successIcon}" alt="Success">
        </div>
        <h4>${message}</h4>
        <a href="${redirectUrl}">
          <button class="btn" title="Okay, Thanks" type="button">Okay, Thanks</button>
        </a>
      </div>
    `;
  } else {
    alertEl.innerHTML = `
      <div class="alert-container">
        <div class="image-wrapper">
          <img src="${warningIcon}" alt="Warning">
        </div>
        <h4>${message}</h4>
        <button onclick="closeModal()" class="btn" title="Okay" type="button">Okay</button>
      </div>
    `;
  }

  alertEl.classList.add("alertModal");
}

function forgotPasswordHandle() {
  const emailInput = document.getElementById("emailAddress");
  const emailAddress = emailInput ? emailInput.value.trim() : "";

  if (!emailAddress) {
    alertModal(false, "EMAIL ADDRESS IS REQUIRED. Please enter your corporate email to continue.");
    return;
  }

  if (!emailAddress.includes("@") || !emailAddress.includes(".")) {
    alertModal(false, "INVALID EMAIL ADDRESS. Please enter a valid email address and try again.");
    return;
  }

  const forgotBtn = document.getElementById('forgotPasswordBtnId');
  let originalBtnText = 'Proceed to Reset Password →';
  if (forgotBtn) {
    originalBtnText = forgotBtn.innerHTML;
    forgotBtn.innerHTML = 'Generating OTP...';
    forgotBtn.disabled = true;
  }

  // Generate 6-digit Reset OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Clean user name from email
  const userPart = emailAddress.split('@')[0].replace(/[._-]/g, ' ');
  const userName = userPart.replace(/\b\w/g, l => l.toUpperCase()) || "Executive";

  // Determine active role
  const activeRoleBtn = document.querySelector(".auth-role-btn.active");
  const role = activeRoleBtn ? activeRoleBtn.dataset.role : (emailAddress.includes("admin") ? "admin" : "candidate");

  const sessionPayload = {
    emailAddress: emailAddress,
    resetOtp: otpCode,
    userName: userName,
    role: role,
    timestamp: Date.now()
  };

  sessionStorage.setItem("userForgotPasswordSession", JSON.stringify(sessionPayload));

  setTimeout(() => {
    if (forgotBtn) {
      forgotBtn.innerHTML = originalBtnText;
      forgotBtn.disabled = false;
    }
    const isInAdmin = window.location.pathname.includes('/admin/');
    const redirectUrl = isInAdmin ? "reset-password.html" : "reset-password.html";
    alertModal(true, `👋 Hi, ${emailAddress} an OTP (${otpCode}) has been generated and sent to your email to reset your password.`, redirectUrl);
  }, 400);
}

function resetPasswordHandle() {
  const otpInput = document.getElementById("otpCode") || document.getElementById("resetOtp");
  const newPasswordInput = document.getElementById("newPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const emailInput = document.getElementById("emailAddress");

  const otpCode = otpInput ? otpInput.value.trim() : "";
  const newPassword = newPasswordInput ? newPasswordInput.value : "";
  const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : "";

  let emailAddress = emailInput ? emailInput.value.trim() : "";
  let storedSession = null;

  try {
    const raw = sessionStorage.getItem("userForgotPasswordSession");
    if (raw) storedSession = JSON.parse(raw);
  } catch (e) {}

  if (!emailAddress && storedSession) {
    emailAddress = storedSession.emailAddress || "";
  }

  if (!emailAddress) {
    alertModal(false, "EMAIL ADDRESS IS REQUIRED. Please enter your email address.");
    return;
  }

  if (!otpCode) {
    alertModal(false, "OTP IS REQUIRED. Please enter your 6-digit reset OTP.");
    return;
  }

  if (otpCode.length < 6) {
    alertModal(false, "OTP MUST NOT BE LESS THAN 6 DIGITS.");
    return;
  }

  if (otpCode.length > 6) {
    alertModal(false, "OTP MUST NOT BE MORE THAN 6 DIGITS.");
    return;
  }

  // Validate OTP code against stored session code
  if (storedSession && storedSession.resetOtp && storedSession.resetOtp !== otpCode) {
    alertModal(false, "INVALID RESET OTP! Kindly check the code sent to your email and try again.");
    return;
  }

  if (!newPassword) {
    alertModal(false, "NEW PASSWORD IS REQUIRED.");
    return;
  }

  if (newPassword.length < 8) {
    alertModal(false, "PASSWORD MUST NOT BE LESS THAN 8 CHARACTERS.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alertModal(false, "NEW PASSWORDS DO NOT MATCH.");
    return;
  }

  const resetBtn = document.getElementById('resetPasswordBtnId');
  let originalBtnText = 'Reset Password & Sign In →';
  if (resetBtn) {
    originalBtnText = resetBtn.innerHTML;
    resetBtn.innerHTML = 'Updating Password...';
    resetBtn.disabled = true;
  }

  setTimeout(() => {
    sessionStorage.removeItem("userForgotPasswordSession");

    if (resetBtn) {
      resetBtn.innerHTML = originalBtnText;
      resetBtn.disabled = false;
    }

    const isInAdmin = window.location.pathname.includes('/admin/');
    const roleParam = storedSession && storedSession.role === "admin" ? "?role=admin&reset=success" : "?reset=success";
    const redirectUrl = isInAdmin ? `../client/login.html${roleParam}` : `login.html${roleParam}`;

    alertModal(true, "PASSWORD RESET SUCCESSFUL! Your account has been updated with your new password.", redirectUrl);
  }, 450);
}

document.addEventListener("DOMContentLoaded", function () {
  // Password Visibility Toggle Triggers
  const toggleButtons = document.querySelectorAll(".password-toggle-trigger");
  toggleButtons.forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const parent = btn.parentElement;
      const input = parent ? parent.querySelector("input") : null;
      const icon = btn.querySelector("i");
      if (input) {
        const isPassword = input.getAttribute("type") === "password";
        input.setAttribute("type", isPassword ? "text" : "password");
        if (icon) {
          icon.classList.toggle("bi-eye-slash", !isPassword);
          icon.classList.toggle("bi-eye", isPassword);
        }
      }
    });
  });

  // Pre-fill user session data if returning from forgot-password
  try {
    const raw = sessionStorage.getItem("userForgotPasswordSession");
    if (raw) {
      const parsed = JSON.parse(raw);
      const email = parsed.emailAddress || "";
      const name = parsed.userName || "Executive";
      const otp = parsed.resetOtp || "";
      const role = parsed.role || "candidate";

      const userNameEl = document.getElementById("userName");
      if (userNameEl) userNameEl.textContent = name;

      const userEmailEl = document.getElementById("userEmail") || document.getElementById("displayEmail");
      if (userEmailEl && email) userEmailEl.textContent = email;

      const emailInput = document.getElementById("emailAddress");
      if (emailInput && email) emailInput.value = email;

      const otpInput = document.getElementById("otpCode") || document.getElementById("resetOtp");
      if (otpInput && !otpInput.value && otp) {
        otpInput.placeholder = `e.g. ${otp}`;
      }

      // Update role tab if on reset page
      const roleBtn = document.querySelector(`.auth-role-btn[data-role="${role}"]`);
      if (roleBtn) {
        document.querySelectorAll(".auth-role-btn").forEach(b => b.classList.remove("active"));
        roleBtn.classList.add("active");
      }
    }
  } catch (e) {}

  // Role Tab Switching on Forgot Password
  const roleButtons = document.querySelectorAll(".auth-role-btn");
  const emailInput = document.getElementById("emailAddress");
  const formTitle = document.getElementById("auth-form-title");

  const defaultRoleAccounts = {
    candidate: "alexander.vance@executive.io",
    employer: "recruiter@apexglobal.tech",
    admin: "admin@remotelyaligned.com"
  };

  const defaultRoleTitles = {
    candidate: "Candidate Account Recovery",
    employer: "Recruiter Account Recovery",
    admin: "Executive Administrator Recovery"
  };

  roleButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      roleButtons.forEach(b => b.classList.remove("active"));
      this.classList.add("active");

      const role = this.dataset.role;
      if (emailInput && defaultRoleAccounts[role]) {
        emailInput.value = defaultRoleAccounts[role];
      }
      if (formTitle && defaultRoleTitles[role] && window.location.pathname.includes("forgot-password")) {
        formTitle.textContent = defaultRoleTitles[role];
      }
    });
  });

  // Check URL params for role (e.g. ?role=admin)
  const urlParams = new URLSearchParams(window.location.search);
  const requestedRole = urlParams.get("role");
  if (requestedRole) {
    const targetBtn = document.querySelector(`.auth-role-btn[data-role="${requestedRole}"]`);
    if (targetBtn) targetBtn.click();
  }
});
