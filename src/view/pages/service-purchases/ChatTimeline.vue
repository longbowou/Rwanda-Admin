<template>
  <div class="example example-basic mt-5">
    <div class="example-preview">
      <div class="timeline timeline-4">
        <div class="timeline-bar"></div>
        <div class="timeline-items">
          <chat-message
            v-for="message of messages"
            :message="message"
            :key="'message-' + message.id"
          />
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatMessage from "@/view/pages/service-purchases/ChatMessage";
export default {
  name: "ChatTimeline",
  components: { ChatMessage },
  props: ["messages"]
};
</script>

<style scoped></style>
