<template>
    <div id="uploaded-container">
        <md-avatar id="uploaded-avatar" class="md-avatar-icon">
            <md-icon id="uploaded-icon">check_circle</md-icon>
        </md-avatar>
        <h3 id="uploaded-title">Uploaded successfully!</h3>
        <img :src="link" style="max-height: 14rem;">
        <md-field>
            <md-input id="uploaded-link-input" :value="link" :disabled="true"></md-input>
            <div v-on:click="copy">
                <md-icon>content_copy</md-icon>
            </div>
        </md-field>

        <md-snackbar :md-position="'center'" :md-duration="1000" :md-active.sync="showSnackbar" md-persistent>
            <span>Copied!</span>
        </md-snackbar>
    </div>  
</template>

<script>
export default {
    name: "Uploaded",
    props: ["link"],
    data: () => ({
        showSnackbar: false,
    }),
    methods: {
        copy: function(e) {
            let uploadedLinkElement = document.getElementById("uploaded-link-input")
            navigator.clipboard.writeText(uploadedLinkElement.value)
                .then(() => {
                    this.showSnackbar = true
                })
        }
    }
}
</script>

<style lang="scss">
    @import "~vue-material/dist/theme/engine"; // Import the theme engine

    #uploaded-container {
        padding: 1.5rem;
        padding-top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 30rem;

        #uploaded-avatar {
            background-color: transparent;

            #uploaded-icon {
                color: md-get-palette-color(green, 600);
                font-size: 3rem!important;
            }
        }

        #uploaded-title {
            font-size: 1.4rem;
            font-weight: normal;
        }
    }
</style>