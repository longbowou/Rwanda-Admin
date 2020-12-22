<template>
  <div
    :key="message.id"
    :class="[
      'timeline-item',
      message.fromBuyer && 'timeline-item-left',
      !message.fromBuyer && 'timeline-item-right'
    ]"
  >
    <div class="timeline-badge">
      <div
        :class="[
          message.fromBuyer && 'bg-success',
          !message.fromBuyer && 'bg-warning'
        ]"
      ></div>
    </div>

    <div class="timeline-label mt-2">
      <span class="text-primary font-weight-bold">
        {{ message.showDate ? message.dateDisplay : "" }}
      </span>
    </div>

    <div class="timeline-content mb-5">
      <div v-html="message.content" v-if="!message.isFile"></div>

      <div
        @click="downloadFile(message.fileName, message.fileUrl)"
        v-if="message.isFile"
        class="text-hover-success cursor-pointer"
      >
        <i class="fas fa-file-download mr-1"></i>
        {{ message.fileName }} <br />
        <p :class="['m-0']">
          <span>{{ message.fileSize }}</span>
        </p>
      </div>

      <span class="text-muted font-weight-bold font-size-sm">
        {{ message.time }}
      </span>
    </div>
  </div>
</template>

<script>
import FileSaver from "file-saver";

export default {
  name: "ChatMessage",
  props: ["message"],
  methods: {
    downloadFile(fileName, filUrl) {
      FileSaver.saveAs(filUrl, fileName);
    }
  }
};
</script>

<style scoped></style>
