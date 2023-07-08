const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
  console.log("Connected to the database yelp-camp");
}
main().catch((err) => console.log(err));
const sample = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const totalImages = [
  {
    url: "https://res.cloudinary.com/dqcyb70r6/image/upload/v1687850174/YelpCamp/pexels-rrinna-2071563_henqpn.jpg",
    filename: "YelpCamp/pexels-rrinna-2071563_henqpn",
  },
  {
    url: "https://res.cloudinary.com/dqcyb70r6/image/upload/v1687850172/YelpCamp/pexels-anna-shvets-4014722_nkgn2x.jpg",
    filename: "YelpCamp/pexels-anna-shvets-4014722_nkgn2x",
  },
  {
    url: "https://res.cloudinary.com/dqcyb70r6/image/upload/v1687850168/YelpCamp/pexels-gantas-vai%C4%8Diul%C4%97nas-4499511_fhsmrj.jpg",
    filename: "YelpCamp/pexels-gantas-vai%C4%8Diul%C4%97nas-4499511_fhsmrj",
  },
  {
    url: "https://res.cloudinary.com/dqcyb70r6/image/upload/v1687850167/YelpCamp/pexels-xue-guangjian-1687845_jifo5l.jpg",
    filename: "YelpCamp/pexels-xue-guangjian-1687845_jifo5l",
  },
  {
    url: "https://res.cloudinary.com/dqcyb70r6/image/upload/v1687850166/YelpCamp/pexels-vlad-bagacian-1059042_u08ho7.jpg",
    filename: "YelpCamp/pexels-vlad-bagacian-1059042_u08ho7",
  },
  {
    url: "https://res.cloudinary.com/dqcyb70r6/image/upload/v1687850165/YelpCamp/pexels-vlad-bagacian-1061640_glxcen.jpg",
    filename: "YelpCamp/pexels-vlad-bagacian-1061640_glxcen",
  },
  {
    url: "https://res.cloudinary.com/dqcyb70r6/image/upload/v1687850165/YelpCamp/pexels-vlad-bagacian-2819557_m5bkqh.jpg",
    filename: "YelpCamp/pexels-vlad-bagacian-2819557_m5bkqh",
  },
  {
    url: "https://res.cloudinary.com/dqcyb70r6/image/upload/v1687850163/YelpCamp/pexels-tatiana-syrikova-3933881_cbdguz.jpg",
    filename: "YelpCamp/pexels-tatiana-syrikova-3933881_cbdguz",
  },
  {
    url: "https://res.cloudinary.com/dqcyb70r6/image/upload/v1687850162/YelpCamp/pexels-michel-paz-2473845_nmcxvi.jpg",
    filename: "YelpCamp/pexels-michel-paz-2473845_nmcxvi",
  },
  {
    url: "https://res.cloudinary.com/dqcyb70r6/image/upload/v1687850162/YelpCamp/pexels-quang-nguyen-vinh-3232542_dfqivv.jpg",
    filename: "YelpCamp/pexels-quang-nguyen-vinh-3232542_dfqivv",
  },
  {
    url: "https://res.cloudinary.com/dqcyb70r6/image/upload/v1687850161/YelpCamp/pexels-ruslan-aizatulin-4154216_yju9cc.jpg",
    filename: "YelpCamp/pexels-ruslan-aizatulin-4154216_yju9cc",
  },
  {
    url: "https://res.cloudinary.com/dqcyb70r6/image/upload/v1687850159/YelpCamp/pexels-josh-hild-2422265_uz8emy.jpg",
    filename: "YelpCamp/pexels-josh-hild-2422265_uz8emy",
  },
  {
    url: "https://res.cloudinary.com/dqcyb70r6/image/upload/v1687850158/YelpCamp/pexels-daniel-ap-868306_zerzov.jpg",
    filename: "YelpCamp/pexels-daniel-ap-868306_zerzov",
  },
  {
    url: "https://res.cloudinary.com/dqcyb70r6/image/upload/v1687850157/YelpCamp/pexels-daniel-joseph-petty-756780_fucsfp.jpg",
    filename: "YelpCamp/pexels-daniel-joseph-petty-756780_fucsfp",
  },
  {
    url: "https://res.cloudinary.com/dqcyb70r6/image/upload/v1687850157/YelpCamp/pexels-%D0%B5%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B5%D0%B3%D0%BE%D1%80%D0%BE%D0%B2%D0%B0-8985295_lmz7eg.jpg",
    filename:
      "YelpCamp/pexels-%D0%B5%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B5%D0%B3%D0%BE%D1%80%D0%BE%D0%B2%D0%B0-8985295_lmz7eg",
  },
  {
    url: "https://res.cloudinary.com/dqcyb70r6/image/upload/v1687850156/YelpCamp/pexels-gaetan-thurin-3175294_icfh8g.jpg",
    filename: "YelpCamp/pexels-gaetan-thurin-3175294_icfh8g",
  },
];

function randomImageGenerator() {
  let images = [];
  for (let i = 0; i < 3; i++) {
    const randomNum = Math.floor(Math.random() * totalImages.length);
    images.push(totalImages[randomNum]);
  }
  return images;
}

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 100) + 20;
    const camp = new Campground({
      author: `6497173ff61f4a37a423dc5c`,
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)},${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: randomImageGenerator(),
    });
    await camp.save();
  }
};

seedDb()
  .then(() => {
    console.log("Stored into the database");
    mongoose.connection.close();
  })
  .catch((err) => console.log("Error!!!!" + err));
