import Card from './Card'
import Container from '../Shared/Container'
import Heading from '../Shared/Heading'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import SkeletonCard from './SkeletonCard'
import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-client"

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
  const skeletonCount = rooms?.length > 0 ? rooms.length : 12;

  return (
    <Container>
      {isLoading ? (
        // Skeletons shown during loading
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : rooms && rooms.length > 0 ? (
        // Show actual cards after data load
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}

          >
            <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
              {rooms.map((room) => (
                <Card key={room._id} room={room} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
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
