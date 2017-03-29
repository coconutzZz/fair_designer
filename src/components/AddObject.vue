<template>
  <div>
    <md-dialog ref="addObjectDialog" >
      <md-dialog-title>Dodaj objekt</md-dialog-title>

      <md-dialog-content>
        <form>
          <md-input-container>
            <label for="name">Ime</label>
            <md-textarea name="name" id="name" v-model="layerName"></md-textarea>
          </md-input-container>
        </form>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('addObjectDialog',false)">Prekliči</md-button>
        <md-button class="md-primary" @click.native="closeDialog('addObjectDialog',true)">Dodaj</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  export default {
    props: ['object','layer'],
    data(){
      return {
        layerName:'',
        layerType:''
      }
    },
    mounted(){
      this.$refs['addObjectDialog'].open();
    },
    methods:{
      closeDialog(ref,type) {
        if(type) {

        }
        this.$refs[ref].close();
      }
    }
  }
</script>
