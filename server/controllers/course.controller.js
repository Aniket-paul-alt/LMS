import { Course } from "../models/course.model.js"
import { Lecture } from "../models/lecture.model.js"
import {deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMedia} from "../utils/cloudinary.js"

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

export const getPublishedCourse = async(req, res)=>{
    try {
        const courses = await Course.find({isPublished: true}).populate({path:"creator", select:"name photoUrl"})
        if(!courses){
            return res.status(404).json({
                success:false,
                message: "Courses not found"
            })
        }

        return res.status(200).json({
            courses
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "Failed to get published courses"
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

export const createLecture = async(req, res)=>{
    try {
        const {lectureTitle} = req.body
        const {courseId} = req.params

        if(!lectureTitle || !courseId) return res.status(400).json({message:"Lecture title is required"})
        
        const lecture = await Lecture.create({lectureTitle})

        const course = await Course.findById(courseId)
        if(course){
            course.lectures.push(lecture._id)
            await course.save()
        }

        return res.status(200).json({
            lecture,
            message:"Lecture created successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "Failed to create lecture"
        })
    }
}

export const getCourseLecture = async(req, res)=>{
    try {
        const {courseId} = req.params
        const course = await Course.findById(courseId).populate("lectures")
        if(!course){
            return res.status(404).json({
                success:false,
                message: "Course not found"
            })
        }

        return res.status(200).json({
            lectures: course.lectures
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "Failed to get lectures"
        })
    }
}

export const editLecture = async(req, res)=>{
    try {
        const {lectureTitle, videoInfo, isPreviewFree} = req.body
        const {courseId, lectureId} = req.params
        const lecture = await Lecture.findById(lectureId)
        if(!lecture){
            return res.status(404).json({
                message: "Lecture not found!"
            })
        }

        // update lecture
        if(lectureTitle) lecture.lectureTitle = lectureTitle
        if(videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl
        if(videoInfo?.publicId) lecture.publicId = videoInfo.publicId
        if(isPreviewFree) lecture.isPreviewFree = isPreviewFree

        await lecture.save()

        //Ensure the course still has the lecture id if it was not already added
        const course = await Course.findById(courseId)
        if(course && !course.lectures.includes(lecture._id)){
            course.lectures.push(lecture._id)
            await course.save()
        }
        return res.status(200).json({
            lecture,
            message:"Lecture updated successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "Failed to edit lecture"
        })
    }
}

export const removeLecture = async(req, res)=>{
    try {
        const {lectureId} = req.params
        const lecture = await Lecture.findByIdAndDelete(lectureId)
        if(!lecture){
            return res.status(404).json({
                message:"Lecture not found"
            })
        }
        // delete the lecture from cloudinary as well
        if(lecture.publicId){
            await deleteVideoFromCloudinary(lecture.publicId)
        }

        //remove the lecture reference from the associated course
        await Course.updateOne({
            lectures: lectureId // find the course that contains the lecture
        },{
            $pull:{lectures:lectureId} // remove the lecture id from the lectures array
        })

        return res.status(200).json({
            message: "Lecture removed succesfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "Failed to remove lecture"
        })
    }
}

export const getLectureById = async(req, res)=>{
    try {
        const {lectureId} = req.params
        const lecture = await Lecture.findById(lectureId)
        if(!lecture){
            return res.status(404).json({
                message:"Lecture not found"
            })
        }

        return res.status(200).json({
            lecture
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "Failed to get lecture by id"
        })
    }
}

//publish unpublish course logic
export const togglePublishCourse = async(req, res)=>{
    try {
        const {courseId} = req.params
        const {publish} = req.query // true or false
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({
                message:"Course not found"
            })
        }

        //publish status based on query parameter
        course.isPublished = publish === "true"
        await course.save()

        const statusMessage = course.isPublished ? "Published" : "Unpublished"
        return res.status(200).json({
            message: `Course is ${statusMessage}`
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "Failed to update publish status"
        })
    }
}