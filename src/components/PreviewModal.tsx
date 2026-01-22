import { X } from "lucide-react";

type PreviewModalProps = {
  open: boolean;
  onClose: () => void;
  url: string;
  type: "image" | "video";
};

export function PreviewModal({ open, onClose, url, type }: PreviewModalProps) {
  if (!open) return null;
  

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 max-w-3xl w-full relative">
        <button
          onClick={onClose}
          className="absolute z-100 cursor-pointer top-3 right-3 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        {type === "image" ? (
          <img
            src={url}
            alt="Preview"
            className="w-full max-h-[70vh] object-contain rounded-lg"
          />
        ) : (
          <video
            src={url}
            controls
            autoPlay
            className="w-full max-h-[70vh] rounded-lg"
          />
        )}
      </div>
    </div>
  );
}
