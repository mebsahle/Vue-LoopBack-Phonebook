<template>
  <div class="home">
    <v-data-table :headers="headers" :items="contacts" sort-by="BasicInfo" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <h1>
            <v-toolbar-title flat class="h1" style="color:teal; text-align:left;">
              Contacts 
            </v-toolbar-title>
          </h1>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <!-- to add new contact or to edit one -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Contact</v-btn>
            </template>

            <!-- contact form -->
            <v-card>
              <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.BasicInfo" label="Basic Info"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.phone" label="Phone Number"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.address" label="Address"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.workarea" label="Woring Area"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-file-input
                          v-model="editedItem.picture"
                          :rules="rules"
                          accept="multipart/form-data"
                          placeholder="pick avatar"
                          prepend-icon="mdi-camera"
                          label="picture"
                          id="file"
                          ref="file"
                      >
                      </v-file-input>
                    </v-col>
                    
                  </v-row>
                 </v-container>
              </v-card-text>

              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
           </v-card>

          </v-dialog>
        </v-toolbar>
      </template>

      <!-- buttons of the form -->
      <template v-slot:item.picture="{item}">
       <div class="p-2">
          <img :src="item.picture" style="width: 50px; height: 50px" :alt="item.picture"/>
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editContact(item)" color="teal">
          mdi-pencil
        </v-icon>
        <v-icon small color="pink" @click="deleteContact(item)">
          mdi-delete
        </v-icon>
      </template>

    </v-data-table>
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from 'axios'
export default {
  name: 'Home',
  data: () => ({
    picture: null,
    dialog: false,
    headers: [
      { text: '', align: 'center', sortable: false, value: 'picture'},
      { text: 'Basic Info', align: 'start', value: 'BasicInfo' },
      { text: 'Email', value: 'email'},
      { text: 'Phone Number', value: 'phone'},
      { text: 'Address', value: 'address'},
      { text: 'Working Area', value: 'workarea'},
    ],
    contacts: [],
    editedIndex: -1,
    editedItem: {
      BasicInfo: '',
      email: '',
      phone: '',
      address: '',
      workarea: ''
    },
    defaultItem: {
      value: false,
      BasicInfo: '',
      email: '',
      phone: '',
      address: '',
      workarea: ''
    },
    token: localStorage.getItem('accToken'),
    rules: [
      value => !value || value.size < 2000000 || 'Avatar size should be less than 2MB!'
    ],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
  },
  mounted() {

  },
  methods: {
    initialize() {

    },
    editItem (item) {
      this.editedIndex = this.contacts.indexOf(item) + 1
      this.editedItemId = Object.assign({}, item).id
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    editedContact (editedItemId) {
        const data = {
        BasicInfo: this.editedItem.BasicInfo,
        email: this.editedItem.email,
        phone: this.editedItem.phone,
        address: this.editedItem.address,
        workarea: this.editedItem.workarea,
        id: editedItemId,
        picture: this.editedItem.picture.name
      }
      console.log(this.editedItemId)
      console.log(data)
      
    },
    deleteItem (item) {
      const index = this.contacts.indexOf(item)
      const idItem = Object.assign({},item).id
      confirm('Are you sure you want to delete this item?') && this.contacts.splice(index, 1)
      console.log(idItem)
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) {
        // this.editedContact(this.editedItemId);
        Object.assign(this.contacts[this.editedIndex-1], this.editedItem);
      } else {
        this.contacts.push(this.editedItem);
      }
      this.close()
    },
  }
}
</script>


