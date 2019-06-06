import { setAlert } from "./actions/alert";

const postRoute = "http://localhost:3001/user/register";
const loginRoute = "http://localhost:3001/user/login";

export const getGames = (sport) => new Promise((resolve, reject) => {
    console.log(sport)
    let url = `https://api.the-odds-api.com/v3/odds/?apiKey=846e858aee45850a1bb5916b880d5852&sport=${sport}&region=uk&mkt=h2h`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            resolve(data)
        });
});

export const postRegister = (username, password) => new Promise((resolve, reject) => {

    let data = {
        username: username,
        password: password
    }
    fetch(postRoute, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (!res.ok) {
            throw Error(res.statusText);
        }
        res.json()
            .then(data => {
                resolve(data)
            })
    });
});


export const postLogin = (username, password) => new Promise((resolve, reject) => {
    let data = {
        username: username,
        password: password
    }
    fetch(loginRoute, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(res =>
            res.json())

        .then(data => {
            resolve(data)
           
        });
})




