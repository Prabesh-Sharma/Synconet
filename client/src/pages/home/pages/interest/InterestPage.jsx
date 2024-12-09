import React, { useState, useEffect } from 'react'
import Interest from './Interest'
import axios from '../../../../../axiosConfig'

const InterestPage = () => {
  const [token, _] = useState(localStorage.getItem('token'))
  const [interests, setInterests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getInterest()
  }, [])

  const getInterest = async () => {
    if (!token) {
      console.log('token not found')
      setLoading(false)
      return
    }
    try {
      const response = await axios.get('/api/interest/get', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setInterests(response.data.interests)
    } catch (err) {
      console.log('an error has occured', err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInterestUpdates = () => {
    getInterest()
  }

  return (
    <>
      {!loading && interests.length === 0 && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="p-8 w-full md:w-1/2">
            <Interest handleInterestUpdates={handleInterestUpdates} />
          </div>
        </div>
      )}
    </>
  )
}

export default InterestPage
