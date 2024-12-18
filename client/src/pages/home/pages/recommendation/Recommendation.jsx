import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import axios from '../../../../../axiosConfig'

const Recommendation = () => {
  const [token, _] = useState(localStorage.getItem('token'))
  const [recomms, setRecomms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecommendations()
  }, [token])

  const fetchRecommendations = async () => {
    if (!token) {
      console.log('token not found')
      setLoading(false)
      return
    }
    try {
      const response = await axios.get('/api/interest/get/recommendations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const matches = response.data.matchingUsers
      setRecomms(matches)
    } catch (err) {
      console.log('an error occured', err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 flex flex-col items-center border border-neutral-500/50 bg-neutral-800/20 rounded">
      <div className="text-white text-2xl font-semibold">
        People with matching interests
      </div>
      <div>{!loading && <Card recomms={recomms} />}</div>
    </div>
  )
}

export default Recommendation
