const { url } = require("./main");
function getAnaklusmos() {
    var body = fetch(url, {
        headers: config._headers
    })
        .then(data => { return data.json(); })
        .then(res => { console.log(res); });
    $('testId').innerHTML = body;
    return;
}
