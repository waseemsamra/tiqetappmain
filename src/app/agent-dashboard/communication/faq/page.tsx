
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FaqClientPage from "./faq-client-page";

const placeholderFaqs = [
    { no: 1, question: 'you provide training for using the MLM software and managing digital content?', answer: 'Yes, many MLM software providers offer training sessions, webinars, and resources to help users effectively utilize the software and manage th' },
    { no: 2, question: 'What kind of technical support is available for MLM software users?', answer: 'Most MLM software providers offer various support channels such as email, phone, and live chat, along with comprehensive documentation an' },
    { no: 3, question: 'Can I control who accesses specific digital content?', answer: 'Yes, MLM software typically offers granular access controls, allowing you to restrict access to certain digital content based on distributor ranks or permissions' },
    { no: 4, question: 'How secure is the digital content stored in the MLM software?', answer: 'Reputable MLM software providers implement robust security measures such as data encryption, access controls, and regular backups to safeguard digital content' },
    { no: 5, question: 'Is there a limit to the size or format of digital content I can upload?', answer: 'The capabilities may vary depending on the software provider, but most MLM software supports common file formats and offers ample storage for digital content.' },
    { no: 6, question: 'What types of digital content can I distribute through MLM software?', answer: 'Besides ebooks, you can distribute various digital content such as videos, audio files, training materials, presentations, and documents' },
    { no: 7, question: 'Can I track ebook downloads and views?', answer: 'Yes, MLM software often comes with analytics features that track ebook downloads, views, and other engagement metrics' },
    { no: 8, question: 'How does the MLM software manage ebooks?', answer: 'MLM software typically provides a digital library where you can upload, organize, and manage ebooks. It allows distributors to access and distribute these ebooks to their downlines' },
    { no: 9, question: 'Can MLM sotware handle different compensation plans?', answer: 'Yes, reputable MLM software should support various compensation plans such as binary, matrix, unilevel, and hybrid plans.' },
    { no: 10, question: 'What features should I look for in MLM software?', answer: 'Key features include distributor management, commission tracking, sales analytics, e-wallet integration, e-book management, digital content distribution, and scalability' },
];

const placeholderCategories = [
    { no: 1, categoryName: 'Technical Support and Training', description: 'Technical Support and Training' },
    { no: 2, categoryName: 'Security and Privacy', description: 'Security and Privacy' },
    { no: 3, categoryName: 'Digital Content Distribution', description: 'Digital Content Distribution' },
    { no: 4, categoryName: 'Ebook Management', description: 'Ebook Management' },
    { no: 5, categoryName: 'Features and Functionality', description: 'Features and Functionality' },
    { no: 6, categoryName: 'General Information', description: 'General Information' },
];


export default function FaqPage() {
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
                            <BreadcrumbPage>FAQ's</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <FaqClientPage initialFaqs={placeholderFaqs} initialCategories={placeholderCategories} />
        </div>
    );
}
