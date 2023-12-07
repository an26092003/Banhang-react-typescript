import ListYourFavourite from '@/components/products/list-favourite';
import Loading from '@/components/ui/Loading';
import { useMeQuery } from '@/services/auth';
import { useGetWishlistQuery } from '@/services/favourite';
import { BsBagHeart } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function YourFavourite() {
    const { data: authData } = useMeQuery();
    const user_id = authData?._id || '';
    const { data, isLoading } = useGetWishlistQuery(user_id);
    const wishlistItems = data?.wishlist_items || [];

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="overflow-x-auto">
            {wishlistItems.length === 0 ? (
                <div className="flex items-center flex-col h-screen justify-center gap-y-2">
                    <BsBagHeart className='w-[360px] h-[360px] opacity-25' />
                    <h1 className='mt-10 text-xl font-semibold'>Bạn chưa có sản phẩm yêu thích nào cả.</h1>
                    <p className='max-w-[960px] text-center'>
                        Bạn có thể thêm những sản phẩm yêu thích của bạn tại đây để có thể mua sắm sau.
                    </p>
                    <Link to={'/'} className='uppercase bg-primary/90 text-white text-center px-4 py-2'>Trở lại cửa hàng</Link>
                </div>
            ) : (

                <div className="mt-6 px-4">
                    <ListYourFavourite heading="Sản phẩm yêu thích" />
                </div>

            )}
        </div>

    );
}

export default YourFavourite;