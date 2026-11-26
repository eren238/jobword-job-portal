<?php
require_once __DIR__ . '/constants.php';
?>
  <!-- Site Footer (Constant) -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <!-- Col 1: Brand -->
        <div class="footer-brand">
          <a href="index.html" class="brand-logo">
            <div class="brand-icon">J</div>
            <span style="color: #ffffff;">JOB<span class="accent">WORD</span></span>
          </a>
          <p class="footer-desc">
            The global executive career marketplace engineered for high-precision matching between world-class organizations and exceptional talent.
          </p>
          <div class="social-links">
            <a href="#" class="social-btn" aria-label="LinkedIn">in</a>
            <a href="#" class="social-btn" aria-label="Twitter">𝕏</a>
            <a href="#" class="social-btn" aria-label="GitHub">gh</a>
          </div>
        </div>

        <!-- Col 2: Candidates -->
        <div>
          <h4 class="footer-title">For Candidates</h4>
          <ul class="footer-links">
            <li><a href="jobs.html">Browse All Jobs</a></li>
            <li><a href="jobs.html?type=remote">Remote Positions</a></li>
            <li><a href="dashboard.html">Candidate Dashboard</a></li>
            <li><a href="dashboard.html">Saved Shortlist</a></li>
            <li><a href="jobs.html?category=engineering">Tech Opportunities</a></li>
          </ul>
        </div>

        <!-- Col 3: Employers -->
        <div>
          <h4 class="footer-title">For Employers</h4>
          <ul class="footer-links">
            <li><a href="post-job.html">Post an Opportunity</a></li>
            <li><a href="companies.html">Company Directory</a></li>
            <li><a href="dashboard.html">Enterprise Portal</a></li>
            <li><a href="contact.html">Corporate Solutions</a></li>
            <li><a href="login.html">Recruiter Login</a></li>
          </ul>
        </div>

        <!-- Col 4: Newsletter -->
        <div>
          <h4 class="footer-title">Executive Briefing</h4>
          <p class="footer-desc">
            Receive weekly curated executive opportunities, market compensation benchmarks, and industry reports.
          </p>
          <form class="newsletter-form" onsubmit="event.preventDefault(); showToast('Subscribed to Executive Briefing.'); this.reset();">
            <div class="newsletter-input-group">
              <input type="email" placeholder="corporate.email@domain.com" required>
            </div>
            <button type="submit" class="btn btn-primary btn-sm">Subscribe to Briefing</button>
          </form>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div>
          © <?php echo date('Y'); ?> <?php echo SITE_NAME; ?> Inc. All rights reserved. Built with Enterprise Navy Design System.
        </div>
        <div style="display: flex; gap: 1.5rem;">
          <a href="contact.html">Privacy Policy</a>
          <a href="contact.html">Terms of Service</a>
          <a href="contact.html">Security & Compliance</a>
          <a href="contact.html">Support</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="js/jobs-data.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
