import { getDestinationsConfig } from '@/app/actions';
import DestinationsConfigForm from './destinations-config-form';

export default async function DestinationsSectionPage() {
  const regions = await getDestinationsConfig();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Worldwide Destinations</h1>
        <p className="text-muted-foreground">Manage destination regions and countries displayed on the destinations page.</p>
      </div>

      <DestinationsConfigForm initialRegions={regions} />
    </div>
  );
}
