import PropTypes from 'prop-types'
import Button from '../Shared/Button/Button'
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { differenceInCalendarDays } from 'date-fns';
import BookingModal from '../Modal/BookingModal';
import useAuth from '../../hooks/useAuth';

const RoomReservation = ({ room, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const [state, setState] = useState([
    {
      startDate: new Date(room.from),
      endDate: new Date(room.to),
      key: 'selection'
    }
  ]);

  const closeModal = () => {
    setIsOpen(false);
  }

  // total date and total price
  const totalDays = differenceInCalendarDays(
    new Date(room.to),
    new Date(room.from)
  );

  const totalPrice = totalDays * room?.price;


  return (
    <div className='rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1 p-4'>
          <div className='text-2xl font-semibold'>$ {room?.price}</div>
          <div className='font-light text-neutral-600'>/night</div>
        </div>
        <div className='p-4 font-light text-neutral-600'><span className='font-medium text-xl'>{totalDays}</span>/night</div>
      </div>
      <hr />
      <div className='flex justify-center'>
        {/* Calender */}
        <DateRange
          showDateDisplay={false}
          rangeColors={['#F6536D']}
          editableDateInputs={false}
          onChange={() => setState([{
            startDate: new Date(room.from),
            endDate: new Date(room.to),
            key: 'selection'
          }])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          minDate={new Date(room.from)}
          maxDate={new Date(room.to)}
        />
      </div>
      <hr />
      <div className='p-4'>
        <Button
          disabled={room?.booked === true}
          onClick={() => setIsOpen(true)}
          label={ room?.booked === true? 'Booked' :'Reserve'} />
      </div>
      {/* Modal */}
      <BookingModal isOpen={isOpen} refetch={refetch} closeModal={closeModal} bookingInfo={{
        ...room,
        price: totalPrice,
        guest: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        }
      }} />
      <hr />
      <div className='p-4 flex items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
    </div>
  )
}

RoomReservation.propTypes = {
  room: PropTypes.object,
  refetch: PropTypes.func,
}

export default RoomReservation
