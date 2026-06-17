export async function generateMetadata({ params }: { params: { id: string } }) {
  const res = await fetch(`https://api.tiqets.com/v2/locations/${params.id}`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'my user agent',
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return {
      title: 'Location Not Found | Aafare',
    };
  }

  const data = await res.json();
  const location = data.location;

  if (!data.success || !location) {
    return {
      title: 'Location Not Found | Aafare',
    };
  }

  return {
    title: `${location.name} | Things to Do in ${location.city || 'Dubai'} | Aafare`,
    description: location.description || `Discover experiences and attractions at ${location.name} in ${location.city || 'Dubai'}. Book tickets online with Aafare.`,
    openGraph: {
      title: `${location.name} | Aafare`,
      description: location.description || `Discover experiences at ${location.name}`,
      images: location.images?.[0] ? [location.images[0]] : [],
      type: 'website',
    },
  };
}
