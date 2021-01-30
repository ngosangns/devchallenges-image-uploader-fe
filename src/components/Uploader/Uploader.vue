<template>
  <!-- Uploader -->
  <div id="upload-container">
    <!-- Dialog -->
    <Dialog v-bind:show="showDialog" v-bind:type="dialogType" v-bind:uploadedLink="uploadedLink"
      v-bind:progressAmount="progressAmount" v-bind:title="dialogTitle"/>

    <md-card id="uploader" v-if="!showDialog">
      <md-card-header>
        <div class="md-title">Upload your image</div>
      </md-card-header>

      <md-card-content>
        File should be .jpg, .png, .jpeg
        <div id="drag-uploader">
          <input type="file" id="file-field" @change="drop"/>
          <span id="title-uploader">Drag & drop your image here</span>
        </div>
      </md-card-content>

      <md-card-actions>
        <md-button id="file-uploader" class="md-raised md-primary"
          v-on:click="triggerUploadFile">
          Choose a file
        </md-button>
      </md-card-actions>
    </md-card>

    <md-snackbar :md-position="'center'" :md-duration="1000" :md-active.sync="showSnackbar" md-persistent>
      <span>{{snackbarContent}}</span>
    </md-snackbar>
  </div>
</template>

<script>
import axios from 'axios'
import Dialog from "@/components/Dialog/Dialog.vue"
import host from "@/constants.js"

export default {
  name: 'Uploader',
  data: () => ({
    dialogTitle: null,
    showDialog: null,
    dialogType: null,
    progressAmount: {
      value: 0,
    },
    uploadedLink: null,
    showSnackbar: false,
    snackbarContent: null
  }),
  components: {
    Dialog
  },
  // define methods under the `methods` object
  methods: {
    triggerUploadFile: function () {
      let fileField = document.getElementById("file-field");
      fileField.click();

      fileField.onchange = function() {
        // Checking
        if(!this.check(fileField)) {
          fileField.value = null
          return
        }

        let file = fileField.files[0]
        this.uploadImage(file)
      };
    },
    drop: function(e) {
      e.preventDefault()
      let fileField = document.getElementById("file-field")

      // Checking
      if(!this.check(fileField)) {
        fileField.value = null
        return
      }

      let file = fileField.files[0]
      this.uploadImage(file)
    },
    check: function(fileField) {
      // Check input has value yet
      if(!fileField.files.length) return false

      let file = fileField.files[0]
      // Check file extension
      let fileExtension = file.name.split(".")[file.name.split(".").length-1]
      if(!["png", "jpg", "jpeg"].includes(fileExtension)) {
        this.showSnackbar = true
        this.snackbarContent = "File extension should be .jpg, .png, .jpeg"
        return false
      }

      // Check file size
      if(file.size/1024/1024 > 4) {
        this.showSnackbar = true
        this.snackbarContent = "File size should be less than 4MB"
        return false
      }

      return true
    },
    uploadImage: function(file) {
      // Create new form data
      let formData = new FormData()
      formData.append('image', file)

      // Show upload dialog
      this.showDialog = true
      this.dialogType = "progress"
      this.dialogTitle = "Uploading..."

      axios({
        method: 'post',
        url: host+"/images",
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          // Set progress amount
          this.progressAmount.value = Math.round(progressEvent.loaded * 100 / progressEvent.total)
        },
      }).then(res => {
        this.uploadedLink = res.data.link
        this.showDialog = true
        this.dialogTitle = null
        this.dialogType = "uploaded"
      })
      .catch(err => {
        // Check response message
        if (err.response) {
          if([415, 501].includes(err.response.status)) {
            this.snackbarContent = err.response.data.message
          }
        }
        else {
          this.snackbarContent = "Error while uploading image..."
        }

        // Show upload dialog
        this.showDialog = false
        this.showSnackbar = true

        throw new Error(err)
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "Uploader.scss";
</style>
