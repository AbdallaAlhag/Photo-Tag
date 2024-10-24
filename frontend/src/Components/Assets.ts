// Import main map images
import map1 from "../assets/map/map1.webp";
import map2 from "../assets/map/map2.jpg";
import map3 from "../assets/map/map3.webp";

// Import character images for each map
import map1_1 from "../assets/map/map1-1.jpg";
import map1_2 from "../assets/map/map1-2.jpg";
import map1_3 from "../assets/map/map1-3.jpg";

import map2_1 from "../assets/map/map2-1.jpg";
import map2_2 from "../assets/map/map2-2.jpg";
import map2_3 from "../assets/map/map2-3.jpg";

import map3_1 from "../assets/map/map3-1.png";
import map3_2 from "../assets/map/map3-2.png";
import map3_3 from "../assets/map/map3-3.png";

type Map = {
  map: string;
  characters: string[];
  names: string[]; // if you are using names
  xPercentage: number[];
  yPercentage: number[];
  widthPercentage: number[];
  heightPercentage: number[];
};
// Object to organize maps and their characters
const maps: Record<string, Map> = {
  map1: {
    map: map1,
    characters: [map1_1, map1_2, map1_3],
    names: ["Browser", "Neo", "Link"],
    xPercentage: [78.61, 38.52, 19.72],
    yPercentage: [39.89, 59.56, 95.21],
    widthPercentage: [10.56, 5.46, 4.91],
    heightPercentage: [2.13, 1.06, 0.95],
  },
  map2: {
    map: map2,
    characters: [map2_1, map2_2, map2_3],
    names: ["Totoro", "Guts", "Koffing "],
    xPercentage: [70.00, 45.31, 44.84],
    yPercentage: [52.60, 86.56, 64.49],
    widthPercentage: [1.98, 5.46, 7.14],
    heightPercentage: [3.06, 1.06, 5.56],
  },
  map3: {
    map: map3,
    characters: [map3_1, map3_2, map3_3],
    names: ["Bird", "Hippo", "Dragon "],
    xPercentage: [95.21, 70.09, 19.61],
    yPercentage: [38.82, 48.24, 67.63],
    widthPercentage: [1.79, 9.92, 11.68],
    heightPercentage: [2.54, 4.64, 3.86],
  },
};

export default maps;
