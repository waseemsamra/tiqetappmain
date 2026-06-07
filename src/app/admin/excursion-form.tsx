

'use client';

import {useEffect, useState, useRef, useMemo} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useToast} from '@/hooks/use-toast';
import type {Excursion, ExcursionType, Country, FormState, City} from '@/types';
import type { GenerateExcursionDescriptionInput, GenerateExcursionDescriptionOutput } from '@/ai/flows/generate-excursion-description-flow';
import {ImagePlus, Sparkles, X} from 'lucide-react';
import { createExcursionSchema, updateExcursionSchema } from '@/lib/schemas';
import { z } from 'zod';
import { createOrUpdateExcursionAction, uploadImages } from '@/app/actions';

const MAX_IMAGES = 6;

type FormData = z.infer<typeof createExcursionSchema>;

interface ExcursionFormProps {
    isEditing: boolean;
    excursion?: Excursion;
    excursionTypes: ExcursionType[];
    countries: Country[];
    onGenerateDescription: (input: GenerateExcursionDescriptionInput) => Promise<GenerateExcursionDescriptionOutput>;
}

export function ExcursionForm({ 
    isEditing, 
    excursion, 
    excursionTypes, 
    countries, 
    onGenerateDescription,
}: ExcursionFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [state, formAction] = useFormState(createOrUpdateExcursionAction, { success: false, message: '' });

  const validationSchema = isEditing ? updateExcursionSchema : createExcursionSchema;
  
  const defaultValues = useMemo(() => isEditing && excursion ? {
      ...excursion,
      activitytypeid: excursion.excursionType.id,
      whatsincluded: Array.isArray(excursion.whatsincluded) ? excursion.whatsincluded.join(', ') : '',
      whatsnotincluded: Array.isArray(excursion.whatsnotincluded) ? excursion.whatsnotincluded.join(', ') : '',
  } : {
      name: '', city: '', country: '', description: '',
      price: 0, duration: '', activitytypeid: '', rating: 0,
      images: [], operatinghours: '', whatsincluded: '', whatsnotincluded: '',
      instructions: '', howtogetthere: '', additionalinfo: '', cancellationpolicy: '',
  }, [isEditing, excursion]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const [imageUrls, setImageUrls] = useState<string[]>(isEditing ? (excursion?.images || []) : []);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // This effect ensures the form is reset with initial data only once when editing
    if (isEditing && excursion) {
        reset(defaultValues);
        setImageUrls(excursion.images || []);
    }
  }, [isEditing, excursion, reset, defaultValues]);
  
  useEffect(() => {
      if (state.success) {
          toast({ title: "Success!", description: state.message });
          if(state.redirectUrl) router.push(state.redirectUrl);
      } else if (state.message) {
          toast({ variant: 'destructive', title: 'Error', description: state.message });
      }
  }, [state, toast, router]);

  const imagePreviews = useMemo(() => {
    const newFileUrls = imageFiles.map(file => URL.createObjectURL(file));
    return [...imageUrls, ...newFileUrls];
  }, [imageUrls, imageFiles]);

  useEffect(() => {
    return () => {
        imagePreviews.forEach(url => {
            if (url.startsWith('blob:')) {
                URL.revokeObjectURL(url);
            }
        });
    };
  }, [imagePreviews]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (imagePreviews.length + files.length > MAX_IMAGES) {
      toast({
        variant: 'destructive',
        title: 'Too many images',
        description: `You can only upload a maximum of ${MAX_IMAGES} images.`
      });
      return;
    }
    
    setImageFiles(prev => [...prev, ...files]);
  };
  
  const removeImage = (index: number) => {
      const imageUrlToRemove = imagePreviews[index];
      URL.revokeObjectURL(imageUrlToRemove);

      if(index < imageUrls.length) {
        setImageUrls(urls => urls.filter((_, i) => i !== index));
      } else {
        const newFilesIndex = index - imageUrls.length;
        setImageFiles(files => files.filter((_, i) => i !== newFilesIndex));
      }
  };

  const handleAiGenerate = async () => {
    const name = watch('name');
    const city = watch('city');
    const country = watch('country');
    
    if (!name || !city || !country) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide a name, city, and country before generating a description.',
      });
      return;
    }
    
    setIsGenerating(true);
    try {
      const result = await onGenerateDescription({ name, city, country });
      if (result.description) {
        setValue('description', result.description);
        toast({
          title: 'AI Suggestion Complete',
          description: 'The description has been generated and updated.',
        });
      } else {
        throw new Error("The AI returned an empty description.");
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
      toast({
        variant: 'destructive',
        title: 'AI Generation Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const processSubmit = async (data: FormData) => {
      const formData = new FormData(formRef.current!);
      const newImageFormData = new FormData();
      imageFiles.forEach(file => newImageFormData.append('images', file));

      let uploadedImagePaths: string[] = [];
      if (imageFiles.length > 0) {
        const uploadResult = await uploadImages(newImageFormData);
        if (uploadResult.error || !uploadResult.imagePaths) {
          toast({ variant: 'destructive', title: 'Image Upload Failed', description: uploadResult.error });
          return;
        }
        uploadedImagePaths = uploadResult.imagePaths;
      }
      
      imageUrls.forEach(url => formData.append('images', url));
      uploadedImagePaths.forEach(path => formData.append('images', path));
      
      formAction(formData);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit(processSubmit)} className="space-y-8" noValidate>
      {isEditing && excursion?.id && <input type="hidden" {...register('id')} value={excursion.id} />}
      {isEditing && excursion?.partner_id && <input type="hidden" name="partner_id" value={excursion.partner_id} />}
      
      <Card>
        <CardHeader>
          <CardTitle>Excursion Details</CardTitle>
          <CardDescription>Fill in the main details of the excursion.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name')} />
            {errors?.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excursion-type-select">Excursion Type</Label>
            <Controller
              control={control}
              name="activitytypeid"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="excursion-type-select">
                    <SelectValue placeholder="Select an excursion type" />
                  </SelectTrigger>
                  <SelectContent>
                    {excursionTypes.map(at => (
                      <SelectItem key={at.id} value={at.id}>
                        {at.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors?.activitytypeid && <p className="text-sm text-destructive mt-1">{errors.activitytypeid.message}</p>}
          </div>
          
           <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" {...register('country')} placeholder="e.g., United Arab Emirates" />
            {errors?.country && <p className="text-sm text-destructive mt-1">{errors.country.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" {...register('city')} placeholder="e.g., Dubai" />
            {errors?.city && <p className="text-sm text-destructive mt-1">{errors.city.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input id="price" {...register('price')} type="number" step="0.01" />
            {errors?.price && <p className="text-sm text-destructive mt-1">{errors.price.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input id="duration" {...register('duration')} placeholder="e.g., 3 hours" />
            {errors?.duration && <p className="text-sm text-destructive mt-1">{errors.duration.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating (0-5)</Label>
            <Input id="rating" {...register('rating')} type="number" step="0.1" min="0" max="5" />
            {errors?.rating && <p className="text-sm text-destructive mt-1">{errors.rating.message}</p>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Excursion Images</CardTitle>
          <CardDescription>Add up to {MAX_IMAGES} images. The first is the main image.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
            {imagePreviews.map((source, index) => (
              <div key={source + index} className="relative group aspect-square">
                <Image src={source} alt={`Preview ${index + 1}`} fill className="rounded-md object-cover" />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
                {index === 0 && (
                    <div className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-xs font-bold px-1.5 py-0.5 rounded-sm">
                        MAIN
                    </div>
                )}
              </div>
            ))}
            {imagePreviews.length < MAX_IMAGES && (
              <Label
                htmlFor="images-upload"
                className="aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-md cursor-pointer hover:bg-muted"
              >
                <ImagePlus className="h-8 w-8 text-muted-foreground" />
                <span className="mt-2 text-sm text-muted-foreground">Add Image</span>
              </Label>
            )}
          </div>
          <Input
            id="images-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
            disabled={imagePreviews.length >= MAX_IMAGES}
          />
           {errors.images && typeof errors.images.message === 'string' && <p className="text-sm text-destructive mt-1">{errors.images.message}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Optional Details</CardTitle>
          <CardDescription>Provide additional information about the excursion.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="description">Description</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleAiGenerate} disabled={isGenerating}>
                <Sparkles className="mr-2 h-4 w-4" />
                {isGenerating ? 'Generating...' : 'AI Suggest'}
              </Button>
            </div>
            <Textarea id="description" {...register('description')} rows={5} />
            {errors?.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="operatinghours">Operating Hours</Label>
            <Input id="operatinghours" {...register('operatinghours')} placeholder="e.g., 9:00 AM - 5:00 PM" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea id="instructions" {...register('instructions')} placeholder="e.g., Present your mobile voucher..." rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsincluded">What's Included (comma-separated)</Label>
            <Textarea id="whatsincluded" {...register('whatsincluded')} placeholder="Separate items with a comma" rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsnotincluded">What's Not Included (comma-separated)</Label>
            <Textarea id="whatsnotincluded" {...register('whatsnotincluded')} placeholder="Separate items with a comma" rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="howtogetthere">How to Get There</Label>
            <Textarea id="howtogetthere" {...register('howtogetthere')} placeholder="e.g., Nearest metro station, bus routes..." rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="additionalinfo">Additional Info</Label>
            <Textarea id="additionalinfo" {...register('additionalinfo')} placeholder="e.g., Not wheelchair accessible..." rows={3} />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="cancellationpolicy">Cancellation Policy</Label>
            <Textarea id="cancellationpolicy" {...register('cancellationpolicy')} placeholder="e.g., Full refund if canceled 24 hours in advance..." rows={3}/>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Excursion')}
        </Button>
      </div>
    </form>
  );
}
