import { Course } from "../database/model/courseModel.js";

/* ================================
 * CREATE COURSE (ADMIN)
 * ================================ */
export const createCourse = async (req, res) => {
  try {
    const { title, description, price, tags, thumbnail, lessons } = req.body;

    if (!title || !description || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Title, description and price are required",
      });
    }

    const course = await Course.create({
      title,
      description,
      price,
      tags,
      thumbnail,
      lessons,
      mentor: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error("Create Course Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================================
 * GET ALL PUBLISHED COURSES
 * ================================ */
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate(
      "mentor",
      "firstname lastname avatar"
    );

    res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Get All Courses Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================================
 * GET SINGLE COURSE
 * ================================ */
export const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "mentor",
      "firstname lastname avatar"
    );

    if (!course)
      return res.status(404).json({ success: false, message: "Course not found" });

    let isEnrolled = false;
    let isAuthor = false;

    if (req.user) {
      isAuthor = course.mentor._id.equals(req.user._id);
      isEnrolled =
        req.user.purchasedCourses &&
        req.user.purchasedCourses.some((cId) => cId.equals(course._id));
    }

    // Show only free lessons for non-enrolled users
    let lessons = [...course.lessons];
    if (!isEnrolled && course.price > 0 && !isAuthor) {
      lessons = lessons.filter((lesson) => lesson.isFree === true);
    }

    res.status(200).json({
      success: true,
      course: { ...course.toObject(), lessons },
      isEnrolled: isEnrolled || isAuthor || course.price === 0,
    });
  } catch (error) {
    console.error("Get Single Course Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================================
 * UPDATE COURSE
 * ================================ */
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course)
      return res.status(404).json({ success: false, message: "Course not found" });

    const isAdmin = req.user.role === "admin";
    const isMentor = course.mentor.equals(req.user._id);

    if (!isAdmin && !isMentor)
      return res.status(403).json({ success: false, message: "Not allowed" });

    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Course updated",
      course: updated,
    });
  } catch (error) {
    console.error("Update Course Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================================
 * DELETE COURSE
 * ================================ */
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course)
      return res.status(404).json({ success: false, message: "Course not found" });

    const isAdmin = req.user.role === "admin";
    const isMentor = course.mentor.equals(req.user._id);

    if (!isAdmin && !isMentor)
      return res.status(403).json({ success: false, message: "Not allowed" });

    await Course.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete Course Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================================
 * TOGGLE PUBLISH / UNPUBLISH COURSE
 * ================================ */
export const togglePublishCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course)
      return res.status(404).json({ success: false, message: "Course not found" });

    if (req.user.role !== "admin" && !course.mentor.equals(req.user._id))
      return res.status(403).json({ success: false, message: "Not authorized" });

    course.isPublished = !course.isPublished;
    await course.save();

    res.status(200).json({
      success: true,
      message: `Course is now ${course.isPublished ? "Published" : "Unpublished"}`,
    });
  } catch (error) {
    console.error("Toggle Publish Course Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
