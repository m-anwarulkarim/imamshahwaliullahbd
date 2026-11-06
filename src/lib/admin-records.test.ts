import { test } from "node:test";
import assert from "node:assert/strict";
import { fetchAllAdminRecords } from "./admin-records.ts";

test("all 1201 submitted orders reach the admin list, including complete customer details", async () => {
  const rows = Array.from({ length: 1201 }, (_, id) => ({ id, customer_name: `Customer ${id}`, customer_email: `customer${id}@example.com`, customer_phone: "01700000000", address: "House 206, Road 11, Dhaka", book_title: "Research book", quantity: 1, unit_price: 700 }));
  const result = await fetchAllAdminRecords(async (from, to) => ({ data: rows.slice(from, to + 1), error: null }));
  assert.equal(result.length, 1201);
  assert.deepEqual(result[1200], rows[1200]);
});

test("all 1001 course applications retain education, message and study mode", async () => {
  const rows = Array.from({ length: 1001 }, (_, id) => ({ id, full_name: `Applicant ${id}`, course: "Dawah & Research — Online", education: "Dawrah", message: "Afternoon classes", email: `applicant${id}@example.com`, phone: "01700000000" }));
  const result = await fetchAllAdminRecords(async (from, to) => ({ data: rows.slice(from, to + 1), error: null }));
  assert.equal(result.length, 1001);
  assert.deepEqual(result[1000], rows[1000]);
});

test("short-course requests preserve payment method, transaction and amount", async () => {
  const request = { full_name: "Test applicant", phone: "01700000000", course_id: "course-1", payment_method: "bKash", transaction_id: "TEST-TRANSACTION", amount: 1000, status: "pending" };
  const result = await fetchAllAdminRecords(async () => ({ data: [request], error: null }));
  assert.deepEqual(result, [request]);
});

test("a failed later page reports failure instead of displaying incomplete submissions", async () => {
  await assert.rejects(fetchAllAdminRecords(async from => from === 0 ? { data: Array.from({ length: 500 }, (_, id) => ({ id })), error: null } : { data: null, error: { message: "Connection failed" } }), /Connection failed/);
});