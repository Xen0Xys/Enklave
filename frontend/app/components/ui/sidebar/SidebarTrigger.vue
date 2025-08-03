<script setup lang="ts">
import type {HTMLAttributes} from "vue";
import {Button} from "@/components/ui/button";
import {useSidebar} from "./utils";
import {cn} from "~/lib/utils";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();

const {toggleSidebar, open} = useSidebar();
</script>

<template>
    <Button
        data-sidebar="trigger"
        data-slot="sidebar-trigger"
        variant="ghost"
        size="icon"
        :class="cn(props.class)"
        @click="toggleSidebar">
        <Icon v-if="open" name="iconoir:sidebar-collapse" />
        <Icon v-else name="iconoir:sidebar-expand" />
        <span class="sr-only">Toggle Sidebar</span>
    </Button>
</template>
