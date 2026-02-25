const https = require('https');
const fs = require('fs');

https.get('https://undraw.co/api/v2/illustrations?search=app', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const result = JSON.parse(data);
    if(result.illustrations && result.illustrations.length > 0) {
      const imgUrl = result.illustrations[0].image;
      console.log("Found URL:", imgUrl);
      https.get(imgUrl, (imgRes) => {
        let svgData = '';
        imgRes.on('data', (chunk) => svgData += chunk);
        imgRes.on('end', () => {
          fs.writeFileSync('digital_closet.svg', svgData);
          console.log("SVG downloaded successfully.");
        });
      });
    } else {
      console.log("No illustrations found.");
    }
  });
});
