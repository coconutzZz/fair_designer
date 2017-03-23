<template>
  <div>
    <md-dialog md-open-from="#fab" md-close-to="#fab" ref="dialog2" >
      <md-dialog-title>Nov layer</md-dialog-title>

      <md-dialog-content>
        <form>
          <md-input-container>
            <label for="name">Ime</label>
            <md-textarea name="name" id="name" v-model="layerName"></md-textarea>
          </md-input-container>
          <md-input-container>
            <label for="type">Vrsta</label>
            <md-select name="type" id="type" v-model="layerType">
              <md-option v-for="type in this.$store.state.layerTypes" :value="type.type">{{type.displayName}}</md-option>
            </md-select>
          </md-input-container>
        </form>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('dialog2',false)">Prekliči</md-button>
        <md-button class="md-primary" @click.native="closeDialog('dialog2',true)">Dodaj</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-icon-button" @click.native="openDialog('dialog2')" style="">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        layerName:'',
        layerType:''
      }
    },
    methods:{
      openDialog(ref){
        this.layerName = '';
        this.layerType = '';
        this.$refs[ref].open();
      },
      closeDialog(ref,type) {
        if(type) {
          this.$store.commit('addLayer', { name:this.layerName,type:this.layerType });
        }
        this.$refs[ref].close();
      }
    }
  }
</script>
