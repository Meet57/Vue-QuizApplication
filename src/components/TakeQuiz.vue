<template>
  <div>
      Take Quiz {{id}}
  </div>
</template>

<script>
export default {
    name:'take-quiz',
    data(){
        return{
            id: this.$route.params.id
        }
    }
}
</script>

<style>

</style>