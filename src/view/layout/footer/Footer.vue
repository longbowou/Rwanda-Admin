<template>
  <!-- begin:: Footer -->
  <div class="footer bg-white py-4 d-flex flex-lg-column" id="kt_footer">
    <div
      class="d-flex align-items-center justify-content-between"
      v-bind:class="{ 'container-fluid': widthFluid, container: !widthFluid }"
    >
      <div class="text-dark">
        <img
          alt="Logo"
          src="media/logos/logo.png"
          class="logo-sticky max-h-35px"
        />
        <span class="text-muted font-weight-bold mx-2">2020 ©</span>
        <a href="#" class="text-primary text-hover-primary">
          Maison du Digital
        </a>
      </div>
      <div class="nav nav-dark">
        Powered by
        <a
          href="https://gitlab.com/longbowou"
          target="_blank"
          class="text-dark opacity-55 pl-0 text-hover-primary ml-2 mr-2"
        >
          Longbowou
        </a>
        &
        <a
          href="https://gitlab.com/Stalia"
          target="_blank"
          class="text-dark opacity-55 pl-0 text-hover-primary ml-2"
        >
          Esther KANGBIETE
        </a>
      </div>
    </div>
  </div>
  <!-- end:: Footer -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "KTFooter",
  computed: {
    ...mapGetters(["layoutConfig"]),

    /**
     * Check if footer container is fluid
     */
    widthFluid() {
      return this.layoutConfig("footer.width") === "fluid";
    }
  }
};
</script>
