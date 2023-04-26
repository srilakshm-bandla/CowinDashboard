// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByAge'

import VaccinationByGender from '../VaccinationByGender'

import VaccinationCoverage from '../VaccinationCoverage'

import './index.css'

const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    vaccinationData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCowinVaccinationData()
  }

  getCowinVaccinationData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch(apiUrl)

    if (response.ok === true) {
      const fetchedData = await response.json()
      // console.log(fetchedData)
      const updatedData = {
        lastSevenDaysVaccination: fetchedData.last_7_days_vaccination.map(
          eachDayData => ({
            doseOne: eachDayData.dose_1,
            doseTwo: eachDayData.dose_2,
            vaccinationDate: eachDayData.vaccine_date,
          }),
        ),

        vaccinationByAge: fetchedData.vaccination_by_age.map(eachAge => ({
          age: eachAge.age,
          count: eachAge.count,
        })),

        vaccinationByGender: fetchedData.vaccination_by_gender.map(
          genderType => ({
            count: genderType.count,
            gender: genderType.gender,
          }),
        ),
      }

      this.setState({
        vaccinationData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderVaccinationStats = () => {
    const {vaccinationData} = this.state

    return (
      <>
        <VaccinationCoverage
          lastSevenDaysVaccination={vaccinationData.lastSevenDaysVaccination}
        />
        <VaccinationByGender
          vaccinationByGender={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge vaccinationByAge={vaccinationData.vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className=""
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loading-view">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderViewBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderVaccinationStats()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo-image"
          />
          <h1 className="co-win-logo">Co-WIN</h1>
        </div>

        <h1 className="main-heading">CoWIN Vaccination in India</h1>
        {this.renderViewBasedOnApiStatus()}
      </div>
    )
  }
}

export default CowinDashboard
