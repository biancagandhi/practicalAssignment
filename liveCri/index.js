const http = require("http");
const fs = require("fs");
var requests = require("requests");



const homeFile = fs.readFileSync("index.html", "utf-8");

const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%title%}", orgVal.livescore.title);
    temperature = temperature.replace("{%titlee%}", orgVal.livescore.title);
    temperature = temperature.replace("{%currsocre%}", orgVal.livescore.current);
    temperature = temperature.replace("{%batname%}", orgVal.livescore.batsman);
    temperature = temperature.replace("{%brun%}", orgVal.livescore.batsmanrun);
    temperature = temperature.replace("{%bfaced%}", orgVal.livescore.ballsfaced);
    temperature = temperature.replace("{%fours%}", orgVal.livescore.fours);
    temperature = temperature.replace("{%six%}", orgVal.livescore.sixes);
    temperature = temperature.replace("{%bolwername%}", orgVal.livescore.bowler);
    temperature = temperature.replace("{%boover%}", orgVal.livescore.bowlerover);
    temperature = temperature.replace("{%borun%}", orgVal.livescore.bowlerruns);
    temperature = temperature.replace("{%bowicket%}", orgVal.livescore.bowlerwickets);
    temperature = temperature.replace("{%ps%}", orgVal.livescore.partnership);
    temperature = temperature.replace("{%update%}", orgVal.livescore.update);
    temperature = temperature.replace("{%runrate%}", orgVal.livescore.runrate);
    temperature = temperature.replace("{%recentballs%}", orgVal.livescore.recentballs);

    return temperature;
}



const server = http.createServer((req,  res) => {
    
     requests("https://cricket-api.vercel.app/cri.php?url=https://www.cricbuzz.com/live-cricket-scores/32057/eng-vs-ind-3rd-test-india-tour-of-england-2021")
    .on('data', (chunk) => {
        const objData = JSON.parse(chunk);
        const arrData = [objData];
        
       

    // console.log(arrayData[0].main.temp);
    const realarrData = arrData.map((val) => replaceVal(homeFile, val)).join("");
        res.write(realarrData);
        // console.log(realarrData);
})
    .on('end', (err) => {
    if (err) return console.log('connection closed due to errors', err);
 
   res.end();
});

  
    
});

let port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log(`listening to the port no at ${port}`);
});