import { Chart } from 'react-google-charts'
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import LoadingChart from './LoadingChart';

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
        const timer = setTimeout(() => setLoading(false),300);
        return () => clearTimeout(timer);
    }, []);

    if (!data || data.length === 0 || loading) return <LoadingChart />

    return (
        <Chart chartType='LineChart' width='100%' height="300px" data={data} options={options} />
    )
}

SalesLineChart.propTypes = {
    data: PropTypes.array,
}

export default SalesLineChart;