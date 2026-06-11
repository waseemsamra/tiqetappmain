'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Trash2, Save, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function DestinationsConfigForm({ initialRegions }: { initialRegions: { name: string; countries: string[] }[] }) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [regions, setRegions] = useState<{ name: string; countries: string[] }[]>(() =>
    initialRegions.length ? initialRegions : [{ name: '', countries: [''] }]
  );

  const addRegion = () => setRegions([...regions, { name: '', countries: [''] }]);

  const removeRegion = (idx: number) => {
    if (regions.length === 1) return;
    setRegions(regions.filter((_, i) => i !== idx));
  };

  const updateRegionName = (idx: number, name: string) => {
    const updated = [...regions];
    updated[idx] = { ...updated[idx], name };
    setRegions(updated);
  };

  const addCountry = (regionIdx: number) => {
    const updated = [...regions];
    updated[regionIdx] = { ...updated[regionIdx], countries: [...updated[regionIdx].countries, ''] };
    setRegions(updated);
  };

  const removeCountry = (regionIdx: number, countryIdx: number) => {
    const updated = [...regions];
    const countries = updated[regionIdx].countries.filter((_, i) => i !== countryIdx);
    updated[regionIdx] = { ...updated[regionIdx], countries: countries.length ? countries : [''] };
    setRegions(updated);
  };

  const updateCountry = (regionIdx: number, countryIdx: number, value: string) => {
    const updated = [...regions];
    const countries = [...updated[regionIdx].countries];
    countries[countryIdx] = value;
    updated[regionIdx] = { ...updated[regionIdx], countries };
    setRegions(updated);
  };

  const handleSubmit = async () => {
    const payload = regions.map(r => ({
      name: r.name.trim(),
      countries: r.countries.map(c => c.trim()).filter(Boolean),
    })).filter(r => r.name);

    if (!payload.length) {
      toast({ variant: 'destructive', title: 'Validation Error', description: 'At least one region with a name is required.' });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/destinations-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Failed to save');
      toast({ title: 'Saved', description: 'Destination regions updated successfully.' });
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: err instanceof Error ? err.message : 'Unknown error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {regions.map((region, regionIdx) => (
        <div key={regionIdx} className="rounded-lg border bg-card p-4 space-y-3">
          <div className="flex items-center gap-2">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
            <Input
              value={region.name}
              onChange={(e) => updateRegionName(regionIdx, e.target.value)}
              placeholder="Region name (e.g. Europe, the Middle East and Africa)"
              className="font-semibold"
            />
            <Button variant="ghost" size="icon" onClick={() => removeRegion(regionIdx)} disabled={regions.length <= 1}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          <div className="ml-6 space-y-2">
            {region.countries.map((country, countryIdx) => (
              <div key={countryIdx} className="flex items-center gap-2">
                <Input
                  value={country}
                  onChange={(e) => updateCountry(regionIdx, countryIdx, e.target.value)}
                  placeholder="Country name"
                />
                <Button variant="ghost" size="icon" onClick={() => removeCountry(regionIdx, countryIdx)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => addCountry(regionIdx)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Country
            </Button>
          </div>
        </div>
      ))}

      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={addRegion}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Region
        </Button>
        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? (
            'Saving...'
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
