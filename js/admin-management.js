/**
 * JOBWORD Admin Portal Management
 * Administrative controllers for reviewing requisitions, candidate approvals, and metrics
 */

document.addEventListener("DOMContentLoaded", () => {
  initAdminDashboard();
  initAdminJobsTable();
  initAdminApplicantsTable();
});

function initAdminDashboard() {
  const statsApplied = document.getElementById("admin-total-applicants");
  const statsJobs = document.getElementById("admin-active-jobs");
  if (statsApplied) statsApplied.textContent = "1,842";
  if (statsJobs) statsJobs.textContent = "246";
}

function initAdminJobsTable() {
  const tbody = document.getElementById("admin-jobs-tbody");
  if (!tbody || typeof JOB_DATABASE === "undefined") return;

  tbody.innerHTML = JOB_DATABASE.map(job => `
    <tr id="admin-job-row-${job.id}">
      <td>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div class="company-logo" style="width: 38px; height: 38px; font-size: 0.9rem; background-color: ${job.logoBg}; color: #ffffff;">
            ${job.logoText}
          </div>
          <div>
            <strong>${job.title}</strong>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${job.categoryName}</div>
          </div>
        </div>
      </td>
      <td>${job.company}</td>
      <td>${job.salaryDisplay}</td>
      <td><span class="badge badge-remote">Active Approved</span></td>
      <td>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn btn-outline btn-sm" onclick="showToast('Requisition updated.', 'info')">Edit</button>
          <button class="btn btn-outline btn-sm" style="color: #dc2626; border-color: #fca5a5;" onclick="deleteAdminJob('${job.id}')">Delete</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function deleteAdminJob(jobId) {
  const row = document.getElementById(`admin-job-row-${jobId}`);
  if (row) {
    row.remove();
    showToast("Requisition delisted from live portal.");
  }
}

function initAdminApplicantsTable() {
  const tbody = document.getElementById("admin-applicants-tbody");
  if (!tbody) return;

  const applicants = [
    { id: "app-101", name: "Alexander Vance", role: "Cloud Systems Lead", company: "Apex Global Technologies", date: "Nov 25, 2026", status: "Reviewing", statusClass: "badge-fulltime" },
    { id: "app-102", name: "Dr. Evelyn Wright", role: "Principal ML Scientist", company: "Cognitive Nexus Labs", date: "Nov 24, 2026", status: "Interview Set", statusClass: "badge-remote" },
    { id: "app-103", name: "Jonathan Sterling", role: "VP Corporate Strategy", company: "Sterling & Mercer", date: "Nov 22, 2026", status: "Under Review", statusClass: "badge-contract" },
    { id: "app-104", name: "Rachel Chen", role: "Lead Risk Officer", company: "Vanguard Trust", date: "Nov 21, 2026", status: "Offered", statusClass: "badge-remote" },
    { id: "app-105", name: "David Thorne", role: "Quant Analyst", company: "Blackwood Capital", date: "Nov 20, 2026", status: "Pending", statusClass: "badge-urgent" }
  ];

  tbody.innerHTML = applicants.map(a => `
    <tr id="applicant-row-${a.id}">
      <td>
        <strong>${a.name}</strong>
        <div style="font-size: 0.75rem; color: var(--text-muted);">${a.role}</div>
      </td>
      <td>${a.company}</td>
      <td>${a.date}</td>
      <td><span class="badge ${a.statusClass}">${a.status}</span></td>
      <td>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn btn-primary btn-sm" onclick="showToast('Candidate ${a.name} fast-tracked to final round.')">Advance</button>
          <button class="btn btn-outline btn-sm" onclick="showToast('Executive CV downloaded.', 'info')">View CV</button>
        </div>
      </td>
    </tr>
  `).join("");
}
