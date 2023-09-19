const v1 = campground.geometry.coordinates;
const description = campground.location;
const style = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap Contributors",
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm", // This must match the source key above
    },
  ],
};
const map = new maplibregl.Map({
  container: "map",
  // style:
  //   "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
  style: style,
  center: v1,
  zoom: 8,
});

map.on("load", function () {
  const loc = new maplibregl.Marker().setLngLat(v1).addTo(map);
});

// Add a layer showing the places.

// Create a popup, but don't add it to the map yet.
// var popup = new maplibregl.Popup({
//   closeButton: false,
//   closeOnClick: false,
// });
map.on("click", function (e) {
  new maplibregl.Popup()
    .setLngLat(v1)
    .setHTML(`<h4>${description}</h4>`)
    .addTo(map);
});

map.addControl(new maplibregl.NavigationControl());

// {
//   type: "Feature",
//   properties: {
//     description:
//       "<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a Mad Men Season Five Finale Watch Party, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>",
//   },
//   geometry: {
//     type: "Point",
//     coordinates: [77.216721, 28.6448],
//   },
// },
// {
//   type: "Feature",
//   properties: {
//     description:
//       "<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a Big Backyard Beach Bash and Wine Fest on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.</p>",
//   },
//   geometry: {
//     type: "Point",
//     coordinates: [77.216721, 28.6448],
//   },
// },
// {
//   type: "Feature",
//   properties: {
//     description:
//       "<strong>Ballston Arts & Crafts Market</strong><p>The Ballston Arts & Crafts Market sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>",
//   },
//   geometry: {
//     type: "Point",
//     coordinates: [77.216721, 28.6448],
//   },
// },
// {
//   type: "Feature",
//   properties: {
//     description:
//       "<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year's Seersucker Social bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>",
//   },
//   geometry: {
//     type: "Point",
//     coordinates: [77.216721, 28.6448],
//   },
// },
// {
//   type: "Feature",
//   properties: {
//     description:
//       "<strong>Capital Pride Parade</strong><p>The annual Capital Pride Parade makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>",
//   },
//   geometry: {
//     type: "Point",
//     coordinates: [77.216721, 28.6448],
//   },
// },
// {
//   type: "Feature",
//   properties: {
//     description:
//       "<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist Muhsinah plays the Black Cat (1811 14th Street NW) tonight with Exit Clov and Gods’illa. 9:00 p.m. $12.</p>",
//   },
//   geometry: {
//     type: "Point",
//     coordinates: [77.216721, 28.6448],
//   },
// },
// {
//   type: "Feature",
//   properties: {
//     description:
//       "<strong>A Little Night Music</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>",
//   },
//   geometry: {
//     type: "Point",
//     coordinates: [77.216721, 28.6448],
//   },
// },
// {
//   type: "Feature",
//   properties: {
//     description:
//       "<strong>Truckeroo</strong><p>Truckeroo brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>",
//   },
//   geometry: {
//     type: "Point",
//     coordinates: [77.216721, 28.6448],
//   },
// },
