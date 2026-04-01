import { getMediaLibrary } from "@/lib/cloudinary";
import { MediaLibraryClient } from "@/components/admin/MediaLibraryClient";

export default async function AdminMediaPage() {
  let media: Array<{
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
    bytes: number;
    created_at: string;
    format: string;
  }> = [];

  try {
    media = await getMediaLibrary("portfolio");
  } catch {
    // Cloudinary not configured yet — show empty state
  }

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="label mb-2">Assets</p>
          <h1 className="font-display text-4xl text-ink font-light">Media Library</h1>
          <p className="text-sm text-ink-muted mt-1">
            {media.length} {media.length === 1 ? "asset" : "assets"} in Cloudinary
          </p>
        </div>
      </div>

      <MediaLibraryClient initialMedia={media} />
    </div>
  );
}
