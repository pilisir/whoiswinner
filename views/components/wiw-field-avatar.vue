<!-- 
Version 1.0.0
Copyright (c) 2018 pilisir.tw@gmail.com
Under MIT Licesne, please go to "https://en.wikipedia.org/wiki/MIT_License" to check license terms.
-->
<template>
    <div class="w-100 text-center">
        <div class="w-100 mt-2 position-relative">
            <img class="position-absolute wiw-winner-img" :class="{active: isWinnerActive()}" :src="winnerIconSrc">
            <img class="wiw-avatar-img wiw-cursor-pointer rounded-circle border border-secondary" :src="field.avatar.src"  @click="clickAvatar($event)">
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: [
            'fields',
            'field',
            'index',
            'winnerIconSrc',
            'avatarUploadIndex'
        ],
        data() {
            return {
                
            }
        },
        methods: {
            isWinnerActive: function() {
                let fieldsWinCount = [];
                this.fields.forEach(eachField => {
                    if (typeof eachField.winCount !== 'undefined') {
                        fieldsWinCount.push(eachField.winCount);
                    }
                });

                let currentFiledWinCount = this.fields[this.index].winCount
                let isWinner = Math.max(...fieldsWinCount) == currentFiledWinCount;
                return isWinner && currentFiledWinCount;
            },
            clickAvatar: function(event) {
                this.$emit("update:avatarUploadIndex", this.index);
                document.getElementById('wiw-avatar-upload-btn').click();
            }
        }
    }
</script>

<style scoped>
    .wiw-avatar-img {
        width: 64px;
        height: 64px;
    }

    .wiw-winner-img {
        top: -20px;
        bottom: 0;
        left: 45px;
        right: 0;
        margin: 0 auto;
        /* width: 0px; */
        height: 0px;
        transform: rotate(20deg);
        transition: 0.4s cubic-bezier(0, 0.01, 0.71, 2.02);
        opacity: 0;
    }

    .wiw-winner-img.active {
        /* width: 40px; */
        height: 40px;
        opacity: 1;
    }
</style>