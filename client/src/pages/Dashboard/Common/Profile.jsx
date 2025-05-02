
import { Helmet } from 'react-helmet-async'
import useAuth from '../../../hooks/useAuth'
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import ChangePassModal from '../../../components/Modal/ChangePassModal';
import UpdateProfileModal from '../../../components/Modal/UpdateProfileModal';


const Profile = () => {
    const { user, loading } = useAuth();
    const [role, isLoading] = useRole();
    if (loading || isLoading) return <LoadingSpinner />
    return (
        <div className='flex justify-center items-center my-20 md:my-32 lg:my-36 2xl:my-44'>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className='bg-white shadow-lg rounded-2xl w-full lg:w-5/6 xl:w-3/5'>
                <img
                    alt='profile'
                    src='https://wallpapercave.com/wp/wp10784415.jpg'
                    className='w-full mb-4 rounded-t-lg h-36 md:h-44 lg:h-52 xl:h-64 '
                />
                <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                    <a href='#' className='relative block'>
                        <img
                            alt='profile'
                            src={user?.photoURL}
                            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                        />
                    </a>

                    <p className='capitalize p-2 mt-2 px-4 text-xs text-white bg-pink-500 rounded-full'>
                        {role}
                    </p>
                    <p className='mt-2 text-base lg:text-lg xl:text-xl font-medium text-gray-800 '>
                        User Id: {user?.uid}
                    </p>
                    <div className='w-full p-2 mt-4 rounded-lg '>
                        <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 space-y-3 md:space-y-0'>
                            <p className='flex flex-col'>
                                Name
                                <span className='font-bold text-black '>
                                    {user?.displayName}
                                </span>
                            </p>
                            <p className='flex flex-col'>
                                Email
                                <span className='font-bold text-black '>{user?.email}</span>
                            </p>

                            <div className='md:pt-4 lg:pt-0 space-y-2'>
                                <UpdateProfileModal></UpdateProfileModal>
                                <ChangePassModal></ChangePassModal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile