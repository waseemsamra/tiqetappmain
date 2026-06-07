
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PointHistoryClientPage from "./point-history-client-page";

export default function PointHistoryPage() {
    // In a real application, you would fetch data here based on filters.
    const placeholderData = [];

    return (
        <div className="space-y-6">
            <header>
                 <h1 className="text-3xl font-bold tracking-tight">Point History Report</h1>
                <Breadcrumb className="mt-2">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/agent-dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Point History Report</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <PointHistoryClientPage initialData={placeholderData} />
        </div>
    );
}
