const Campground = require("../models/campground");
const KEY = process.env.BingMapsKey;
const superagent = require("superagent");

const getGeometricLocation = async (BASE_URL) => {
  try {
    const result = await superagent.get(BASE_URL);
    return JSON.parse(result.text).resourceSets[0].resources[0].point;
  } catch (err) {
    return next(err);
  }
};

module.exports.index = async (req, res) => {
  const { q } = req.query;
  let campgrounds;
  if (q) {
    campgrounds = await Campground.find({ location: { $regex: q } });
  } else {
    campgrounds = await Campground.find({});
  }
  res.render("campgrounds/index.ejs", { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
  res.render("campgrounds/new.ejs");
};

module.exports.showCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!campground) {
    req.flash("error", "Cannot find that campground!!");
    res.redirect("/campgrounds");
  } else {
    res.render("campgrounds/show.ejs", { campground });
  }
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Cannot find that campground!!");
    res.redirect("/campgrounds");
  } else {
    res.render("campgrounds/edit.ejs", { campground });
  }
};

module.exports.createCampground = async (req, res, next) => {
  const address = req.body.campground.location;
  const BASE_URL = `http://dev.virtualearth.net/REST/v1/Locations?q=${address}&key=${KEY}`;
  const geoLocation = await getGeometricLocation(BASE_URL);
  geoLocation.coordinates.reverse();
  const campground = new Campground(req.body.campground);
  campground.geometry = geoLocation;
  campground.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  campground.author = req.user._id;
  await campground.save();
  req.flash("success", "New Campground has been successfully Created");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  campground.images.push(...imgs);
  await campground.save();
  req.flash("success", "Successfully Updated Campground");
  res.redirect(`/campgrounds/${id}`);
};

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully Deleted the Campground");
  res.redirect(`/campgrounds`);
};

//  const address = campground.location;
//     const BASE_URL = `http://dev.virtualearth.net/REST/v1/Locations?q=${address}&key=${KEY}`;
//     const geoLocation = await getGeometricLocation(BASE_URL);
//     geoLocation.reverse();
//     const lat = geoLocation[0];
//     const lon = geoLocation[1];
//     // console.log(geoLocation);
//     // console.log(typeof geoLocation);
