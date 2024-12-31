import React, { useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart, { ChartData } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { color, pointRadial, tickStep } from 'd3';
import { size } from 'lodash';
import { layouts } from 'chart.js/dist';
import { Height, Padding } from '@mui/icons-material';
import SelectInput from '../common/SelectInput/SelectInput';

import styles from './bannerstatistics.module.scss'

Chart.register(ChartDataLabels);

interface BannerStatisticsProps {
    data: {
        '24h': number[];
        week: number[];
        year: number[];
    };
}

export const BannerStatistics: React.FC<BannerStatisticsProps> = ({ data }) => {
    const [timeRange, setTimeRange] = useState<'24h' | 'week' | 'year'>('24h');

    const handleTimeRangeChange = (value: '24h' | 'week' | 'year') => {
        setTimeRange(value);
      };

    const optionsList = [
        { value: '24h', label: '24 часа' },
        { value: 'week', label: 'Неделя' },
        { value: 'year', label: 'Год' },
      ];

    const labels = timeRange === '24h'
        ? ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
        : timeRange === 'week'
            ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
            : ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];


    const chartData = {
        labels,
        datasets: [
            {
                label: 'Показы',
                data: data[timeRange],
                backgroundColor: '#CFE2FF',
                barPercentage: 1,
                categoryPercentage: 0.6,
            },
            {
                label: 'Переходы',
                data: data[timeRange].map(value => value * 0.25),
                backgroundColor: '#357EEB',
                barPercentage: 1,
                categoryPercentage: 0.6,
            },
        ],
    };


    const options = {
        scales: {
            x: {
                grid: {
                    display: false,
                },
                barPercentage: 1,
                ticks: {
                    color: "#B2B2B2",
                    font: {
                        size: 24,
                        weight: 500,
                    }

                },
            },
            y: {
                ticks: {
                    callback: (value: string | number) => {
                        const numValue = typeof value === 'string' ? parseFloat(value) : value;
                        if (numValue >= 1000000) {
                            return (numValue / 1000000).toFixed(0) + 'Mлн';
                        }
                        else if (numValue >= 1000) {
                            return (numValue / 1000).toFixed(0) + 'K';
                        }
                        return numValue;
                    },

                    color: "#B2B2B2",
                    font: {
                        size: 24,
                        weight: 500,
                    }
                },
                border: {
                    color: 'transparent',
                    dash: [40, 40] as number[],
                },
            },

        },
        layout: {
            padding: {
                top: 20,
            }
        },

        plugins: {
            title: {
                display: true,
                text: '',
                padding: {
                    top: 20,
                    bottom: 20
                }
            },
            legend: {
                // display: false,
                position: 'top' as const,
                // align: 'end',
                labels: {
                    usePointStyle: true,
                    borderRadius: 12,
                    useBorderRadius: true,
                    padding: 20,
                    color: '#332F36',
                    font: {
                        size: 16,
                        weight: 500,
                    }
                },




                // labels: {
                //     generateLabels: (chart) => {
                //         const data = chart.data as { datasets: Array<{ label: string; backgroundColor: string }> };
                //         return data.datasets.map((dataset, i) => ({
                //             text: dataset.label,
                //             fillStyle: dataset.backgroundColor,
                //             hidden: !chart.isDatasetVisible(i),
                //             index: i,
                //             lineCap: 'round',
                //         }));
                //     },
                // },
            },
            datalabels: {
                anchor: 'end',
                align: 'end',
                color: '#332F36',
                font: {
                    size: 14,
                    weight: 500,
                },
                formatter: (value: number) => {
                    if (value >= 1000000) {
                        return (value / 1000000).toFixed(0) + 'Mлн';
                    } else if (value >= 1000) {
                        return (value / 1000).toFixed(0) + 'K';
                    }
                    return value.toString();
                },
            },
        },
        title: {
            display: true,
            text: `Данные за ${timeRange === '24h' ? '24 часа' : timeRange === 'week' ? 'неделю' : 'год'}`,
        },
    } as const;

    return (
        <div>
            <div className={styles.chart_header_container}>
                <p className={styles.chart_header}>Статистика показов и переходов</p>
                <SelectInput
                    optionsList={optionsList}
                    selectedOption={timeRange}
                    defaultOption="выбрать"
                    setSelectedValue={handleTimeRangeChange}
                    className={styles.selectInput}
                />
                {/* <select value={timeRange} onChange={handleTimeRangeChange}>
                    <option value="24h">24 часа</option>
                    <option value="week">Неделя</option>
                    <option value="year">Год</option>
                </select> */}
            </div>
            <div className={styles.clicks_counter_container}>
                <p className={styles.clicks_counter_header}>Всего кликов</p>
                <p className={styles.clicks_counter}>15345</p>
            </div>
            <Bar data={chartData} options={options} />
        </div >
    );
};

export default BannerStatistics;
