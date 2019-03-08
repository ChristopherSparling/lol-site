var url = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-account/Zix-EQvvUfLrTq9_55IG0JvVvY2xefFCLmlGJdf6yfZBPV8';
console.log(url)

// On document ready set the header


// Retrieve player data on click of "Request Data" button
$('#getPlayerData').click(function () {
    // console.log('Clicked');
    var playerName = $('input').val();
    var encPlayerName = encodeURI(playerName);
    // console.log(playerName);
    // console.log(encPlayerName);
    if (playerName != null) {
        let fullUrl = config._playerUrl + encPlayerName;
        fetch(fullUrl, {
                method: 'GET',
                headers: config._headers
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then((body) => {
                console.log("Body: " + JSON.stringify(body));
                $('#testId').text(JSON.stringify(body));
                fillPlayerData(body);
            })
            .catch(err => {
                console.log('Error encountered', err);
                $('#summonerName').attr("placeholder", 'No such summoner found.').val("").blur();
            });
        return;
    }
})



function getPlayerChampData() {
    return;
}

/*{
	"id": "6nMTdgt_aX5FYQHyTHXgLy59g8Hd4Z-lVCfgJvZyUllorrE",
	"accountId": "Zix-EQvvUfLrTq9_55IG0JvVvY2xefFCLmlGJdf6yfZBPV8",
	"puuid": "gMP-lb1K61mX0S0clBLHkjbz60atYOXGhBpWIQN9OcvbQolqWeXJ5TpdKGxKnI0epVsynmZCHaGluQ",
	"name": "Anaklusmos Sword",
	"profileIconId": 3187,
	"revisionDate": 1551992457000,
	"summonerLevel": 36
}*/
function fillPlayerData(playerData) {
    // Update welcome text
    $('#welcome').text('Welcome ' + playerData['name'] + '!');
    $('#welcome-id').text('Account Id: ' + playerData['accountId'])
    // Display 
    return;
}

function fillPlayerChampData() {
    return;
}

function clearData() {
    return;
}