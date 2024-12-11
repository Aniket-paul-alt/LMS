import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const Course = () => {
    return (
        <Card classname="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300" >
            <div className='relative '>
                <img src="https://images.ctfassets.net/3pv3o0yr6pgj/7qixtK8KRrnkJalWNJ1RMk/61dbe1a62bc14aa7244bb8e6ce12f237/MERN_Fullstack__1_.jpg" alt="Course" className='w-full h-36 object-cover rounded-t-lg' />
            </div>
            <CardContent className="px-5 py-4 space-y-3">
                <h1 className='hover:underline font-bold text-lg truncate'>MERN Complete Course 2025</h1>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1 className='font-medium text-sm'>Patel MERN Stack</h1>
                    </div>
                    <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
                        Advance
                    </Badge>
                </div>
                <div className='text-lg font-bold'>
                    <span>₹499</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default Course