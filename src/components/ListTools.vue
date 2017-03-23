<template>
  <ul id="menuRoot">
    <li v-for="(tool,id) in layerTools" v-on:click="selectTool(id)" :key="tool.name" :class="[id === selectedToolId ? activeClass : '']">
      {{tool.displayName}}
    </li>
  </ul>
</template>

<script>
  import { mapMutations,mapGetters } from 'vuex'

  export default {
    data(){
      return {
        activeClass: 'active',
      }
    },
    computed: {
      ...mapGetters([
        'selectedToolId',
        'layerTools'
      ])
    },
    methods: {
      selectTool(id) {
        this.$store.commit('selectTool', { id:id })
      }
    }
  }
</script>
  <style lang="scss">
    ul#menuRoot {
      list-style-type: none;
      margin: 0;
      padding: 0;
      border:1px solid black;
      margin:0 auto;
      background: #FFF;
      li {
        display: inline-block;
        margin: 0;
        padding: 0;
        cursor:pointer;
        width: 40px;
        height: 40px;
      }
    }
  </style>
