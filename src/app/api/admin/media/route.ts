import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { deleteCloudinaryImage } from "@/lib/cloudinary";

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { publicId } = await req.json();
    if (!publicId) return NextResponse.json({ error: "publicId required" }, { status: 400 });

    await deleteCloudinaryImage(publicId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Media delete error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
