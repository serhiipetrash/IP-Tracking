<script setup>
import IPInfo from '@/components/IPInfo.vue';
import { ref } from 'vue';
import axios from 'axios'

const queryIp = ref('')
const ipInfo = ref(null)

const getIpInfo = async () => {
  try {
    const data = await axios.get(`
https://geo.ipify.org/api/v2/country,city?apiKey=at_IXfdBSI6WxkO2qwfBQbKK7t6BvC9Z&ipAddress=${queryIp.value}`)
    const result = data.data
    ipInfo.value = {
      ip: result.ip,
      state: result.location.region,
      city: result.location.city,
      timezone: result.location.timezone,
      isp: result.isp,
      lat: result.location.lat,
      lng: result.location.lng,
    }

  } catch (err) {
    alert(err.message)
  }
}

</script>

<template>
  <div class="flex flex-col h-screen max-h-screen bg-sky-600">
    <!-- Search / Results -->
    <div class="z-20 flex justify-center relative px-4 pt-8 pb-32">
      <!-- Search Input -->
      <div class="w-full max-w-screen-sm">
        <h1 class="text-white text-center text-3xl pb-4">IP Address Tracker</h1>
        <div class="flex">
          <input
            v-model="queryIp"
            class="flex-1 py-3 px-2 rounded-tl-md rounded-bl-md outline-none"
            type="text"
            placeholder="Search for any IP address or leave empty to get your ip info"
          />
          <i
            @click="getIpInfo"
            class="cursor-pointer bg-black text-white px-4 rounded-tr-md rounded-br-md flex items-center fas fa-chevron-right"
          ></i>
        </div>
      </div>
      <!-- IP Info -->
      <IPInfo v-if="ipInfo" v-bind:ipInfo="ipInfo" />
    </div>

    <!-- Map -->
    <!-- <div id="mapid" class="h-full z-10"></div> -->
  </div>
</template>
