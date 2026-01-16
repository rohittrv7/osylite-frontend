import CustomTable, { type Column } from "@/components/CustomTable";
import { postApprovals, type PostApproval } from "@/types/content";

export default function ContentManagement() {
  const postApprovalColumns: Column<PostApproval>[] = [
  {
    key: "channel",
    header: "Channel",
    sortable: true,
    render: (post) => (
      <div>
        <div className="font-semibold text-gray-900 dark:text-white">
          {post.channel}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {post.email}
        </div>
      </div>
    ),
  },
  {
    key: "type",
    header: "Type",
    align: "center",
    render: (post) => (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
        {post.type}
      </span>
    ),
  },
  {
    key: "preview",
    header: "Preview",
    align: "center",
    render: (post) =>
      post.preview === "image" ? (
        <div className="w-20 h-12 rounded-lg overflow-hidden border">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c"
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <span className="text-sm text-gray-500">Text only</span>
      ),
  },
  {
    key: "actions",
    header: "Action",
    align: "center",
    render: () => (
      <div className="flex items-center justify-center gap-2">
        <button className="px-4 py-2 bg-black text-white rounded-xl hover:opacity-90">
          Approve
        </button>
        <button className="px-4 py-2 border rounded-xl hover:bg-gray-50">
          Reject
        </button>
      </div>
    ),
  },
];

  return (
    <div>
      <CustomTable data={postApprovals} columns={postApprovalColumns} />
    </div>
  );
}
