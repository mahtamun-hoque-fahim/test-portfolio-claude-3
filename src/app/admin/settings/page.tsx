import { getAllSettings } from "@/lib/queries/settings";
import { SettingsClient } from "@/components/admin/SettingsClient";

export default async function AdminSettingsPage() {
  const settings = await getAllSettings();

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <p className="label mb-2">Configuration</p>
        <h1 className="font-display text-4xl text-ink font-light">Site Settings</h1>
        <p className="text-sm text-ink-muted mt-1">
          Changes update the live site immediately.
        </p>
      </div>

      <SettingsClient settings={settings} />
    </div>
  );
}
