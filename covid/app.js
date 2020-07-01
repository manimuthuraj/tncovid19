var express = require("express")
var app = express();
var request = require("request")
app.set("view engine", "ejs")
app.use(express.static("partials"));
app.use(express.static(__dirname));

app.get("/", function(req, res) {
    request('https://api.covid19india.org/state_district_wise.json', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var Data = JSON.parse(body)

            request('https://api.covid19india.org/v3/data.json', function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var sData = JSON.parse(body)

                    request('https://api.covid19india.org/data.json', function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var tData = JSON.parse(body)

                            //console.log(tData.statewise[2].lastupdatedtime)
                            res.render("tn", { Data: Data, sData: sData, tData: tData })
                        }
                    });
                }
            });
        }
    });
})

app.listen(process.env.PORT || 3000, () => console.log(`started`))