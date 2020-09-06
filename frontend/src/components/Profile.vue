<template>
  <div>
    <v-card dark class="mt-0" color="#2c3e50dc" tile>
      <v-img  class="pb-8" 
              height="245px" 
              width="auto" 
              src="../../../server/storage/common/OO.jpeg">
        <v-flex md-3 justify-center class="pa-2">
            <v-avatar class="profile" color="grey" size="200">
              <img :src="this.file.picture" :alt="this.file.picture">
            </v-avatar>
            <!-- <h6>{{this.file.picture}}</h6>  -->
            
        </v-flex> 
          <v-btn light small class="card-outter" @click="this.getResume">
            <v-icon>mdi-download</v-icon> 
            <!-- {{this.getResume(this.file.resume)}} -->
          </v-btn>
      </v-img>
    </v-card>
    <!-- <v-col cols="12" sm="6" md="4"> in case needed -->
    <v-container>
      <v-row justify-center>
        <v-flex md-3 justify-space-evenly>
          <v-col md="8">
            <v-text-field v-model="BasicInfo" 
                          prepend-icon="mdi-account"
                          label="Basic Info"
                          dense>
            </v-text-field>
          </v-col>
          <v-col md="8">
            <v-text-field v-model="Email"
                          prepend-icon="mdi-mail"
                          label="Email"
                          dense>
            </v-text-field>
          </v-col>
          <v-col md="8">
            <v-text-field v-model="PhoneNumber"
                          prepend-icon="mdi-phone"
                          label="Phone Number"
                          dense>
            </v-text-field>
          </v-col>
          <v-col md="8">
            <v-text-field v-model="Address"
                          prepend-icon="mdi-home"
                          label="Address"
                          dense>
            </v-text-field>
          </v-col>
        </v-flex>

        <v-divider class="mx-auto" inset vertical></v-divider>

        <v-flex md-3 justify-space-evenly>
          <v-col md="8">
          <v-text-field v-model="WorkingArea"
                        prepend-icon="mdi-domain"
                        label="Working Area"
                        dense>
          </v-text-field>
          </v-col>
          <v-col md="8">
            <v-file-input v-model="resume"
                          type="file"
                          headers="multipart/form-data"
                          accept="file/*"
                          placeholder="Choose file..."
                          label="Resume"
                          dense>
            </v-file-input>
          </v-col>
          <v-col md="8">
            <v-file-input v-model="picture"
                          :rules="rules"
                          headers="multipart/form-data"
                          accept="image/*"
                          placeholder="pick avatar"
                          prepend-icon="mdi-camera"
                          label="Picture"
                          dense>
            </v-file-input>
          </v-col>
          <v-col md="8">
            <v-btn dark small @click="updateProfile" color="#2c3e50">
              Update Profile
            </v-btn>
          </v-col>
        </v-flex>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Profile',
  data() {
    return {
      id: this.$route.params.id,
      BasicInfo: '',
      Email: '',
      PhoneNumber: '',
      Address: '',
      WorkingArea: '',
      resume: null,
      picture: null,
      error: null,
      loading: false,
      token: localStorage.getItem('accToken'),
      file: {},
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2MB!'
      ],
      
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      this.loading = true
      const fetchedID = this.$route.params.id
      console.log('fetchedID', fetchedID)
      // this.getPicture(this.picture)
      axios.get('http://localhost:3000/api/Contacts_Infos/'+fetchedID)
      .then((response) => {
        console.log('here fetching response',response)
        this.BasicInfo=  response.data.BasicInfo
        this.Email=      response.data.Email
        this.PhoneNumber=response.data.PhoneNumber
        this.Address=    response.data.Address
        this.WorkingArea=response.data.WorkingArea
        
        this.file = {
          resume: response.data.resume,
          picture: this.getPicture(response.data.picture)
        }
        // console.log('then get picture', this.file.picture)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getPicture(picture) {
      // get picture name and read it from the database
      console.log('getPicture', picture)
      var picPath = `http://localhost:3000/api/containers/common/download/${picture}`;
      // console.log(picPath)
      return picPath
    },
    getResume() {
      // console.log('getResume', this.file.resume)
      var resume = this.file.resume
      console.log('the resume:',resume)
      var resumePath = 'http://localhost:3000/api/containers/resume/download/'+resume;
      return window.location.assign(resumePath)
    },
    updateProfile() {
      const data = {
        BasicInfo: this.BasicInfo,
        Email: this.Email,
        PhoneNumber: this.PhoneNumber,
        Address: this.Address,
        WorkingArea: this.WorkingArea,
        id: this.id,
        resume:this.file.resume.name,
        picture: this.file.picture.name
      }

      // console.log('here after data ', data)
      // send resume file to common/models/storage-resume.js
        const resumeObj = new FormData();
        resumeObj.append('file', this.resume)

        axios.post('http://localhost:3000/api/Storageresumes/upload', resumeObj)
        .then(res => {
          console.log(res)
        })
        .catch(function() {
          console.log('Resume upload failed')
        })

        // send picture file to common/models/storage-file.js
        const fileObj = new FormData();
        fileObj.append('image', this.picture)
        
        // console.log('formdata', fileObj)
        axios.post('http://localhost:3000/api/StorageFiles/upload', fileObj)
        .then(res => {
          console.log(res);
        })
        .catch(function() {
          console.log('Image upload failed')
        });

      // console.log('id ',this.id)
      const url = `/api/Contacts_Infos/${this.id}?access_token=` + this.token;
      axios.patch('http://localhost:3000'+url, data)
      .then(response => {
        console.log('Here after', response.data)
        this.$store.dispatch('setSnackbar', {
          message: 'you have successfully updated the profile.',
          color: 'success'
        })
        .catch((error) => {
          const err_message = error.response.data.error.message;
          console.log(err_message)
          this.$store.dispatch('setSnackbar', {
            message: this.err_message,
            color: error
          })
        })
      });
    }
  }
}
</script>

<style>
  .backgnd {
    height:"7%";
    width: "10%";
    color:  #2c3e50c9;
  }
  .card-outter {
    position: "absolute";
    margin-right: -90%;
    bottom: 5px;
  }
</style>