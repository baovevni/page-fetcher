const fs = require('node:fs');
const needle = require('needle');

const args = process.argv.slice(2);
const url = args[0];
const filename = args[1];
const fetchDataAndWriteToFile = (url, filename, callback) => {
  //function that connects to the website and fetches the data
  needle.get(url, (error, response, body) => {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.
    //function that writes info to the file
    const content = body;
    if (fs.existsSync(filename)) {
      console.log(`The file '${filename}' already exists.`);
    } else {
      fs.writeFile(filename, content, err => {
        if (err) {
          return callback(err);
        } else {
          callback(body)
        }
      });
    }
  })
};


// callback function
const functionToRunWhenThingsAreDone = (body) => {
  const fileSize = fs.statSync(filename).size;
  console.log(`Downloaded and saved ${fileSize} bytes to ${filename}`);
};

fetchDataAndWriteToFile(url, filename, functionToRunWhenThingsAreDone);