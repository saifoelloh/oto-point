<template>
  <v-container>
    <v-layout row>
      <v-flex md7 mx-2>
        <material-card color="green" title="Edit Bengkel">
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="bengkel.name"
                label="Name"
                counter="20"
                required
              />
              <v-text-field
                v-model="bengkel.address"
                label="Address"
                counter="20"
                required
              />
              <v-layout>
                <v-flex mh2>
                  <v-text-field
                    v-model="bengkel.lat"
                    label="Latitude"
                    type="number"
                    required
                  />
                </v-flex>
                <v-flex mh2>
                  <v-text-field
                    v-model="bengkel.long"
                    label="Longtitude"
                    type="number"
                    required
                  />
                </v-flex>
              </v-layout>
              <img-inputer
                v-model="bengkel.photo"
                :img-src="'http://5d2bb64c.ngrok.io/' + bengkel.photo"
                placeholder="Drop bengkel photo"
                @change="onFileSelected"
              />
              <v-textarea
                v-model="bengkel.description"
                label="Deskripsi"
                counter="20"
                required
              />
              <v-flex text-xs-right>
                <v-btn color="blue" @click="submit">submit</v-btn>
                <v-btn color="warning" to="/bengkel">cancel</v-btn>
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
import ImgInputer from 'vue-img-inputer';
import materialCard from '~/components/material/AppCard';
import 'vue-img-inputer/dist/index.css';

export default {
  head: {
    title: 'Oto Point | Bengkel',
  },

  components: { materialCard, ImgInputer },

  layout: 'dashboard',

  data: () => ({
    bengkel: {
      name: '',
      address: '',
      lat: 0,
      long: 0,
      photo: '',
      description: '',
    },
  }),

  created() {
    this.fetch(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      getBengkel: 'bengkel/getBengkel',
      putBengkel: 'bengkel/putBengkel',
    }),
    async fetch(id) {
      const { data } = await this.getBengkel(id);
      this.bengkel = data;
    },
    async submit() {
      const id = this.$route.params.id;
      const fd = await new FormData();
      const token = localStorage.getItem('token');
      const params = { ...this.bengkel };
      params.lat = parseFloat(params.lat);
      params.long = parseFloat(params.long);

      for (var key in params) {
        fd.append(key, params[key]);
      }

      const { data } = await this.putBengkel({ id, token, fd });
      if (data.status) this.$router.go(-1);
    },
    onFileSelected(event) {
      this.bengkel.photo = event.target.files[0];
    },
  },
};
</script>
