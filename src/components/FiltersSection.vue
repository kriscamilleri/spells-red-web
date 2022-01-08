<template>
    <div v-for="(filter, i) in filters" :key="i">
        <h3>{{ filter.key }}</h3>
        <label v-for="(value, j) in filter.values" :key="j">
            <span>{{ value }}</span>
            <input
                type="radio"
                :name="filter.key"
                :value="value"
                @input="emit($event.target.value, filter.key)"
            />
        </label>
    </div>
</template>
<script>
export default {
    props: {
        filters: {
            type: Array,
            default: [{ key: "", values: [] }]
        }
    },
    methods: {
        emit(event, key) {
            this.$emit('input', {
                key: key,
                value: event
            })
        }
    }
}
</script>