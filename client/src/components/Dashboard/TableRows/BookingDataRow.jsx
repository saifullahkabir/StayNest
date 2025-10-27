import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BookingDataRow = ({ booking }) => {
    return (
        <tr>
            {/* Room Image & Title */}
            <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm max-w-[250px] md:max-w-[300px]">
                <Link to={`/room/${booking?.roomId}`} className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left hover:bg-gray-100 p-1 rounded transition">
                    <img
                        alt="room"
                        src={booking?.image}
                        className="object-cover rounded w-12 h-12 flex-shrink-0"
                    />
                    <p
                        className="text-gray-900 font-medium leading-tight line-clamp-3 md:line-clamp-2 xl:line-clamp-1 break-words"
                        title={booking?.title}
                    >
                        {booking?.title}
                    </p>
                </Link>
            </td>

            {/* Guest Info */}
            <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm max-w-[220px] md:max-w-[250px]">
                <div className="flex items-center gap-2 text-center md:text-left">
                    <img
                        referrerPolicy="no-referrer"
                        alt="guest"
                        src={booking?.guest?.image}
                        className="object-cover rounded w-10 h-10 flex-shrink-0"
                    />
                    <p
                        className="text-gray-900 leading-tight line-clamp-2 md:line-clamp-2 break-words"
                        title={booking?.guest?.name}
                    >
                        {booking?.guest?.name}
                    </p>
                </div>
            </td>

            {/* Price */}
            <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm text-gray-900 text-center md:text-left">
                ${booking?.price}
            </td>

            {/* From */}
            <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm text-gray-900 text-center md:text-left">
                {format(new Date(booking?.from), 'P')}
            </td>

            {/* To */}
            <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm text-gray-900 text-center md:text-left">
                {format(new Date(booking?.to), 'P')}
            </td>

            {/* Status */}
            <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm text-center md:text-left">
                <button className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                    ></span>
                    <span className="relative">Success</span>
                </button>
            </td>
        </tr>
    )
}

BookingDataRow.propTypes = {
    booking: PropTypes.object,
}

export default BookingDataRow
