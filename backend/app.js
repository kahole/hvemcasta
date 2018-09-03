const express = require('express');
const app = express();
const jsonBodyParser = require('body-parser').json();
const ip = require('ip');

const PLAYING = 0;
const PAUSED = 1;

app.use(jsonBodyParser);

var youtube = {queue: [], playingIndex: 0, playerState: PLAYING};

function idle() {
    return (youtube.queue.length == 0 || youtube.playingIndex > youtube.queue.length-1);
}

// app.use(express.static('/home/pi/hvemcasta/public'));
// app.use('/search', express.static('/home/pi/hvemcasta/public'));
// app.use('/cast', express.static('/home/pi/hvemcasta/public'));
app.use(express.static('public'));
app.use('/search', express.static('public'));
app.use('/cast', express.static('public'));

app.get('/yt/removeFromQueue/:id', (req, res) => {
    youtube.queue = youtube.queue.filter( v => v.id !== req.params.id);
    res.send();
});

app.post('/yt/queue', (req, res) => {
    youtube.queue.push(req.body);
    res.send();
});

app.get('/status', (req, res) => {
    let ipAddress = process.env.PORT === 80 ? ip.address() : ip.address() + ":" + process.env.PORT;
    res.send({idle: idle(), ip: ipAddress });
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

app.listen(process.env.PORT, () => console.log('Cast server started, port ' + process.env.PORT));
