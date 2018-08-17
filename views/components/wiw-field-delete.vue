<!-- 
Version 1.0.0
Copyright (c) 2018 pilisir.tw@gmail.com
Under MIT Licesne, please go to "https://en.wikipedia.org/wiki/MIT_License" to check license terms.
-->
<template>
    <div class="position-absolute wiw-remove-field wiw-cursor-pointer" @click="removeFiled($event)">
        <icon name="times-circle"></icon>
    </div>
</template>

<script>
    let deleteSimplertParam;

    module.exports = {
        props: [
            'fields',
            'items',
            'type',
            'index'
        ],
        data() {
            return {
                
            }
        },
        created: function() {
            deleteSimplertParam = {
                title: i18n.t('smiplert.delete.title'),
                message: i18n.t('smiplert.delete.message'),
                type: 'warn',
                useConfirmBtn: true,
                customConfirmBtnText: i18n.t('smiplert.delete.confirmBtnText'),
                customConfirmBtnClass: 'btn btn-outline-danger btn-round-sm',
                customCloseBtnText: i18n.t('smiplert.closeBtnText'),
                customCloseBtnClass: 'btn btn-outline-secondary btn-round-sm'
            };
        },
        methods: {
            removeFiled: function(event) {
                if (this.type == 'field') {
                    this.removeCompetitor(event);
                } else {
                    this.removeCompetition(event);
                }
            },
            removeCompetitor: function (event) {
                let currentComponent = this;
                deleteSimplertParam.onConfirm = function() {
                    currentComponent.fields.splice(currentComponent.index, 1);
                };

                hiddenVue.$refs.hiddenComponent.$refs.simplert.openSimplert(deleteSimplertParam);
            },
            removeCompetition: function (event) {
                let currentComponent = this;
                deleteSimplertParam.onConfirm = function() {
                    let item = currentComponent.items[currentComponent.index];
                    Object.keys(item).forEach((key, i) => {
                        if (i == 0) {
                            return true; //continue;
                        }
                        let field = currentComponent.fields[i];
                        let winCount = field.winCount;
                        if (item[key].win === true) {
                            item[key].win = false;
                            --winCount;
                            field.winCount = winCount < 0 ? 0 : winCount;
                        }
                    });

                    currentComponent.items.splice(currentComponent.index, 1);

                };

                hiddenVue.$refs.hiddenComponent.$refs.simplert.openSimplert(deleteSimplertParam);
            }
        }
    }
</script>

<style scoped>
    .wiw-remove-field {
        top: 0;
        right: 5px;
    }
</style>