'use client';

import { useState } from 'react';
import { DataTable } from '@/app/admin/data-table';
import { columns, type EmailTemplate } from './columns';
import { Card, CardContent } from '@/components/ui/card';

export default function EmailTemplateClientPage({
  initialTemplates,
}: {
  initialTemplates: EmailTemplate[];
}) {
  const [rowSelection, setRowSelection] = useState({});

  return (
    <Card>
      <CardContent className="pt-6">
        <DataTable
          columns={columns}
          data={initialTemplates}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          filterColumn="subject"
          filterPlaceholder="Filter by subject..."
        />
      </CardContent>
    </Card>
  );
}
