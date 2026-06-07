export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const imageSchema = z.instanceof(File)
  .refine((file) => file.size > 0, "Image is required.")
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  );

export async function POST(request: Request) {
    const formData = await request.formData();
    const imageFiles = formData.getAll('images') as File[];
    const imagePaths: string[] = [];

    if (!imageFiles || imageFiles.length === 0) {
        return NextResponse.json({ error: 'No images provided' }, { status: 400 });
    }

    for (const file of imageFiles) {
        const validation = imageSchema.safeParse(file);
        if (!validation.success) {
            return NextResponse.json({ error: 'Image validation failed' }, { status: 400 });
        }
    }

    const uploadDir = join(process.cwd(), 'public/uploads');

    try {
        await mkdir(uploadDir, { recursive: true });
    } catch (error: any) {
        if (error.code !== 'EEXIST') {
            console.error('Error creating upload directory:', error);
            return NextResponse.json({ error: 'Could not create upload directory.' }, { status: 500 });
        }
    }
    
    for (const file of imageFiles) {
        try {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filename = `${Date.now()}-${file.name.toLowerCase().replaceAll(' ', '-')}`;
            const path = join(uploadDir, filename);
            await writeFile(path, buffer);
            imagePaths.push(`/uploads/${filename}`);
        } catch (error) {
            console.error('Error saving file:', error);
            return NextResponse.json({ error: `Failed to save image: ${file.name}` }, { status: 500 });
        }
    }

    return NextResponse.json({ imagePaths }, { status: 200 });
}

