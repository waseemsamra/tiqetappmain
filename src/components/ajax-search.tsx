
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Mic, Sparkles, Building, Globe } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
import type { Excursion, Country, City } from '@/types';
import { ajaxSearchExcursions } from '@/app/actions';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import VoiceVisualizer from './voice-visualizer';
import { useToast } from '@/hooks/use-toast';

interface SearchResults {
    countries: Country[];
    cities: City[];
    activities: Excursion[];
}

export function AjaxSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>({ countries: [], cities: [], activities: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const handleSearchRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsDropdownOpen(false);
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };
  
  const debouncedSearch = useDebouncedCallback(async (currentQuery: string) => {
    if (currentQuery.length < 1) {
      setResults({ countries: [], cities: [], activities: [] });
      setIsLoading(false);
      setIsDropdownOpen(false);
      return;
    }
    
    try {
      const data = await ajaxSearchExcursions(currentQuery);
      setResults(data || { countries: [], cities: [], activities: [] });
      setIsDropdownOpen(true);
    } catch (error) {
      console.error(error);
      setResults({ countries: [], cities: [], activities: [] });
    } finally {
      setIsLoading(false);
    }
  }, 300);

  useEffect(() => {
    if (query && !isListening) { // Don't trigger text search while listening
      setIsLoading(true);
      debouncedSearch(query);
    } else if (!query) {
      setResults({ countries: [], cities: [], activities: [] });
      setIsLoading(false);
      setIsDropdownOpen(false);
    }
  }, [query, debouncedSearch, isListening]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Voice Search ---
  useEffect(() => {
    // Check for browser support and initialize SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        setQuery(transcript);
        recognitionRef.current.finalTranscript = transcript;
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        // After voice input ends, submit the search
        if (recognitionRef.current.finalTranscript) {
             router.push(`/search?query=${encodeURIComponent(recognitionRef.current.finalTranscript)}`);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        toast({
          variant: 'destructive',
          title: 'Voice Search Error',
          description: event.error === 'not-allowed' ? 'Microphone access denied.' : 'An error occurred during voice recognition.',
        });
        setIsListening(false);
      };
    }
  }, [toast, router]);

  const handleVoiceSearch = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (recognitionRef.current) {
        setQuery('');
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        toast({
          variant: 'destructive',
          title: 'Unsupported Browser',
          description: 'Your browser does not support voice search.',
        });
      }
    }
  };

  // --- Geolocation Search ---
  const handleLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          router.push(`/search/ai-results?lat=${latitude}&lon=${longitude}`);
        },
        (error) => {
            toast({
                variant: 'destructive',
                title: 'Location Error',
                description: 'Could not get your location. Please enable location services.',
            });
          console.error("Geolocation error:", error);
        }
      );
    } else {
      toast({
          variant: 'destructive',
          title: 'Unsupported Browser',
          description: 'Your browser does not support geolocation.',
      });
    }
  };


  return (
    <div className="max-w-3xl w-full relative" ref={searchContainerRef}>
        <div className="relative">
            <form onSubmit={handleSearchRedirect} className="bg-white rounded-full shadow-2xl p-2 flex items-center gap-1">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder="Search for attractions, destinations"
                    className="pl-12 text-base border-0 focus-visible:ring-0 shadow-none h-14 bg-transparent rounded-full"
                    />
                </div>
                <Button variant="ghost" size="icon" type="button" onClick={handleVoiceSearch} title="Search by voice" className="rounded-full w-12 h-12">
                    {isListening ? <VoiceVisualizer /> : <Mic className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" type="button" onClick={handleLocationSearch} title="Find nearby attractions" className="rounded-full w-12 h-12">
                    <MapPin className="h-5 w-5" />
                </Button>
                <Button 
                type="submit"
                className="px-8 h-14 text-base font-semibold rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                title="Search"
                >
                Search
                </Button>
            </form>
            <Button asChild variant="ghost" className="hidden sm:flex rounded-full h-12 absolute right-[14rem] top-1/2 -translate-y-1/2">
                <Link href="/concierge">
                    <Sparkles className="mr-2 h-5 w-5 text-purple-500"/>
                    AI Chat
                </Link>
            </Button>
        </div>
        
        {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-2xl border max-h-96 overflow-y-auto z-20">
                {isLoading && <div className="p-4 text-center text-muted-foreground">Loading...</div>}
                {!isLoading && (results.countries.length > 0 || results.cities.length > 0 || results.activities.length > 0) && (
                    <ul>
                        {results.countries.length > 0 && (
                            <>
                                <li className="px-3 py-2 text-xs font-semibold text-muted-foreground bg-muted/50">Countries</li>
                                {results.countries.map((country) => (
                                    <li key={`country-${country.id}`}>
                                        <Link href={`/country/${encodeURIComponent(country.name)}`} className="flex items-center gap-4 p-3 hover:bg-muted">
                                            <Globe className="h-5 w-5 text-muted-foreground" />
                                            <div><p className="font-semibold">{country.name}</p></div>
                                        </Link>
                                    </li>
                                ))}
                            </>
                        )}
                        {results.cities.length > 0 && (
                             <>
                                <li className="px-3 py-2 text-xs font-semibold text-muted-foreground bg-muted/50">Cities</li>
                                {results.cities.map((city: any) => (
                                    <li key={`city-${city.id}`}>
                                        <Link href={`/city/${encodeURIComponent(city.name)}`} className="flex items-center gap-4 p-3 hover:bg-muted">
                                            <Building className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                              <p className="font-semibold">{city.name}</p>
                                              <p className="text-sm text-muted-foreground">{city.country.name}</p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                             </>
                        )}
                        {results.activities.length > 0 && (
                            <>
                                <li className="px-3 py-2 text-xs font-semibold text-muted-foreground bg-muted/50">Activities</li>
                                {results.activities.map((ex) => (
                                   <li key={ex.id}>
                                        <Link href={`/excursions/${ex.id}`} className="flex items-center gap-4 p-3 hover:bg-muted">
                                            <Image src={ex.images[0]} alt={ex.name} width={48} height={48} className="rounded-md object-cover" />
                                            <div>
                                                <p className="font-semibold">{ex.name}</p>
                                                <p className="text-sm text-muted-foreground">{ex.city}, {ex.country}</p>
                                            </div>
                                        </Link>
                                   </li>
                                ))}
                            </>
                        )}
                    </ul>
                )}
                {!isLoading && query.length >= 1 && results.countries.length === 0 && results.cities.length === 0 && results.activities.length === 0 && (
                     <div className="p-4 text-center text-muted-foreground">No results found for "{query}".</div>
                )}
            </div>
        )}
    </div>
  );
}
