//! Uncomment this response array and the console log on line 114 to check the function
// const response = [
//   {
//     id: 1293487,
//     name: "KCRW",  // radio station callsign
//     tracks: [{ timestp: "2021-04-08", trackName: "Peaches" }]
//   },
//   {
//     id: 12923,
//     name: "KQED",
//     tracks: [
//       { timestp: "2021-04-09", trackName: "Savage" },
//       { timestp: "2021-04-09", trackName: "Savage (feat. Beyonce)" },
//       { timestp: "2021-04-08", trackName: "Savage" },
//       { timestp: "2021-04-08", trackName: "Savage" },
//       { timestp: "2021-04-08", trackName: "Savage" }
//     ]
//   },
//   {
//     id: 4,
//     name: "WNYC",
//     tracks: [
//       { timestp: "2021-04-09", trackName: "Captain Hook" },
//       { timestp: "2021-04-08", trackName: "Captain Hook" },
//       { timestp: "2021-04-07", trackName: "Captain Hook" }
//     ]
//   }
// ];

const generateGraphData = (data) => {
  //create an array of all track objects from the api response
  const arr = data.flatMap(item => {
    return item['tracks']
  })
  //create object to store dates and songs played
  const res = {};
  //loop through new array of all the tracks played
  for (const station of arr) {
    //does our object have the current timestamp?
    if (res.hasOwnProperty(station.timestp)) {
        //does this timestamp already have this track?
        if (res[station.timestp].hasOwnProperty(station.trackName)) {
            res[station.timestp][station.trackName] += 1;
        } else {
        res[station.timestp][station.trackName] = 1
        }
    }
    //if our object does not have the timestamp, then create a new key with the date and value as an object with tracks
    else {
    res[station.timestp] = {}
    res[station.timestp][station.trackName] = 1;
    }
  }
  const dataArr = [];
  //grab each date and then keep track of total songs played that day and also create the tooltip string
  for (const date in res) {
    let string = '';
    let songCount = 0;
    let count = 0;
    //after isolating each object, we need to grab each key name inside the tooltip object
    for (const track in res[date]){
        const clone = res[date];
        //check if the current key is the last one in the object, if so don't add a comma
        if (count === Object.keys(clone).length - 1){
          string += `${track} (${clone[track]})`
          songCount += clone[track]
        }
        else {
          string += `${track} (${clone[track]}), `
          count ++
          songCount += clone[track]
        }
    }
    //add an object with the correct format and data needed
    dataArr.push({
      x: date,
      y: songCount,
      tooltip: string
    });
  }
  //Last step is to sort the objects based on date played
  dataArr.sort(function(a,b){
    return new Date(a.x) - new Date(b.x);
  })
  return dataArr
}

// console.log(generateGraphData(response))