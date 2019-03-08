var url = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-account/Zix-EQvvUfLrTq9_55IG0JvVvY2xefFCLmlGJdf6yfZBPV8';
console.log(url)

//
$('#getPlayerData').click(function(){
    console.log('Clicked');
    var playerName = $('input').val();
    let encPlayerName = encodeURI(playerName);
    let fullUrl = config._playerUrl + encPlayerName + '?' + config._apiKey;
    console.log(encPlayerName);
    let body = fetch(fullUrl, {
            method: 'GET',
            headers: config._headers
        })
        .then((response) => {
            return response.json()
        })
        .then((body) => {
            console.log("Inner Body: " + JSON.stringify(body));
            $('#testId').text(body['id']);
            return body
        });
    return;
})

function getPlayerChampData() {
    return;
}

function fillPlayerData() {
    return;
}

function fillPlayerChampData() {
    return;
}

function clearData() {
    return;
}