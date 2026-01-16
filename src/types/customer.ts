export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  memberId: string;
  pincode: string;
  balance: number;
  role: "User" | "Associate";
  address?: string;
  lastVisit?: string;
  dueAmount: number;
};

export const customers: Customer[] = [
  {
    id: "1",
    name: "Rahul Kumar",
    email: "rahul@yopmail.com",
    phone: "9964525434",
    memberId: "009100110059000001",
    pincode: "110059",
    balance: 0,
    role: "Associate",
    address: "New Delhi",
    lastVisit: "2026-01-10",
    dueAmount: 0,
  },
  {
    id: "2",
    name: "Navin Kumar",
    email: "navinnirala83@gmail.com",
    phone: "7549050050",
    memberId: "009100800008000001",
    pincode: "800008",
    balance: 0,
    role: "User",
    address: "Patna, Bihar",
    lastVisit: "2026-01-08",
    dueAmount: 1200,
  },
  {
    id: "3",
    name: "Ram Sagar",
    email: "buvs1008@gmail.com",
    phone: "8044531525",
    memberId: "009100800001000004",
    pincode: "800001",
    balance: 0,
    role: "User",
    address: "Patna",
    lastVisit: "2026-01-05",
    dueAmount: 0,
  },
  {
    id: "4",
    name: "Amit Kumar",
    email: "jaibajrangbali12345544@gmail.com",
    phone: "9570448997",
    memberId: "009100804452000001",
    pincode: "804452",
    balance: 0,
    role: "User",
    address: "Jehanabad",
    lastVisit: "2026-01-02",
    dueAmount: 500,
  },
];
