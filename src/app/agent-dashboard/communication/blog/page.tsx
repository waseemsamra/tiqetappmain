
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BlogClientPage from "./blog-client-page";

const placeholderBlogs = [
    { no: 1, image: 'https://picsum.photos/seed/blog1/80/60', title: 'Unlocking Knowledge: Navigating the Realm of Online Courses', description: 'Embark on a journey of continuous learning in the dynamic realm of online courses. Explore the diversity of e-learning platforms, the advantages of online learning, and the role of certifications in shaping educational journeys. Join us on the path to unlocking knowledge in the digital age.', date: '06 Mar 2024' },
    { no: 2, image: 'https://picsum.photos/seed/blog2/80/60', title: 'Mastering the Art of Online Learning: Strategies for Success', description: 'Unlock the secrets to success in online learning with effective study habits, digital literacy strategies, and tips for active engagement. Navigate the digital classroom with confidence and become a proficient online learner. Join us on the journey to mastering the art of online learning.', date: '06 Mar 2024' },
    { no: 3, image: 'https://placehold.co/80x60/EEE/31343C?text=No%20Image', title: 'Unveiling the Art of Ebook Publishing: A Guide for Aspiring Authors', description: 'Embark on a journey into the art of ebook publishing. From the rise of self-publishing to effective marketing strategies, discover the steps to bring your literary creations into the hands of readers in the vast digital marketplace. Unveil the empowering world of digital authorship.', date: '06 Mar 2024' },
    { no: 4, image: 'https://placehold.co/80x60/EEE/31343C?text=No%20Image', title: 'Elevating Your Reading Experience: A Journey into the World of Ebooks', description: 'Embark on a literary journey into the world of ebooks. Explore the evolution of digital reading, the convenience of e-reader devices, and the diverse formats that cater to individual preferences. Join us in celebrating the transformative experience of reading in the digital age.', date: '06 Mar 2024' },
];

export default function BlogPage() {
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
                            <BreadcrumbPage>Blogs</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <BlogClientPage initialBlogs={placeholderBlogs} />
        </div>
    );
}
