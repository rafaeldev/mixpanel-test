class Mixpanel {
  constructor(mixpanel, distinctId, doc, undefined) {
    if (Mixpanel._instance) {
      Mixpanel._instance = this;
    }

    this.distinctId = distinctId;
    this.mixpanel = mixpanel;
    this.doc = doc;
  }

  track(trackName, data) {
    this.mixpanel.track(trackName, Object.assign(data || {}, this.defaultData()));
  }

  defaultData() {
    return {
      distinct_id: this.distinctId,
      "referrer": this.doc.referrer
    }
  }

  setupLinkTrack(confs) {
    confs.forEach((conf, i) => {
      let [selector, trackName] = conf;

      if (!this.doc.querySelector(selector)) {
        return;
      }

      this.mixpanel.track_links(selector, trackName, {
        "referrer": this.doc.referrer,
        distinct_id: this.distinctId,
      });
    })
  }
}
