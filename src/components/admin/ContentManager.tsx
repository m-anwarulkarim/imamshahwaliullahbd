import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { useAdminText } from "@/lib/admin-ui";
import { QueryFailure } from "@/components/admin/RecordList";
import { PdfUploadField } from "@/components/admin/PdfUploadField";

export type FieldType = "text" | "textarea" | "number" | "date" | "switch" | "image" | "pdf" | "select" | "datetime";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
};

type Row = Record<string, unknown> & { id: string };

type Props = {
  title: string;
  description: string;
  fields: FieldConfig[];
  columns: { key: string; label: string }[];
  rows: Row[] | undefined;
  isLoading: boolean;
  error?: unknown;
  createOnOpen?: boolean;
  onCreate: (values: Record<string, unknown>) => Promise<unknown>;
  onUpdate: (id: string, values: Record<string, unknown>) => Promise<unknown>;
  onDelete: (id: string) => Promise<unknown>;
  onChanged: () => void;
};

function emptyValues(fields: FieldConfig[]) {
  const v: Record<string, unknown> = {};
  for (const f of fields) v[f.name] = f.type === "switch" ? true : f.type === "number" ? 0 : f.type === "select" ? (f.options?.[0] ?? "") : "";
  return v;
}

export function ContentManager({
  title,
  description,
  fields,
  columns,
  rows,
  isLoading,
  error,
  createOnOpen,
  onCreate,
  onUpdate,
  onDelete,
  onChanged,
}: Props) {
  const a = useAdminText();
  const [uploads, setUploads] = useState<Record<string, boolean>>({});
  const uploading = Object.values(uploads).some(Boolean);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const filtered = (rows ?? []).filter(row => columns.some(c => String(row[c.key] ?? "").toLowerCase().includes(search.toLowerCase())));
  const pages = Math.max(1, Math.ceil(filtered.length / 20));
  const current = Math.min(page, pages - 1);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, unknown>>(() => emptyValues(fields));
  const [saving, setSaving] = useState(false);

  function openCreate() {
    setEditingId(null);
    setValues(emptyValues(fields));
    setOpen(true);
  }

  function openEdit(row: Row) {
    const v: Record<string, unknown> = {};
    for (const f of fields) v[f.name] = (f.type === "datetime" && row[f.name] ? String(row[f.name]).slice(0, 16) : row[f.name]) ?? (f.type === "switch" ? false : f.type === "number" ? 0 : "");
    setValues(v);
    setEditingId(row.id);
    setOpen(true);
  }

  useEffect(() => { if (createOnOpen) openCreate(); }, [createOnOpen]);

  async function save() {
    if (saving || uploading) return;
    for (const f of fields) {
      if (f.required && (values[f.name] === "" || values[f.name] == null)) {
        toast.error(a(f.label));
        return;
      }
    }
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {};
      for (const f of fields) {
        const raw = values[f.name];
        payload[f.name] =
          f.type === "number"
            ? Number(raw)
            : f.type === "switch"
              ? Boolean(raw)
              : raw === ""
                ? f.required
                  ? ""
                  : null
                : raw;
      }
      for (const f of fields) {
        if (f.type === "number" && (!Number.isFinite(Number(payload[f.name])) || Number(payload[f.name]) < 0)) throw new Error(a(f.label));
        if (f.type === "image" && payload[f.name] && !/^(https?:\/\/|\/(?!\/))/.test(String(payload[f.name]))) throw new Error(a(f.label));
      }
      if (editingId) await onUpdate(editingId, payload);
      else await onCreate(payload);
      toast.success(a(editingId ? "Updated successfully." : "Created successfully."));
      setOpen(false);
      onChanged();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : a("Something went wrong."));
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (deleting) return;
    if (!window.confirm(a("Delete this item permanently?"))) return;
    setDeleting(true);
    try {
      await onDelete(id);
      toast.success(a("Deleted."));
      onChanged();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : a("Something went wrong."));
    } finally { setDeleting(false); }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">{a(title)}</h1>
          
        </div>
        <Button onClick={openCreate}>
          <Plus className="w-4 h-4 mr-2" /> {a("New")}
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>{isLoading || error ? "—" : filtered.length}</CardTitle>
          <Input aria-label={a("Search")} placeholder={a("Search")} value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? <QueryFailure retry={onChanged} /> : filtered.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">{a("Nothing here yet.")}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((c) => (
                    <TableHead key={c.key}>{a(c.label)}</TableHead>
                  ))}
                  <TableHead className="text-right">{a("Actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.slice(current * 20, current * 20 + 20).map((row) => (
                  <TableRow key={row.id}>
                    {columns.map((c) => (
                      <TableCell key={c.key} className="max-w-[260px] truncate">
                        {typeof row[c.key] === "boolean"
                          ? row[c.key]
                            ? "Yes"
                            : "No"
                          : String(row[c.key] ?? "—")}
                      </TableCell>
                    ))}
                    <TableCell className="text-right space-x-2 whitespace-nowrap">
                      <Button size="sm" variant="outline" aria-label={a("Edit")} onClick={() => openEdit(row)}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="sm" variant="destructive" disabled={deleting} aria-label={a("Delete")} onClick={() => void remove(row.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <div className="flex justify-end gap-3 mt-4"><Button variant="outline" disabled={current === 0} onClick={() => setPage(current - 1)}>{a("Previous")}</Button><span>{current + 1} / {pages}</span><Button variant="outline" disabled={current + 1 >= pages} onClick={() => setPage(current + 1)}>{a("Next")}</Button></div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={next => { if (!saving && !uploading) setOpen(next); }}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{a(editingId ? "Edit" : "New")} {a(title)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {fields.map((f) => (
              <div key={f.name} className="space-y-2">
                <Label htmlFor={f.name}>{a(f.label)}</Label>
                {f.type === "select" ? <Select value={String(values[f.name] ?? "")} onValueChange={value => setValues(v => ({ ...v, [f.name]: value }))}><SelectTrigger id={f.name}><SelectValue/></SelectTrigger><SelectContent>{f.options?.map(option => <SelectItem key={option} value={option}>{a(option)}</SelectItem>)}</SelectContent></Select> : f.type === "textarea" ? (
                  <Textarea
                    id={f.name}
                    rows={4}
                    value={String(values[f.name] ?? "")}
                    placeholder={f.placeholder ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                  />
                ) : f.type === "switch" ? (
                  <div>
                    <Switch
                      id={f.name}
                      checked={Boolean(values[f.name])}
                      onCheckedChange={(checked) => setValues((v) => ({ ...v, [f.name]: checked }))}
                    />
                  </div>
                ) : f.type === "image" ? (
                  <ImageUploadField
                    id={f.name}
                    value={String(values[f.name] ?? "")}
                    onUploadingChange={busy => setUploads(v => ({ ...v, [f.name]: busy }))}
                    onChange={(url) => setValues((v) => ({ ...v, [f.name]: url }))}
                  />
                ) : f.type === "pdf" ? (
                  <PdfUploadField
                    id={f.name}
                    value={String(values[f.name] ?? "")}
                    onUploadingChange={busy => setUploads(v => ({ ...v, [f.name]: busy }))}
                    onChange={(path) => setValues((v) => ({ ...v, [f.name]: path }))}
                  />
                ) : (
                  <Input
                    id={f.name}
                    type={f.type === "number" ? "number" : f.type === "date" ? "date" : f.type === "datetime" ? "datetime-local" : "text"}
                    step={f.type === "number" ? "0.01" : undefined}
                    value={String(values[f.name] ?? "")}
                    placeholder={f.placeholder ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" disabled={saving || uploading} onClick={() => setOpen(false)}>
              {a("Cancel")}
            </Button>
            <Button onClick={() => void save()} disabled={saving || uploading}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {a("Save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
