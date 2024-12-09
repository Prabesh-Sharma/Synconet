import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import axios from '../../../../../axiosConfig'

const Recommendation = () => {
  const [token, _] = useState(localStorage.getItem('token'))
  const [recomms, setRecomms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      console.log('token not found')
      setLoading(false)
      return
    }
    try {
      const response = axios.get('/api/interest/get/recommendations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (err) {
      console.log('an error occured', err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div className="p-4 flex flex-col items-center border border-neutral-500/50 bg-neutral-800/20 rounded">
      <div className="text-white text-2xl font-semibold">
        People with matching interests
      </div>
      <div>
        <Card />
      </div>
    </div>
  )
}

export default Recommendation
