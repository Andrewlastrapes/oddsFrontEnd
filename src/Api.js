

export const getGames = (sport) => new Promise((resolve, reject) => {
    console.log(sport)
    let url = `https://api.the-odds-api.com/v3/odds/?apiKey=8844d0bd760ef626eb43fba7dcf9a839&sport=${sport}&region=uk&mkt=h2h`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            resolve(data)
        });
});

export const postUserRoute = (data, type) => new Promise((resolve, reject) => {
    console.log(data)
    let url = `http://localhost:3001/user/${type}`
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(res => {
        console.log(res)
        if (!res.ok) {
            throw Error(res.statusText);
        }
        res.json()
            .then(data => {
                resolve(data)
            })
    });
});









