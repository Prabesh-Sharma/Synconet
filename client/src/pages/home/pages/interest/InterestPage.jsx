import React, { useState, useEffect } from 'react'
import Interest from './Interest'
import axios from '../../../../../axiosConfig'
import { useQuery } from '@tanstack/react-query'

const InterestPage = () => {
  const token = localStorage.getItem('token')

  const getInterest = async () => {
    const response = await axios.get('/api/interest/get', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.interests
  }

  const handleInterestUpdates = () => {
    getInterest()
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['interest'],
    queryFn: getInterest,
    enabled: !!token,
    staleTime: 0,
    cacheTime: 0,
    refetchInterval: 500,
  })

  if (error) {
    return <div className="text-white bg-red-700">error occured</div>
  }

  return (
    <>
      {!isLoading && data.length === 0 && (
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
