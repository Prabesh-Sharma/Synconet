import React from 'react'
import Card from '../../components/Card'

const Recommendation = () => {
    return (
        <div className="p-4 flex flex-col items-center border border-neutral-500/50 bg-neutral-800/20 rounded">
            <div className='text-white text-2xl font-semibold'>Recommendation</div>
            <div>
                <Card />
            </div>
        </div>
    )
}

export default Recommendation