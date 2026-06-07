
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import UserReviewsClientPage from "./user-reviews-client-page";

type Review = {
  no: number;
  product: string;
  totalReview: number;
  rating: string;
};

const placeholderReviews: Review[] = [
  { no: 1, product: 'Graphic Design Masterclass', totalReview: 1, rating: '5.0000' },
  { no: 2, product: 'Cryptocurrency Crash Course', totalReview: 1, rating: '5.0000' },
];

export default function UserReviewsPage() {
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
                            <BreadcrumbPage>User Reviews</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <UserReviewsClientPage initialReviews={placeholderReviews} />
        </div>
    );
}
