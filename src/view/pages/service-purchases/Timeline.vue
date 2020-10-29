<template>
  <div class="card card-custom shadow-sm mb-5">
    <div class="card-header">
      <div class="card-title">
        <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3">
          <!--begin::Svg Icon-->
          <inline-svg src="media/svg/icons/General/Settings-1.svg" />
          <!--end::Svg Icon-->
        </span>

        <h3 class="card-label">
          Timeline
        </h3>
      </div>
    </div>

    <div class="card-body">
      <div class="timeline timeline-justified timeline-4">
        <div class="timeline-bar"></div>
        <div class="timeline-items pt-7 pb-2">
          <template v-for="(timeline, index) of timelines">
            <div :key="index" class="timeline-item">
              <div class="timeline-badge" style="top: auto">
                <div :class="['bg-' + timeline.color]"></div>
              </div>

              <div class="timeline-label mb-0 pt-1 pl-0">
                <span :class="['font-weight-bold', 'text-' + timeline.color]">{{
                  timeline.happenAt
                }}</span>
              </div>

              <div class="timeline-content pl-0 pb-0 pr-0 pt-1">
                <span
                  :class="[
                    'label label-xl font-weight-bold label-inline label-square',
                    'label-light-' + timeline.color
                  ]"
                >
                  {{ timeline.status }}
                </span>

                <p
                  class="text-dark-50 mt-2 mb-0"
                  v-html="timeline.description"
                  v-if="timeline.description !== null"
                ></p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.timeline-item:after {
  border-right: transparent !important;
}

.timeline-content {
  background-color: transparent !important;
}
</style>
<script>
export default {
  name: "Timeline",
  props: ["timelines"],
  data() {
    return {};
  }
};
</script>
