<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" md="5">
        <v-card>
          <v-card-title>
            <v-btn to="/dealer" color="primary">
              <v-icon left>mdi-arrow-left</v-icon> kembali
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-layout>
              <v-flex md5>
                <v-form>
                  <v-text-field
                    v-model="user.name"
                    label="Name"
                    counter="20"
                    required
                  />
                  <v-text-field
                    v-model="user.address"
                    label="Address"
                    counter="20"
                    required
                  />
                  <v-layout>
                    <v-flex>
                      <v-text-field
                        v-model="user.lat"
                        label="Latitude"
                        type="number"
                        required
                      />
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        v-model="user.long"
                        label="Longtitude"
                        type="number"
                        required
                      />
                    </v-flex>
                  </v-layout>
                  <img-inputer
                    v-model="user.photo"
                    placeholder="Drop dealer photo"
                    @change="onFileSelected"
                    required
                  />
                  <v-textarea
                    v-model="user.description"
                    label="Deskripsi"
                    required
                  />
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
import materialCard from '~/components/material/AppCard';
import 'vue-img-inputer/dist/index.css';

export default {
  layout: 'dashboard',

  components: { ImgInputer, materialCard },

  data: () => ({
    user: {
      name: '',
      address: '',
      lat: 0,
      long: 0,
      photo: '',
      description: '',
    },
  }),

  methods: {
    ...mapActions({ createDealer: 'dealer/createDealer' }),
    async submit() {
      const dealer = { ...this.user };
      const token = localStorage.getItem('token');
      const fd = await new FormData();
      for (var key in dealer) {
        fd.append(key, dealer[key]);
      }

      const data = await this.createDealer({ fd, token });
      if (data.status) this.$router.go(-1);
    },
    onFileSelected(event) {
      this.photo = event.target.files[0];
      console.log({ photo: this.photo, event });
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
