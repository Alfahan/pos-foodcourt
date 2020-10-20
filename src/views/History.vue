<template>
    <div class="history">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-1">
                <div class="row">
                    <div class="col-md-12 p-1 shadow">
                    <SideBar/>
                    </div>
                </div>
                </div>

                <div class="col-md-11 text-center">
                    <div class="row">
                        <div class="col-md-12 shadow">
                            <h1>{{ JudulHistory }}</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 shadow">
                            <div class="history-content">
                                <div class="history-card">
                                    <div class="content">
                                        <div class="content-text">
                                        <p>Today's Income</p>
                                        <p>Rp. 1.000.000</p>
                                        <p>+2% yesterday</p>
                                        </div>
                                        <!-- <img src="../assets/elips/pinkviolet.png" alt="elips" /> -->
                                    </div>
                                    <div class="content">
                                        <div class="content-text">
                                        <p>Orders</p>
                                        <p>3270</p>
                                        <p>+5% last week</p>
                                        </div>
                                        <!-- <img src="../assets/elips/blue.png" alt="elips" /> -->
                                    </div>
                                    <div class="content">
                                        <div class="content-text">
                                        <p>This Years Income</p>
                                        <p>Rp. 100.000.000</p>
                                        <p>+10% Last Year</p>
                                        <!-- <img src="../assets/elips/pinkviolet.png" alt="elips" /> -->
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12 col-12" style="margin-top: 50px">
                                    <div class="row">
                                        <div class="col-md-6 col-6 text-left">
                                            <h4><strong>Revenue</strong></h4>
                                        </div>
                                        <div class="col-md-6 col-6 text-right">
                                            <button class="btn btn-sm" style="background: #cecece; border-radius: 10px; font-size:smaller">
                                                Month
                                                <img src="assets/img/arrow-down-sign-to-navigate 1.png" alt="">
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12 col-12">
                                    <div class="row">
                                        <div class="col-md-12 col-12 main-canvas">
                                            <canvas id="myLineChart" width="300px" height="100px">
                                            </canvas>
                                        </div>
                                    </div>
                                </div>

                                <div class="table">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Invoices</th>
                                        <th scope="col">Cashier</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Orders</th>
                                        <th scope="col">Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item, index) in historyMasterData" :key="index">
                                        <th scope="row">{{ item.invoice }}</th>
                                        <td>{{ item.nameuser }}</td>
                                        <td>{{ item.date }}</td>
                                        <td>
                                        <b-button
                                        class="btn btn-primary"
                                        @click="historyDetail(item.idhistory)"
                                        v-b-modal.modal-detail>Detail
                                        </b-button>
                                        </td>
                                        <td>Rp. {{ item.amount }}</td>
                                    </tr>

                                    </tbody>
                                </table>
                                </div>

                                <b-modal id="modal-detail" title="Orders Detail">
                                    <div class="data-detail font-weight-bold" v-for="(item, index) in detailHistory" :key="index">
                                        <p>{{item.nameproduct}}</p>
                                        <p>{{item.qty}}</p>
                                        <p>Rp. {{item.subtotal}}</p>
                                    </div>
                                </b-modal>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="row">
                <div class="col-md-12 p-3 shadow text-center" >
                    <div v-kolor= "'#F24F8A'">
                        {{ Footer }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import SideBar from '@/components/SideBar.vue'
import about from '../mixins/about'
import Chart from 'chart.js'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'History',
  mixins: [about],
  components: {
    SideBar
  },
  data () {
    return {
      detailHistory: null,
      bar: null
    }
  },
  computed: {
    ...mapGetters({
      historyData: 'history/getHistoryMaster',
      historyMasterData: 'history/getHistoryData'
    })
  },
  methods: {
    ...mapActions({
      dataHistory: 'history/historyMaster',
      dataHistoryMaster: 'history/historyDetail'
    }),
    historyDetail (id) {
      const detail = this.historyData.filter((e) => e.idhistory === id)
      this.detailHistory = detail
    },
    renderChart () {
      this.bar = new Chart(document.getElementById('myLineChart'), {
        type: 'line',
        data: {
          labels: ['', '', '', '', '', '', '  '],
          datasets: [
            {
              label: 'This Month',
              fill: false,
              borderColor: '#00F1FF',
              data: [0, 20, 10, 29, 21, 40, 15, 42]
            },
            {
              label: 'Last Month',
              fill: false,
              borderColor: 'red',
              data: [10, 30, 5, 35, 38, 12, 21, 12]
            }
          ]
        },
        options: {
          legend: {
            display: true,
            position: 'bottom'
          },
          scales: {
            xAxes: [{
              display: false
            }]
          },
          elements: {
            line: {
              tension: 0
            }
          }
        }
      })
    }
  },
  mounted () {
    this.dataHistory()
    this.dataHistoryMaster()
    this.renderChart()
  }
}

</script>

<style scoped>
.history-card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  padding: 30px;
  font-weight: bold;
}
.content {
  height: 150px;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
}
.content img {
  position: absolute;
  right: 0;
  top: 0;
}
.content:nth-child(1) {
  background: linear-gradient(
    278.29deg,
    #fbb2b4 30.05%,
    rgba(255, 143, 178, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(255, 143, 178, 0.25));
  border-radius: 10px;
}
.content:nth-child(2) {
  background: linear-gradient(
    278.29deg,
    #29dfff 30.05%,
    rgba(41, 223, 255, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(41, 223, 255, 0.25));
  border-radius: 10px;
}
.content:nth-child(3) {
  background: linear-gradient(
    278.29deg,
    #ab84c8 30.05%,
    rgba(241, 201, 236, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(241, 201, 236, 0.25));
  border-radius: 10px;
}
.data-detail {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
}
</style>
