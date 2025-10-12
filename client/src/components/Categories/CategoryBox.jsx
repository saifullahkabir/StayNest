import PropTypes from 'prop-types'
import queryString from 'query-string';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CategoryBox = ({ label, icon: Icon }) => {
  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams();
  const category = params.get('category');

  const navigate = useNavigate();

  const handleClick = () => {
    // 1. create query string
    let currentQuery = { category: label };

    const url = queryString.stringifyUrl({
      url: '/',
      query: currentQuery
    })

    // 2. set query string in the url
    navigate(url);
  }
  return (
    <div
      onClick={handleClick}
      className={`flex 
      flex-col 
      items-center 
      justify-center 
      gap-2
      p-2 xl:p-3 mx-1 xl:mx-auto xl:ml-0
      border-b-2
      hover:text-neutral-800
      transition
      cursor-pointer ${category === label ?  ' border-b-black text-black opacity-100' : 'opacity-90'}`}
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  )
}

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
}

export default CategoryBox
