import { Course } from "../models/course.model.js"

export const createCourse = async(req, res)=>{
    try {
        console.log(req.body)
        const {courseTitle, category} = req.body

        console.log(courseTitle, category)
        if(!courseTitle || !category){
            return res.status(400).json({
                success:false,
                message: "Course title and category is required"
            })
        }

        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id
        })

        return res.status(201).json({
            success:true,
            message: "Course Created",
            course
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "Failed to create course"
        })
    }
}

export const getCreatorCourses = async(req, res)=>{
    try {
        const userId = req.id
        const courses = await Course.find({creator: userId})
        if(!courses) {
            return res.status(404).json({
                success:false,
                courses:[],
                message: "No courses found"
            })
        }

        return res.status(200).json({
            success:true,
            courses
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "Failed to get creator's courses"
        })
    }
}