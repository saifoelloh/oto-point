<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn class="text-right" to="/mobil/create" color="success">
          <v-icon left>mdi-plus</v-icon> tambah
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="data"
          :items-per-page="10"
          loading
          loading-text="Loading... Please wait"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td width="300">
              <v-avatar
                v-if="props.item.photo"
                size="48px"
                color="grey"
                class="mr-2 my-1"
              >
                <img :src="base + props.item.photo" alt="" />
              </v-avatar>
              {{ props.item.name }}
            </td>
            <td>{{ props.item.dealer_id }}</td>
            <td>{{ props.item.model }}</td>
            <td>{{ props.item.color }}</td>
            <td>{{ 'Rp.' + props.item.price }}</td>
            <td>{{ 'Point ' + props.item.point_value }}</td>
            <td style="display: inline-flex">
              <v-btn
                color="info"
                :to="'/mobil/' + props.item.id + '/edit'"
                small
              >
                <v-icon>border_color</v-icon>
              </v-btn>
              <!-- TODO: delete yankes -->
              <v-btn
                color="error"
                @click.native.stop="onDelete(props.item.id)"
                small
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script charset="utf-8">
import { mapActions, mapGetters } from 'vuex';

export default {
  head: {
    title: 'Dealer',
  },
  layout: 'dashboard',
  data: () => ({
    name: '',
    age: 0,
    email: '',
    headers: [
      {
        text: 'No',
        value: 'id',
      },
      {
        text: 'Name',
        value: 'name',
      },
      {
        text: 'Dealer',
        value: 'dealer_id',
      },
      {
        text: 'Model',
        value: 'model',
      },
      {
        text: 'Warna',
        value: 'color',
      },
      {
        text: 'Harga',
        value: 'price',
      },
      {
        text: 'Point',
        value: 'point_value',
      },
      {
        text: 'Aksi',
        value: 'id',
        sortable: false,
      },
    ],
    data: [],
    base: 'https://57b6a033.ngrok.io/',
  }),

  mounted() {
    this.ambilComments();
  },

  created() {
    this.ambilComments();
  },

  methods: {
    ...mapActions({
      getCars: 'mobil/getCars',
      delCar: 'mobil/delCar',
    }),
    async ambilComments() {
      const token = await localStorage.getItem('token');
      const { data } = await this.getCars({ token });
      !data ? (this.data = []) : (this.data = data);
      console.log(data);
    },
    async onDelete(id) {
      const result = await this.delCar(id);
      if (result) this.$router.go(0);
    },
  },
};
</script>
