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
  //create an empty array to store and return the mutated data
  const dataArr = [];
  //if the data array is empty, return
  if (!response.length) return;
  //Iterate through the response array to access each object
  for (let i = 0; i < response.length; i++){
    //now iterate through the tracks array within each object
    for (let j = 0; j < response[i].tracks.length; j++){
      let track = response[i].tracks[j].trackName;
      let time = response[i].tracks[j].timestp;
      //set up a boolean to check if a date already exists in the return array
      let contains = false;
      //if the return array is empty, add a new object with the data inputed
      if (!dataArr.length){
          dataArr.push({
            x: time,
            y: 1,
            //originally creating tooltip as an object to track the trackName as the key and times plaed as the value
            tooltip: {
              },
            });
          //add the track name to the object in the array and set the value to 1
          dataArr[i].tooltip[track] = 1;
      }
      //otherwise, loop through the return array to check if the date exists
      else{
        for (let k = 0; k < dataArr.length; k++){
          //if the date does exist, then change the value of contains to true and increment y
          if (dataArr[k].x === time){
            contains = true;
            dataArr[k].y += 1;
            //if the trackName already exists as a key in the tooltip object, just increment the value
            if (dataArr[k].tooltip[track]){
              dataArr[k].tooltip[track] += 1;
            }
            //if it does not exist, add the trackName as a key and set the value to 1
            else {
              dataArr[k].tooltip[track] = 1;
            };
            break
          };
        };
        //after looping through the return object, if the date was not present, create a new object at the end of the array
        if (contains === false){
          dataArr.push({
            x: time,
            y: 1,
            tooltip: {
              },
            });
          //add the track name to the newest object in the array and set the value to 1
          dataArr[dataArr.length - 1].tooltip[track] = 1;
        }
      }
    }
  }
  //Now to stringify the tooltip object to the proper syntax
  for (let n = 0; n < dataArr.length; n++){
    let string = '';
    let count = 0;
    //after isolating each object, we need to grab each key name inside the tooltip object
    for (key in dataArr[n].tooltip){
      const clone = dataArr[n].tooltip;
      //check if the current key is the last one in the object, if so don't add a comma
      if (count === Object.keys(clone).length - 1){
        string += `${key} (${clone[key]})`
      }
      else {
        string += `${key} (${clone[key]}), `
        count ++
      }
    }
    //reassign the value of the tooltip object to the new concatenated string
    dataArr[n].tooltip = string;
  }
  //Last step is to sort the objects based on date played
  dataArr.sort(function(a,b){
    return new Date(a.x) - new Date(b.x);
  })
  return dataArr
}

// console.log(generateGraphData(response))