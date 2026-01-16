import type { Column } from "@/components/CustomTable";
import CustomTable from "@/components/CustomTable";
import { customers, type Customer } from "@/types/customer";

export default function Account() {
  const customerColumns: Column<Customer>[] = [
    {
      key: "name",
      header: "Customer",
      sortable: true,
      render: (customer) => (
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
            {customer.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div>
            <div className="font-semibold">{customer.name}</div>
            <div className="text-xs text-gray-500">{customer.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Mobile",
      sortable: true,
      render: (c) => <span className="font-medium">{c.phone}</span>,
    },
    {
      key: "memberId",
      header: "Member ID",
      render: (c) => (
        <span className="text-sm text-gray-600">{c.memberId}</span>
      ),
    },
    {
      key: "pincode",
      header: "Pincode",
      render: (c) => <span>{c.pincode}</span>,
    },
    {
      key: "balance",
      header: "Balance",
      align: "right",
      render: (c) => <span className="font-semibold">ANG {c.balance}</span>,
    },
    {
      key: "role",
      header: "Role",
      align: "center",
      render: (c) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            c.role === "User"
              ? "bg-green-100 text-green-700"
              : "bg-indigo-100 text-indigo-700"
          }`}
        >
          {c.role}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Action",
      align: "center",
      render: (c) =>
        c.role === "User" ? (
          <button className="px-4 py-2 bg-black text-white rounded-xl">
            Make Associate
          </button>
        ) : (
          <button className="px-4 py-2 bg-black text-white rounded-xl">
            Make User
          </button>
        ),
    },
  ];

  return (
    <div>
      <CustomTable data={customers} columns={customerColumns} />
    </div>
  );
}
