<!-- 
Version 1.0.0
Copyright (c) 2018 pilisir.tw@gmail.com
Under MIT Licesne, please go to "https://en.wikipedia.org/wiki/MIT_License" to check license terms.
-->
<template>
    <img :class="{active: isWinActive()}" class="position-absolute wiw-cursor-pointer wiw-win-img" @click="toggleWinImg()" :src="winIconSrc">
</template>

<script>
    module.exports = {
        props: [
            'fields',
            'items',
            'index',
            'fieldIndex',
            'fieldKey',
            'winIconSrc'
        ],
        methods: {
            toggleWinImg: function() {
                let item = this.items[this.index];
                item[this.fieldKey].win = !(item[this.fieldKey].win);

                let field = this.fields[this.fieldIndex];
                let winCount = field.winCount;
                if (item[this.fieldKey].win === true) {
                    field.winCount = ++winCount;
                } else {
                    --winCount;
                    field.winCount = winCount < 0 ? 0 : winCount;
                }
            },
            isWinActive: function() {
                let item = this.items[this.index];
                let initWinActive = false;
                let initField = false;
                if (item[this.fieldKey]) {
                    if (typeof item[this.fieldKey].win === 'undefined') {
                        initWinActive = true;
                    }
                } else {
                    initField = true;
                }

                if (this.fieldKey !== 'field0') {
                    if (initWinActive) {
                        this.$set(this.items[this.index][this.fieldKey], 'win',  false);
                    } else if (initField) {
                        this.$set(this.items[this.index], this.fieldKey,  {content: '', win: false});
                    }
                }

                return item[this.fieldKey].win;
            }
        }
    }
</script>

<style scoped>
    .wiw-win-img {
        top: 3px;
        bottom: 0;
        right: 3px;
        margin: 0 auto;
        /* width: 20px; */
        height: 20px;
        -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
        filter: grayscale(100%);
        transition: 0.4s
    }

    .wiw-win-img.active {
        /* width: 25px; */
        height: 25px;
        -webkit-filter: none; /* Safari 6.0 - 9.0 */
        filter: none;
    }
</style>