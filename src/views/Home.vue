<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full introduction-bg"
        style="background-image: url(/assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et dolor mollis, congue
            augue non, venenatis elit. Nunc justo eros, suscipit ac aliquet imperdiet, venenatis et
            sapien. Duis sed magna pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
        v-icon-secondary="{icon:'headphones-alt', right:true}">
<!--          v-icon.right.yellow="'headphones-alt'"-->
          <span class="card-title">Songs</span>
          <!-- Icon -->

        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <song-item v-for="(song, index) in songs" :key="index" :song="song"></song-item>
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script>
import { songsCollection } from '@/includes/firebase.js';
import SongItem from '@/components/SongItem.vue';
import iconSecondary from "@/directives/icon-secondary.js";
export default {
  name: 'AppHome',
  data() {
    return {
      songs: [],
      maxPerPage: 25,
      pendingRequest: false
    }
  },
  components: {
    SongItem,
  },
  async created() {
    this.getSongs()

   //window.addEventListener('scroll', this.handleScroll)
  },
directives:{
  'icon-secondary': iconSecondary
},
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement
      const { innerHeight } = window
      const bottomOfWindow = Math.round(scrollTop) + innerHeight > offsetHeight - 100

      if (bottomOfWindow) {
        this.getSongs()
      }
    },
    async getSongs() {

      if (this.pendingRequest) {
        return
      }
      this.pendingRequest = true

      let snapShots;

      /*if (this.songs.length) {
        const lastDoc = await songsCollection.doc([this.songs.length - 1].docID).get();

        snapShots = await songsCollection
          .orderBy('modified_name')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        snapShots = await songsCollection.orderBy('modified_name').limit(this.maxPerPage).get();
      }*/

      snapShots = await songsCollection.orderBy('modified_name').limit(this.maxPerPage).get();

      snapShots.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data()
        })
      })
      this.pendingRequest = false
    }
  },
  // beforeUnmount() {
  //   window.removeEventListener('scroll, this.handleScroll')
  // },
}
</script>