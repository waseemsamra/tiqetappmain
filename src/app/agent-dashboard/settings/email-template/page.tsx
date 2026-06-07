import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import EmailTemplateClientPage from './email-template-client-page';
import type { EmailTemplate } from './columns';

const placeholderTemplates: EmailTemplate[] = [
  { no: 1, name: 'Welcome Email', sendGridId: '-', language: 'en', subject: 'Welcome Email' },
  { no: 2, name: 'Welcome Email', sendGridId: '-', language: 'ar', subject: 'ترحيب البريد الإلكتروني' },
  { no: 3, name: 'Welcome Email', sendGridId: '-', language: 'es', subject: 'Correo electrónico de bienvenida' },
  { no: 4, name: 'Welcome Email', sendGridId: '-', language: 'pt', subject: 'E-mail de boas-vindas' },
  { no: 5, name: 'Welcome Email', sendGridId: '-', language: 'de', subject: 'Willkommens-E-Mail' },
  { no: 6, name: 'Welcome Email', sendGridId: '-', language: 'ja', subject: 'ウェルカムメール' },
  { no: 7, name: 'Welcome Email', sendGridId: '-', language: 'it', subject: 'E-mail di benvenuto' },
  { no: 8, name: 'Welcome Email', sendGridId: '-', language: 'zh', subject: '欢迎电子邮件' },
  { no: 9, name: 'Welcome Email', sendGridId: '-', language: 'ru', subject: 'Приветственное письмо' },
  { no: 10, name: 'Forgot Password', sendGridId: '-', language: 'en', subject: 'Forgot Password Email' },
  { no: 11, name: 'Forgot Password', sendGridId: '-', language: 'ar', subject: 'نسيت كلمة المرور البريد الإلكتروني' },
  { no: 12, name: 'Forgot Password', sendGridId: '-', language: 'es', subject: 'Olvidé mi contraseña' },
  { no: 13, name: 'Forgot Password', sendGridId: '-', language: 'pt', subject: 'Esqueci a senha do e-mail' },
];

export default function EmailTemplatePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Email Template</h1>
        <Breadcrumb className="mt-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/agent-dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Email Template</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <EmailTemplateClientPage initialTemplates={placeholderTemplates} />
    </div>
  );
}
