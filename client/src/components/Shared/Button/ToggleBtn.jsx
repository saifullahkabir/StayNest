import PropTypes from 'prop-types'
const ToggleBtn = ({ toggleHandler, toggle }) => {
  return (
    <>
      <label
      htmlFor='Toggle3'
      className='inline-flex w-full justify-center items-center px-2 rounded-md cursor-pointer text-gray-800'
    >
      <input
        type='checkbox'
        id='Toggle3'
        className='hidden peer'
        checked={toggle}
        onChange={toggleHandler}
      />
      <span className={`px-4 py-1 rounded-l-md ${toggle ? 'bg-rose-400' : 'bg-gray-300'}`}>
        Guest
      </span>
      <span className={`px-4 py-1 rounded-r-md ${!toggle ? 'bg-rose-400' : 'bg-gray-300'}`}>
        Host
      </span>
    </label>
    </>
  )
}

ToggleBtn.propTypes = {
  toggleHandler: PropTypes.func,
  toggle: PropTypes.bool,
}
export default ToggleBtn