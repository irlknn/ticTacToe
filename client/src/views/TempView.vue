<template>
    <div class="about">
        <h1>This is my page</h1>

    </div>
    <div class="grid">
        <div style=" background-color: rgb(110, 110, 110); width: 100%; height: 100px;"></div>
        <div style=" background-color: rgb(110, 110, 110); width: 100%; height: 100px;"></div>
        <div style=" background-color: rgb(110, 110, 110); width: 100%; height: 100px;"></div>
        <div style=" background-color: rgb(110, 110, 110); width: 100%; height: 100px;"></div>
        <div style=" background-color: rgb(110, 110, 110); width: 100%; height: 100px;"></div>
        <div style=" background-color: rgb(110, 110, 110); width: 100%; height: 100px;"></div>
        <div style=" background-color: rgb(110, 110, 110); width: 100%; height: 100px;"></div>
        <div style=" background-color: rgb(110, 110, 110); width: 100%; height: 100px;"></div>
        <div style=" background-color: rgb(110, 110, 110); width: 100%; height: 100px;"></div>
    </div>
</template>

<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }

}

.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 4px;
    grid-row-gap: 4px;

    /* gap: 2rem; */
    background-color: rgba(218, 218, 218, 0.759);

}
</style>
