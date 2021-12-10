import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function Stats() {

    const history = useHistory();
    const [stats, setStats] = useState([]);

    const getStatsData = async () => {
        const res = await fetch('/admin/stats', {
            credentials: 'include'
        });
        const data = await res.json();
        if (!data.err) {
            setStats(data);
        } else {
            history.push('/vacations');
        };
    };

    useEffect(() => {
        getStatsData();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Stats For Admin',
            },
        },
    };

    const followers = {
        labels: stats.map(s => s.destination),
        datasets: [
            {
                label: 'Followers Per Vacation',
                data: stats.map(follow => follow.following),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        <Bar options={options} data={followers} />
    );
};


export default Stats;

