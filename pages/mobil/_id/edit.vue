<template>
  <v-container>
    <v-layout row>
      <v-flex md7 mx-2>
        <material-card color="green" title="Edit Mobil">
          <v-card-text>
            <v-form>
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
                v-model="mobil.color"
                label="Warna"
                counter="20"
                required
              />
              <v-text-field
                v-model="mobil.machine_capacity"
                label="Kapasitas Mesin"
                required
              />
              <v-text-field
                v-model="mobil.price"
                type="number"
                min="0"
                label="Harga"
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
              <v-flex text-xs-right>
                <v-btn color="blue" @click="submit">submit</v-btn>
                <v-btn color="warning" to="/mobil">cancel</v-btn>
              </v-flex>
            </v-form>
          </v-card-text>
        </material-card>
      </v-flex>
      <v-flex md5 mx-2>
        <v-card>
          <v-card-text py3>
            <v-layout align-center>
              <v-flex md6>
                <v-avatar slot="offset" class="mx-auto d-block" size="230">
                  <img :src="base + mobil.photo" />
                </v-avatar>
              </v-flex>
              <v-flex md6>
                <p>Nama : {{ mobil.name }}</p>
                <p>Model : {{ mobil.model }}</p>
                <p>Kapasitas Mesin : {{ mobil.machine_capacity }}</p>
                <p>Warna : {{ mobil.color }}</p>
                <p>Harga :</p>
                <blockquote class="blockquote">
                  {{ `Rp. ${mobil.price}` }}
                </blockquote>
                <p>Point :</p>
                <blockquote class="blockquote">
                  {{ `Point ${mobil.point_value}` }}
                </blockquote>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import materialCard from '~/components/material/AppCard';
import ImgInputer from 'vue-img-inputer';
import 'vue-img-inputer/dist/index.css';

export default {
  head: {
    title: 'Oto Point | Dealer',
  },

  components: { materialCard, ImgInputer },

  layout: 'dashboard',

  data: () => ({
    mobil: {
      name: '',
      model: '',
      machine_capacity: '',
      color: '',
      price: 0,
      point_value: 0,
      description: '',
      photo: '',
    },
    base: 'https://57b6a033.ngrok.io/',
  }),

  mounted() {
    this.fetch(this.$route.params.id);
  },

  methods: {
    ...mapActions({ getCar: 'mobil/getCar', editCar: 'mobil/editCar' }),
    async fetch(id) {
      const token = localStorage.getItem('token');
      const { data } = await this.getCar({ id, token });
      this.mobil = data;
    },
    async submit() {
      const token = localStorage.getItem('token');
      const id = this.$route.params.id;
      const params = { ...this.mobil };
      params.price = parseInt(params.price);
      params.point_value = parseInt(params.point_value);

      console.log({ params });
      const fd = await new FormData();
      for (var key in params) {
        fd.append(key, params[key]);
      }

      const result = await this.editCar({ id, token, fd });
      if (result) this.$router.go(-1);
    },
    onFileSelected(event) {
      this.mobil.photo = event.target.files[0];
    },
  },
};
</script>

<style scoped></style>
