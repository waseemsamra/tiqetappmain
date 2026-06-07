
import { getHeroContent } from "@/lib/hero";
import { HeroForm } from "./hero-form";

export default async function HeroContentPage() {
  const heroContent = await getHeroContent();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Manage Hero Content</h1>
        <p className="text-muted-foreground">Update the content for the homepage hero section.</p>
      </div>
      <HeroForm heroContent={heroContent} />
    </div>
  );
}
