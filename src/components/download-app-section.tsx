
import Image from 'next/image';

const AppStoreButton = () => (
    <a href="#" className="inline-block bg-black text-white rounded-lg px-4 py-2 transition-transform hover:scale-105">
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2.25C6.075 2.25 2.25 6.075 2.25 12c0 5.925 3.825 9.75 9.75 9.75 5.925 0 9.75-3.825 9.75-9.75 0-5.925-3.825-9.75-9.75-9.75z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.442 8.528a2.52 2.52 0 00-1.74-1.12c-.596-.182-1.23.06-1.68.513-.45.451-.735 1.085-.63 1.745.105.659.54 1.205 1.11 1.446.57.24 1.23.045 1.68-.42.45-.465.675-1.08.26-1.713zm-3.03 5.484c-.405.015-.81.015-1.215 0-.765-.03-1.44-.33-1.92-.81-.48-.48-.75-1.11-.75-1.785 0-1.395 1.14-2.535 2.535-2.535.405 0 .81.06 1.215.18.705.195 1.29.69 1.62 1.335h.09c.015-.36.015-.72.015-1.08 0-1.875-1.515-3.39-3.39-3.39-1.875 0-3.39 1.515-3.39 3.39 0 1.53 1.02 2.82 2.4 3.255v.015c-1.68.48-2.85 2.025-2.85 3.825 0 .615.15 1.2.42 1.71.555 1.05 1.665 1.74 2.94 1.74.72 0 1.44-.225 2.04-.645.54-.375.96-.9 1.2-1.545a3.13 3.13 0 00.075-.48h-.12c-.3.63-.84 1.065-1.5 1.155z" />
            </svg>
            <div>
                <p className="text-xs">Download on the</p>
                <p className="text-lg font-semibold">App Store</p>
            </div>
        </div>
    </a>
);

const GooglePlayButton = () => (
    <a href="#" className="inline-block bg-black text-white rounded-lg px-4 py-2 transition-transform hover:scale-105">
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 2.992l9.84-5.682a.6.6 0 01.91 0l9.84 5.682a.6.6 0 01.305.52v11.376a.6.6 0 01-.305.52l-9.84 5.682a.6.6 0 01-.91 0L3.055 20.94a.6.6 0 01-.305-.52V3.512a.6.6 0 01.305-.52z" stroke="none" fill="currentColor" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 4.5l6 3.465 6-3.465" stroke="#000" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 7.965v8.07" stroke="#000" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12l6 3.465 6-3.465" stroke="#000" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 15.465l-6-3.465" stroke="#000" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 12l-6 3.465" stroke="#000" />
            </svg>
            <div>
                <p className="text-xs">GET IT ON</p>
                <p className="text-lg font-semibold">Google Play</p>
            </div>
        </div>
    </a>
);


export default function DownloadAppSection() {
    return (
        <div className="bg-teal-600">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-white">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            Download the AAFare app for easy access to culture
                        </h2>
                        <p className="mb-6 opacity-90 max-w-lg">
                            Make your next experience one smooth ride with the AAFare app. Use it to discover your destination, plan on the go, store your tickets offline and enjoy exclusive, app-user perks.
                        </p>
                        <div className="flex flex-wrap gap-4 mb-4">
                           <AppStoreButton />
                           <GooglePlayButton />
                        </div>
                        <p className="text-sm opacity-80">
                            Downloaded by over 5,000,000 travellers
                        </p>
                    </div>

                     <div className="relative h-80 md:h-full min-h-[300px]">
                     </div>
                </div>
            </div>
        </div>
    );
}
