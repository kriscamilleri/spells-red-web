<template>
    <div class="border p-5 max-w-sm m-2">
        <h3 class="text-xl font-bold mb-1">{{ title }}</h3>
        <span v-for="(field, i) in fields" :key="i">
            <span v-if="field.showLabel" class="inline-block">
                <label class="font-bold">{{ field.label }}&nbsp;</label>
                <span>{{ field.value }}</span>
            </span>
            <label class="font-bold" v-else>{{ field.value }}</label>
            <span v-if="field.seperatorAfter" class="mx-1">|</span>
            <div v-if="field.newLineAfter" class="block"></div>
        </span>
        <slot></slot>
    </div>
</template>
<style scoped>
label {
    display: inline;
}
</style>
<script>
export default {
    methods: {

    },
    props: {
        title: {
            type: String,
            default: 'Name'
        },
        fields: {
            type: Array,
            default: [{
                label: 'Label',
                value: 'Value',
                style: 'blue',
                showLabel: true,
                newLineAfter: false,
                seperatorAfter: true,
            }]
        }
    }
}
</script>