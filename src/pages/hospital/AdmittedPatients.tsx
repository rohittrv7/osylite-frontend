import AppHeader from "@/components/AppHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from "lucide-react";

const patients = [
  { admission: "06-Sep-2025 23:37", ipd: "IPR1800192", name: "Mr. test 222", ageSex: "2/M", mobile: "1231231234", consultant: "V.D. TIWARI", bed: "2992", panel: "CASH", cashCredit: "CASH", guardian: "S/ossss" },
  { admission: "06-Sep-2025 23:37", ipd: "IPR1800195", name: "Mr. cdccddcd", ageSex: "20/M", mobile: "", consultant: "V.D. TIWARI", bed: "05", panel: "CASH", cashCredit: "CASH", guardian: "S/osjsjs" },
  { admission: "06-Sep-2025 23:34", ipd: "IPR1800194", name: "Mr. testssss", ageSex: "10/M", mobile: "", consultant: "V.D. TIWARI", bed: "GW109/12", panel: "CASH", cashCredit: "CASH", guardian: "S/osbsbs" },
  { admission: "06-Sep-2025 23:33", ipd: "IPR1800193", name: "Mr. test", ageSex: "10/M", mobile: "1122334422", consultant: "V.D. TIWARI", bed: "GW109/12", panel: "CASH", cashCredit: "CASH", guardian: "S/osbsbs" },
  { admission: "06-Sep-2025 22:57", ipd: "IPR1800191", name: "Mr. test name", ageSex: "20/M", mobile: "1234567890", consultant: "A.K. PANDEY/RAKESH PAREEK", bed: "GEN110/3", panel: "CASH", cashCredit: "CASH", guardian: "S/oggggg" },
  { admission: "18-Aug-2025 17:23", ipd: "IPR1800186", name: "Mr. ABC", ageSex: "26/M", mobile: "9839800817", consultant: "A.C SINGH", bed: "GEN110/8", panel: "CASH", cashCredit: "CASH", guardian: "C/oN.K" },
  { admission: "22-Jul-2025 17:25", ipd: "IPR1800184", name: "Mr. Aman Gupta", ageSex: "25/M", mobile: "9811680150", consultant: "V.D. TIWARI", bed: "GEN107/3", panel: "E-MeditekTPA", cashCredit: "CASH", guardian: "Mr.Sanjay" },
  { admission: "09-Jul-2025 17:10", ipd: "IPR1800182", name: "Zohair Mala", ageSex: "3/M", mobile: "", consultant: "A K DIKSHIT", bed: "GEN110/2", panel: "GIPSA", cashCredit: "CASH", guardian: "" },
  { admission: "14-Jul-2024 19:39", ipd: "IPR1800164", name: "Mr. DEMOO", ageSex: "25/M", mobile: "", consultant: "HIMANSHU RAI", bed: "ICU/5", panel: "MDIndiaTPA", cashCredit: "CASH", guardian: "C/oRAM" },
  { admission: "12-Jul-2024 16:17", ipd: "IPR1800163", name: "Mr. abhijeet", ageSex: "24/M", mobile: "", consultant: "A K DIKSHIT", bed: "GEN110/1", panel: "", cashCredit: "", guardian: "D/oaman" },
];

const AdmittedPatients = () => (
  <div className="min-h-screen bg-background">
    <AppHeader title="Search Admitted Patients" showBack />
    <main className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="relative">
          <Input placeholder="Search..." className="w-56 pr-10" />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2 rounded border bg-card px-3 py-1.5">
          <span className="text-sm font-semibold text-primary">Admitted Patients</span>
          <span className="rounded bg-muted px-2 py-0.5 text-sm font-bold text-foreground">{patients.length}</span>
        </div>
        <Button variant="outline" size="sm"><RefreshCw className="h-4 w-4 mr-1" /> Refresh</Button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-table-header text-primary-foreground">
              {["Admission", "IPD No.", "Name", "Age/Sex", "Mobile", "Consultant", "Bed No", "Panel", "Cash/Credit", "Guardian Name"].map((h) => (
                <th key={h} className="px-3 py-2.5 text-left font-semibold whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {patients.map((p, i) => (
              <tr key={p.ipd} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                <td className="px-3 py-2 whitespace-nowrap text-foreground">{p.admission}</td>
                <td className="px-3 py-2 text-primary font-medium cursor-pointer hover:underline">{p.ipd}</td>
                <td className="px-3 py-2 text-foreground">{p.name}</td>
                <td className="px-3 py-2 text-foreground">{p.ageSex}</td>
                <td className="px-3 py-2 text-foreground">{p.mobile}</td>
                <td className="px-3 py-2 text-foreground">{p.consultant}</td>
                <td className="px-3 py-2 text-foreground">{p.bed}</td>
                <td className="px-3 py-2 text-foreground">{p.panel}</td>
                <td className="px-3 py-2 text-foreground">{p.cashCredit}</td>
                <td className="px-3 py-2 text-foreground">{p.guardian}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  </div>
);

export default AdmittedPatients;
