import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import axiosInstance from '../axiosConfig'

const Earning = () => {
  const [options, setOptions] = useState({})
  const [series, setSeries] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/goods/price')
        const data = response.data.total

        // Convert data to numeric
        const numericData = data.series[0].data.map((item) => parseFloat(item))

        setSeries([
          {
            name: data.series[0].name,
            data: numericData,
          },
        ])

        setOptions({
          chart: {
            type: 'line',
            height: 350,
          },
          title: {
            text: 'Price (MAD)',
          },
          xaxis: {
            categories: data.labels,
          },
        })
      } catch (error) {
        console.error('Error fetching data for chart:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="card">
      <div className="card-body">
        <div className="chart">
          <Chart options={options} series={series} type="line" height={350} />
        </div>
      </div>
    </div>
  )
}

export default Earning
