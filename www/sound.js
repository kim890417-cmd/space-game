(function () {
  var SoundManager = {
    ctx: null,
    bgmGain: null,
    sfxGain: null,
    bgmVolume: parseFloat(localStorage.getItem('sfx_bgmVol') || '0.4'),
    sfxVolume: parseFloat(localStorage.getItem('sfx_sfxVol') || '0.6'),
    bgmMuted: localStorage.getItem('sfx_bgmMuted') === 'true',
    sfxMuted: localStorage.getItem('sfx_sfxMuted') === 'true',
    initialized: false,
    currentAudio: null,
    currentSrcName: '',

    bgmPlaylist: ['메인', '메인2', '긴장감웅장함', '긴장감웅장함1', '신비차분', '신비차분1'],
    bgmPlayOrder: [],
    bgmPlayIndex: 0,

    bgmFiles: {
      '메인':           'audio/bgm/메인.mp3',
      '메인2':          'audio/bgm/메인2.mp3',
      '긴장감웅장함':   'audio/bgm/긴장감웅장함.mp3',
      '긴장감웅장함1':  'audio/bgm/긴장감웅장함1.mp3',
      '신비차분':       'audio/bgm/신비차분.mp3',
      '신비차분1':      'audio/bgm/신비차분1.mp3'
    },

    init: function () {
      if (this.initialized) return;
      try {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.bgmGain = this.ctx.createGain();
        this.bgmGain.gain.value = 1;
        this.bgmGain.connect(this.ctx.destination);
        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.value = this.sfxMuted ? 0 : this.sfxVolume;
        this.sfxGain.connect(this.ctx.destination);
        this.initialized = true;
      } catch (e) { console.warn('SoundManager init failed', e); }
    },

    ensureInit: function () {
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
      if (!this.initialized) this.init();
    },

    setBgmVol: function (v) {
      this.bgmVolume = Math.max(0, Math.min(1, v));
      localStorage.setItem('sfx_bgmVol', this.bgmVolume);
      if (this.currentAudio && !this.bgmMuted) this.currentAudio.volume = this.bgmVolume;
    },
    setSfxVol: function (v) {
      this.sfxVolume = Math.max(0, Math.min(1, v));
      localStorage.setItem('sfx_sfxVol', this.sfxVolume);
      if (this.sfxGain && !this.sfxMuted) this.sfxGain.gain.value = this.sfxVolume;
    },
    toggleBgm: function () {
      this.bgmMuted = !this.bgmMuted;
      localStorage.setItem('sfx_bgmMuted', this.bgmMuted);
      if (this.currentAudio) this.currentAudio.volume = this.bgmMuted ? 0 : this.bgmVolume;
      if (this.bgmMuted) this.stopBgm(); else this.resumeBgm();
    },
    toggleSfx: function () {
      this.sfxMuted = !this.sfxMuted;
      localStorage.setItem('sfx_sfxMuted', this.sfxMuted);
      if (this.sfxGain) this.sfxGain.gain.value = this.sfxMuted ? 0 : this.sfxVolume;
    },

    _shufflePlaylist: function () {
      this.bgmPlayOrder = this.bgmPlaylist.slice();
      for (var i = this.bgmPlayOrder.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = this.bgmPlayOrder[i];
        this.bgmPlayOrder[i] = this.bgmPlayOrder[j];
        this.bgmPlayOrder[j] = tmp;
      }
      this.bgmPlayIndex = 0;
    },

    startBgm: function () {
      this.stopBgm(0);
      this._shufflePlaylist();
      this._playNext();
    },

    _playNext: function () {
      var self = this;
      var name = this.bgmPlayOrder[this.bgmPlayIndex];
      this.bgmPlayIndex = (this.bgmPlayIndex + 1) % this.bgmPlayOrder.length;
      if (this.bgmPlayIndex === 0) this._shufflePlaylist();

      var url = this.bgmFiles[name];
      if (!url) { this._playNext(); return; }

      var oldAudio = this.currentAudio;

      var audio = new Audio();
      audio.loop = false;
      audio.preload = 'auto';
      audio.volume = 0;

      audio.addEventListener('error', function () {
        console.warn('SoundManager: BGM load failed', url);
        setTimeout(function () { self._playNext(); }, 500);
      });

      audio.src = url;
      self.currentAudio = audio;
      self.currentSrcName = name;

      var p = audio.play();
      if (p) p.catch(function () {
        audio.addEventListener('canplaythrough', function () {
          audio.play().catch(function (e) {
            console.warn('SoundManager: BGM play retry failed', e);
          });
        });
      });

      var handler = function () { self._playNext(); };
      audio._endedHandler = handler;
      audio.addEventListener('ended', handler);

      var targetVol = self.bgmMuted ? 0 : self.bgmVolume;

      if (oldAudio) {
        var oldVol = oldAudio.volume;
        for (var i = 1; i <= 6; i++) {
          (function (step) {
            setTimeout(function () {
              if (self.currentAudio === audio) audio.volume = targetVol * (step / 6);
              oldAudio.volume = oldVol * (1 - step / 6);
            }, step * 100);
          })(i);
        }
        setTimeout(function () {
          oldAudio.pause();
          oldAudio.src = '';
          if (oldAudio._endedHandler) oldAudio.removeEventListener('ended', oldAudio._endedHandler);
        }, 650);
      } else {
        for (var i = 1; i <= 8; i++) {
          (function (step) {
            setTimeout(function () {
              if (self.currentAudio === audio) audio.volume = targetVol * (step / 8);
            }, step * 100);
          })(i);
        }
      }
    },

    stopBgm: function (fadeOut) {
      if (!this.currentAudio) return;
      var audio = this.currentAudio;
      var self = this;
      if (audio._endedHandler) audio.removeEventListener('ended', audio._endedHandler);
      this.currentAudio = null;
      this.currentSrcName = '';
      if (fadeOut > 0 && !this.bgmMuted) {
        for (var i = 1; i <= 6; i++) {
          (function (step) {
            setTimeout(function () {
              audio.volume = self.bgmVolume * (1 - step / 6);
            }, step * (fadeOut * 1000 / 6));
          })(i);
        }
        setTimeout(function () { audio.pause(); audio.src = ''; }, fadeOut * 1000 + 50);
      } else {
        audio.pause();
        audio.src = '';
      }
    },

    resumeBgm: function () {
      this.startBgm();
    },

    playSfx: function (type) {
      var self = this;
      this.ensureInit();
      if (this.sfxMuted || !this.ctx) return;
      var osc = this.ctx.createOscillator();
      var gain = this.ctx.createGain();
      var t = this.ctx.currentTime;
      osc.connect(gain);
      gain.connect(this.sfxGain);
      var dur = 0.15;
      switch (type) {
        case 'click':
          osc.type = 'sine'; osc.frequency.setValueAtTime(800, t); osc.frequency.exponentialRampToValueAtTime(1200, t + 0.05);
          gain.gain.setValueAtTime(0.3, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
          dur = 0.1; break;
        case 'coin':
          osc.type = 'sine'; osc.frequency.setValueAtTime(600, t); osc.frequency.exponentialRampToValueAtTime(1200, t + 0.1);
          gain.gain.setValueAtTime(0.4, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
          dur = 0.2; break;
        case 'build':
          osc.type = 'square'; osc.frequency.setValueAtTime(200, t); osc.frequency.exponentialRampToValueAtTime(400, t + 0.15);
          gain.gain.setValueAtTime(0.2, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
          dur = 0.25; break;
        case 'upgrade':
          osc.type = 'sine'; osc.frequency.setValueAtTime(400, t); osc.frequency.linearRampToValueAtTime(800, t + 0.15);
          gain.gain.setValueAtTime(0.3, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
          dur = 0.3; break;
        case 'battle_win':
          osc.type = 'triangle'; osc.frequency.setValueAtTime(523, t); osc.frequency.setValueAtTime(659, t + 0.15); osc.frequency.setValueAtTime(784, t + 0.3);
          gain.gain.setValueAtTime(0.4, t); gain.gain.linearRampToValueAtTime(0.3, t + 0.2); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
          dur = 0.5; break;
        case 'battle_lose':
          osc.type = 'sawtooth'; osc.frequency.setValueAtTime(400, t); osc.frequency.exponentialRampToValueAtTime(100, t + 0.4);
          gain.gain.setValueAtTime(0.2, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
          dur = 0.4; break;
        case 'research':
          osc.type = 'sine'; osc.frequency.setValueAtTime(300, t); osc.frequency.linearRampToValueAtTime(900, t + 0.2);
          gain.gain.setValueAtTime(0.25, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
          dur = 0.35; break;
        case 'explore':
          osc.type = 'sine'; osc.frequency.setValueAtTime(200, t); osc.frequency.exponentialRampToValueAtTime(800, t + 0.3);
          gain.gain.setValueAtTime(0.3, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
          dur = 0.4; break;
        case 'alert':
          osc.type = 'square'; osc.frequency.setValueAtTime(880, t); osc.frequency.setValueAtTime(660, t + 0.08); osc.frequency.setValueAtTime(880, t + 0.16);
          gain.gain.setValueAtTime(0.25, t); gain.gain.linearRampToValueAtTime(0.2, t + 0.15); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
          dur = 0.35; break;
        case 'levelup':
          osc.type = 'sine'; osc.frequency.setValueAtTime(523, t); osc.frequency.setValueAtTime(659, t + 0.1); osc.frequency.setValueAtTime(784, t + 0.2); osc.frequency.setValueAtTime(1047, t + 0.3);
          gain.gain.setValueAtTime(0.4, t); gain.gain.linearRampToValueAtTime(0.3, t + 0.25); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
          dur = 0.5; break;
        case 'button':
          osc.type = 'sine'; osc.frequency.setValueAtTime(600, t); osc.frequency.exponentialRampToValueAtTime(400, t + 0.04);
          gain.gain.setValueAtTime(0.15, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
          dur = 0.06; break;
        default: return;
      }
      osc.start(t); osc.stop(t + dur);
      setTimeout(function () { osc.disconnect(); gain.disconnect(); }, (dur + 0.1) * 1000);
    }
  };

  window.SoundManager = SoundManager;
})();
