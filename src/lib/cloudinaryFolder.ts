export type PostType = "post" | "video" | "reel";

export const getFolderByPostType = (postType: PostType) => {
  switch (postType) {
    case "post":
      return "ang_posts";
    case "video":
      return "ang_videos";
    case "reel":
      return "ang_reels";
    default:
      return "ang_default";
  }
};
