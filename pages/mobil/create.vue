<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" md="5">
        <v-card>
          <v-card-title>
            <v-btn to="/mobil" color="primary">
              <v-icon left>mdi-arrow-left</v-icon> kembali
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-layout>
              <v-flex md5>
                <v-form>
                  <v-select
                    v-model="mobil.dealer_id"
                    :items="dealers"
                    item-text="name"
                    item-value="id"
                    label="Dealer"
                  ></v-select>
                  <v-text-field
                    v-model="mobil.name"
                    label="Nama"
                    counter="20"
                    required
                  />
                  <v-text-field
                    v-model="mobil.model"
                    label="Model"
                    counter="20"
                    required
                  />
                  <v-text-field
                    v-model="mobil.machineCapacity"
                    type="number"
                    min="0"
                    label="Kapasitas Mesin"
                    required
                  />
                  <v-text-field
                    v-model="mobil.color"
                    label="Warna"
                    counter="20"
                    required
                  />
                  <v-text-field
                    v-model="mobil.price"
                    type="number"
                    min="0"
                    label="Harga"
                    required
                  />
                  <v-text-field
                    v-model="mobil.point_value"
                    type="number"
                    min="0"
                    label="Point"
                    required
                  />
                  <img-inputer
                    v-model="mobil.photo"
                    placeholder="Drop car image"
                    @change="onFileSelected"
                    required
                  />
                  <v-textarea
                    name="description"
                    label="Deskrisi"
                    v-model="mobil.description"
                    required
                  ></v-textarea>
                  <v-btn color="blue" @click="submit">submit</v-btn>
                  <v-btn color="warning" @click="reset">cancel</v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script charset="utf-8">
import { mapActions, mapGetters } from 'vuex';
import ImgInputer from 'vue-img-inputer';
import 'vue-img-inputer/dist/index.css';

export default {
  layout: 'dashboard',

  components: { ImgInputer },

  data: () => ({
    mobil: {
      name: '',
      model: '',
      machineCapacity: 0,
      color: '',
      price: 0,
      description: '',
      dealer_id: '',
      point_value: 0,
    },
    dealers: [],
  }),

  mounted() {
    this.fetch();
  },

  methods: {
    ...mapActions({
      createCar: 'mobil/createCar',
      getDealers: 'dealer/getDealers',
    }),
    async fetch() {
      const token = localStorage.getItem('token');
      const { data } = await this.getDealers({ token });
      this.dealers = data;
    },
    async submit() {
      const token = localStorage.getItem('token');
      const params = { ...this.mobil };
      params.dealer_id = parseInt(params.dealer_id);
      params.machine_capacity = parseInt(params.machine_capacity);
      params.price = parseFloat(params.price);
      params.point_value = parseInt(params.point_value);

      const fd = await new FormData();
      for (var key in params) {
        fd.append(key, params[key]);
      }

      const result = await this.createCar({ fd, token });
      if (!result) {
        console.log(result);
      } else {
        this.$router.go(-1);
      }
    },
    onFileSelected(event) {
      this.mobil.photo = event.target.files[0];
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
