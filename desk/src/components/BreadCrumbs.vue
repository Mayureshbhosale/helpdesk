<template>
  <div class="flex min-w-0 items-center text-ellipsis whitespace-nowrap">
    <template v-for="(item, i) in items" :key="item.label">
      <router-link
        class="flex items-center rounded px-0.5 py-1 text-lg font-medium text-gray-600 transition-all duration-300 ease-in-out first:pl-0 last:text-gray-900 hover:text-gray-700 last:hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
        :to="item.route || ''"
      >
        <slot name="prefix" :item="item" />
        <span>{{ item.label }}</span>
      </router-link>
      <span v-if="i != items.length - 1" class="mx-0.5 text-base text-gray-500">
        /
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
interface Item {
  label: string;
  route: string;
}

interface P {
  items: Item[];
}

defineProps<P>();
</script>
