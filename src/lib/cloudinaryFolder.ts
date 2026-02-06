export type PostType =
  | "post"
  | "video"
  | "reel"
  | "avatar"
  | "raw"
  | "matrimony";

export const getFolderByPostType = (postType: PostType) => {
  switch (postType) {
    case "post":
      return "ang_posts";
    case "video":
      return "ang_videos";
    case "reel":
      return "ang_reels";
    default:
      return "avatar";
  }
};
