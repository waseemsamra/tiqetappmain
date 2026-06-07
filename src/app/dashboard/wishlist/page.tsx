
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getWishlistItems } from '@/app/actions';
import AttractionListingSection from '@/app/attraction-listing';

export default async function WishlistPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login?message=You must be logged in to view this page.');
    }
    
    const wishlistExcursions = await getWishlistItems(user.id);
    const wishlistIds = new Set(wishlistExcursions.map(item => item.id));


    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
                <p className="text-muted-foreground">Your saved excursions and dream trips.</p>
            </div>
             {wishlistExcursions.length > 0 ? (
                <div className="-mx-4 sm:-mx-6 lg:-mx-8">
                    <AttractionListingSection 
                        title="" 
                        excursions={wishlistExcursions} 
                        layout="grid" 
                        showViewAllButton={false} 
                        user={user}
                        wishlistIds={wishlistIds}
                    />
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg bg-muted/20">
                    <h2 className="text-2xl font-semibold">Your Wishlist is Empty</h2>
                    <p className="text-muted-foreground mt-2 mb-4">You haven't saved any excursions yet. Start exploring!</p>
                </div>
            )}
        </div>
    );
}
