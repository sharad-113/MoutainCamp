// My College Project

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const MongoDBStore = require("connect-mongo");
const helmet = require("helmet");
const {
  fontSrcUrls,
  connectSrcUrls,
  styleSrcUrls,
  scriptSrcUrls,
} = require("./utils/securityFeatures");
const mongoSanitize = require("express-mongo-sanitize");
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/yelp-camp";
// || "mongodb://127.0.0.1:27017/yelp-camp"
const PORT = process.env.PORT || 8080;
const secret = process.env.SECRET || "ThisShouldBeBetterSecret";
const store = MongoDBStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret,
  },
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
  store,
  name: "sessionYelpCamp",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

// Routes variable
const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/users");

// Error Handling in Mongoose
async function main() {
  await mongoose.connect(dbUrl);
  console.log("Connected to the database yelp-camp");
  app.listen(PORT, () => {
    console.log("Listening to Port Number " + PORT);
  });
}
main().catch((err) => console.log(err));

// Setting the path engine

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MiddleWare

app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
app.use(mongoSanitize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        "https://res.cloudinary.com/dqcyb70r6/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
        "https://images.unsplash.com/",
      ],
      fontSrc: ["'self'", ...fontSrcUrls],
    },
  })
);

// Routes

app.get("/", (req, res) => {
  res.render("home.ejs");
});
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);
app.use("/", userRoutes);

// Error Handling
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No something went Wrong!!!!";
  res.status(statusCode).render("error.ejs", { err });
});
