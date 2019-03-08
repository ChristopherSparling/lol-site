var url = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-account/Zix-EQvvUfLrTq9_55IG0JvVvY2xefFCLmlGJdf6yfZBPV8';
console.log(url)

//

function getPlayerData(playerName) {
    let encPlayerName = encodeURI(playerName);
    console.log(encPlayerName); 
    let body = fetch('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Anaklusmos%20Sword?api_key=RGAPI-2fba4b79-1f34-4eb4-96a3-8ce09747107e', {
        method: 'GET',
        headers: config._headers
    })
    .then((response) => {return response.json()})
    .then((body) => {
        console.log("Inner Body: " + JSON.stringify(body));
        $('#testId').text(JSON.stringify(body['id']));
        return body
    });
    return;
}

function getPlayerChampData(){return;}
function fillPlayerData(){return;}
function fillPlayerChampData(){return;}
function clearData(){return;}