<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn to="/dealer" color="primary">
          <v-icon left>mdi-arrow-left</v-icon> kembali
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col md="4">
            <v-form>
              <v-text-field :model="title" label="Title" required />
              <v-text-field :model="description" label="Description" required />
              <v-text-field
                :model="publish"
                type="number"
                label="Publish"
                required
              />
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script charset="utf-8">
export default {
  layout: 'dashboard',
  data: () => ({
    title: '',
    description: '',
    publish: 0,
  }),
};
</script>
