// Read every page rather than silently accepting the Data API's row cap.
export async function fetchAllAdminRecords<T>(
  page: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>,
): Promise<T[]> {
  const size = 500;
  const records: T[] = [];
  for (let from = 0; ; from += size) {
    const { data, error } = await page(from, from + size - 1);
    if (error) throw new Error(error.message);
    if (!data) throw new Error("Unable to load records");
    records.push(...data);
    if (data.length < size) return records;
  }
}

export const submissionListRefresh = {
  refetchInterval: 15_000,
  refetchOnMount: "always" as const,
  refetchOnWindowFocus: "always" as const,
};