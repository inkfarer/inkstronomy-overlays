# inkstronomy-overlays

A [NodeCG](http://github.com/nodecg/nodecg) bundle made for Inkstronomy tournament livestreams.

# Notice

**Inkstronomy, the community these graphics were built for, has been abandoned by it's core staff team as of December 13th, 2019. I do not condone joining Inkstronomy in it's current state.**

## Screenshots

* [Dashboard](https://i.imgur.com/ODbymgQ.png)
* [Break screen/Map select (7 maps)](https://i.imgur.com/ULqjiY5.jpg)
* [Main scene](https://i.imgur.com/VxOD0aK.png)

## Install

1. Install NodeCG and (optionally) [nodecg-cli](https://github.com/nodecg/nodecg-cli).
2. Clone inkstronomy-overlays to `nodecg/bundles/inkstronomy-overlays` or if you have nodecg-cli installed, run `nodecg install randomoink/inkstronomy-overlays` in NodeCG's install directory.
3. Install dependencies by running `npm install` and `bower install` in `nodecg/bundles/inkstronomy-overlays`. If you're installing using nodecg-cli, this is done automatically.
4. For last.fm integration to work, create the configuration file at `nodecg/cfg/inkstronomy-overlays.json`.
It should look something like this, just replace the placeholders with your own information:
```
{
	"lastfm": {
		"targetAccount": "Your last.fm account",
		"apiKey": "your API key",
		"secret": "your secret"
	}
}
```

## Usage

Start NodeCG. By default, the dashboard can be accessed from `localhost:9090` in your browser.

From the dashboard, URLs to the graphics can be found from the graphics tab. To use them, they should be added as browser sources in a broadcast application such as OBS Studio. The graphics are made to run at a resolution of 1920x1080.

## Credits

Splatoon 2 map portraits (graphics/stages) are property of Nintendo and were downloaded from the [Splatoon wiki.](https://splatoonwiki.org/wiki/Stage)

Last.fm extension (extension/lastfm-playing.js) from [toth5-overlay.](https://github.com/TipoftheHats/toth5-overlay)