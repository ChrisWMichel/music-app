<template>
  <app-header></app-header>

  <router-view v-slot="{Component, route}">
    <transition name="fade" mode="out-in">
      <div :key="route.name">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>

  <!-- Player -->
 <app-player/>

  <!-- Auth Modal -->
  <app-auth v-if="!this.userLoggedIn"></app-auth>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppAuth from '@/components/AppAuth.vue';
import AppPlayer from "@/components/Player.vue";
import { mapWritableState } from 'pinia';
import useUserStore from '@/stores/user.js';
import {auth} from "@/includes/firebase.js";

export default {
  name: 'App',
  components: {
    AppHeader,
    AppAuth,
    AppPlayer
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  created() {
    if(auth.currentUser){
      this.userLoggedIn = true;
    }
  }
}
</script>

<style>
.fade-enter-from{
  opacity: 0;
}
.fade-enter-active{
  transition: all 0.5s linear;
}
.fade-leave-to{
  transition: all .05s linear;
  opacity:0;
}

/*.fade-move{
  transition:  all 1s linear;
}
.fade-leave-active{
  position: absolute !important;
}*/
</style>