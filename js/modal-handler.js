/**
 * RemotelyAligned Modal Handler
 * Standardized controller for opening, closing, and submitting interactive modals
 */

const ModalHandler = {
  open(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  },

  close(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
  },

  init() {
    // Backdrop click to close
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        e.target.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // Escape key to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.active").forEach(m => {
          m.classList.remove("active");
        });
        document.body.style.overflow = "";
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  ModalHandler.init();
});
