<template>
    <ul id="slide-out" class="sidenav">
    <li><div class="user-view">
      <div class="background">
        <img src="../assets/profile_back.jpg">
      </div>
      <a href="#user"><img class="circle" v-bind:src="$auth.user.value.picture"></a>
      <a href="#name"><span class="white-text name">{{ $auth.user.value.name }}</span></a>
      <a href="#email"><span class="white-text email">{{ $auth.user.value.email }}</span></a>
    </div></li>
    <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
    <li><a href="#!">Second Link</a></li>
    <li><div class="divider"></div></li>
    <li><a class="subheader">Subheader</a></li>
    <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
    <li><a class="sidenav-close" href="#!">Clicking this will close Sidenav</a></li>
  </ul>
  <a href="#" data-target="slide-out" class="sidenav-trigger btn-floating btn-medium waves-effect waves-light"><i class="material-icons">menu</i></a>
        
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { onMounted } from '@vue/runtime-core';
import M from "materialize-css";

export default defineComponent({
    
    setup() {
        onMounted(()=>{
                document.addEventListener('DOMContentLoaded', function() {
                var elems = document.querySelectorAll('.sidenav');
                M.Sidenav.init(elems);
            });
        })
    },
})
</script>

<style scoped>

.sidenav-trigger {
    top: -52px;
    z-index:1;
    left: 10px;
}



</style>
