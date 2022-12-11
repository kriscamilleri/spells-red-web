<template>
    <SlideOverFrame>
        <template v-slot:nav>
            <router-link to="/">
                <h4 class="font-medium">Home</h4>
            </router-link>
        </template>
        <Table :tableData="repositories" header="Repositories" :buttons="buttons" description="A repository is a source of spells. Here you can toggle your
                        active repositories, review repository summaries, or contribute a new repository."></Table>
    </SlideOverFrame>

</template>
  
<script>
import SlideOverFrame from "@/frames/SlideOverFrame.vue";
import Table from "@/components/Table.vue";

export default {
    components: {
        SlideOverFrame,
        Table
    },
    data() {
        return {
            buttons: [{
                text: "Add Repository",
                action: "addRepository",

            },
            {
                text: "Reset",
                action: "resetRepositorySelection"
            }]
        }
    },
    computed: {
        repositories() {
            return this.$store.getters.getRepositories;
        }
    },
    methods: {
        increaseCardSize(id) {
            const card = document.getElementById(id);
            card.classList.add('animated', 'zoomIn');
        }
    },
    created() {
        const token = this.$keycloak.token;
        this.$store.dispatch("fetchRepositories", { token });
    }
}
</script>
  
<style>
.zoomIn {
    animation: zoomIn 0.5s;
}

@keyframes zoomIn {
    from {
        transform: scale(1);
    }

    to {
        transform: scale(1.2);
    }
}
</style>