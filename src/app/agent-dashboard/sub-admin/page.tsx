import { SubAdminClientPage } from './sub-admin-client-page';
import { Suspense } from 'react';

export default function SubAdminPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SubAdminClientPage />
        </Suspense>
    )
}
