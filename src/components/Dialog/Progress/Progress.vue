<template>
    <div style="padding: 1.5rem; padding-top: 0">
        <md-progress-bar md-mode="determinate" :md-value="amount"></md-progress-bar>
    </div>
</template>

<script>
export default {
    name: "Progress",
    props: ['amount']
}
</script>