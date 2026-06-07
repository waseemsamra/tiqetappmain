
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import EventsClientPage from "./events-client-page";

const placeholderEvents = [
  { no: 1, type: 'Offline', url: 'Grand City Hotel', zoomPassword: '', from: '07 Mar 2024', time: '00:00', duration: '03:00:00', host: 'mlmadmin', topic: 'Invitation: Exclusive Offline Event for Titanium Triumph Package' },
  { no: 2, type: 'Webinar', url: 'https://zoom.us/postattendee?mn=2ciELp5h1qz2DumqGZ4R87r5NzVlfn_ECoPM.rdnotebpLW-pzz_n', zoomPassword: 'rtyhtyh', from: '07 Mar 2024', time: '00:00', duration: '02:04:00', host: 'mlmadmin', topic: 'Unlock the Power of MLM Software: Join Our Exclusive Webinar' },
  { no: 3, type: 'Webinar', url: 'https://us04web.zoom.us/j/79456801234?pwd=bmSjyJCoaqgU9V1Himr5HGcpqdNYe5.1', zoomPassword: 'YnnJ45', from: '07 Mar 2024', time: '00:00', duration: '02:04:00', host: 'mlmadmin', topic: 'Discover Tranquil Echoes: Join Our Exclusive Webinar!' },
  { no: 4, type: 'Webinar', url: 'https://us04web.zoom.us/j/76767676767?pwd=bmSjy.JCoaqgU9V1Himr5HGcpqdNYe5.1', zoomPassword: 'Rtyug', from: '07 Mar 2024', time: '00:00', duration: '04:03:00', host: 'mlmadmin', topic: 'Unveiling Aurora Meltdown: Exclusive Digital Music Webinar' },
  { no: 5, type: 'Webinar', url: 'https://us04web.zoom.us/j/79456801234?pwd=bmSjyJCoaqgU9V1Himr5HGcpqdNYe5.1', zoomPassword: 'Axyna', from: '08 Mar 2024', time: '00:00', duration: '02:00:00', host: 'mlmadmin', topic: 'Exclusive Event: Unveiling Project Packages Extravaganza' },
  { no: 6, type: 'Twitter', url: 'Grand City Hotel', zoomPassword: '', from: '08 Mar 2024', time: '00:00', duration: '00:00:00', host: 'mlmadmin', topic: 'Join Us for an Exclusive Event: Empires of Etheria' },
  { no: 7, type: 'Webinar', url: 'https://us04web.zoom.us/j/76767676767?pwd=bmSjyJCoaqgU9V1Himr5HGcpqdNYe5.1', zoomPassword: 'Tyodp', from: '13 Mar 2024', time: '00:00', duration: '02:02:00', host: 'mlmadmin', topic: 'Master Web Development: Dive into Web Development Fundamentals - Online Course' },
  { no: 8, type: 'Webinar', url: 'https://us04web.zoom.us/j/76767676767?pwd=bmSjyJCoaqgU9V1Himr5HGcpqdNYe5.1', zoomPassword: 'Werty', from: '14 Mar 2024', time: '00:00', duration: '04:01:00', host: 'mlmadmin', topic: 'Immerse in Melodies of the Mind: Exclusive Digital Music Webinar' },
  { no: 9, type: 'Offline', url: 'Symphony Hall', zoomPassword: '', from: '20 Mar 2024', time: '00:00', duration: '02:01:00', host: 'mlmadmin', topic: 'Harmony of Hope: Exclusive Offline Music Experience Event' },
  { no: 10, type: 'Webinar', url: 'https://us04web.zoom.us/j/76767676767?pwd=bmSjyJCoaqgU9V1Himr5HGcpqdNYe5.1', zoomPassword: 'YnnJ45', from: '30 Mar 2024', time: '01:00', duration: '02:00:00', host: 'mlmadmin', topic: 'Exploring \'Voyage to the Unknown\' - Exclusive Webinar' },
];

export default function EventsPage() {
    return (
        <div className="space-y-6">
            <header>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/agent-dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Events</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <EventsClientPage initialEvents={placeholderEvents} />
        </div>
    );
}
