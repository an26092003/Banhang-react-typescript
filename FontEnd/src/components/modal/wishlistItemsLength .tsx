import Loading from '@/components/ui/Loading';
import { useMeQuery } from '@/services/auth';
import { useGetWishlistQuery } from '@/services/favourite';
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';


function WishlistItemsLength() {

    const { data: authData } = useMeQuery();
    const user_id = authData?._id || '';
    const { data, isLoading } = useGetWishlistQuery(user_id);
    const wishlistItems = data?.wishlist_items || [];

    if (isLoading) {
        return <Loading />;
    }



    return (
        <div className="mr-5 text-2xl flex relative">
            <Link to={'your-favorite'}><AiOutlineHeart />
                <span className="bg-primary/90 text-white w-5 h-5 flex justify-center items-center rounded-full absolute -top-2 -right-2 text-sm">
                    {wishlistItems.length}
                </span></Link>

        </div>
    );
}

export default WishlistItemsLength;