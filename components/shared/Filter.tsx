"use client"

import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



interface props{
  filters: {
    name: string,
    value: string
  }[];
  
  otherClass?: string,
  containerClass?: string

}

const Filter = ({filters, otherClass,containerClass}:props) => {
  return (
    <div className={`relative ${containerClass}`}>

<Select>
  <SelectTrigger className={`${otherClass}`}>

    <div className='line-clamp-1 flex-1 text-left '>
    <SelectValue placeholder="Select a filter " />
    </div>
  </SelectTrigger>
  <SelectContent>
   <SelectGroup>
    {
      filters.map((item)=>
        <SelectItem key={item.value} value={item.value}>{item.value}</SelectItem>
      )
    }
   </SelectGroup>
  </SelectContent>
</Select>



    </div>
  )
}

export default Filter