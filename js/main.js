var url = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-account/Zix-EQvvUfLrTq9_55IG0JvVvY2xefFCLmlGJdf6yfZBPV8';
console.log(url)
function getAnaklusmos() {
    let body = fetch('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Anaklusmos%20Sword?api_key=RGAPI-2fba4b79-1f34-4eb4-96a3-8ce09747107e', {
        method: 'GET',
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
            "Origin": "https://developer.riotgames.com",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "api_key": "RGAPI-39406dc6-032a-48f2-86dd-d811ad6cc0c7",
            "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
        }
    })
    .then(response=>{return response.json()})
    .then(body => {console.log(body)});
    document.getElementById('testId').innerHTML = body;
    return;
}
// “Program Files (x86)\Google\Chrome\Application\chrome.exe” --allow-file-access-from-files --disable-web-security --user-data-dir --disable-features=CrossSiteDocumentBlockingIfIsolating
