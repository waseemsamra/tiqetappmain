
"use client";

import { useEffect, useState, useRef } from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { updateHeroContentAction, type FormState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { HeroContent } from '@/types';
import { ImagePlus, X } from 'lucide-react';

const formSchema = z.object({
  headline: z.string().min(5, "Headline must be at least 5 characters long."),
  subheading: z.string().min(10, "Subheading must be at least 10 characters long."),
});

type FormData = z.infer<typeof formSchema>;

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? 'Saving...' : 'Save Changes'}</Button>;
}

const initialState: FormState = {
    message: "",
    success: false,
};

export function HeroForm({ heroContent }: { heroContent: HeroContent }) {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(heroContent.backgroundImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, formAction] = useFormState(updateHeroContentAction, initialState);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headline: heroContent.headline || '',
      subheading: heroContent.subheading || '',
    },
  });
  
  useEffect(() => {
    if (state.message) {
        if(state.success) {
            toast({ title: "Success", description: state.message });
        } else {
            const description = state.errors ? Object.values(state.errors).flat().join('\n') : state.message;
            toast({ variant: 'destructive', title: 'Error', description });
        }
    }
  }, [state, toast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form action={formAction} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Hero Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="headline">Headline</Label>
              <Input id="headline" name="headline" defaultValue={heroContent.headline || ''} />
              {state.errors?.headline && <p className="text-sm text-destructive">{state.errors.headline.join(', ')}</p>}
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="subheading">Subheading</Label>
              <Textarea id="subheading" name="subheading" defaultValue={heroContent.subheading || ''} rows={3} />
              {state.errors?.subheading && <p className="text-sm text-destructive">{state.errors.subheading.join(', ')}</p>}
            </div>

            <div className="md:col-span-2 space-y-2">
                <Label htmlFor="backgroundImage">Background Image</Label>
                <div className="mt-2">
                    <div className="relative w-full aspect-video rounded-md border border-dashed flex items-center justify-center">
                        {imagePreview ? (
                            <>
                                <Image src={imagePreview} alt="Hero background preview" fill className="object-cover rounded-md" />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 h-7 w-7"
                                    onClick={() => {
                                        setImagePreview(null);
                                        if(fileInputRef.current) fileInputRef.current.value = '';
                                    }}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </>
                        ) : (
                             <Label htmlFor="backgroundImage-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-muted">
                                <ImagePlus className="h-8 w-8 text-muted-foreground" />
                                <span className="mt-2 text-sm text-muted-foreground">Upload Image</span>
                            </Label>
                        )}
                    </div>
                </div>
                 <Input
                    id="backgroundImage-upload"
                    name="backgroundImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />
                {state.errors?.backgroundImage && <p className="text-sm text-destructive">{state.errors.backgroundImage.join(', ')}</p>}
            </div>

        </CardContent>
        <CardFooter className="justify-end">
            <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
