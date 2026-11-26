<?php
$pageTitle = 'Corporate Contact & Advisory';
require_once __DIR__ . '/includes/header.php';
?>

  <!-- Inner Banner -->
  <section class="inner-banner">
    <div class="container">
      <div class="breadcrumb-nav">
        <a href="index.php">Home</a>
        <span>/</span>
        <span>Contact</span>
      </div>
      <h1 class="inner-banner-title">Enterprise Advisory & Contact</h1>
      <p class="inner-banner-subtitle">
        Connect with our global talent placement specialists or inquire about enterprise custom recruitment contracts.
      </p>
    </div>
  </section>

  <!-- Contact Body -->
  <main class="container" style="padding-top: 3rem; padding-bottom: 4rem;">
    <div class="page-layout-grid">

      <!-- Left Column: Global Offices Info -->
      <div>
        <div style="background-color: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 2rem; margin-bottom: 2rem;">
          <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem;">Global Headquarters</h3>

          <div style="display: flex; flex-direction: column; gap: 1.25rem; font-size: 0.9375rem;">
            <div>
              <strong style="color: var(--primary); display: block;">New York (Americas HQ)</strong>
              <span>540 Madison Avenue, 28th Floor<br>New York, NY 10022</span>
            </div>

            <div>
              <strong style="color: var(--primary); display: block;">London (EMEA Operations)</strong>
              <span>100 Bishopsgate, Level 19<br>London, EC2N 4AG, United Kingdom</span>
            </div>

            <div>
              <strong style="color: var(--primary); display: block;">Direct Contacts</strong>
              <span>Email: <a href="mailto:<?php echo SITE_EMAIL; ?>"><?php echo SITE_EMAIL; ?></a></span><br>
              <span>Phone: <?php echo SITE_PHONE; ?></span>
            </div>
          </div>
        </div>

        <!-- Office Hours -->
        <div style="background-color: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 2rem;">
          <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem;">Enterprise SLA Commitment</h4>
          <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.6;">
            All employer talent inquiries receive an assigned senior recruiter partner within 4 business hours.
          </p>
        </div>
      </div>

      <!-- Right Column: Inquiry Form -->
      <div style="background-color: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 2.5rem; box-shadow: var(--shadow-sm);">
        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Transmit Executive Inquiry</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.75rem;">
          Submit your hiring parameters or individual advisory request.
        </p>

        <form onsubmit="event.preventDefault(); showToast('Inquiry received. A senior advisor will contact you within 4 hours.'); this.reset();">
          <div class="form-grid-2">
            <div class="form-group">
              <label for="c-name">Full Name *</label>
              <input type="text" id="c-name" class="form-control" placeholder="Jonathan Vance" required>
            </div>
            <div class="form-group">
              <label for="c-email">Corporate Email *</label>
              <input type="email" id="c-email" class="form-control" placeholder="name@domain.com" required>
            </div>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label for="c-org">Organization / Firm</label>
              <input type="text" id="c-org" class="form-control" placeholder="e.g. Apex Global">
            </div>
            <div class="form-group">
              <label for="c-inquiry-type">Inquiry Classification *</label>
              <select id="c-inquiry-type" class="form-control" required>
                <option value="employer">Enterprise Hiring & Staffing</option>
                <option value="candidate">Executive Candidate Advisory</option>
                <option value="partnership">API & Platform Partnership</option>
                <option value="billing">Billing & Compliance</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="c-message">Inquiry Overview *</label>
            <textarea id="c-message" class="form-control" rows="5" placeholder="Detail your hiring schedule, required seniority, or placement timeline..." required></textarea>
          </div>

          <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
            Send Enterprise Inquiry →
          </button>
        </form>
      </div>

    </div>
  </main>

<?php
require_once __DIR__ . '/includes/footer.php';
?>
