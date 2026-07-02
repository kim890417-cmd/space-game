(function () {
  if (typeof Vue === 'undefined') return;

  var LOCALES = ['ko', 'en', 'ja', 'zh'];
  var DEFAULT = 'ko';
  var STORE = { locale: DEFAULT, messages: {} };

  function loadLocale(lang) {
    return fetch('lang/' + lang + '.json')
      .then(function (r) { return r.json(); })
      .then(function (msgs) {
        STORE.messages = msgs;
        STORE.locale = lang;
        localStorage.setItem('game_lang', lang);
        return msgs;
      })
      .catch(function () {
        if (lang !== DEFAULT) return loadLocale(DEFAULT);
        STORE.messages = {};
        STORE.locale = DEFAULT;
      });
  }

  var vm = new Vue({
    data: { locale: DEFAULT, messages: {} },
    created: function () {
      var self = this;
      var saved = localStorage.getItem('game_lang');
      var lang = saved || (navigator.language || '').split('-')[0] || DEFAULT;
      if (LOCALES.indexOf(lang) === -1) lang = DEFAULT;
      if (saved && LOCALES.indexOf(saved) > -1) lang = saved;
      loadLocale(lang).then(function () {
        self.locale = STORE.locale;
        self.messages = STORE.messages;
      });
    },
    methods: {
      $t: function (key, vars) {
        if (!key) return '';
        var msg = this.messages[key];
        if (msg === undefined || msg === null) return key;
        if (vars) {
          for (var k in vars) {
            msg = String(msg).split('{' + k + '}').join(String(vars[k]));
          }
        }
        return msg;
      },
      setLang: function (lang) {
        if (lang === this.locale) return;
        var self = this;
        loadLocale(lang).then(function () {
          self.locale = STORE.locale;
          self.messages = STORE.messages;
        });
      }
    }
  });

  Vue.prototype.$i18n = vm;

  Vue.mixin({
    computed: {
      $t: function () {
        var locale = this.$i18n.locale;
        var msgs = this.$i18n.messages;
        var self = this;
        return function (key, vars) {
          return self.$i18n.$t(key, vars);
        };
      },
      locale: function () { return this.$i18n.locale; }
    },
    methods: {
      setLang: function (lang) { this.$i18n.setLang(lang); },
      tRes: function (res) { return this.$t('res_' + res); },
      tBld: function (id) { return this.$t('bld_' + id + '_name'); },
      tBldDesc: function (id) { return this.$t('bld_' + id + '_desc'); },
      tShip: function (type) { return this.$t('ship_' + type + '_name'); },
      tResearch: function (id) { return this.$t('research_' + id + '_name'); },
      tFame: function (id) { return this.$t('fame_' + id + '_name'); },
      tFameDesc: function (id) { return this.$t('fame_' + id + '_desc'); },
      tPlanet: function (id) { return this.$t('planet_' + id + '_name'); },
      tPirate: function (id) { return this.$t('pirate_' + id + '_name'); },
      tColony: function (id) { return this.$t('colony_' + id + '_name'); },
      tFactory: function (id) { return this.$t('factory_' + id + '_name'); },
      tPerk: function (id) { return this.$t('perk_' + id + '_name'); },
      tPerkDesc: function (id) { return this.$t('perk_' + id + '_desc'); },
      tAchieve: function (id) { return this.$t('achieve_' + id + '_name'); },
      tAchieveDesc: function (id) { return this.$t('achieve_' + id + '_desc'); },
      tChallenge: function (id) { return this.$t('challenge_' + id + '_name'); },
      tChallengeDesc: function (id) { return this.$t('challenge_' + id + '_desc'); },
      tAlien: function (id) { return this.$t('alien_' + id + '_name'); },
      tArtifact: function (id) { return this.$t('artifact_' + id + '_name'); },
      tAwaken: function (id) { return this.$t('awaken_' + id + '_name'); },
      tItem: function (id) { return this.$t('item_' + id + '_name'); },
      tItemDesc: function (id) { return this.$t('item_' + id + '_desc'); },
      fmtPct: function (v) { return (v * 100).toFixed(v >= 1 ? 0 : 1) + '%'; }
    }
  });
})();
