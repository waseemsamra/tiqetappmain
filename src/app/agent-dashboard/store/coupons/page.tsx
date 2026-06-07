
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CouponsClientPage from "./coupons-client-page";

type Coupon = {
    no: number;
    couponName: string;
    code: string;
    type: string;
    usedAvailable: string;
    discount: number;
    startDate: string;
    endDate: string;
    active: string;
    createdAt: string;
};

const placeholderCoupons: Coupon[] = [
  { no: 1, couponName: 'SCONTO EVENTO', code: 'evento25', type: 'Fixed', usedAvailable: '0 / 50', discount: 400.00, startDate: '14 Mar 2025', endDate: '15 Mar 2025', active: 'Yes', createdAt: '15 Mar 2025' },
  { no: 2, couponName: 'test', code: 'V57luylqbs', type: 'Fixed', usedAvailable: '0 / 1', discount: 2000.00, startDate: '06 Feb 2025', endDate: '06 Feb 2026', active: 'Yes', createdAt: '06 Feb 2025' },
  { no: 3, couponName: 'Test1', code: '123', type: 'Fixed', usedAvailable: '0 / 50', discount: 1.00, startDate: '01 Jul 2024', endDate: '31 Dec 2024', active: 'Yes', createdAt: '01 Jul 2024' },
  { no: 4, couponName: 'oneuser', code: 'j8e4tXXA5r', type: 'Fixed', usedAvailable: '0 / 1', discount: 3000.00, startDate: '27 Jun 2024', endDate: '27 Jun 2025', active: 'Yes', createdAt: '27 Jun 2024' },
  { no: 5, couponName: 'Test coupon', code: '123456', type: 'Fixed', usedAvailable: '0 / 1', discount: 100.00, startDate: '19 Mar 2024', endDate: '20 Mar 2024', active: 'Yes', createdAt: '19 Mar 2024' },
  { no: 6, couponName: '1', code: 'KGWQwrFBE8', type: 'Fixed', usedAvailable: '0 / 1', discount: 1000.00, startDate: '12 Mar 2024', endDate: '12 Mar 2025', active: 'Yes', createdAt: '12 Mar 2024' },
];

export default function CouponsPage() {
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
                            <BreadcrumbPage>Coupons</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <CouponsClientPage initialCoupons={placeholderCoupons} />
        </div>
    );
}
