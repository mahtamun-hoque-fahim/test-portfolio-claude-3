import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { desc } from "drizzle-orm";
import { InquiriesClient } from "@/components/admin/InquiriesClient";

export default async function AdminInquiriesPage() {
  const allInquiries = await db.query.inquiries.findMany({
    orderBy: [desc(inquiries.createdAt)],
  });

  const unread = allInquiries.filter((i) => !i.read).length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="label mb-2">Inbox</p>
        <h1 className="font-display text-4xl text-ink font-light">Inquiries</h1>
        <p className="text-sm text-ink-muted mt-1">
          {allInquiries.length} total
          {unread > 0 && (
            <span className="ml-2 text-accent font-medium">· {unread} unread</span>
          )}
        </p>
      </div>

      <InquiriesClient inquiries={allInquiries} />
    </div>
  );
}
