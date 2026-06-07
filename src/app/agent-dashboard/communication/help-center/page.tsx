
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import HelpCenterClientPage from "./help-center-client-page";

export default function HelpCenterPage() {
    // In a real application, you would fetch tickets data here.
    const placeholderTickets = [
        { no: 1, ticketNumber: '460-7973', from: 'demouser', date: '10 Aug 2025', subject: 'rth', status: 'Open', priority: 'Top Priority', department: 'P', category: 'View', },
        { no: 2, ticketNumber: '931-8660', from: 'indra_Jith', date: '04 Jun 2025', subject: 'commission', status: 'Open', priority: 'High Priority', department: 'P', category: 'Edit', },
        { no: 3, ticketNumber: '820-2862', from: 'demouser', date: '17 Apr 2025', subject: 'Tesch issues', status: 'Open', priority: 'Top Priority', department: 'Packages', category: 'Issue', },
        { no: 4, ticketNumber: '169-6706', from: 'demouser', date: '03 Mar 2025', subject: 'not active', status: 'Open', priority: 'High Priority', department: 'Packages', category: 'Feature Request', },
        { no: 5, ticketNumber: '106-8920', from: 'indra_Jith', date: '07 Feb 2025', subject: 'Commission', status: 'Open', priority: 'Top Priority', department: 'Products', category: 'Technical Issue', },
        { no: 6, ticketNumber: '597-3996', from: 'demouser', date: '02 Feb 2025', subject: 'd', status: 'Open', priority: 'Medium Priority', department: 'Products', category: 'Bug', },
        { no: 7, ticketNumber: '341-6003', from: 'indra_Jith', date: '29 Jan 2025', subject: 'commision', status: 'Open', priority: 'Top Priority', department: 'Products', category: 'Technical Issue', },
    ];


    return (
        <div className="space-y-6">
            <header>
                 <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
                <Breadcrumb className="mt-2">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/agent-dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Help Center</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <HelpCenterClientPage initialTickets={placeholderTickets} />
        </div>
    );
}
