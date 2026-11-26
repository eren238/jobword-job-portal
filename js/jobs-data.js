/**
 * RemotelyAligned - Enterprise Job Portal Data Store
 * Structured database of jobs, companies, and category taxonomies
 */

const JOB_DATABASE = [
  {
    id: "job-100",
    title: "Global Principal Remote Solutions Architect",
    company: "RemotelyAligned",
    logoText: "RA",
    logoBg: "#1e3a8a",
    category: "engineering",
    categoryName: "Software & Cloud",
    type: "Full Time (100% Remote)",
    badgeType: "remote",
    isUrgent: true,
    location: "Global Remote (Work from Anywhere)",
    salaryMin: 185000,
    salaryMax: 220000,
    salaryDisplay: "$185k - $220k / year",
    experience: "8+ Years",
    postedDate: "Just now",
    overview: "RemotelyAligned is seeking a Global Principal Solutions Architect to design distributed cloud engineering architectures, lead worldwide talent integration, and set enterprise standards for asynchronous collaboration.",
    responsibilities: [
      "Design and deploy resilient, distributed systems across multi-region cloud infrastructures.",
      "Partner with multinational engineering teams to optimize remote development workflows and developer experience.",
      "Establish automated continuous deployment practices, zero-trust perimeter security, and global observability.",
      "Mentor distributed senior architects and contribute to RemotelyAligned open-source engineering initiatives."
    ],
    requirements: [
      "8+ years of high-scale cloud engineering experience with AWS, GCP, or Azure.",
      "Proven success leading autonomous engineering teams across multiple time zones.",
      "Deep expertise in Kubernetes, distributed caching, IaC (Terraform), and microservice governance.",
      "Exceptional asynchronous communication and documentation skills."
    ],
    benefits: [
      "100% remote flexibility with home office & technology stipend ($3,500/yr)",
      "Comprehensive global healthcare and wellness coverage",
      "Competitive equity package and annual performance profit sharing",
      "Unlimited paid time off with mandatory minimum leave policies"
    ]
  },
  {
    id: "job-101",
    title: "Senior Cloud Infrastructure Architect",
    company: "Apex Global Technologies",
    logoText: "AG",
    logoBg: "#0f1c3f",
    category: "engineering",
    categoryName: "Software & Cloud",
    type: "Full Time",
    badgeType: "fulltime",
    isUrgent: true,
    location: "New York, NY (Hybrid)",
    salaryMin: 165000,
    salaryMax: 195000,
    salaryDisplay: "$165k - $195k / year",
    experience: "7+ Years",
    postedDate: "2 hours ago",
    overview: "Apex Global is looking for a Senior Cloud Infrastructure Architect to spearhead enterprise multi-cloud migrations, Kubernetes cluster design, and infrastructure automation for Tier-1 financial institutions.",
    responsibilities: [
      "Architect and implement fault-tolerant, scalable multi-region AWS and Azure cloud platforms.",
      "Lead automated Infrastructure as Code (IaC) deployment pipelines using Terraform and Ansible.",
      "Partner with cybersecurity teams to enforce SOC2, ISO27001, and Zero Trust security controls.",
      "Optimize enterprise compute, storage, and networking expenditures across large-scale clusters."
    ],
    requirements: [
      "Bachelor's or Master's degree in Computer Science, Engineering, or equivalent practical experience.",
      "7+ years architecting enterprise distributed cloud architectures on AWS or GCP.",
      "Deep expertise with Kubernetes orchestration, Service Meshes (Istio), and Docker container security.",
      "Demonstrated experience with high-throughput microservices and CI/CD automation."
    ],
    benefits: [
      "Comprehensive Executive Health, Dental & Vision coverage (100% employer paid)",
      "401(k) retirement plan with 6% immediate employer matching",
      "Annual $5,000 executive professional development stipend",
      "Flexible hybrid schedule with annual corporate summit in Zurich"
    ]
  },
  {
    id: "job-102",
    title: "Lead Cybersecurity Risk & Compliance Officer",
    company: "Vanguard Trust Partners",
    logoText: "VT",
    logoBg: "#1e3a8a",
    category: "security",
    categoryName: "Cybersecurity",
    type: "Full Time",
    badgeType: "fulltime",
    isUrgent: false,
    location: "Washington, DC (On-site)",
    salaryMin: 150000,
    salaryMax: 180000,
    salaryDisplay: "$150k - $180k / year",
    experience: "6+ Years",
    postedDate: "5 hours ago",
    overview: "Vanguard Trust Partners seeks a seasoned Information Security & Compliance Officer to govern risk assessments, regulatory adherence, and enterprise incident readiness across our private wealth management division.",
    responsibilities: [
      "Conduct rigorous threat modeling, vulnerability audits, and penetration tests across internal systems.",
      "Maintain organizational compliance with NIST SP 800-53, GDPR, and Federal Reserve cyber guidelines.",
      "Lead incident response drills, business continuity protocols, and executive briefings.",
      "Audit third-party vendor integrations and API exchange gateways."
    ],
    requirements: [
      "CISSP, CISM, or CRISC professional certifications required.",
      "Minimum 6 years leading cyber governance in banking, fintech, or defense sectors.",
      "Strong understanding of SIEM platforms (Splunk, Sentinel) and network perimeter security.",
      "Superior communication skills with executive board presentation experience."
    ],
    benefits: [
      "Performance-based annual cash bonus (15-25%)",
      "Executive wellness allowance and private gym access",
      "Generous 25 days paid vacation plus federal bank holidays",
      "Full relocation assistance package"
    ]
  },
  {
    id: "job-103",
    title: "Principal Machine Learning Engineer",
    company: "Cognitive Nexus Labs",
    logoText: "CN",
    logoBg: "#172554",
    category: "data-ai",
    categoryName: "AI & Data Science",
    type: "Remote",
    badgeType: "remote",
    isUrgent: true,
    location: "San Francisco, CA (Remote)",
    salaryMin: 180000,
    salaryMax: 230000,
    salaryDisplay: "$180k - $230k / year",
    experience: "5+ Years",
    postedDate: "1 day ago",
    overview: "Cognitive Nexus Labs is engineering next-generation foundation models for predictive enterprise analytics. We are seeking a Principal ML Engineer to oversee distributed training pipelines and low-latency inference.",
    responsibilities: [
      "Design, benchmark, and deploy large-scale LLMs and multimodal vision architectures.",
      "Optimize inference throughput via quantization, TensorRT, and distributed GPU clusters.",
      "Establish reproducible ML operations (MLOps) workflows using Kubeflow, MLflow, and Ray.",
      "Collaborate with PhD research scientists to translate breakthroughs into production code."
    ],
    requirements: [
      "Advanced degree in Computer Science, Applied Mathematics, or Machine Learning.",
      "Proven production track record with PyTorch, CUDA kernel optimizations, and Triton inference server.",
      "Demonstrated work training models on 100+ GPU clusters.",
      "Strong publication or open-source GitHub portfolio."
    ],
    benefits: [
      "Top-tier equity compensation grant in high-growth venture",
      "Home office setup grant ($4,000 allowance)",
      "Uncapped PTO policy with mandatory minimums",
      "Full medical, dental, and vision insurance"
    ]
  },
  {
    id: "job-104",
    title: "Vice President of Corporate Strategy",
    company: "Sterling & Mercer Holdings",
    logoText: "SM",
    logoBg: "#0a1128",
    category: "executive",
    categoryName: "Executive & Strategy",
    type: "Full Time",
    badgeType: "fulltime",
    isUrgent: false,
    location: "Chicago, IL (On-site)",
    salaryMin: 220000,
    salaryMax: 275000,
    salaryDisplay: "$220k - $275k / year",
    experience: "10+ Years",
    postedDate: "2 days ago",
    overview: "Sterling & Mercer Holdings seeks an accomplished VP of Corporate Strategy to orchestrate global M&A valuations, strategic capital allocation, and market positioning across diversified financial assets.",
    responsibilities: [
      "Lead cross-functional teams executing comprehensive buy-side and sell-side diligence.",
      "Direct quantitative financial modeling, discounted cash flow (DCF), and synergistic integration models.",
      "Advise the Chief Executive Officer and Board of Directors on strategic market expansion vectors.",
      "Oversee post-merger integration milestones and operating performance metrics."
    ],
    requirements: [
      "MBA from a top-tier business program or equivalent credential.",
      "10+ years in top-tier management consulting, private equity, or investment banking.",
      "Demonstrated leadership closing multi-hundred million dollar transactions.",
      "Impeccable executive presence and negotiation abilities."
    ],
    benefits: [
      "Carried interest & executive partner equity pool participation",
      "First-class international travel allowances",
      "Comprehensive executive health and concierge medical care",
      "Country club and boardroom club membership fees sponsored"
    ]
  },
  {
    id: "job-105",
    title: "Senior Quantitative Financial Analyst",
    company: "Blackwood Capital Markets",
    logoText: "BC",
    logoBg: "#1b3574",
    category: "finance",
    categoryName: "Finance & Banking",
    type: "Full Time",
    badgeType: "fulltime",
    isUrgent: false,
    location: "Boston, MA (Hybrid)",
    salaryMin: 140000,
    salaryMax: 175000,
    salaryDisplay: "$140k - $175k / year",
    experience: "4+ Years",
    postedDate: "3 days ago",
    overview: "Blackwood Capital Markets is hiring a Quantitative Analyst to construct algorithmic pricing matrices, derivatives risk mitigation strategies, and high-frequency statistical models.",
    responsibilities: [
      "Formulate, backtest, and deploy statistical arbitrage strategies across global FX and equities.",
      "Construct robust mathematical models in Python and C++ for automated risk parameter monitoring.",
      "Interface directly with senior traders and portfolio managers on execution efficiency.",
      "Analyze petabyte-scale historical market tick datasets."
    ],
    requirements: [
      "Degree in Quantitative Finance, Mathematics, Physics, or Computer Science.",
      "Fluency in Python (NumPy, SciPy, Pandas), C++, and time-series database engines (kdb+/q).",
      "Deep understanding of stochastic calculus, Monte Carlo simulations, and options pricing.",
      "CFA or FRM designation considered a strong plus."
    ],
    benefits: [
      "High-percentage quantitative trading performance bonus pool",
      "Daily gourmet catered lunch and executive espresso bar",
      "Subsidized downtown luxury parking or transit pass",
      "Comprehensive medical, life, and disability coverage"
    ]
  },
  {
    id: "job-106",
    title: "Senior Product Design Director (Enterprise)",
    company: "Kromatech Solutions",
    logoText: "KS",
    logoBg: "#0f172a",
    category: "product",
    categoryName: "Product & Design",
    type: "Remote",
    badgeType: "remote",
    isUrgent: false,
    location: "Austin, TX (Remote)",
    salaryMin: 145000,
    salaryMax: 175000,
    salaryDisplay: "$145k - $175k / year",
    experience: "7+ Years",
    postedDate: "4 days ago",
    overview: "Kromatech Solutions is seeking a Director of Product Design to direct our B2B SaaS platform design system, complex data visualization dashboards, and enterprise workflow experiences.",
    responsibilities: [
      "Lead and mentor a multidisciplinary team of product designers, researchers, and design technologists.",
      "Govern our enterprise design system (tokens, components, atomic patterns) across web and mobile.",
      "Translate complex multi-tenant workflows into clean, high-conversion enterprise interfaces.",
      "Conduct in-depth user research sessions with Fortune 500 operations directors."
    ],
    requirements: [
      "Portfolio showcasing exceptional enterprise SaaS or fintech product design work.",
      "7+ years experience leading UX/UI strategy for complex data-dense products.",
      "Mastery of Figma, advanced prototyping, and modern design-to-engineering handoffs.",
      "Deep passion for crisp typography, precision layouts, and accessible UI standards (WCAG 2.1 AA)."
    ],
    benefits: [
      "Flexible remote schedule with quarterly creative retreats",
      "Generous hardware allowance (Apple Studio Display, MacBook Pro M-series)",
      "Wellness stipend and mental health support services",
      "Full 401(k) matching up to 5%"
    ]
  },
  {
    id: "job-107",
    title: "DevOps & SRE Systems Specialist",
    company: "Ironclad Networks",
    logoText: "IN",
    logoBg: "#1e293b",
    category: "engineering",
    categoryName: "Software & Cloud",
    type: "Contract",
    badgeType: "contract",
    isUrgent: true,
    location: "Seattle, WA (Hybrid)",
    salaryMin: 130000,
    salaryMax: 160000,
    salaryDisplay: "$85 - $110 / hour ($150k eq.)",
    experience: "5+ Years",
    postedDate: "5 days ago",
    overview: "Ironclad Networks is contracting a Site Reliability Specialist to fortify core telecom routing infrastructure, automate chaos engineering tests, and ensure 99.999% platform availability.",
    responsibilities: [
      "Build proactive observability telemetry pipelines using Prometheus, Grafana, and OpenTelemetry.",
      "Automate failover tests and disaster recovery simulations across hybrid bare-metal and AWS clouds.",
      "Refactor legacy deployment scripts into unified GitLab CI/CD pipelines.",
      "Participate in high-tier on-call rotation with rapid resolution SLAs."
    ],
    requirements: [
      "Extensive Linux systems administration and kernel tuning expertise.",
      "Solid automation scripting proficiency in Go, Python, and Bash.",
      "Hands-on experience managing production Kubernetes at scale.",
      "12-month contract with high probability of full-time conversion."
    ],
    benefits: [
      "Competitive hourly contractor rate with weekly direct deposits",
      "Flexible schedule with remote options",
      "Opportunity for long-term equity grant on conversion",
      "State-of-the-art developer workstation"
    ]
  },
  {
    id: "job-108",
    title: "Director of Enterprise Sales & Partnerships",
    company: "Titanium Enterprise Systems",
    logoText: "TE",
    logoBg: "#132450",
    category: "executive",
    categoryName: "Executive & Strategy",
    type: "Full Time",
    badgeType: "fulltime",
    isUrgent: false,
    location: "Atlanta, GA (Hybrid)",
    salaryMin: 160000,
    salaryMax: 210000,
    salaryDisplay: "$160k - $210k + Uncapped Commission",
    experience: "8+ Years",
    postedDate: "1 week ago",
    overview: "Titanium Enterprise Systems is recruiting an Enterprise Sales Director to spearhead multi-million dollar software license negotiations with Global 2000 industrial manufacturers.",
    responsibilities: [
      "Manage end-to-end sales lifecycles for deals ranging from $250k to $2M+ ARR.",
      "Cultivate executive relationships with CIOs, CTOs, and Procurement chiefs.",
      "Lead a team of 4 Senior Account Executives and Sales Engineers.",
      "Accurately forecast pipeline revenue and collaborate with Product leaders on market demands."
    ],
    requirements: [
      "Track record of consistently exceeding enterprise sales quotas ($5M+ annual quota).",
      "8+ years B2B enterprise software or cybersecurity sales experience.",
      "Exceptional contract negotiation and complex stakeholder alignment capabilities.",
      "Willingness to travel up to 30% for high-stakes on-site client presentations."
    ],
    benefits: [
      "Uncapped sales commission structure with accelerating tiers",
      "Annual President's Club luxury trip for top performers",
      "Comprehensive medical, dental, life, and vision benefits",
      "Company stock option package"
    ]
  }
];

// LocalStorage Helper for Saved Jobs
const JobStorage = {
  getSavedJobs() {
    try {
      const saved = localStorage.getItem("remotelyaligned_saved_jobs") || localStorage.getItem("jobword_saved_jobs");
      return saved ? JSON.parse(saved) : ["job-100", "job-101", "job-103"];
    } catch (e) {
      return ["job-100", "job-101"];
    }
  },

  toggleSaveJob(jobId) {
    let saved = this.getSavedJobs();
    let isSaved = false;
    if (saved.includes(jobId)) {
      saved = saved.filter(id => id !== jobId);
      isSaved = false;
    } else {
      saved.push(jobId);
      isSaved = true;
    }
    localStorage.setItem("remotelyaligned_saved_jobs", JSON.stringify(saved));
    return isSaved;
  },

  isJobSaved(jobId) {
    return this.getSavedJobs().includes(jobId);
  },

  getApplications() {
    try {
      const apps = localStorage.getItem("remotelyaligned_applications") || localStorage.getItem("jobword_applications");
      return apps ? JSON.parse(apps) : [
        {
          id: "app-1",
          jobTitle: "Global Principal Remote Solutions Architect",
          company: "RemotelyAligned",
          appliedDate: "Nov 26, 2026",
          status: "Interview Scheduled",
          statusClass: "badge-remote"
        },
        {
          id: "app-2",
          jobTitle: "Senior Cloud Infrastructure Architect",
          company: "Apex Global Technologies",
          appliedDate: "Nov 22, 2026",
          status: "Under Review",
          statusClass: "badge-fulltime"
        },
        {
          id: "app-3",
          jobTitle: "Principal Machine Learning Engineer",
          company: "Cognitive Nexus Labs",
          appliedDate: "Nov 20, 2026",
          status: "Interview Scheduled",
          statusClass: "badge-remote"
        },
        {
          id: "app-3",
          jobTitle: "Lead Cybersecurity Risk Officer",
          company: "Vanguard Trust Partners",
          appliedDate: "Nov 15, 2026",
          status: "Application Viewed",
          statusClass: "badge-contract"
        }
      ];
    } catch(e) {
      return [];
    }
  },

  addApplication(jobTitle, company, candidateName) {
    const apps = this.getApplications();
    const newApp = {
      id: "app-" + Date.now(),
      jobTitle: jobTitle,
      company: company,
      appliedDate: "Just now",
      status: "Submitted",
      statusClass: "badge-fulltime"
    };
    apps.unshift(newApp);
    localStorage.setItem("remotelyaligned_applications", JSON.stringify(apps));
    return newApp;
  }
};
