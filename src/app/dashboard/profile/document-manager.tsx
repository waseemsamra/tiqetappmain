
'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { type UserDocument } from '@/types';
import { uploadDocumentAction, deleteDocumentAction, getDocumentsAction } from './actions';
import { Upload, FileText, Trash2, Download, RefreshCw, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const documentTypes = [
    { value: 'passport', label: 'Passport' },
    { value: 'visa', label: 'Visa' },
    { value: 'id_card', label: 'ID Card' },
    { value: 'vaccination_record', label: 'Vaccination Record' },
    { value: 'other', label: 'Other' },
];

export function DocumentManager({ userId }: { userId: string}) {
    const { toast } = useToast();
    const [documents, setDocuments] = useState<UserDocument[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, startUploadTransition] = useTransition();
    const [isDeleting, startDeleteTransition] = useTransition();
    const [isRefreshing, startRefreshTransition] = useTransition();
    const [selectedType, setSelectedType] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const refreshDocuments = () => {
        startRefreshTransition(async () => {
            try {
                const updatedDocs = await getDocumentsAction(userId);
                setDocuments(updatedDocs);
            } catch (error) {
                toast({ variant: 'destructive', title: "Failed to refresh", description: "Could not retrieve the latest documents." });
            }
        });
    }

    useEffect(() => {
        const fetchDocuments = async () => {
            setIsLoading(true);
            const initialDocs = await getDocumentsAction(userId);
            setDocuments(initialDocs);
            setIsLoading(false);
        };
        fetchDocuments();
    }, [userId]);

    const handleUpload = async () => {
        const file = fileInputRef.current?.files?.[0];
        if (!file || !selectedType) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please select a document type and choose a file.',
            });
            return;
        }

        const formData = new FormData();
        formData.append('documentType', selectedType);
        formData.append('file', file);
        
        startUploadTransition(async () => {
            const result = await uploadDocumentAction(formData);
            if (result.success) {
                toast({ title: 'Success', description: result.message });
                refreshDocuments();
                if(fileInputRef.current) fileInputRef.current.value = '';
                setSelectedType('');
            } else {
                toast({ variant: 'destructive', title: 'Upload Failed', description: result.message });
            }
        });
    };
    
    const handleDelete = async (doc: UserDocument) => {
        if (!confirm(`Are you sure you want to delete "${doc.file_name}"? This cannot be undone.`)) return;

        startDeleteTransition(async () => {
            const result = await deleteDocumentAction(doc.id);
            if (result.success) {
                toast({ title: "Success", description: result.message });
                setDocuments(docs => docs.filter(d => d.id !== doc.id));
            } else {
                toast({ variant: 'destructive', title: "Delete Failed", description: result.message });
            }
        });
    };

    const handleDownload = async (doc: UserDocument) => {
        const supabase = createClient();
        const { data, error } = await supabase.storage
            .from('user_documents')
            .download(doc.file_path);
        
        if (error) {
            toast({ variant: 'destructive', title: "Download Failed", description: error.message });
            return;
        }

        const url = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.file_name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Document Vault</CardTitle>
                <CardDescription>
                    Securely store and manage your travel documents. Files are stored in a private, encrypted bucket.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/50 mb-6">
                     <div className="space-y-2">
                        <Label htmlFor="document-type">Document Type</Label>
                         <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger id="document-type">
                                <SelectValue placeholder="Select type..." />
                            </SelectTrigger>
                            <SelectContent>
                                {documentTypes.map(type => (
                                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="file-upload">File</Label>
                        <Input id="file-upload" type="file" ref={fileInputRef} />
                    </div>
                    <div className="flex items-end">
                         <Button onClick={handleUpload} disabled={isUploading || !selectedType} className="w-full">
                            <Upload className="mr-2 h-4 w-4" />
                            {isUploading ? 'Uploading...' : 'Upload Document'}
                        </Button>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium">Uploaded Documents</h4>
                    <Button variant="ghost" size="sm" onClick={refreshDocuments} disabled={isRefreshing || isLoading}>
                        <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing || isLoading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                </div>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>File Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Uploaded On</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                       <div className="flex justify-center items-center gap-2">
                                         <Loader2 className="h-5 w-5 animate-spin" />
                                         <span>Loading documents...</span>
                                       </div>
                                    </TableCell>
                                </TableRow>
                            ) : documents.length > 0 ? (
                                documents.map(doc => (
                                    <TableRow key={doc.id}>
                                        <TableCell className="font-medium flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                            {doc.file_name}
                                        </TableCell>
                                        <TableCell>{documentTypes.find(t => t.value === doc.document_type)?.label || 'Other'}</TableCell>
                                        <TableCell>{new Date(doc.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="icon" onClick={() => handleDownload(doc)} aria-label="Download">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <Button variant="destructive" size="icon" onClick={() => handleDelete(doc)} disabled={isDeleting} aria-label="Delete">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        No documents uploaded yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
