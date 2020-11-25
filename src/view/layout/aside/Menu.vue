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
          <span class="menu-text">
            {{ $t("Dashboard") }}
          </span>
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
          <span class="menu-text">
            {{ $t("Disputes") }}
          </span>
        </a>
      </li>
    </router-link>

    <li
      aria-haspopup="true"
      data-menu-toggle="hover"
      class="menu-item menu-item-submenu"
      v-bind:class="{
        'menu-item-open': hasActiveChildren('/services')
      }"
    >
      <a href="#" class="menu-link menu-toggle">
        <!--          <i class=" flaticon2-expand"></i>-->
        <span class="menu-icon svg-icon svg-icon-lg svg-icon-2x">
          <!--begin::Svg Icon-->
          <inline-svg src="media/svg/icons/Shopping/Box2.svg" />
          <!--end::Svg Icon-->
        </span>
        <span class="menu-text">
          {{ $t("Services") }}
        </span>
        <i class="menu-arrow"></i>
      </a>
      <div class="menu-submenu">
        <span class="menu-arrow"></span>
        <ul class="menu-subnav">
          <li aria-haspopup="true" class="menu-item menu-item-parent">
            <span class="menu-link">
              <span class="menu-text"></span>
            </span>
          </li>

          <router-link
            :to="{ name: 'services-categories' }"
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
                <i class="menu-bullet menu-bullet-dot">
                  <span></span>
                </i>
                <span class="menu-text">
                  {{ $t("Categories") }}
                </span>
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
                <i class="menu-bullet menu-bullet-dot">
                  <span></span>
                </i>
                <span class="menu-text">
                  {{ $t("Services") }}
                </span>
              </a>
            </li>
          </router-link>
        </ul>
      </div>
    </li>

    <li
      aria-haspopup="true"
      data-menu-toggle="hover"
      class="menu-item menu-item-submenu"
      v-bind:class="{
        'menu-item-open': hasActiveChildren('/refund')
      }"
    >
      <a href="#" class="menu-link menu-toggle">
        <!--          <i class=" flaticon2-expand"></i>-->
        <span class="menu-icon svg-icon svg-icon-lg svg-icon-2x">
          <!--begin::Svg Icon-->
          <inline-svg src="media/svg/icons/Communication/Outgoing-box.svg" />
          <!--end::Svg Icon-->
        </span>
        <span class="menu-text">
          {{ $t("Refunds") }}
        </span>
        <i class="menu-arrow"></i>
      </a>
      <div class="menu-submenu">
        <span class="menu-arrow"></span>
        <ul class="menu-subnav">
          <li aria-haspopup="true" class="menu-item menu-item-parent">
            <span class="menu-link">
              <span class="menu-text"></span>
            </span>
          </li>

          <router-link
            :to="{ name: 'refund-ways' }"
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
                <i class="menu-bullet menu-bullet-dot">
                  <span></span>
                </i>
                <span class="menu-text">
                  {{ $t("Ways") }}
                </span>
              </a>
            </li>
          </router-link>

          <router-link
            :to="{ name: 'refunds' }"
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
                <i class="menu-bullet menu-bullet-dot">
                  <span></span>
                </i>
                <span class="menu-text">
                  {{ $t("Refunds") }}
                </span>
              </a>
            </li>
          </router-link>
        </ul>
      </div>
    </li>

    <router-link
      :to="{ name: 'accounts' }"
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
            <inline-svg src="media/svg/icons/General/Smile.svg" />
            <!--end::Svg Icon-->
          </span>
          <span class="menu-text">
            {{ $t("Accounts") }}
          </span>
        </a>
      </li>
    </router-link>

    <router-link
      :to="{ name: 'parameters' }"
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
            <inline-svg src="media/svg/icons/General/Settings-1.svg" />
            <!--end::Svg Icon-->
          </span>
          <span class="menu-text">
            {{ $t("Parameters") }}
          </span>
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
