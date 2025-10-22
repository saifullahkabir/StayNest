import PropTypes from 'prop-types';
const LoadingChart = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center h-64  rounded-lg">
            <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">{message}</p>
        </div>
    );
};

LoadingChart.propTypes = {
    message: PropTypes.string,
}

export default LoadingChart;