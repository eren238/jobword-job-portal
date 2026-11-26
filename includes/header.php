<?php
require_once __DIR__ . '/constants.php';
$currentPage = basename($_SERVER['PHP_SELF'], '.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo isset($pageTitle) ? $pageTitle . ' | ' . SITE_NAME : SITE_NAME . ' | ' . SITE_TAGLINE; ?></title>
  <!-- Stylesheets -->
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/responsive.css">
  <link rel="shortcut icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%231e3a8a'/><text x='50%' y='65%' font-size='55' font-weight='800' fill='white' text-anchor='middle'>J</text></svg>">
</head>
<body>

  <!-- Top Announcement Bar (Constant) -->
  <aside class="top-bar" aria-label="Quick Contacts">
    <div class="container top-bar-inner">
      <div class="top-bar-left">
        <span>📍 Global Operations: New York • London • Zurich • Singapore</span>
        <span>📞 Enterprise Hotline: <?php echo SITE_PHONE; ?></span>
      </div>
      <div class="top-bar-right">
        <a href="post-job.html">For Employers</a>
        <a href="dashboard.html">Candidate Portal</a>
        <a href="login.html">Corporate Sign In</a>
      </div>
    </div>
  </aside>

  <!-- Main Navigation Header (Constant) -->
  <header class="site-header">
    <div class="container">
      <nav class="navbar" aria-label="Main Navigation">
        <!-- Logo -->
        <a href="index.html" class="brand-logo" aria-label="JOBWORD Home">
          <div class="brand-icon">J</div>
          <span>JOB<span class="accent">WORD</span></span>
        </a>

        <!-- Navigation Links -->
        <ul class="nav-menu">
          <li><a href="index.html" class="nav-link <?php echo ($currentPage == 'index' || $currentPage == '') ? 'active' : ''; ?>">Home</a></li>
          <li><a href="jobs.html" class="nav-link <?php echo ($currentPage == 'jobs') ? 'active' : ''; ?>">Find Jobs</a></li>
          <li><a href="companies.html" class="nav-link <?php echo ($currentPage == 'companies') ? 'active' : ''; ?>">Companies</a></li>
          <li><a href="dashboard.html" class="nav-link <?php echo ($currentPage == 'dashboard') ? 'active' : ''; ?>">Dashboard</a></li>
          <li><a href="contact.html" class="nav-link <?php echo ($currentPage == 'contact') ? 'active' : ''; ?>">Contact</a></li>
        </ul>

        <!-- Right Side Nav Actions -->
        <div class="nav-actions">
          <a href="login.html" class="btn btn-outline btn-sm">Sign In</a>
          <a href="post-job.html" class="btn btn-primary btn-sm">+ Post a Job</a>
        </div>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-nav-toggle" aria-label="Toggle navigation menu">
          ☰
        </button>
      </nav>
    </div>
  </header>
