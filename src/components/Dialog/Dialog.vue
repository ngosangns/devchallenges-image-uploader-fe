<template>
    <md-dialog :md-active.sync="show" :md-backdrop="!['progress', 'uploaded'].includes(type)">
      <md-dialog-title>{{title}}</md-dialog-title>

      <Progress v-if="type=='progress'" v-bind:amount="progressAmount.value"/>
      <Uploaded v-if="type=='uploaded'" v-bind:link="uploadedLink"/>
    </md-dialog>
</template>

<script>
import Progress from "@/components/Dialog/Progress/Progress.vue"
import Uploaded from "@/components/Dialog/Uploaded/Uploaded.vue"

export default {
    name: "Dialog",
    props: ["title", "show", "type", "progressAmount", "uploadedLink"],
    components: {
        Progress,
        Uploaded,
    },
}
</script>