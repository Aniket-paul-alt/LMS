import { Course } from "../models/course.model.js"
import {deleteMediaFromCloudinary, uploadMedia} from "../utils/cloudinary.js"

export const createCourse = async(req, res)=>{
    try {
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

export const editCourse = async(req, res) =>{
    try {
        const courseId = req.params.courseId
        const {courseTitle, subTitle, description, category, courseLevel, coursePrice} = req.body
        const thumbnail = req.file
        
        let course = await Course.findById(courseId)
        if(!course){    
            return res.status(404).json({
                success:false,
                message: "Course not found"
            })
        }

        let courseThumbnail
        if(thumbnail){
            if(course.courseThumbnail){
                const publicId = course.courseThumbnail.split("/").pop().split(".")[0]
                await deleteMediaFromCloudinary(publicId)
            }
            courseThumbnail = await uploadMedia(thumbnail.path)
        }

        const updateData = {courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail: courseThumbnail?.secure_url}

        course = await Course.findByIdAndUpdate(courseId, updateData, {new: true})

        
        return res.status(200).json({
            success:true,
            message: "Course updated successfully",
            course
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "Failed to edit course details"
        })
    }
}

export const getCourseById = async(req, res) =>{
    try {
        const courseId = req.params.courseId

        const course = await Course.findById(courseId)
        if(!course){
            return res.status(500).json({
                success:false,
                message: "Failed to edit course details"
            })
        }

        return res.status(200).json({
            success: true,
            course
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "Failed to get course by id"
        })
    }
}