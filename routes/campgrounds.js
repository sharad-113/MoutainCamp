const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

// Show All Campgrounds and Create Campground
router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );

// Render Form for new Campground
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(
    // Show particular campground
    catchAsync(campgrounds.showCampground)
  )
  .put(
    // Updating New Campground
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(
    // Deleting a Campground
    isLoggedIn,
    isAuthor,
    catchAsync(campgrounds.deleteCampground)
  );

// Render Form for edit Campground
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
