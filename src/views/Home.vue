<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 m-4">
        <div class="alert alert-danger fade show" role="alert" v-if="errors !== null">
          <button type="button" class="close" aria-label="Close" @click="clearErrors">
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>Error code: {{ errors.status.code }}</strong>
          {{ errors.status.description }}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <h4>Report ID to Convert</h4>
        <div class="card bg-dark text-light">
          <div class="card-body">
            <input type="number" class="form-control form-control-sm" placeholder="Report ID" v-model="rptID"><br>
            <button type="button" class="btn btn-outline-light btn-sm" @click="getReportData" v-if="rptID.trim() !== ''"><i class="fas fa-download"></i> Get Data</button>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-sm-6">
            <h3>Transmuted data</h3>
          </div>
          <div class="col-sm-6">
            <button type="button" class="btn btn-outline-secondary btn-sm float-right" @click="downloadCsv"><i class="fas fa-download"></i> Get csv</button>
          </div>
        </div>
        <div class="card bg-dark text-light">
          <div class="card-body">
            {{ transmutedData }}
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <h4>Bare Data </h4>
        <div class="card bg-dark text-light overflow-hide">
          <div class="card-body">
            {{ bareData }}
          </div>
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import { Parser } from 'json2csv'

export default {
  name: 'Home',
  data() {
    return {
      rptID: '',
      bareData: '',
      transmutedData: []
    }
  },
  computed: {
    ...mapGetters(['errors']),
  },
  watch: {
    bareData(val) {
      if (val.length >= 1) {
        let callback = []
        this.bareData.forEach(sheet => {
          sheet.sections[0].data.forEach(data => {
            data.rows.forEach( row => {
              callback.push({id: sheet.header, time: row.time.v, geofence: row.address.v, exceso: this.filterSpeed(row.event.v), Lng_Lat: `${row.address.location.lng}, ${row.address.location.lat}`})
            });
          })
        })

        this.transmutedData = callback
      } else {
        this.transmutedData = [1,2,3,4]
      }
    }
  },
  methods: {
    ...mapActions(['busyOn', 'busyOff']),

    // Filter Speed
    filterSpeed(str) {
      return str.substring(str.indexOf('-') + 1, str.indexOf('km/h')) + 'Km/h'
    },
    async getReportData() {
      this.busyOn()
      if (this.rptID.trim() !== '') {
        let res = await axios.post('report/tracker/retrieve', {
          hash: localStorage.getItem('hash'),
          report_id: this.rptID
        })

        if (res.status === 200) {
          this.bareData = res.data.report.sheets
        }
      } else {
        alert('Fill input first')
      }
      this.busyOff()
    },
    // Download CSV file from json transmuted
    downloadCsv() {
      if (this.transmutedData.length > 0) {
        const Json2csvParser = new Parser()
        const uriEnconded = encodeURI(Json2csvParser.parse(this.transmutedData))
        window.open('data:text/csv;charset=UTF-8, '+ uriEnconded)
        // console.log(Json2csvParser.parse(this.transmutedData))
      } else {
        alert('There\'s not transmuted data')
      }
    }
  }
}
</script>
