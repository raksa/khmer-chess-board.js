"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var k4us_share_1 = require("k4us-share");
var SoundManager = /** @class */ (function () {
    function SoundManager(khmerChessBoard) {
        this.move = null;
        this.capture = null;
        this.check = null;
        this.isEnable = false;
        this.khmerChessBoard = khmerChessBoard;
    }
    SoundManager.prototype.destroy = function () {
        this.move = null;
        this.capture = null;
        this.check = null;
        this.khmerChessBoard = null;
    };
    SoundManager.prototype.disable = function () {
        var _a, _b, _c, _d, _e;
        this.isEnable = false;
        if (this.move) {
            (_b = (_a = this.move) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(this.move);
            this.move = null;
        }
        if (this.capture) {
            (_d = (_c = this.capture) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.removeChild(this.capture);
            this.capture = null;
        }
        if (this.check !== null) {
            (_e = this.check.parentElement) === null || _e === void 0 ? void 0 : _e.removeChild(this.check);
            this.check = null;
        }
        this.khmerChessBoard.messageManager.log('Sound is disabled');
    };
    SoundManager.prototype.enable = function () {
        this.isEnable = true;
        this.move = this._addSound(k4us_share_1.moveAudio);
        this.capture = this._addSound(k4us_share_1.captureAudio);
        this.check = this._addSound(k4us_share_1.checkAudio);
        this.khmerChessBoard.messageManager.log('Sound is enabled');
    };
    SoundManager.prototype._addSound = function (src) {
        var sound = document.createElement('audio');
        sound.src = src;
        sound.setAttribute('preload', 'auto');
        sound.setAttribute('controls', 'none');
        sound.style.display = 'none';
        document.body.appendChild(sound);
        return sound;
    };
    SoundManager.prototype.play = function (flag) {
        if (!this.isEnable) {
            this.khmerChessBoard.messageManager.log('Sound is disable');
            return;
        }
        try {
            switch (flag) {
                case SoundManager.MOVE_FLAG:
                    this.move && this.move.play();
                    break;
                case SoundManager.CAPTURE_FLAG:
                    this.capture && this.capture.play();
                    break;
                case SoundManager.CHECK_FLAG:
                    this.check && this.check.play();
                    break;
                default:
                    this.khmerChessBoard.messageManager.log('Invalid sound flag');
            }
        }
        catch (error) { }
    };
    SoundManager.prototype.playMove = function () {
        this.play(SoundManager.MOVE_FLAG);
    };
    SoundManager.prototype.playCapture = function () {
        this.play(SoundManager.CAPTURE_FLAG);
    };
    SoundManager.prototype.playCheck = function () {
        this.play(SoundManager.CHECK_FLAG);
    };
    SoundManager.MOVE_FLAG = 'm';
    SoundManager.CAPTURE_FLAG = 'ct';
    SoundManager.CHECK_FLAG = 'c';
    return SoundManager;
}());
exports.default = SoundManager;
//# sourceMappingURL=SoundManager.js.map