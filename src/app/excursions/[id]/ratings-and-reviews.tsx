
'use client';

import { useState, useTransition } from 'react';
import type { Excursion, Review, FormState } from '@/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Star, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createReviewAction } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';

const StarRatingInput = ({ rating, setRating }: { rating: number, setRating: (r: number) => void }) => (
    <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
            <Star
                key={star}
                className={`h-6 w-6 cursor-pointer transition-colors ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}
                onClick={() => setRating(star)}
            />
        ))}
    </div>
);

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? 'Submitting...' : 'Submit Review'}</Button>;
}

const ReviewForm = ({ activityId }: { activityId: string }) => {
    const [rating, setRating] = useState(0);
    const { toast } = useToast();
    
    const initialState: FormState = { success: false, message: '' };
    const [state, formAction] = useFormState(createReviewAction, initialState);

    const handleSubmit = (formData: FormData) => {
        if (rating === 0) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select a star rating.' });
            return;
        }
        formData.set('rating', String(rating));
        formAction(formData);
    };
    
    if (state.success) {
        return <p className="text-green-600 font-semibold">{state.message}</p>;
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <input type="hidden" name="activityId" value={activityId} />
            <div>
                <Label>Your Rating</Label>
                <StarRatingInput rating={rating} setRating={setRating} />
            </div>
             <div>
                <Label htmlFor="comment">Your Review</Label>
                <Textarea id="comment" name="comment" placeholder="Tell us about your experience..." required />
            </div>
            {state?.message && !state.success && <p className="text-sm text-destructive">{state.message}</p>}
            <SubmitButton />
        </form>
    );
};

export const RatingsAndReviews = ({ excursion }: { excursion: Excursion }) => {
    const reviews = excursion.reviews || [];
    const totalReviews = reviews.length;
    
    const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
        const count = reviews.filter(r => r.rating === star).length;
        return { star, count, percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0 };
    });

    return (
        <div id="reviews" className="space-y-8 scroll-mt-24">
            <h2 className="text-2xl font-bold">Ratings & Reviews</h2>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                         <div className="text-center">
                             <p className="text-5xl font-bold">{Number(excursion.rating || 0).toFixed(1)}</p>
                             <div className="flex justify-center">
                                 {[...Array(5)].map((_, i) => (
                                     <Star key={i} className={`h-5 w-5 ${i < Math.round(excursion.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                 ))}
                             </div>
                             <p className="text-sm text-muted-foreground mt-1">{totalReviews} reviews</p>
                         </div>
                        <div className="flex-1">
                           {ratingDistribution.map(item => (
                                <div key={item.star} className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">{item.star} star</span>
                                    <Progress value={item.percentage} className="w-full h-2" />
                                    <span className="text-sm text-muted-foreground w-8 text-right">{Math.round(item.percentage)}%</span>
                                </div>
                           ))}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {reviews.map(review => (
                         <div key={review.id} className="border-t pt-6">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                    <p className="font-semibold">{review.author}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Leave a Review</CardTitle>
                </CardHeader>
                <CardContent>
                    <ReviewForm activityId={excursion.id} />
                </CardContent>
            </Card>
        </div>
    );
};
