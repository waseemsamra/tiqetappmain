
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FundTransferClientPage from "./fund-transfer-client-page";

export default function FundTransferPage() {
    // In a real application, you would fetch data here based on filters.
    const placeholderData = [];

    return (
        <div className="space-y-6">
            <header>
                 <h1 className="text-3xl font-bold tracking-tight">Fund Transfer Report</h1>
                <Breadcrumb className="mt-2">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/agent-dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Fund Transfer Report</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <FundTransferClientPage initialData={placeholderData} />
        </div>
    );
}
