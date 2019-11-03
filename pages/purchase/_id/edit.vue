<template>
  <v-container>
    <v-layout row>
      <v-flex md7 mx-2>
        <material-card color="green" title="Edit Penjualan">
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="purchase.user_id"
                label="Pelanggan"
                counter="20"
                disabled
              />
              <v-text-field
                v-model="purchase.point"
                label="Point"
                type="number"
                disabled
              />
              <v-select
                v-model="purchase.dealer_id"
                :items="dealers"
                item-text="name"
                item-value="id"
                label="Dealer"
              />
              <v-select
                v-model="purchase.status"
                label="Status Pembayaran"
                :items="pembayaran"
                counter="20"
                required
              />
              <v-flex text-xs-right>
                <v-btn color="blue" @click="submit">submit</v-btn>
                <v-btn color="warning" to="/user">cancel</v-btn>
              </v-flex>
            </v-form>
          </v-card-text>
        </material-card>
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
    },
    pembayaran: ['unpaid', 'paid', 'verified'],
    dealers: [],
  }),

  mounted() {
    this.hhh(), this.fetch(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      getPurchase: 'purchase/getPurchase',
      editPurchase: 'purchase/editPurchase',
      getDealers: 'dealer/getDealers',
    }),
    async hhh() {
      const token = await localStorage.getItem('token');
      const { data } = await this.getDealers({ token });
      this.dealers = data;
    },
    async fetch(id) {
      const token = await localStorage.getItem('token');
      const { data } = await this.getPurchase({ id, token });
      this.purchase = { ...data };
    },
    async submit() {
      const id = this.$route.params.id;
      const token = await localStorage.getItem('token');
      const params = { ...this.purchase };
      params.user_id = parseInt(params.user_id);
      params.dealer_id = parseInt(params.dealer_id);
      params.point = parseInt(params.point);
      const { data } = await this.editPurchase({ id, datum: params, token });
      if (data) this.$router.go(-1);
    },
  },
};
</script>

<style scoped></style>
