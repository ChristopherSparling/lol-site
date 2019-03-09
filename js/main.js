var url = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-account/Zix-EQvvUfLrTq9_55IG0JvVvY2xefFCLmlGJdf6yfZBPV8';
console.log(url)
var playerName, encPlayerName, playerRegion
// On document ready set the header


// Retrieve player data on click of "Request Data" button
$('#player-button').click(function () {
    playerName = $('#summonerName').val();
    encPlayerName = encodeURI(playerName);
    playerRegion = $('#region').children('option:selected').text();

    if (playerName != "" || playerRegion == 'Select Region') {
        let fullUrl = 'https://' + playerRegion + config._apiBase + config._playerUrl.replace('{summonerName}',encPlayerName);
        fetch(fullUrl, {
                method: 'GET',
                headers: config._headers
            })
            .then((response) => {
                if (response.ok) {return response.json();}
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

    // Should definitely make these invalid errors appear as temporary pop ups with 'X' icon or someting
    else{
        console.log('Empty submit attempted');
        $('#summonerName').attr("placeholder", 'Please include summoner name and region').val("").blur();
    }
})


$('#league-button').click(function(){

})
$('#mastery-button').click(function(){

})
$('#champion-buton').click(function(){

})
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
    $('.jumbotron').css("padding-bottom","25px");
    $('#data-sections').css('display','block');
    return;
}
