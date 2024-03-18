<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <upload ref="upload" :addSong="addSong"/>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->

            <composition-item v-for="(song, i) in songs" :key="i" :song="song"
            :updateSong="updateSong"
            :index="i"
            :removeSong="removeSong"
            :updateUnsavedFlag="updateUnsavedFlag"
            />

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import upload from '@/components/Upload.vue';
import compositionItem from "@/components/CompositionItem.vue";
import { auth, songsCollection } from '@/includes/firebase.js'
export default {
  name: 'manage',
  components: {
    upload,
    compositionItem,
  },
  data(){
    return {
      songs: [],
      unsavedFlag:false
    }
  },
  async created() {
    const snapshot = await songsCollection
      .where("uid", "==", auth.currentUser.uid)
      .get();

    snapshot.forEach(this.addSong);
  },
  methods:{
    updateSong(i, values){
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
    removeSong(index){
      this.songs.splice(index,1);
    },
    addSong(document){
      const song = {
        ...document.data(),
        docID: document.id,
      };
      this.songs.push(song);
    },
    updateUnsavedFlag(value){
      this.unsavedFlag = value;
    }
  },
  beforeRouteLeave(to, from, next){
    if(!this.unsavedFlag){
      next();
    } else {
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?');
      next(leave);
    }
  }
  // beforeRouteLeave(to, from, next){
  //   this.$refs.upload.cancelUploads();
  //   next();
  // }
}
</script>

<style scoped></style>