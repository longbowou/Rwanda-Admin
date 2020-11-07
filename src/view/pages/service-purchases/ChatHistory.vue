<template>
  <div class="card card-custom gutter-b">
    <div class="card-header">
      <div class="card-title">
        <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3">
          <!--begin::Svg Icon-->
          <inline-svg src="media/svg/icons/Communication/Group-chat.svg" />
          <!--end::Svg Icon-->
        </span>
        <h3 class="card-label">
          {{ $t("Chat History") }}
        </h3>
      </div>
    </div>

    <div class="card-body pt-0">
      <ul class="nav nav-tabs nav-tabs-line-success nav-bold nav-tabs-line">
        <li class="nav-item nav-primary">
          <button
            @click="setActiveTab(0)"
            :class="['nav-link', isMessagesTabActive && 'active']"
            data-toggle="tab"
            role="tab"
          >
            <span class="nav-icon"><i class="flaticon2-chat-1"></i></span>
            <span class="nav-text">{{ $t("Messages") }}</span>
          </button>
        </li>
        <li class="nav-item ">
          <button
            @click="setActiveTab(1)"
            :class="['nav-link', isFilesTabActive && 'active']"
            data-toggle="tab"
            role="tab"
          >
            <span class="nav-icon"><i class="fas fa-file-alt"></i></span>
            <span class="nav-text">{{ $t("Files") }}</span>
          </button>
        </li>
      </ul>

      <div class="tab-content">
        <div
          :class="['tab-pane fade', isMessagesTabActive && 'show active']"
          role="tabpanel"
        >
          <chat-timeline :messages="chatHistory" />
        </div>

        <div
          :class="['tab-pane fade', isFilesTabActive && 'show active']"
          role="tabpanel"
        >
          <chat-timeline :messages="chatFilesHistory" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatTimeline from "@/view/pages/service-purchases/ChatTimeline";
import { queryLitigationServicePurchaseChatFilesHistory } from "@/graphql/litigation-queries";
export default {
  name: "ChatHistory",
  components: { ChatTimeline },
  props: ["chatHistory"],
  data() {
    return {
      chatFilesHistory: [],
      currentTabIndex: 0
    };
  },
  computed: {
    isMessagesTabActive() {
      return this.currentTabIndex === 0;
    },
    isFilesTabActive() {
      return this.currentTabIndex === 1;
    }
  },
  watch: {
    isFilesTabActive() {
      if (this.isFilesTabActive) {
        if (window._.isEmpty(this.chatFilesHistory)) {
          this.fetchChatFilesHistory();
        }
      }
    }
  },
  methods: {
    setActiveTab(index) {
      this.currentTabIndex = index;
    },
    async fetchChatFilesHistory() {
      const result = await this.$apollo.query({
        query: queryLitigationServicePurchaseChatFilesHistory,
        variables: {
          id: this.$route.params.id
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.chatFilesHistory =
          result.data.litigation.servicePurchase.chatFilesHistory;
      }
    }
  }
};
</script>
