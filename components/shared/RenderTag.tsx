import Link from 'next/link'
import React from 'react'
import { Badge } from '../ui/badge'

interface props {
  _id: string,
  name: string,
  total?: number,
  showcnt?: Boolean

}

const RenderTag = ({_id, name,total,showcnt}:props) => {
  return (
    <Link href={`/tags/${_id}`}
    className='flex justify-between gap-2'
    >

      <Badge className='subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase'>
        {name} </Badge>
        {showcnt && <p className='small-medium text-dark500_light700'> {total}</p>}
     


    
    </Link>
  )
}

export default RenderTag