import { useState, type ReactNode } from "react";
import { Loader2, Search, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAdminText } from "@/lib/admin-ui";
import { downloadCsv } from "@/lib/csv";

export function QueryFailure({ retry }: { retry: () => unknown }) {
  const a = useAdminText();
  return <div role="alert" className="py-10 text-center space-y-3"><p className="text-destructive">{a("Unable to load records.")}</p><Button variant="outline" onClick={() => retry()}>{a("Retry")}</Button></div>;
}
export function RecordList<T extends { id: string }>({ title, rows, loading, error, retry, columns, searchText, extra, exportRow }: {
  title: string; rows: T[] | undefined; loading: boolean; error: unknown; retry: () => unknown;
  columns: { label: string; render: (row: T) => ReactNode }[]; searchText: (row: T) => string; extra?: ReactNode;
  exportRow?: (row: T) => Record<string, unknown>;
}) {
  const a = useAdminText();
  const [search, setSearch] = useState(""); const [page, setPage] = useState(0);
  const filtered = (rows ?? []).filter(r => searchText(r).toLowerCase().includes(search.toLowerCase()));
  const pages = Math.max(1, Math.ceil(filtered.length / 20)); const current = Math.min(page, pages - 1);
  return <section className="space-y-6"><h1 className="text-2xl font-bold text-primary">{a(title)}</h1>
    <div className="flex flex-wrap gap-3 items-center"><div className="relative w-full max-w-sm"><Search className="absolute start-3 top-3 h-4 w-4 text-muted-foreground"/><Input aria-label={a("Search")} placeholder={a("Search")} className="ps-9" value={search} onChange={e => { setSearch(e.target.value); setPage(0); }}/></div>{extra}
      {exportRow && filtered.length > 0 && <Button variant="outline" onClick={() => downloadCsv(`${title.toLowerCase().replace(/\s+/g, "-")}.csv`, filtered.map(exportRow))}><Download className="h-4 w-4 me-2"/>{a("Export CSV")}</Button>}</div>
    {loading ? <Loader2 className="animate-spin text-primary"/> : error ? <QueryFailure retry={retry}/> : filtered.length === 0 ? <p className="py-10 text-muted-foreground">{a("Nothing here yet.")}</p> : <>
      <Table><TableHeader><TableRow>{columns.map(c => <TableHead key={c.label}>{a(c.label)}</TableHead>)}</TableRow></TableHeader><TableBody>{filtered.slice(current * 20, current * 20 + 20).map(r => <TableRow key={r.id}>{columns.map(c => <TableCell key={c.label}>{c.render(r)}</TableCell>)}</TableRow>)}</TableBody></Table>
      <div className="flex items-center justify-end gap-3"><Button size="icon" variant="outline" aria-label={a("Previous")} disabled={current === 0} onClick={() => setPage(current - 1)}><ChevronLeft className="h-4 w-4"/></Button><span>{current + 1} / {pages} · {filtered.length}</span><Button size="icon" variant="outline" aria-label={a("Next")} disabled={current + 1 >= pages} onClick={() => setPage(current + 1)}><ChevronRight className="h-4 w-4"/></Button></div></>}
  </section>;
}
