import Link from "next/link";
import { Presentation, Globe2, MapPinned } from "lucide-react";

export default function CmsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">CMS</h1>
        <p className="text-muted-foreground">Manage site content and destination sections.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/admin/hero"
          className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted transition-colors"
        >
          <Presentation className="h-8 w-8 text-primary" />
          <div>
            <p className="font-semibold">Hero Section</p>
            <p className="text-sm text-muted-foreground">Homepage hero content</p>
          </div>
        </Link>

        <Link
          href="/admin/cms/uae"
          className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted transition-colors"
        >
          <MapPinned className="h-8 w-8 text-primary" />
          <div>
            <p className="font-semibold">UAE Section</p>
            <p className="text-sm text-muted-foreground">UAE destination content</p>
          </div>
        </Link>

        <Link
          href="/admin/cms/worldwide"
          className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted transition-colors"
        >
          <Globe2 className="h-8 w-8 text-primary" />
          <div>
            <p className="font-semibold">Worldwide Section</p>
            <p className="text-sm text-muted-foreground">Global destination content</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
