import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { useCreateCourseMutation } from "@/features/api/courseApi"
import { toast } from "sonner"

const AddCourse = () => {
    const [courseTitle, setCourseTitle] = useState("")
    const [category, setCategory] = useState("")

    const [createCourse, {data, isLoading, error, isSuccess}] = useCreateCourseMutation()

    const navigate = useNavigate()

    const getSelectedCategory = (value)=>{
        setCategory(value)
    }

    const createCoursehandler = async()=>{
        console.log(courseTitle, category)
        await createCourse({courseTitle, category})
    }

    useEffect(()=>{
        if(isSuccess){
            toast.success(data?.message || "Course created.")
            navigate(-1)
        }
    },[isSuccess, error])

    return (
        <div className='flex-1 mx-10'>
            <div className='mb-4'>
                <h1 className='font-bold text-xl'>Lets add course, add some basic course details for your new course</h1>
                <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, repudiandae.</p>
            </div>
            <div className='space-y-4'>
                <div>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        placeholder="Your course title"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                    />
                </div>
                <div>
                    <Label>Category</Label>
                    <Select onValueChange={getSelectedCategory}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="Next JS">Next JS</SelectItem>
                                <SelectItem value="Data Science">Data Science</SelectItem>
                                <SelectItem value="Frontend Development">
                                    Frontend Development
                                </SelectItem>
                                <SelectItem value="Fullstack Development">
                                    Fullstack Development
                                </SelectItem>
                                <SelectItem value="MERN Stack Development">
                                    MERN Stack Development
                                </SelectItem>
                                <SelectItem value="Javascript">Javascript</SelectItem>
                                <SelectItem value="Python">Python</SelectItem>
                                <SelectItem value="Docker">Docker</SelectItem>
                                <SelectItem value="MongoDB">MongoDB</SelectItem>
                                <SelectItem value="HTML">HTML</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
                    <Button disabled={isLoading} onClick={createCoursehandler}>
                        {
                            isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    Please wait
                                </>
                            ) : "Create"
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddCourse