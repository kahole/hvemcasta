const express = require('express');
const app = express();
const jsonBodyParser = require('body-parser').json();
const ip = require('ip');
const SpotifyApi = require('spotify-web-api-node');

const PLAYING = 0;
const PAUSED = 1;

const spotifyApi = new SpotifyApi({
    clientId: '9f3d6b92343b4790ac71380e072160cb',
    clientSecret: 'bdca98b1024b462a9a0a8f64f48efe5c'/*,
    redirectUri: 'http://www.example.com/callback'*/
});

spotifyApi.clientCredentialsGrant().then(
    function (data) {
        console.log('The access token is ' + data.body['access_token']);
        spotifyApi.setAccessToken(data.body['access_token']);
    },
    function (err) {
        console.log('Something went wrong!', err);
    }
);

app.use(jsonBodyParser);

var youtube = { queue: [], playingIndex: 0, playerState: PLAYING };

function idle() {
    return (youtube.queue.length == 0 || youtube.playingIndex > youtube.queue.length - 1);
}

// app.use(express.static('/home/pi/hvemcasta/public'));
// app.use('/search', express.static('/home/pi/hvemcasta/public'));
// app.use('/cast', express.static('/home/pi/hvemcasta/public'));
app.use(express.static('public'));
app.use('/search', express.static('public'));
app.use('/cast', express.static('public'));

app.get('/yt/removeFromQueue/:id', (req, res) => {
    youtube.queue = youtube.queue.filter(v => v.id !== req.params.id);
    res.send();
});

app.post('/yt/queue', (req, res) => {
    youtube.queue.push(req.body);
    res.send();
});

app.get('/status', (req, res) => {
    let ipAddress = process.env.PORT === 80 ? ip.address() : ip.address() + ":" + process.env.PORT;
    res.send({ idle: idle(), ip: ipAddress });
});

app.get('/yt', (req, res) => {
    res.send(youtube);
});

app.get('/yt/prev', (req, res) => {
    if (!idle() && youtube.playingIndex > 0) {
        youtube.playingIndex--;
        youtube.playerState = PLAYING;
    }
    res.send();
});

app.get('/yt/next', (req, res) => {
    if (!idle()) {
        youtube.playingIndex++;
        youtube.playerState = PLAYING;
    }
    res.send();
});

app.get('/yt/pause', (req, res) => {
    if (!idle()) {
        youtube.playerState = PAUSED;
    }
    res.send();
});

app.get('/yt/play', (req, res) => {
    youtube.playerState = PLAYING;
    res.send();
});

app.get('/spotify/search', (req, res) => {
    spotifyApi.searchTracks(req.query.query, { limit: 45 })
        .then(function (data) {
            console.log(data.body);
            res.send({ tracks: data.body.tracks.items });
        }, function (err) {
            console.error(err);
            res.send({err});
        });
});

app.listen(process.env.PORT, () => console.log('Cast server started, port ' + process.env.PORT));
