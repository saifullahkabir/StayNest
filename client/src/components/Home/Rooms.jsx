import Card from './Card'
import Container from '../Shared/Container'
import Heading from '../Shared/Heading'
import LoadingSpinner from '../Shared/LoadingSpinner'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import SkeletonCard from './SkeletonCard'

const Rooms = () => {
  const axiosPublic = useAxiosPublic();
  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams();
  const category = params.get('category');

  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ['rooms', category],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/rooms?category=${category}`);
      return data || [];
    }
  });

  // skeleton count dynamically based on cached rooms or default 6
  const skeletonCount = rooms?.length > 0 ? rooms.length : 6;

  return (
    <Container>
      {isLoading ? (
        // Skeletons shown during loading
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {[...Array(skeletonCount)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : rooms && rooms.length > 0 ? (
        // Show actual cards after data load
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {rooms.map((room) => (
            <Card key={room._id} room={room} />
          ))}
        </div>
      ) : (
        // No data message
        <div className='flex items-center justify-center min-h-[calc(100vh-300px)]'>
          <Heading
            center={true}
            title='No Rooms Available In This Category!'
            subtitle='Please Select Other Categories.'
          />
        </div>
      )}
    </Container>
  )
}

export default Rooms
