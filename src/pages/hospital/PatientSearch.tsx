import AppHeader from "@/components/AppHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RefreshCw } from "lucide-react";

const PatientSearch = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Patient Search" showBack />
      <main className="flex gap-0 h-[calc(100vh-56px)]">
        {/* Sidebar Filters */}
        <aside className="w-64 border-r bg-card p-4 flex flex-col gap-4 overflow-y-auto shrink-0">
          <Button variant="outline" size="sm" className="w-fit">
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
          <Select defaultValue="today">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
          <div>
            <label className="text-sm font-medium text-foreground">Name</label>
            <Input placeholder="name" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">From Date</label>
            <Input type="date" defaultValue="2026-03-07" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">To Date</label>
            <Input type="date" defaultValue="2026-03-07" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Consultant Incharge</label>
            <Input placeholder="Select Consultant" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="hide-cons" defaultChecked />
            <label htmlFor="hide-cons" className="text-sm text-foreground">Hide Not in use Consultant</label>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Select Speciality</label>
            <Input placeholder="Select Speciality" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Panels</label>
            <Input placeholder="Select Panels" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="hide-panels" defaultChecked />
            <label htmlFor="hide-panels" className="text-sm text-foreground">Hide Not in use Panels</label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="print-diag" defaultChecked />
            <label htmlFor="print-diag" className="text-sm text-foreground">Print Last diagnosis in Report</label>
          </div>
        </aside>

        {/* Main Table */}
        <div className="flex-1 overflow-auto p-4">
          <div className="text-sm font-semibold text-primary mb-2">Patient Search</div>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-table-header text-primary-foreground">
                  {["Code", "Name", "Sex", "DOB", "Email", "Guardian Name", "Mobile No", "Phone No1"].map((h) => (
                    <th key={h} className="px-3 py-2.5 text-left font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">No records to view</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Rows-0 &nbsp;|&nbsp; Page 1 of 0</div>
        </div>
      </main>
    </div>
  );
};

export default PatientSearch;
