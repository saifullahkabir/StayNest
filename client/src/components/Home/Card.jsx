import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { differenceInCalendarDays } from 'date-fns';

const Card = ({ room }) => {
  const totalDays = differenceInCalendarDays(
    new Date(room.to),
    new Date(room.from)
  ) + 1;
  return (
    <Link to={`/room/${room?._id}`} className='col-span-1 cursor-pointer group'>
      <div className='flex flex-col gap-2 w-full'>
        <div
          className='
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            '
        >
          <img
            className='
                object-cover 
                h-[250px] md:h-[200px]
                w-full 
                group-hover:scale-125 
                transition
              '
            src={room?.image}
            alt='Room'
          />
          <div
            className='
              absolute
              top-3
              right-3
            '
          ></div>
        </div>
        <div className='font-semibold text-lg'>{room?.location}</div>
        <div className='font-light text-neutral-500'>{totalDays} nights</div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'>$ {room?.price}</div>
          <div className='font-light'>night</div>
        </div>
      </div>
    </Link>
  )
}

Card.propTypes = {
  room: PropTypes.object,
}

export default Card
