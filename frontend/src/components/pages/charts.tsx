
'use client'

import { LineChart } from '@/components/charts/Chart'
import Loader from '@/components/UI/loader'
import { useFetchCharts
 } from '@/hooks/useFetchChart'
import React from 'react'

import Link from 'next/link';

const data = () => {
    const {data, loading, error} = useFetchCharts()
    console.log('data',data)
  return (
    <>
    {loading && <Loader/>}
    {(!loading && (error || !data)) && <>Error in Fetch Charts</>}
    {!loading && !error && data && <>
        {Object.keys(data).length > 0 && Object.keys(data).map((item: any, idx) => {
            if (data[item] === null || data[item] === undefined || data[item].prices === null || data[item].prices === null) return null;
         

            return (

              // link to the specific chart with the url data[item]

              <Link href={`/coins-details/${item}`} key={idx}>
                <div style={{ }}>{item}</div>
                <LineChart dates={data[item].dates} prices={data[item].prices} />
              </Link>


            );
          })}
    </>}
    </>
  )
}

export default data