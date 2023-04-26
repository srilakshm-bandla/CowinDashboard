// Write your code here

import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {lastSevenDaysVaccination} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  console.log({DataFormatter})

  return (
    <div className="vaccination-container">
      <h1 className="heading">Vaccination Coverage</h1>

      <BarChart
        width={900}
        height={400}
        data={lastSevenDaysVaccination}
        margin={{
          top: 4,
        }}
      >
        <XAxis
          dataKey="vaccinationDate"
          tick={{
            stroke: '#6c757d',
            strokeWidth: 0.5,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: '#6c757d',
            strokeWidth: 0.1,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />

        <Legend
          wrapperStyle={{
            paddingTop: 30,
            textAlign: 'center',
            fontSize: 12,
            fontFamily: 'Roboto',
          }}
        />

        <Bar
          dataKey="doseOne"
          name="Dose 1"
          fill="#5a8dee"
          barSize="20%"
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="doseTwo"
          name="Dose 2"
          fill=" #f54394"
          barSize="20%"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
