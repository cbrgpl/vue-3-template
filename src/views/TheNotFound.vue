<script lang="ts" >
export default {
  name: 'TheNotFound',
}
</script>

<script setup lang="ts" >
import { useRouter } from 'vue-router'

const { push } = useRouter()

push( { name: 'Root' } )
</script>

<template >
  <div >not found</div>
</template>

<style scoped ></style>
