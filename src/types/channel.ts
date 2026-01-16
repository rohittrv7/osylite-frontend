export type Channel = {
  id: string;
  name: string;
  owner: string;
  logo?: string;
  createdAt: string;
  status: "Pending" | "Approved";
};


export const channels: Channel[] = [
  {
    id: "1",
    name: "Channel",
    owner: "Rahul Kumar",
    createdAt: "12 Jan 2026",
    status: "Pending",
  },
  {
    id: "2",
    name: "AnG Growth",
    owner: "Narayan Pandit",
    createdAt: "06 Jan 2026",
    status: "Approved",
  },
  {
    id: "3",
    name: "Myrk",
    owner: "M Pandit",
    createdAt: "05 Jan 2026",
    status: "Approved",
  },
];
