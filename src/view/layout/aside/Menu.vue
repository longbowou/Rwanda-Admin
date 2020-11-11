<template>
  <ul class="menu-nav">
    <router-link
      to="/dashboard"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <i class="menu-icon flaticon2-architecture-and-city"></i>
          <span class="menu-text">Dashboard</span>
        </a>
      </li>
    </router-link>

    <router-link
      :to="{ name: 'disputes' }"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <!--          <i class=" flaticon2-expand"></i>-->
          <span class="menu-icon svg-icon svg-icon-lg svg-icon-2x">
            <!--begin::Svg Icon-->
            <inline-svg src="media/svg/icons/Code/Github.svg" />
            <!--end::Svg Icon-->
          </span>
          <span class="menu-text">Disputes</span>
        </a>
      </li>
    </router-link>

    <router-link
        :to="{ name: 'categories' }"
        v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
          aria-haspopup="true"
          data-menu-toggle="hover"
          class="menu-item"
          :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <!--          <i class=" flaticon2-expand"></i>-->
          <span class="menu-icon svg-icon svg-icon-lg svg-icon-2x">
            <!--begin::Svg Icon-->
            <inline-svg src="media/svg/icons/Code/Github.svg" />
            <!--end::Svg Icon-->
          </span>
          <span class="menu-text">Service Categories</span>
        </a>
      </li>
    </router-link>

    <router-link
        :to="{ name: 'services' }"
        v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
          aria-haspopup="true"
          data-menu-toggle="hover"
          class="menu-item"
          :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <!--          <i class=" flaticon2-expand"></i>-->
          <span class="menu-icon svg-icon svg-icon-lg svg-icon-2x">
            <!--begin::Svg Icon-->
            <inline-svg src="media/svg/icons/Code/Github.svg" />
            <!--end::Svg Icon-->
          </span>
          <span class="menu-text">Services</span>
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "KTMenu",
  methods: {
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    }
  }
};
</script>
