import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const sections = [
  {
    title: "Migration Framework",
    steps: [
      { num: "1", label: "Extract and Audit Source Code", detail: "Download the complete source files from Base44. Separate front-end (React/TypeScript) from backend API endpoints and server routes." },
      { num: "2", label: "Provision Azure Infrastructure", detail: "Set up your environments in the Azure Portal. Provision Azure App Service or Azure Container Apps (if using Docker)." },
      { num: "3", label: "Migrate and Schema-Map the Database", detail: "Extract data structures from Base44's managed database. Provision Azure SQL Database or Azure Database for PostgreSQL and restore schema definitions." },
      { num: "4", label: "Refactor API Infrastructure and Deploy", detail: "Rewrite API call wrappers. Replace Base44's internal routing with Azure endpoint strings. Deploy via GitHub Actions or Azure CLI." },
    ]
  },
  {
    title: "Architectural Mapping",
    table: [
      { from: "App Hosting", to: "Azure App Service", note: "Web app deployments, scaling, SSL termination." },
      { from: "Container Hosting", to: "Azure Container Apps", note: "Microservices or multi-container setups." },
      { from: "Internal Database", to: "Azure SQL Database", note: "Enterprise relational data, high availability." },
      { from: "Environment Variables", to: "Azure Key Vault", note: "API tokens, encryption keys, connection strings." },
    ]
  },
  {
    title: "Critical Configuration Details",
    items: [
      { label: "Hardcoded API Calls", detail: "Base44 handles backend communication implicitly. On Azure those internal paths will fail. Refactor to use environment variables (e.g. process.env.AZURE_API_URL) for base URLs." },
      { label: "SQL Firewall Rules", detail: "Azure SQL Database firewall is locked by default. Explicitly configure rules to allow your App Service and your own IP for SSMS or VS Code management." },
      { label: "Identity & Access Management", detail: "If Base44 handled auth, map to Microsoft Entra ID (formerly Azure AD) or a lightweight token handler for enterprise user sign-ins and roles." },
    ]
  },
  {
    title: "Custom Domain (Wix → Azure)",
    steps: [
      { num: "1", label: "Retrieve Azure Deployment Details", detail: "In Azure Portal → App Service → Custom Domains: copy the Custom Domain Verification ID and the IP Address." },
      { num: "2", label: "Add DNS Records to Wix", detail: "TXT Record: host @ → paste Verification ID. A Record: host @ → Azure IP. CNAME: host www → your-app.azurewebsites.net." },
      { num: "3", label: "Validate Domain in Azure", detail: "Back in Azure Custom Domains tab, click Add custom domain, type your domain, click Validate. Wait for green checkmarks, then Add." },
      { num: "4", label: "Bind Free SSL Certificate", detail: "Click Add binding next to the domain. Select App Service Managed Certificate. Azure auto-issues, installs, and renews SSL for free." },
    ],
    note: "⚠️ DNS propagation from Wix can take minutes to a couple of hours. If validation fails, wait 10–15 minutes and retry."
  },
  {
    title: "App Service Plan Tiers",
    table: [
      { from: "F1 (Free)", to: "~$0 / mo", note: "No custom domains. CPU throttled to 60 min/day. Cold start delays. Dev/testing only." },
      { from: "Shared (D1)", to: "~$10 / mo", note: "Custom domains. Shared CPU — noisy neighbour risk. Prototypes only." },
      { from: "Basic (B1) Linux ✅", to: "~$13 / mo", note: "Dedicated VM, custom domains, SSL, scale to 3 instances. Best entry point for production." },
      { from: "Standard (S1) Linux", to: "~$73 / mo", note: "Deployment slots (zero-downtime swaps), autoscaling, daily backups. High-availability apps." },
    ]
  },
  {
    title: "Linux vs Windows",
    items: [
      { label: "Choose Linux", detail: "B1 Linux ~$13/mo vs B1 Windows ~$55/mo. Same hardware, ~$42/mo savings. Modern stacks (Node.js, React, Python, .NET Core) run natively and faster on Linux." },
      { label: "Only use Windows if", detail: "Your app requires legacy .NET Framework 4.x, Classic ASP, COM components, or Windows-specific registry access." },
    ]
  },
  {
    title: "Cost Optimization Strategies",
    items: [
      { label: "Pack Multiple Apps Into One Plan", detail: "You pay for the App Service Plan (the VM), not individual apps. Deploy frontend, backend API, and staging into one B1 plan — same price as one app." },
      { label: "Always Choose Linux", detail: "Saves $40+ USD/month per plan vs Windows for identical compute specs." },
      { label: "Standard Tier for Production Only", detail: "Use S1 for live user-facing apps (deployment slots, autoscaling). Use B1 Linux for dev/staging environments." },
      { label: "DTU-Based Azure SQL", detail: "Use Basic/Standard DTU purchasing model. A Basic Azure SQL instance (5 DTUs, 2 GB) costs ~$5 USD/mo — ideal for early production validation." },
    ]
  },
  {
    title: "The Production Dockerfile",
    dockerfile: `# Use the official Deno image from Docker Hub
FROM denoland/deno:alpine-1.44.4

# Set the working directory inside the container
WORKDIR /app

# Prefer running as a non-privileged user for security
USER deno

# Cache the dependencies first (speeds up subsequent cloud builds)
COPY deps.ts .
RUN deno cache deps.ts

# Copy the rest of your application source files
COPY . .

# Compile or cache your primary entry point file
RUN deno cache main.ts

# Expose the network port (Cloud Run defaults to 8080, Azure is configurable)
EXPOSE 8080

# Grant necessary Deno permissions (Network access, Env access)
CMD ["run", "--allow-net", "--allow-env", "main.ts"]`,
    note: "Add a file named Dockerfile to the root of your project. Both Azure and Google Cloud read this file to understand how to start your Deno server."
  },
  {
    title: "Deno on Azure & Google Cloud",
    items: [
      { label: "Azure — Web App for Containers", detail: "Set Publish: Docker Container when creating App Service. Azure pulls your container from GitHub Packages or Azure Container Registry and runs Deno on Linux." },
      { label: "Azure — Functions Custom Handlers", detail: "Bundle a lightweight Deno executable inside your deployment package. Azure uses it to process incoming HTTP API requests serverlessly." },
      { label: "Google Cloud Run (Recommended for Deno)", detail: "Package your Deno app in a Docker container, run gcloud run deploy. Cloud Run scales to zero when idle — no traffic = $0 bill." },
      { label: "Google vs Azure Philosophy", detail: "Azure asks Linux or Windows. Google Cloud Run abstracts the OS entirely — just provide a Docker image and Google handles the rest on a secure Linux micro-VM." },
    ]
  },
];

function Section({ section }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: '0.5px solid rgba(56,189,248,0.1)' }}>
      <button
        className="w-full flex items-center justify-between py-3 text-left gap-3 transition-colors"
        onClick={() => setOpen(o => !o)}
        style={{ color: open ? '#38BDF8' : '#94A3B8' }}
        onMouseEnter={e => e.currentTarget.style.color = '#38BDF8'}
        onMouseLeave={e => { if (!open) e.currentTarget.style.color = '#94A3B8'; }}
      >
        <span className="text-xs font-semibold tracking-widest uppercase">{section.title}</span>
        {open ? <ChevronDown className="w-3.5 h-3.5 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
      </button>

      {open && (
        <div className="pb-4 space-y-3">
          {/* Numbered steps */}
          {section.steps && section.steps.map((s, i) => (
            <div key={i} className="flex gap-3">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: 'rgba(56,189,248,0.12)', color: '#38BDF8' }}
              >
                {s.num}
              </span>
              <div>
                <p className="text-xs font-semibold mb-0.5" style={{ color: '#E0F2FE' }}>{s.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{s.detail}</p>
              </div>
            </div>
          ))}

          {/* Key-value items */}
          {section.items && section.items.map((item, i) => (
            <div key={i} className="pl-2" style={{ borderLeft: '2px solid rgba(56,189,248,0.2)' }}>
              <p className="text-xs font-semibold mb-0.5" style={{ color: '#E0F2FE' }}>{item.label}</p>
              <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{item.detail}</p>
            </div>
          ))}

          {/* Table */}
          {section.table && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '0.5px solid rgba(56,189,248,0.15)' }}>
                    <th className="text-left py-2 pr-3 font-semibold tracking-wider uppercase" style={{ color: '#38BDF8', fontSize: '10px' }}>From</th>
                    <th className="text-left py-2 pr-3 font-semibold tracking-wider uppercase" style={{ color: '#38BDF8', fontSize: '10px' }}>Azure / Cost</th>
                    <th className="text-left py-2 font-semibold tracking-wider uppercase" style={{ color: '#38BDF8', fontSize: '10px' }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {section.table.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '0.5px solid rgba(56,189,248,0.06)' }}>
                      <td className="py-2 pr-3 font-medium" style={{ color: '#94A3B8' }}>{row.from}</td>
                      <td className="py-2 pr-3" style={{ color: '#38BDF8' }}>{row.to}</td>
                      <td className="py-2 leading-relaxed" style={{ color: '#64748B' }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Dockerfile */}
          {section.dockerfile && (
            <pre
              className="text-xs leading-relaxed rounded-md p-4 overflow-x-auto"
              style={{ background: 'rgba(56,189,248,0.05)', border: '0.5px solid rgba(56,189,248,0.15)', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}
            >{section.dockerfile}</pre>
          )}

          {/* Note */}
          {section.note && (
            <p className="text-xs leading-relaxed italic mt-2" style={{ color: '#64748B' }}>{section.note}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function RecommendedSteps() {
  return (
    <div className="space-y-0">
      {sections.map((section, i) => (
        <Section key={i} section={section} />
      ))}
    </div>
  );
}