export function hasApprovedCourseAccess(status: string | undefined) { return status === "approved"; }
export function orderSnapshotValue(unitPrice: number, quantity: number) { return unitPrice * quantity; }
export function validateCourseFees(fee: number | null, monthlyFee: number | null) {
  return (fee === null || Number.isFinite(fee) && fee >= 0) && (monthlyFee === null || Number.isFinite(monthlyFee) && monthlyFee >= 0);
}
