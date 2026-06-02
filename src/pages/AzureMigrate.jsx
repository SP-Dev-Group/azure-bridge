import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, MoreHorizontal } from 'lucide-react';
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
            {s.extra && <p className="text-xs leading-relaxed mt-1" style={{ color: '#38BDF8' }}>{s.extra}</p>}
          </div>
          {expandable && (
            <button
              onClick={() => setOpen(o => !o)}
              className="text-xs transition-colors"
              style={{ color: open ? '#38BDF8' : '#64748B' }}
            >
              <MoreHorizontal className="w-4 h-4" />
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
              />
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
              ].map((s, i) => (
                <StepItem key={i} step={s} />
              ))}
              <StepItem
                step={{ num: "2", label: "Provision Azure Database", detail: "Set up the database for storing application data.", extra: "Picked Option 1 - Azure Table." }}
                expandable
              >
                <div className="space-y-2 text-xs">
                  <div className="pl-3" style={{ borderLeft: '2px solid rgba(56,189,248,0.2)' }}>
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <p className="font-semibold" style={{ color: '#38BDF8' }}>Option 1: Azure Table Storage (NoSQL)</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 shrink-0 rounded-full" style={{ background: 'rgba(56,189,248,0.15)', color: '#38BDF8' }}>
                            <Info className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle style={{ color: '#E0F2FE' }}>Base44 Data to Azure via Laptop/Chromebook</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 text-sm" style={{ color: '#94A3B8' }}>
                          {/* Section 1 */}
                          <div>
                            <h3 className="text-base font-bold mb-2" style={{ color: '#38BDF8' }}>1. Azure Portal Setup</h3>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                              <li>Log into the Azure Portal and search for <strong style={{ color: '#E0F2FE' }}>Storage accounts</strong>.</li>
                              <li>Select your storage account: <strong style={{ color: '#E0F2FE' }}>spbase44storage</strong>.</li>
                              <li>Scroll down the left sidebar to <strong style={{ color: '#E0F2FE' }}>Data storage</strong> and click on <strong style={{ color: '#E0F2FE' }}>Tables</strong>.</li>
                              <li>Click <strong style={{ color: '#38BDF8' }}>+ Table</strong> at the top, name it exactly <strong style={{ color: '#E0F2FE' }}>People</strong>, and click <strong style={{ color: '#38BDF8' }}>Create</strong>.</li>
                              <li>Go to <strong style={{ color: '#E0F2FE' }}>Access keys</strong> under the Security + networking section in the sidebar, and copy your <strong style={{ color: '#E0F2FE' }}>Connection string</strong>.</li>
                            </ul>
                          </div>

                          {/* Section 2 */}
                          <div>
                            <h3 className="text-base font-bold mb-2" style={{ color: '#38BDF8' }}>2. Chromebook Linux Environment Prep</h3>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                              <li>Ensure your CSV file is named <strong style={{ color: '#E0F2FE' }}>PeopleList.csv</strong> and is placed directly inside your Linux files folder on your Chromebook.</li>
                              <li>Open your Chromebook Terminal app (Penguin) and run this setup block:</li>
                            </ul>
                            <pre className="text-xs rounded-md p-3 mt-2 overflow-x-auto" style={{ background: 'rgba(56,189,248,0.05)', border: '0.5px solid rgba(56,189,248,0.15)', color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>
                        {`# Update package lists
                        sudo apt update

                        # Install Node.js if missing (checks version)
                        node -v || sudo apt install -y nodejs npm

                        # Initialize a project folder if starting fresh
                        npm init -y

                        # Install the required Azure package securely
                        npm install @azure/data-tables`}
                            </pre>
                          </div>

                          {/* Section 3 */}
                          <div>
                            <h3 className="text-base font-bold mb-2" style={{ color: '#38BDF8' }}>3. Creating the Script File</h3>
                            <p className="mb-2">Run this command to completely reset any old configurations and open a clean file named <strong style={{ color: '#E0F2FE' }}>upload.js</strong> inside the terminal text editor:</p>
                            <pre className="text-xs rounded-md p-3 overflow-x-auto" style={{ background: 'rgba(56,189,248,0.05)', border: '0.5px solid rgba(56,189,248,0.15)', color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>
                        {`> upload.js && micro upload.js`}
                            </pre>
                          </div>

                          {/* Section 4 */}
                          <div>
                            <h3 className="text-base font-bold mb-2" style={{ color: '#38BDF8' }}>4. Code Block: Master Sync Script</h3>
                            <p className="mb-2">Copy this exact code block, paste it inside your open text editor window using <strong style={{ color: '#E0F2FE' }}>Ctrl + V</strong>, then save and exit (<strong style={{ color: '#E0F2FE' }}>Ctrl + Q</strong>, then press <strong style={{ color: '#E0F2FE' }}>Y</strong>):</p>
                            <pre className="text-xs rounded-md p-3 overflow-x-auto" style={{ background: 'rgba(56,189,248,0.05)', border: '0.5px solid rgba(56,189,248,0.15)', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                        {`globalThis.crypto = require('crypto');
                        const { TableClient } = require('@azure/data-tables');
                        const fs = require('fs');

                        // Connection configuration
                        const connStr = "DefaultEndpointsProtocol=https;AccountName=spbase44storage;AccountKey=8dCkvz7rbn3JdasN3DpHAYia9AY5gAzSSf9Kt0lT2nsG1SlvAEf6F7FNseyX6B+802EGayn8KM2X+ASt33kvtA==;EndpointSuffix=core.windows.net";
                        const client = TableClient.fromConnectionString(connStr, "People");

                        async function run() {
                        try {
                        // Read and split the CSV file into an array of rows
                        const fileContent = fs.readFileSync("PeopleList.csv", "utf8");
                        const lines = fileContent.split("\\n");

                        // Extract the top header row safely without using bracket characters
                        const firstLine = lines.shift(); 
                        const headers = firstLine.replace("\\r", "").split(",").map(h => h.trim());

                        console.log("Starting upload to Azure Table 'People'...");

                        // Process each data row remaining in the array
                        for (const line of lines) {
                        if (!line.trim()) continue; // Skip empty rows

                        const values = line.replace("\\r", "").split(",");
                        let row = {};

                        // Map data fields dynamically to match headers
                        headers.forEach((h, idx) => {
                        row[h] = values[idx] ? values[idx].trim().replace(/^"|"$/g, "") : "";
                        });

                        // Establish essential Azure indexing keys
                        row.PartitionKey = row.Active || "Staff";
                        row.RowKey = row.unique_id || row.id;

                        // Push data entry to Azure cloud space if RowKey exists
                        if (row.RowKey) {
                        await client.createEntity(row);
                        console.log("Uploaded: " + row.name);
                        }
                        }
                        console.log("\\nBatch complete!");
                        } catch (err) {
                        console.error("Run error:", err.message);
                        }
                        }

                        run();`}
                            </pre>
                          </div>

                          {/* Section 5 */}
                          <div>
                            <h3 className="text-base font-bold mb-2" style={{ color: '#38BDF8' }}>5. Execution</h3>
                            <p className="mb-2">Run this final terminal command to execute the script. It parses your local files and uploads them straight to your live database:</p>
                            <pre className="text-xs rounded-md p-3 overflow-x-auto" style={{ background: 'rgba(56,189,248,0.05)', border: '0.5px solid rgba(56,189,248,0.15)', color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>
                        {`node upload.js`}
                            </pre>
                          </div>
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
              <StepItem
                step={{ num: "3", label: "Import Data", detail: "Use Azure Data Studio, SSMS, or the Azure CLI to import your exported data into the new database." }}
              />
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