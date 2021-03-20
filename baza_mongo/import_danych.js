const axios = require('axios');

//przykladowa muzyka
axios.post("http://localhost:5000/songs", {title: "I'm Free", author: "Skeler", release: "2019-12-07"})
axios.post("http://localhost:5000/songs", {title: "Tep Tep", author: "Baauer", release: "2018-12-13"})
axios.post("http://localhost:5000/songs", {title: "ili", author: "TroyBoi", release: "2017-08-25"})
axios.post("http://localhost:5000/songs", {title: "Afterhours", author: "Diplo, Nina Sky, TroyBoi", release: "2015-09-18"})
axios.post("http://localhost:5000/songs", {title: "Touch", author: "Dillon Francis, BabyJake", release: "2020-04-15"})
axios.post("http://localhost:5000/songs", {title: "Salsabahton", author: "Dillon Francis, Nitti Gritti", release: "2019-11-15"})
axios.post("http://localhost:5000/songs", {title: "Let It Go", author: "Dillon Francis, Eptic", release: "2019-08-02"})
axios.post("http://localhost:5000/songs", {title: "Safety", author: "DJ Snake, GASHI", release: "2019-09-20"})
axios.post("http://localhost:5000/songs", {title: "Smile", author: "DJ Snake, Bryson Tiller", release: "2019-07-24"})
axios.post("http://localhost:5000/songs", {title: "No More", author: "DJ Snake, ZHU", release: "2019-07-24"})


//przykladowe posty
axios.post("http://localhost:5000/posts", {title: "Skrillex - Album", body: "Wiecie może kiedy nastąpi premiera nowego albumu Skrillex'a?", comments: ["Nie wiadomo","Myślę, że nigdy","Daj spokój, nawet na to nie licz"]})
axios.post("http://localhost:5000/posts", {title: "Flume w Warszawie", body: "Był ktoś z was na Flume'ie w Warszawie na lodowisku Torwar i chce sie podzielic wrażeniami? :D", comments: ["Było super","Chciałbym przeżyć to jeszcze raz","Żałuję że mnie wtedy tam nie było..."]})
axios.post("http://localhost:5000/posts", {title: "Koncerty w czasie pandemii", body: "Wie ktoś czy da sięgdzieś pójść na jakies wydarzenie muzyczne na żywo w obecnej sytuacji?", comments: ["Myślę że nie","Pozostają nam tylko streamy"]})
axios.post("http://localhost:5000/posts", {title: "Czekam na rozwój portalu", body: "Tak jak w tytule", comments: ["Ja też!"]})

console.log("Dane zostały pomyślnie zaimportowane.")