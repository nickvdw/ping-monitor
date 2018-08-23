const Monitor = require('ping-monitor')

export default {
  methods: {
    createMonitor() {
      this.monitor = new Monitor({
        website: this.remote.uri,
        interval: this.remote.interval / 60
      })
    
      this.monitor.on('up', (res) => {
        console.log(`${this.remote.alias} is up!`)
        this.currentStatus = 'online'
      })
  
      this.monitor.on('error', err => {
        console.warn(`${this.remote.alias} is down!`)
        this.currentStatus = 'offline'
      })
    },
    destroyMonitor() {
      if (this.monitor) {
        this.monitor.stop()
        this.monitor = {}
      }
    }
  },
  created() {
    this.createMonitor()
  },
  destroyed() {
    this.destroyMonitor()
  }
}
