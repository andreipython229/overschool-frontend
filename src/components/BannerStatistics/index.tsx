import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import SelectInput from '../common/SelectInput/SelectInput'
import { useFetchBannerStatQuery } from 'api/courseStat'
import { IBanner } from 'api/apiTypes'
import styles from './bannerstatistics.module.scss'
import { ClickDetail } from 'types/courseStatT'
import { useAppSelector } from 'store/hooks'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { arrowDownPoligonPath } from 'config/commonSvgIconsPath'

Chart.register(ChartDataLabels)

interface BannerStatisticsProps {
  schoolName: string
  banner: IBanner
}

export const BannerStatistics: React.FC<BannerStatisticsProps> = ({ banner, schoolName }) => {
  const [timeRange, setTimeRange] = useState<'24h' | 'week' | 'year'>('24h')
  const bannerId = banner.id
  const filters = useAppSelector(state => state.filters[''])
  const { start_date, end_date } = getStartEndDates()
  const { data: bannerStats, error, isLoading } = useFetchBannerStatQuery({ bannerId, filters, schoolName, start_date, end_date })
  const [allClicksData, setAllClicksData] = useState<number[]>([])
  const [uniqueClicksData, setUniqueClicksData] = useState<number[]>([])
  const [isSelectOpen, setSelectIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (bannerStats) {
      setAllClicksData(statProcessing(bannerStats.click_details, false))
      setUniqueClicksData(statProcessing(bannerStats.click_details, true))
    }
  }, [bannerStats, isLoading, error])

  function formatDate(date: any) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
  }

  function getStartEndDates() {
    const now = new Date()
    let start_date
    const end_date = formatDate(now)
    switch (timeRange) {
      case '24h':
        start_date = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        break
      case 'week':
        start_date = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      default:
        start_date = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        break
    }
    start_date = formatDate(start_date)
    return { start_date, end_date }
  }

  const statProcessing = (clicks: ClickDetail[], unique: boolean): number[] => {
    //поделить на 2 функции
    let result: number[]

    if (timeRange === '24h') {
      result = Array(8).fill(0)
    } else if (timeRange === 'week') {
      result = Array(7).fill(0)
    } else if (timeRange === 'year') {
      result = Array(12).fill(0)
    } else {
      throw new Error('Invalid timerange')
    }

    const uniqueEmails = new Set<string>()

    clicks.forEach(click => {
      const date = new Date(click.timestamp)
      const email = click.user__email

      if (unique) {
        if (!uniqueEmails.has(email)) {
          uniqueEmails.add(email)
        } else {
          return
        }
      }

      if (timeRange === '24h') {
        const hour = date.getUTCHours()
        const intervalIndex = Math.floor(hour / 3)
        result[intervalIndex] += 1
      } else if (timeRange === 'week') {
        const day = date.getUTCDay()
        result[day] += 1
      } else if (timeRange === 'year') {
        const month = date.getUTCMonth()
        result[month] += 1
      }
    })
    return result
  }

  const handleTimeRangeChange = (value: '24h' | 'week' | 'year') => {
    setTimeRange(value)
  }

  const optionsList = [
    { value: '24h', label: '24 часа' },
    { value: 'week', label: 'Неделя' },
    { value: 'year', label: 'Год' },
  ]

  const labels =
    timeRange === '24h'
      ? ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
      : timeRange === 'week'
      ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
      : ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Показы',
        data: allClicksData,
        backgroundColor: '#CFE2FF',
        barPercentage: 1,
        categoryPercentage: 0.6,
      },
      {
        label: 'Переходы',
        data: uniqueClicksData,
        backgroundColor: '#357EEB',
        barPercentage: 1,
        categoryPercentage: 0.6,
      },
    ],
  }

  const legendMargin = {
    id: 'legendMargin',
    beforeInit(chart: any) {
      const fitValue = chart.legend.fit
      chart.legend.fit = function fit() {
        fitValue.bind(chart.legend)()
        return (this.height += 50)
      }
    },
  }

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        barPercentage: 1,
        ticks: {
          color: '#B2B2B2',
          font: {
            size: 24,
            weight: 500,
          },
        },
      },
      y: {
        ticks: {
          callback: (value: string | number) => {
            const numValue = typeof value === 'string' ? parseFloat(value) : value
            if (numValue >= 1000000) {
              return (numValue / 1000000).toFixed(0) + 'Mлн'
            } else if (numValue >= 1000) {
              return (numValue / 1000).toFixed(0) + 'K'
            }
            return numValue
          },

          color: '#B2B2B2',
          font: {
            size: 24,
            weight: 500,
          },
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
      },
    },

    plugins: {
      title: {
        display: true,
        text: '',
        padding: {
          top: 20,
          bottom: 20,
        },
      },
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          borderRadius: 12,
          useBorderRadius: true,
          padding: 20,
          color: '#332F36',
          font: {
            size: 16,
            weight: 500,
          },
        },
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
            return (value / 1000000).toFixed(0) + 'Mлн'
          } else if (value >= 1000) {
            return (value / 1000).toFixed(0) + 'K'
          }
          return value.toString()
        },
      },
    },
    title: {
      display: true,
      text: `Данные за ${timeRange === '24h' ? '24 часа' : timeRange === 'week' ? 'неделю' : 'год'}`,
    },
  } as const

  const handleToggle = (isSelOpen: boolean) => {
    setSelectIsOpen(isSelOpen)
  }

  return (
    <div>
      <div className={styles.chart_header_container}>
        <p className={styles.chart_header}>Статистика показов и переходов</p>
        <div className={styles.selectInput_wrapper}>
          <SelectInput
            optionsList={optionsList}
            selectedOption={timeRange}
            defaultOption="выбрать"
            setSelectedValue={handleTimeRangeChange}
            className={styles.selectInput}
            onToggle={handleToggle}
          />
          <IconSvg
            className={`${styles.select_arrowDown} ${isSelectOpen ? styles.select_arrowdown_open : ''}`}
            width={14}
            height={15}
            viewBoxSize="0 0 14 11"
            path={arrowDownPoligonPath}
          ></IconSvg>
        </div>
      </div>
      <div className={styles.clicks_counter_container}>
        <p className={styles.clicks_counter_header}>Всего кликов</p>
        <p className={styles.clicks_counter}>{bannerStats?.unique_clicks}</p>
      </div>
      <Bar data={chartData} options={options} plugins={[legendMargin]} />
    </div>
  )
}

export default BannerStatistics
