var url = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-account/Zix-EQvvUfLrTq9_55IG0JvVvY2xefFCLmlGJdf6yfZBPV8';
console.log(url)
var playerName, encPlayerName, playerRegion, encryptedSummonerId
var leagueRetrieved = false,
    masteryRetrieved = false,
    championRetrieved = false
// On document ready set the header

/************************************************************************
 Helper Functions
************************************************************************/
function titleCase(str) {
    return str.replace(/\w\S/g, function (t) {
        return t.toUpperCase()
    });
}
/************************************************************************
 Retrieve Functions
************************************************************************/

// Retrieve player data on click of "Request Data" button
$('#player-button').click(function () {
    // if requesting the same summoner data again, then ignore
    if (playerName == $('#summonerName').val() && playerRegion == $('#region').children('option:selected').text()) {
        leagueRetrieved,
        masteryRetrieved,
        championRetrieved = false,
        false,
        false;
        // Pop up some sort of bubble indicating this summoners data has already been retrieved
        return;
    }
    playerName = $('#summonerName').val();
    encPlayerName = encodeURI(playerName);
    playerRegion = $('#region').children('option:selected').text();

    if (playerName != "" || playerRegion == 'Select Region') {
        let fullUrl = 'https://' + playerRegion + config._apiBase + config._playerUrl.replace('{summonerName}', encPlayerName);
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
                // $('#testId').text(JSON.stringify(body));
                encryptedSummonerId = body['id'];
                console.log(encryptedSummonerId);
                fillPlayerData(body);
            })
            .catch(err => {
                console.log('Error encountered', err);
                $('#summonerName').attr("placeholder", 'No such summoner found.').val("").blur();
            });
        return;
    }

    // Should definitely make these invalid errors appear as temporary pop ups with 'X' icon or someting
    else {
        console.log('Empty submit attempted');
        $('#summonerName').attr("placeholder", 'Please include summoner name and region').val("").blur();
    }
})

// Rerieve league information and placements for player
$('#league-button').click(function () {
    // if (leagueRetrieved){
    //     return;
    // }
    // console.log(config._leagueUrl.replace('{encryptedSummonerId}',encryptedSummonerId));
    let fullUrl = 'https://' + playerRegion + config._apiBase + (config._leagueUrl.replace('{encryptedSummonerId}', encryptedSummonerId));
    console.log(fullUrl);
    leagueRetrieved = true;

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
            // $('#testId').text(JSON.stringify(body));
            fillLeagueData(body);
        })
        .catch(err => {
            console.log('Error encountered', err);
        });
    return;
})

$('#mastery-button').click(function () {

})
$('#champion-buton').click(function () {

})


/************************************************************************
 Fill Functions
************************************************************************/

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
    let d = new Date(0);
    d.setUTCMilliseconds(playerData['revisionDate']);
    let playerIconUrl = config._iconUrl + playerRegion + '/' + encPlayerName;
    console.log(playerIconUrl);
    // $('#welcome').text('Welcome ' + playerData['name'] + '!');
    $('#welcome-id').html('<b>Account Id:</b> ' + playerData['accountId']);
    $('#last-updated').html('<b>Last Updated:</b> ' + d.toLocaleString());
    $('#summoner-lvl').html('<b>Summoner Lvl:</b> ' + playerData['summonerLevel']);
    $('#summoner-icon').attr('src', 'http://avatar.leagueoflegends.com/na/Anaklusmos%20Sword.png')
    $('.jumbotron').css("padding-bottom", "10px");
    $('#data-sections').css('display', 'block');
    return;
}
/**
 [{
	"leagueId": "00000000-0000-0000-0000-000000000000",
	"leagueName": "",
	"queueType": "RANKED_SOLO_5x5",
	"position": "BOTTOM",
	"tier": "BRONZE",
	"rank": "IV",
	"leaguePoints": 78,
	"wins": 14,
	"losses": 16,
	"veteran": false,
	"inactive": false,
	"freshBlood": true,
	"hotStreak": false,
	"summonerId": "6nMTdgt_aX5FYQHyTHXgLy59g8Hd4Z-lVCfgJvZyUllorrE",
	"summonerName": "Anaklusmos Sword"
}, ...
] 
 */
function fillLeagueData(leagueData) {
    let repl = {
        "roleNumber": 0,
        "role": "",
        "tier": "",
        "rank": "",
        "wins": 0,
        "losses": 0
    };
    // console.log(leagueData.length);
    for (var i = 0; i < leagueData.length; i++) {
        console.log(titleCase(config._roleSrc[leagueData[i].position]));
        let cardHtml = `<div class="card card-body">
        <div class='d-inline'>
          <h3 class="card-title d-inline"><img class='mr-2' id='role${i}' height='36px' width='36px' src='img/roles/${config._roleSrc[leagueData[i].position]}.png'
              alt='${titleCase(config._roleSrc[leagueData[i].position])}Icon' style="display: inline">${titleCase(config._roleSrc[leagueData[i].position])}</h3>
          <p class="d-inline">${titleCase(leagueData[i].tier)} ${leagueData[i].rank}</p>
        </div>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
          card's content.</p>
      </div>`;
        // console.log(cardHtml);
        $('.league-section').append(cardHtml);
    }
    return;

}

/** */
function fillMasteryData(masteryData) {

}

/** */
function fillChampionData(championData) {}