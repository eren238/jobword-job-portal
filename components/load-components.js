/**
 * Optional Pure HTML Component Loader
 * Automatically injects components/header.html and components/footer.html
 * into placeholders if present:
 * <div id="header-placeholder"></div>
 * <div id="footer-placeholder"></div>
 */

document.addEventListener("DOMContentLoaded", () => {
  const headerPlaceholder = document.getElementById("header-placeholder");
  const footerPlaceholder = document.getElementById("footer-placeholder");

  if (headerPlaceholder) {
    fetch("components/header.html")
      .then(res => res.text())
      .then(html => {
        headerPlaceholder.innerHTML = html;
        if (typeof initMobileNavigation === "function") initMobileNavigation();
        if (typeof initStickyHeader === "function") initStickyHeader();
      })
      .catch(err => console.log("Header component loaded locally or inline:", err));
  }

  if (footerPlaceholder) {
    fetch("components/footer.html")
      .then(res => res.text())
      .then(html => {
        footerPlaceholder.innerHTML = html;
      })
      .catch(err => console.log("Footer component loaded locally or inline:", err));
  }
});
