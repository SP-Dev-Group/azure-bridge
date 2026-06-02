import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import NoiseOverlay from '../components/hero/NoiseOverlay';
import ScanLines from '../components/hero/ScanLines';
import RecommendedSteps from '../components/azure/RecommendedSteps';

function StepSubheading({ label }) {
  return (
    <p className="text-xs font-semibold tracking-widest uppercase mt-5 mb-3" style={{ color: '#38BDF8', opacity: 0.7 }}>{label}</p>
  );
}

function StepItem({ step: s, expandable, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-3 py-3" style={{ borderBottom: '0.5px solid rgba(56,189,248,0.1)' }}>
      <span
        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
        style={{ background: 'rgba(56,189,248,0.12)', color: '#38BDF8' }}
      >
        {s.num}
      </span>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold mb-0.5" style={{ color: '#E0F2FE' }}>{s.label}</p>
            <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{s.detail}</p>
          </div>
          {expandable && (
            <button
              onClick={() => setOpen(o => !o)}
              className="text-xs transition-colors"
              style={{ color: open ? '#38BDF8' : '#64748B' }}
            >
              {open ? '−' : '+'}
            </button>
          )}
        </div>
        {expandable && open && children && (
          <div className="mt-3 space-y-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AzureMigrate() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen" style={{ background: '#020B1A' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(56,189,248,0.06) 0%, transparent 60%)',
        }}
      />
      <ScanLines />
      <NoiseOverlay />

      <div className="relative z-20 px-8 md:px-[8vw] py-10">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm tracking-widest uppercase mb-12 transition-colors"
          style={{ color: '#94A3B8' }}
          onMouseEnter={e => e.currentTarget.style.color = '#38BDF8'}
          onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Title */}
        <h1
          className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-2 font-display"
          style={{ color: '#E0F2FE', letterSpacing: '-0.03em' }}
        >
          Azure Migrate
        </h1>
        <p className="text-sm tracking-widest uppercase mb-16" style={{ color: '#94A3B8' }}>
          Base44 → Azure Migration Hub
        </p>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div
            className="rounded-lg p-6 min-h-[60vh]"
            style={{
              border: '0.5px solid rgba(56,189,248,0.15)',
              background: 'rgba(56,189,248,0.02)',
            }}
          >
            <h2 className="text-xs tracking-widest uppercase mb-6 font-semibold" style={{ color: '#38BDF8' }}>
              Steps I Take
            </h2>
            <div className="space-y-0">
              <StepSubheading label="Create App Service Plan" />
              {[
                { num: "1", label: "Azure Portal", detail: "Logged into the Azure Portal to begin setup." },
                { num: "2", label: "App Service Plan", detail: "Created an App Service Plan to host the application." },
                { num: "3", label: "Choose Linux Operating System", detail: "Selected Linux as the operating system for the App Service Plan." },
                { num: "4", label: "Initial F1 Free Plan", detail: "Started on the F1 Free tier for initial setup and testing. Will need to upgrade to B1 (~$20 AUD/pm) for custom domains, SSL, and production use." },
              ].map((s, i) => (
                <StepItem key={i} step={s} />
              ))}
              <StepItem
                step={{ num: "5", label: "Provision Azure Database", detail: "Set up the database for storing application data." }}
                expandable
              >
                <div className="space-y-2 text-xs">
                  <div className="pl-3" style={{ borderLeft: '2px solid rgba(56,189,248,0.2)' }}>
                    <p style={{ color: '#64748B' }}>Picked Azure Table Storage if your app only pulls data by an explicit ID and you want your monthly database bill to be under $0.50.</p>
                  </div>
                  <div className="pl-3" style={{ borderLeft: '2px solid rgba(56,189,248,0.2)' }}>
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <p className="font-semibold" style={{ color: '#38BDF8' }}>Option 1: Azure Table Storage (NoSQL)</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-5 w-5 p-0 shrink-0">
                            <Info className="w-3 h-3" style={{ color: '#38BDF8' }} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle style={{ color: '#E0F2FE' }}>Create Azure Table Storage</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3 text-sm" style={{ color: '#94A3B8' }}>
                            <ol className="list-decimal list-inside space-y-2">
                              <li>Log into the Azure Portal.</li>
                              <li>In the top search bar, type <strong style={{ color: '#38BDF8' }}>Storage accounts</strong> and select it.</li>
                              <li>Click <strong style={{ color: '#38BDF8' }}>+ Create</strong>.</li>
                              <li>
                                <strong style={{ color: '#38BDF8' }}>Fill out the Basics tab:</strong>
                                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                                  <li><strong style={{ color: '#E0F2FE' }}>Subscription & Resource Group:</strong> Select the exact same Resource Group where your Linux App Service lives to prevent cross-region data transfer fees.</li>
                                  <li><strong style={{ color: '#E0F2FE' }}>Storage account name:</strong> Enter a unique name using only lowercase letters and numbers (e.g., mystorageaccount123).</li>
                                  <li><strong style={{ color: '#E0F2FE' }}>Region:</strong> Pick the same region as your App Service.</li>
                                  <li><strong style={{ color: '#E0F2FE' }}>Performance:</strong> Choose Standard (magnetic/standard drives, which is perfectly suited for text records).</li>
                                  <li><strong style={{ color: '#E0F2FE' }}>Redundancy:</strong> Select Locally-redundant storage (LRS). This keeps your data replicated safely inside a single datacenter, providing the lowest cost tier for early development.</li>
                                </ul>
                              </li>
                              <li>Click <strong style={{ color: '#38BDF8' }}>Review + create</strong>, then click <strong style={{ color: '#38BDF8' }}>Create</strong>.</li>
                            </ol>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <p style={{ color: '#64748B' }}>Picked Azure Table Storage if your app only pulls data by an explicit ID and you want your monthly database bill to be under $0.50.</p>
                  </div>
                  <div className="pl-3" style={{ borderLeft: '2px solid rgba(56,189,248,0.2)' }}>
                    <p className="font-semibold mb-0.5" style={{ color: '#38BDF8' }}>Option 2: Azure SQL Database (Relational)</p>
                    <p style={{ color: '#64748B' }}>~$5-13/mo (Basic/Standard DTU). Use for structured data with relationships (users, orders, transactions). Supports T-SQL queries, stored procedures, and enterprise features.</p>
                  </div>
                  <div className="pl-3" style={{ borderLeft: '2px solid rgba(56,189,248,0.2)' }}>
                    <p className="font-semibold mb-0.5" style={{ color: '#38BDF8' }}>Option 3: Azure Cosmos DB (NoSQL)</p>
                    <p style={{ color: '#64748B' }}>~$25+/mo. Global distribution, multi-model support. Use for high-scale apps needing low-latency worldwide access. Overkill for small migrations.</p>
                  </div>
                  <p className="italic" style={{ color: '#64748B' }}>💡 Recommendation: Start with Azure SQL Basic (~$5/mo) for most Base44 migrations. Easy to scale up later.</p>
                </div>
              </StepItem>
              <StepSubheading label="Create App" />
              {[
                { num: "1", label: "App Services — Create a Web App", detail: "Open App Services. Click the \"Create\" dropdown and select Web App." },
                { num: "2", label: "Publish: Container", detail: "For Publish, select \"Container\" — not Code. For Operating System, select \"Linux\"." },
                { num: "3", label: "Review & Create", detail: "Click Review & Create to continue." },
              ].map((s, i) => (
                <StepItem key={i} step={s} />
              ))}
              <StepSubheading label="Move Database to Azure" />
              {[
                { num: "1", label: "Export Base44 Data", detail: "Download your data from Base44 as CSV or JSON exports from the dashboard." },
                { num: "2", label: "Provision Azure Database", detail: "Set up the database for storing application data." },
                { num: "3", label: "Import Data", detail: "Use Azure Data Studio, SSMS, or the Azure CLI to import your exported data into the new database." },
              ].map((s, i) => (
                <StepItem key={i} step={s} />
              ))}
            </div>
          </div>

          {/* Right column */}
          <div
            className="rounded-lg p-6 min-h-[60vh]"
            style={{
              border: '0.5px solid rgba(56,189,248,0.15)',
              background: 'rgba(56,189,248,0.02)',
            }}
          >
            <h2 className="text-xs tracking-widest uppercase mb-6 font-semibold" style={{ color: '#38BDF8' }}>
              Steps Recommended
            </h2>
            <RecommendedSteps />
          </div>
        </div>
      </div>
    </div>
  );
}