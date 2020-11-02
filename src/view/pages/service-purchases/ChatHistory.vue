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
          Chat History
        </h3>
      </div>
    </div>

    <div class="card-body">
      <!--begin::Example-->
      <div class="example example-basic">
        <div class="example-preview">
          <div class="timeline timeline-4">
            <div class="timeline-bar"></div>
            <div class="timeline-items">
              <template v-for="message of chatHistory">
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

                    <span class="text-muted font-weight-bold font-size-sm">{{
                      message.time
                    }}</span>
                  </div>
                </div>
              </template>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <!--end::Example-->
    </div>
  </div>
</template>

<script>
import FileSaver from "file-saver";

export default {
  name: "ChatHistory",
  props: ["chatHistory"],
  methods: {
    downloadFile(fileName, filUrl) {
      FileSaver.saveAs(filUrl, fileName);
    }
  }
};
</script>
