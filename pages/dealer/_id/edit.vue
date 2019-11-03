<template>
  <v-container>
    <v-layout row>
      <v-flex md7 mx-2>
        <material-card color="green" title="Edit Dealer">
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="dealer.name"
                label="Name"
                counter="20"
                required
              />
              <v-text-field
                v-model="dealer.address"
                label="Address"
                counter="20"
                required
              />
              <v-layout>
                <v-flex mh2>
                  <v-text-field
                    v-model="dealer.lat"
                    label="Latitude"
                    type="number"
                    required
                  />
                </v-flex>
                <v-flex mh2>
                  <v-text-field
                    v-model="dealer.long"
                    label="Longtitude"
                    type="number"
                    required
                  />
                </v-flex>
              </v-layout>
              <img-inputer
                v-model="dealer.photo"
                placeholder="Drop dealer photo"
                @change="onFileSelected"
              />
              <v-textarea
                v-model="dealer.description"
                label="Deskripsi"
                counter="20"
                required
              />
              <v-flex text-xs-right>
                <v-btn color="blue" @click="submit">submit</v-btn>
                <v-btn color="warning" to="/dealer">cancel</v-btn>
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
    title: 'Oto Point | Dealer',
  },

  components: { materialCard, ImgInputer },

  layout: 'dashboard',

  data: () => ({
    dealer: {
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
      getDealer: 'dealer/getDealer',
      putDealer: 'dealer/putDealer',
    }),
    async fetch(id) {
      const { data } = await this.getDealer(id);
      this.dealer = data;
    },
    async submit() {
      const id = this.$route.params.id;
      const token = localStorage.getItem('token');
      const fd = new FormData();
      const params = { ...this.dealer };
      params.lat = parseFloat(params.lat);
      params.long = parseFloat(params.long);

      for (var key in params) {
        fd.append(key, params[key]);
      }

      const result = await this.putDealer({ id, fd, token });

      if (result.status) this.$router.go(-1);
    },
    onFileSelected(event) {
      this.dealer.photo = event.target.files[0];
    },
  },
};
</script>
