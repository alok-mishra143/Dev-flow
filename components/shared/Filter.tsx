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
  <SelectTrigger className={`${otherClass}  body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}>

    <div className='line-clamp-1 flex-1 text-left '>
    <SelectValue placeholder="Select a filter " />
    </div>
  </SelectTrigger>
  <SelectContent
className={`text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300 `
  }
  
  >
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