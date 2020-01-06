if (process.browser) {
    Audio.prototype.softPlay = function () {
        let upVolume = function () {
            if (this.volume > 0 && this.volume <= 0.1)
                this.volume += 0.1;
            else
                this.volume = 1
        };

        let volumeUpper = setInterval(function () {
            if (this.volume > 0)
                upVolume();
            else {
                this.play();
                volumeUpper.clear()
            }
        }, 100)
    }
}
