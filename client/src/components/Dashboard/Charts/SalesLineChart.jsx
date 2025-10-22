import { Chart } from 'react-google-charts'
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import LoadingChart from './LoadingChart';
import noData from '../../../assets/images/no-data.png';

// const data = [
//     ['Day', 'Sales'],
//     ['9', 1000],
//     ['10', 1170],
//     ['11', 660],
//     ['12', 1030],
// ]

const options = {
    title: 'Sales Over Time',
    curveType: 'function',
    legend: { position: 'bottom' },
    series: [{ color: '#F43F5E' }],
}
const SalesLineChart = ({ data }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <LoadingChart message={'Loading sales data...'} />

    return (
        <>
            {
                data.length > 1 ?
                    <Chart chartType='LineChart' width='100%' height="300px" data={data} options={options} />
                    :
                    <div className='text-center my-auto py-[80px] lg:py-0'>
                        <img className='w-14 h-14 mx-auto' src={noData} alt="Not available" />
                        <p className='text-gray-600 font-medium'>Data is not available!</p>
                    </div>
            }
        </>
    )
}

SalesLineChart.propTypes = {
    data: PropTypes.array,
}

export default SalesLineChart;