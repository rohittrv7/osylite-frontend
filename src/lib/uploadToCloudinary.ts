import axios from "axios";
import { getFolderByPostType, type PostType } from "./cloudinaryFolder";
import type { CloudinarySignatureResponse } from "@/types/cloudinary";

interface UploadParams {
  file: File;
  postType: PostType;

  getSignature: (args: {
    folder: string;
  }) => Promise<CloudinarySignatureResponse>;

  onProgress?: (percent: number) => void;
}

export const uploadToCloudinary = async ({
  file,
  postType,
  getSignature,
  onProgress,
}: UploadParams) => {
  const folder = getFolderByPostType(postType);

  const sigRes = await getSignature({ folder });

  const { signature, timestamp, cloudName, apiKey } = sigRes;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);
  formData.append("folder", folder);
  // formData.append("eager", "w_400,h_300,c_pad");

  const uploadRes = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    formData,
    {
      onUploadProgress: (progressEvent) => {
        if (!progressEvent.total) return;
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        onProgress?.(percent);
      },
    },
  );

  return uploadRes.data;
};
