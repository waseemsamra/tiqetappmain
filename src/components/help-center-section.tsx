
import { LifeBuoy } from 'lucide-react';

export default function HelpCenterSection() {
  return (
    <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-teal-600 rounded-lg shadow-lg flex items-center p-8">
                <div className="flex-shrink-0">
                    <div className="bg-white/20 rounded-full p-4">
                        <LifeBuoy className="h-12 w-12 text-white" />
                    </div>
                </div>
                <div className="ml-8">
                    <h2 className="text-2xl font-bold text-white">AAFare Help Center</h2>
                    <p className="mt-2 text-white/90">
                        Our customer service team is available 24/7 via chat, email and WhatsApp.
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}
