
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SalesReportClientPage from "./sales-report-client-page";

export default function SalesReportPage() {
    // In a real application, you would fetch data here based on filters.
    const placeholderData = [];

    return (
        <div className="space-y-6">
            <header>
                 <h1 className="text-3xl font-bold tracking-tight">Sales Report</h1>
                <Breadcrumb className="mt-2">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/agent-dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Sales Report</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <SalesReportClientPage initialData={placeholderData} />
        </div>
    );
}
