const SkeletonCard = () => {
    return (
        <div className='col-span-1 cursor-pointer group animate-pulse'>
            <div className='flex flex-col gap-2 w-full'>
                {/* Image Skeleton */}
                <div className='w-full relative overflow-hidden rounded-xl bg-gray-300 h-[250px] md:h-[200px]' />

                {/* Location */}
                <div className='h-5 w-3/4 bg-gray-300 rounded-md'></div>

                {/* Nights */}
                <div className='h-4 w-1/3 bg-gray-200 rounded-md'></div>

                {/* Price Row */}
                <div className='flex flex-row items-center gap-1'>
                    <div className='h-5 w-16 bg-gray-300 rounded-md'></div>
                    <div className='h-4 w-10 bg-gray-200 rounded-md'></div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonCard;

