import express from 'express';
import { addCourse, educatorDashboardData, getEducatorCourses, 
  getEnrolledStudentsData, updateRoleEducator } from '../controllers/educatorController.js';
import upload from '../configs/multer.js';
import { protectEducator } from '../middlewares/authMiddleware.js';

const educatorRouter = express.Router();

// ✅ Route to update user role to 'educator'
educatorRouter.get('/update-role', updateRoleEducator);

// ✅ Route to add a new course (only accessible by educators)
educatorRouter.post(
  '/add-course',
  protectEducator,           // Middleware to check if user is an educator
  upload.single('image'),    // Multer middleware to handle image upload
  addCourse                  // Controller function to add course
);

educatorRouter.get('/courses', protectEducator, getEducatorCourses)
educatorRouter.get('/dashboard', protectEducator, educatorDashboardData)
educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData)

export default educatorRouter;
