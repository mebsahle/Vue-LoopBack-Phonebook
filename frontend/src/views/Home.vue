<template>
  <div class="home">
    <v-data-table :headers="headers" :search="search" :items="contacts" sort-by="BasicInfo" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <h1>
            <v-toolbar-title flat class="h1" style="color:teal; text-align:left;">
              Contacts 
            </v-toolbar-title>
          </h1>

          <v-divider class="mx-4" inset vertical></v-divider>
          <!-- search field -->
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search..."
            single-line
            hide-details
          >
          </v-text-field>

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
                      <v-text-field v-model="editedItem.Email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.PhoneNumber" label="Phone Number"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.Address" label="Address"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.WorkingArea" label="Working Area"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-file-input
                        v-model="picture"
                        :rules="rules"
                        headers="multipart/form-data"
                        accept="image/*"
                        placeholder="pick avatar"
                        prepend-icon="mdi-camera"
                        label="picture"
                      >
                      </v-file-input>
                    </v-col>
                    
                  </v-row>
                 </v-container>
              </v-card-text>

              <!-- tools to Create Update and Delete contact information -->
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
        <!-- <h5>{{item.picture}}</h5> -->
        <div class="p-3">
          <v-row justify="space-around">
            <v-avatar size="48">
              <span class="white--text headline"><img :src="getPicture(item.picture)" style="width: 48px; height: 55px;" :alt="item.picture"/></span>
            </v-avatar>
          </v-row>
        </div>
      </template>

      <!-- triggers of Update and Delete data -->
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)" color="teal">
          mdi-pencil
        </v-icon>
        <v-icon small color="red" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>

    </v-data-table>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
  name: 'Home',
  data: () => ({
    picture: null,
    serach: '',
    dialog: false,
    headers: [
      { text: '', align: 'left', sortable: false, value: 'picture'},
      { text: 'Basic Info', align: 'start', value: 'BasicInfo', picture: ''},
      { text: 'Email', value: 'Email'},
      { text: 'Phone Number', value: 'PhoneNumber'},
      { text: 'Address', value: 'Address'},
      { text: 'Working Area', value: 'WorkingArea'},
      { text: 'Actions', value: 'actions', sortable: false}
    ],
    contacts: [],
    editedIndex: -1,
    editedItem: {
      BasicInfo: '',
      Email: '',
      PhoneNumber: '',
      Address: '',
      WorkingArea: '',
      picture:''
    },
    defaultItem: {
      value: false,
      BasicInfo: '',
      Email: '',
      PhoneNumber: '',
      Address: '',
      WorkingArea: '',
      picture: ''
    },
    token: localStorage.getItem('accToken'),
    rules: [
      value => !value || value.size < 2000000 || 'Avatar size should be less than 2MB!'
    ],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Contact' : 'Edit Contact'
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
  },
  mounted() {
    this.getContacts()
  },
  methods: {
    // console.log() statements are to check the data validity
    initialize() {
      this.getContacts()
    },
    getContacts() {
      // this will help to get data from the database 
      // and bring it to frontend
      axios.get('http://localhost:3000/api/Contacts_Infos')
      .then(response => {
        this.contacts = response.data
      })
    },
    addContact() {
      // add contact information to database
      const contact_data = {
        BasicInfo: this.editedItem.BasicInfo,
        Email: this.editedItem.Email,
        PhoneNumber: this.editedItem.PhoneNumber,
        Address: this.editedItem.Address,
        WorkingArea: this.editedItem.WorkingArea,
        picture: this.picture.name
      }

      // console.log('contactinfo', contact_data)
      axios.post('http://localhost:3000/api/Contacts_Infos?access_token=' + this.token, contact_data)
      .then(response => {
        console.log('Here', response.data)
        this.getContacts();
      })
    },
    getPicture(picture) {
      // get picture name and read it from the database
      // console.log('getPict', picture)
      var picPath = 'http://localhost:3000/api/containers/common/download/'+picture;
      // console.log(picPath)
      return picPath
    },
    editItem (item) {
      // console.log('Here two', this.contacts.indexOf(item),Object.assign({}, item))
      this.editedIndex = this.contacts.indexOf(item) + 1
      this.editedItemId = Object.assign({}, item).id
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    editedContact (editedItemId) {
      // this will help editing the selected contact information
      const data = {
        BasicInfo: this.editedItem.BasicInfo,
        Email: this.editedItem.Email,
        PhoneNumber: this.editedItem.PhoneNumber,
        Address: this.editedItem.Address,
        WorkingArea: this.editedItem.WorkingArea,
        id: editedItemId,
        picture: this.picture.name
      }
      // console.log('editeed version', this.picture.name)
      // console.log(data)
      
      const url = `/api/Contacts_Infos/${this.editedItemId}?access_token=` + this.token;
      axios.patch('http://localhost:3000'+url, data)
      .then(response => {
        console.log('Here after', response.data)
      });
    },
    deleteItem (item) {
      // this will delete contact info from database 
      // and the front end list
      const index = this.contacts.indexOf(item)
      const idItem = Object.assign({},item).id
      confirm('Are you sure you want to delete this item?') && this.contacts.splice(index, 1)
      // console.log(idItem)

      // console.log('ID', Object.assign({},item).id)
      const url = `/api/Contacts_Infos/${idItem}?access_token=`
      console.log(url)
      axios.delete('http://localhost:3000'+url+this.token)
      .then((response) => {
        console.log(response.data)
      })
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      // this will help saving data fron front end
      // and from database
      if (this.editedIndex > -1) {
        this.editedContact(this.editedItemId);
        Object.assign(this.contacts[this.editedIndex-1], this.editedItem);

        // send picture file to common/models/storage-file.js
        const fileObj = new FormData();
        fileObj.append('image', this.picture)
        
        // console.log('formdata', fileObj)
        axios.post('http://localhost:3000/api/StorageFiles/upload', fileObj)
        .then(res => {
          console.log(res);
        })
        .catch(function() {
          console.log('Failed')
        });
      } else {
        this.addContact();
        this.contacts.push(this.editedItem);
      }
      this.close()
    },
  }
}
</script>

