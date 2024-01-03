<script setup>
import { computed } from 'vue';

const props = defineProps({
	user: {
		type: Object,
		default() {
			return {
				name: {
					title: '',
					first: 'unknown name',
					last: '',
				},
				email: 'unknown email',
				picture: {
					large: '',
					medium: '',
					thumbnail: '',
				},
			};
		},
	},
});

const fullName = computed(() => {
	return `${props.user.name.title} ${props.user.name.first} ${props.user.name.last}`;
});
</script>

<template>
  <figure class="flex gap-3 px-4 py-2 hover:bg-blue-400 hover:text-black dark:text-white">
    <img
      :src="user.picture.medium"
      alt="avatar"
      width="100"
      height="100"
      onerror="this.onerror=null;this.src = '/emcd-task/default_avatar.svg'"
      class="cursor-pointer rounded-md transition hover:scale-110"
    >
    <figcaption class="ju flex flex-col gap-3">
      <span
        class="max-w-56 truncate text-lg font-semibold md:max-w-min"
        :title="fullName"
      >
        {{ fullName }}
      </span>
      <a
        :href="`mailto:${user.email}`"
        class="max-w-56 truncate underline md:max-w-min"
        :title="user.email"
      >
        {{ user.email }}
      </a>
    </figcaption>
  </figure>
</template>
