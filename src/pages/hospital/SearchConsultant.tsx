import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const specialities = [
  "All", "Allergist or Immunologist", "Anesthesiologist", "Ayurvedic Practitioners",
  "Cardiologist", "Cardiology", "Chest Physician", "Dentist", "Dermatologist",
  "Ear, Nose & Throat", "Endocrine Surgeon", "Gastroenterologist", "Gynecologist",
  "Internal Medicine Physician", "Nephrologist", "Neurologist", "Neurosurgeon",
  "Obstetrician", "Oncology", "Ophthalmologist", "Orthopaedic Surgeon",
  "Pathologist", "Pediatrician", "Physician", "Plastic Surgeon", "Psychiatrist",
  "Pulmonary Medicine Physician", "Radiation Oncologist",
];

const mockDoctors = [
  { code: "AKDI156", name: "Dr. A K DIKSHIT", department: "CONSULTANT", speciality: "OPTHALMOLOGY" },
  { code: "ARAT152", name: "Dr. A RATTAN", department: "CONSULTANT", speciality: "Anesthesiologist" },
  { code: "ACSI193", name: "Dr. A.C SINGH", department: "CONSULTANT", speciality: "EMERGENCY" },
  { code: "AKPA053", name: "Dr. A.K PANDEY/SAMSHER SINGH", department: "CONSULTANT", speciality: "Cardiologist" },
  { code: "AKSI054", name: "Dr. A.K SINGH", department: "CONSULTANT", speciality: "Pediatrician" },
  { code: "AKPA021", name: "Dr. A.K. PANDEY/RAKESH PAREEK", department: "CONSULTANT", speciality: "" },
  { code: "AKRO055", name: "Dr. A.K. ROY (I.C.U RMO)", department: "CONSULTANT", speciality: "" },
  { code: "AKGA216", name: "Dr. A.K.GARG", department: "CONSULTANT", speciality: "Internal Medicine Physician" },
  { code: "AKKE243", name: "Dr. A.K.KESHARI", department: "CONSULTANT", speciality: "" },
  { code: "ANSI130", name: "Dr. A.N SINGH", department: "CONSULTANT", speciality: "" },
  { code: "AZAN047", name: "Dr. A.Z.ANSARI", department: "CONSULTANT", speciality: "Anesthesiologist" },
  { code: "AB", name: "DR. ABHISHEK", department: "CONSULTANT", speciality: "" },
  { code: "DN1", name: "DR AHMAD", department: "", speciality: "" },
  { code: "AJAY098", name: "Dr. AJAY KR. PANDEY", department: "CONSULTANT", speciality: "Cardiologist" },
  { code: "AJAY015", name: "Dr. AJAY PANDEY/RITENDHAR MISHRA", department: "CONSULTANT", speciality: "Cardiologist" },
  { code: "AJEE218", name: "Dr. AJEET KUMAR", department: "CONSULTANT", speciality: "Internal Medicine Physician" },
];

const SearchConsultant = () => {
  const [searchText, setSearchText] = useState("");
  const [speciality, setSpeciality] = useState("All");

  const filtered = mockDoctors.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(searchText.toLowerCase()) || d.code.toLowerCase().includes(searchText.toLowerCase());
    const matchesSpec = speciality === "All" || d.speciality === speciality;
    return matchesSearch && matchesSpec;
  });

  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Search Consultant" showBack />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-4 flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="mb-1 block text-sm font-medium text-muted-foreground">Speciality</label>
            <Select value={speciality} onValueChange={setSpeciality}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {specialities.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="mb-1 block text-sm font-medium text-muted-foreground">Consultant</label>
            <div className="relative">
              <Input placeholder="Search..." value={searchText} onChange={(e) => setSearchText(e.target.value)} className="pr-10" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <Button>Show</Button>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-table-header text-primary-foreground">
                <th className="px-4 py-3 text-left font-semibold">Code</th>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Department</th>
                <th className="px-4 py-3 text-left font-semibold">Speciality</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc, i) => (
                <tr key={doc.code} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                  <td className="px-4 py-2.5 text-primary font-medium cursor-pointer hover:underline">{doc.code}</td>
                  <td className="px-4 py-2.5 text-foreground">{doc.name}</td>
                  <td className="px-4 py-2.5 text-foreground">{doc.department}</td>
                  <td className="px-4 py-2.5 text-foreground">{doc.speciality}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No records found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default SearchConsultant;
