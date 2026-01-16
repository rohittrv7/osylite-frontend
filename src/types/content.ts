export type PostApproval = {
  id: string;
  channel: string;
  email: string;
  type: "Post";
  preview?: string;
};

export const postApprovals: PostApproval[] = [
  {
    id: "1",
    channel: "AnG Growth",
    email: "ayonnarayanmkt@gmail.com",
    type: "Post",
    preview: "image",
  },
  {
    id: "2",
    channel: "Myrk",
    email: "meeradevi19970@gmail.com",
    type: "Post",
  },
];
