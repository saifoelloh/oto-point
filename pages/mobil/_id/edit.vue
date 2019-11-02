<template>
  <v-container>
    <v-layout row>
      <v-flex md7 mx-2>
        <material-card color="green" title="Edit Mobil">
          <v-card-text>
            <v-form>
              <v-text-field :model="name" label="Nama" counter="20" required />
              <v-text-field
                :model="model"
                label="Model"
                counter="20"
                required
              />
              <v-text-field
                :model="machineCapacity"
                type="number"
                min="0"
                label="Kapasitas Mesin"
                required
              />
              <v-text-field
                :model="color"
                label="Warna"
                counter="20"
                required
              />
              <v-text-field
                :model="price"
                type="number"
                min="0"
                label="Harga"
                required
              />
              <v-textarea
                name="description"
                label="Deskrisi"
                :value="description"
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
                  <img :src="mobil.photo" />
                </v-avatar>
              </v-flex>
              <v-flex md6>
                <p>Nama : {{ mobil.name }}</p>
                <p>Model : {{ mobil.model }}</p>
                <p>Kapasitas Mesin : {{ mobil.machineCapacity }}</p>
                <p>Warna : {{ mobil.color }}</p>
                <p>Harga : {{ mobil.harga }}</p>
                <blockquote class="blockquote">
                  {{ `Rp. ${mobil.price} | Point ${mobil.point}` }}
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

export default {
  head: {
    title: 'Oto Point | Dealer',
  },

  components: { materialCard },

  layout: 'dashboard',

  data: () => ({
    mobil: {
      name: '',
      model: '',
      machineCapacity: 0,
      color: '',
      price: 0,
      point: 0,
      description: '',
      photo: '',
    },
  }),

  mounted() {
    this.fetch(this.$route.params.id);
  },

  methods: {
    async fetch(id) {
      console.log({ id, msg: 'ini id boss' });
      const result = await this.getCar(id);
      this.mobil = result;
    },
    async submit() {},
  },
};
</script>

<style scoped></style>
