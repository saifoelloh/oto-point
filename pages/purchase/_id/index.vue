<template>
  <v-container>
    <v-layout row>
      <v-flex md7 mx-2>
        <material-card color="green" title="Edit Penjualan">
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="pembelian.purchase_id"
                label="Order ID"
                disabled
              />
              <v-select
                v-model="pembelian.car_id"
                :items="cars"
                item-text="name"
                item-value="id"
                label="Mobil"
              />
              <v-text-field
                v-model="pembelian.quantity"
                label="Jumlah"
                type="number"
                required
              />
              <v-flex text-xs-right>
                <v-btn color="blue" @click="submit">submit</v-btn>
                <v-btn color="warning" to="/purchase">cancel</v-btn>
              </v-flex>
            </v-form>
          </v-card-text>
        </material-card>
      </v-flex>
      <v-flex>
        <v-card>
          <v-card-text>
            <v-avatar slot="offset" class="mx-auto d-block" size="130">
              <img
                src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
              />
            </v-avatar>
            <p>User ID: {{ purchase.user_id }}</p>
            <p>Dealer ID: {{ purchase.dealer_id }}</p>
            <p>Point: {{ purchase.point }}</p>
            <p>Status: {{ purchase.status }}</p>
            <p>Pembelian:</p>
            <ul>
              <li v-for="car in purchase.PurchaseDetails">
                {{ `Mobil ID ${car.car_id} | Jumlah ${car.quantity}` }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import materialCard from '~/components/material/AppCard';

export default {
  head: {
    title: 'Oto Point | Dealer',
  },

  components: { materialCard },

  layout: 'dashboard',

  data: () => ({
    purchase: {
      user_id: 0,
      dealer_id: 0,
      status: '',
      point: 0,
      PurchaseDetails: [],
    },
    pembelian: {
      purchase_id: 0,
      car_id: 0,
      quantity: 0,
    },
    terbeli: [],
    pembayaran: ['unpaid', 'paid'],
    dealers: [],
    cars: [],
  }),

  mounted() {
    this.hhh();
    this.bbb();
    this.fetch(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      getPurchase: 'purchase/getPurchase',
      addPurchase: 'purchase/addPurchase',
      getDealers: 'dealer/getDealers',
      getCars: 'mobil/getCars',
    }),
    async hhh() {
      const token = await localStorage.getItem('token');
      const { data } = await this.getDealers({ token });
      this.dealers = data;
    },
    async bbb() {
      const token = await localStorage.getItem('token');
      const { data } = await this.getCars({ token });
      this.cars = data;
      console.log(this.cars);
    },
    async fetch(id) {
      const token = await localStorage.getItem('token');
      const { data } = await this.getPurchase({ id, token });
      this.purchase = { ...data };
      console.log(this.purchase);
      this.pembelian.purchase_id = this.purchase.id;
    },
    async submit() {
      const token = await localStorage.getItem('token');
      const datum = { ...this.pembelian };
      datum.car_id = parseInt(datum.car_id);
      datum.purchase_id = parseInt(datum.purchase_id);
      datum.quantity = parseInt(datum.quantity);

      const { data } = await this.addPurchase({ datum, token });
      if (data.status) this.$router.go(-1);
    },
  },
};
</script>

<style scoped></style>
