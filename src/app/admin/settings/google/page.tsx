
import { GoogleSettingsForm } from "./google-settings-form";
import { getSetting } from "./actions";

export default async function GoogleSettingsPage() {
  const googleAnalyticsId = await getSetting('google_analytics_id');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Integrations & Settings</h1>
        <p className="text-muted-foreground">Manage your third-party service integrations.</p>
      </div>
      <GoogleSettingsForm initialGaId={googleAnalyticsId} />
    </div>
  );
}
