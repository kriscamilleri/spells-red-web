<template>
    <nav class="p-5 flex justify-between">
        <router-link to="/" class="font-bold">Sidebar</router-link>
        <router-link to="/" class="font-bold">Spells.Red</router-link>
    </nav>
    <hr />
    <div class="p-5">
        <slot></slot>
    </div>
</template>