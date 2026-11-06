import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAdminText } from "@/lib/admin-ui";
import { uploadContentImage } from "@/lib/admin";

type Props = {
  onUploadingChange?: (busy: boolean) => void;
  id: string;
  value: string;
  onChange: (url: string) => void;
};

function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new Error("Could not read the file."));
    reader.readAsDataURL(file);
  });
}

export function ImageUploadField({ id, value, onChange, onUploadingChange }: Props) {
  const a = useAdminText();
  const uploadFn = useServerFn(uploadContentImage);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    onUploadingChange?.(true);
    try {
      const base64 = await toBase64(file);
      const result = await uploadFn({ data: { fileName: file.name, contentType: file.type, base64 } });
      onChange(result.url);
      toast.success(a("Image uploaded."));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : a("Upload failed."));
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative w-full overflow-hidden rounded-lg border border-border bg-muted">
          <img src={value} alt={a("Selected")} className="h-40 w-full object-cover" />
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute right-2 top-2 h-7 w-7"
            onClick={() => onChange("")}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      ) : null}

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="mr-2 h-4 w-4" />
          )}
          {a(uploading ? "Uploading…" : value ? "Replace image" : "Upload image")}
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />

      <Input
        id={id}
        value={value}
        placeholder={a("…or paste an image URL")}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
