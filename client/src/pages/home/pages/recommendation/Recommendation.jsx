import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import axios from '../../../../../axiosConfig'
import { useQuery } from '@tanstack/react-query'

const Recommendation = () => {
  const token = localStorage.getItem('token')

  const fetchRecommendations = async () => {
    if (!token) {
      console.log('token not found')
      return
    }
    const response = await axios.get('/api/interest/get/recommendations', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.matchingUsers
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['recomms'],
    queryFn: fetchRecommendations,
    enabled: !!token,
    staleTime: 60 * 1000, //1 min
    cacheTime: 5 * 60 * 1000, //5 min
  })

  // Sort data by username if data exists
  const sortedData = data
    ? [...data].sort((a, b) => a.username.localeCompare(b.username))
    : []

  if (error) {
    return <div className="text-white bg-red-800">{error.message}</div>
  }

  return (
    <div className="p-4 flex flex-col items-center border border-neutral-500/50 bg-neutral-800/20 rounded">
      <div className="text-white text-2xl font-semibold">
        People with matching interests
      </div>
      <div>{!isLoading && <Card recomms={sortedData} />}</div>
    </div>
  )
}

export default Recommendation
