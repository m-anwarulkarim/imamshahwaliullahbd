import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { FileUp, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAdminText } from "@/lib/admin-ui";
import { uploadMagazinePdf } from "@/lib/admin";

type Props = {
  onUploadingChange?: (busy: boolean) => void;
  id: string;
  value: string;
  onChange: (path: string) => void;
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

export function PdfUploadField({ id, value, onChange, onUploadingChange }: Props) {
  const a = useAdminText();
  const uploadFn = useServerFn(uploadMagazinePdf);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    onUploadingChange?.(true);
    try {
      const base64 = await toBase64(file);
      const result = await uploadFn({ data: { fileName: file.name, base64 } });
      onChange(result.path);
      toast.success(a("PDF uploaded."));
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
        <div className="flex items-center justify-between rounded-lg border border-border bg-muted px-3 py-2 text-sm">
          <span className="truncate">{value}</span>
          <Button type="button" size="icon" variant="ghost" className="h-7 w-7" onClick={() => onChange("")}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      ) : null}

      <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} disabled={uploading}>
        {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileUp className="mr-2 h-4 w-4" />}
        {a(uploading ? "Uploading…" : value ? "Replace PDF" : "Upload PDF")}
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />

      <Input id={id} value={value} placeholder={a("…or type the stored file name")} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
