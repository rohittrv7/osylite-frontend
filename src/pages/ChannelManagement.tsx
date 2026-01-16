import type { Column } from "@/components/CustomTable";
import CustomTable from "@/components/CustomTable";
import { channels } from "@/types/channel";

interface Channel {
  id: number;
  name: string;
  subtitle?: string;
  owner: string;
  createdAt: string;
  status: "Pending" | "Approved";
  logo: string;
}

export default function ChannelManagement() {
  const channelColumns: Column<Channel>[] = [
    {
      key: "name",
      header: "Channel",
      render: (c) => <span className="font-semibold">{c.name}</span>,
    },
    {
      key: "owner",
      header: "Owner",
    },
    {
      key: "createdAt",
      header: "Created",
    },
    {
      key: "status",
      header: "Status",
      render: (c) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            c.status === "Approved"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {c.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Action",
      render: (c) =>
        c.status === "Pending" ? (
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-black text-white rounded-lg">
              Approve
            </button>
            <button className="px-4 py-2 border rounded-lg">Reject</button>
          </div>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
  ];

  return (
    <div>
      <CustomTable data={channels} columns={channelColumns} />
    </div>
  );
}
