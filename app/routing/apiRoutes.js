var path = require('path');

var friendData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

    app.get('/api/friends', function(req, res) {
        res.json(friendData);
    });

    // API POST Requests

    app.post('/api/friends', function(req, res) {
        var userInput = req.body;

        var userResponses = userInput.scores;

        var matchName = "";
        var matchImage = "";
        var totalDifference = 10000; //make initial value big for comparison - had to look up

        for (var i = 0; i < friendData.length; i++) {
            var diff = 0;
            for (var j = 0; j < userResponses.length; j++) {
                diff += Math.abs(friendData[i].scores[j] - userResponses[j]);
            }

            if (diff < totalDifference) {
                totalDifference = diff;
                matchName = friendData[i].name;
                matchImage = friendData[i].photo;
            }
        }

        friendData.push(userInput);

        res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
    });
};