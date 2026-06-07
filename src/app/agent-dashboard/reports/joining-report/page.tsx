
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import JoiningReportClientPage from "./joining-report-client-page";

const placeholderData = [
    { no: 1, userName: 'salahdubai319', email: 'salahdubai@hotmail.com', sponsor: 'N/A', dateOfJoined: '12 Sep 2025' },
    { no: 2, userName: 'mamoorjan20318', email: 'mamoorjan20@gmail.com', sponsor: 'N/A', dateOfJoined: '10 Sep 2025' },
    { no: 3, userName: 'xisrael88317', email: 'xisrael88@gmail.com', sponsor: 'N/A', dateOfJoined: '10 Sep 2025' },
    { no: 4, userName: 'muskaanallahwala312', email: 'muskaanallahwala@gmail.com', sponsor: 'N/A', dateOfJoined: '06 Sep 2025' },
    { no: 5, userName: 'taslemhossenicmab311', email: 'taslemhossenicmab@gmail.com', sponsor: 'N/A', dateOfJoined: '04 Sep 2025' },
    { no: 6, userName: 'shivkumar64719925310', email: 'shivkumar64719925@gmail.com', sponsor: 'N/A', dateOfJoined: '04 Sep 2025' },
    { no: 7, userName: 'nvnkr5803304', email: 'nvnkr5803@gmail.com', sponsor: 'N/A', dateOfJoined: '03 Sep 2025' },
];

export default function JoiningReportPage() {

    return (
        <div className="space-y-6">
            <header>
                 <h1 className="text-3xl font-bold tracking-tight">Joining Report</h1>
                <Breadcrumb className="mt-2">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/agent-dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Joining Report</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <JoiningReportClientPage initialData={placeholderData} />
        </div>
    );
}
