<!-- 
Version 1.0.0
Copyright (c) 2018 pilisir.tw@gmail.com
Under MIT Licesne, please go to "https://en.wikipedia.org/wiki/MIT_License" to check license terms.
-->
<template>
    <div v-html="text" class="w-100" :class="{'text-center': type === 'field', active: editing}" contenteditable="true" :key="text" @focus="contentFocus()" @blur="updateText($event)" @keydown="keydownClear($event)">
    </div>
</template>

<script>
    module.exports = {
        props: [
            'data',
            'text',
            'type',
            'index',
            'fieldKey'
        ],
        data() {
            return {
                editing: false
            }
        },
        methods: {
            updateText: function(event) {
                let content = event.srcElement.innerHTML;
                if (this.type == 'field') {
                    this.updateFieldText(event, content);
                } else {
                    this.updateItemText(event, content);
                }
                this.editing = false;
                hiddenVue.modal = false;
            },
            updateFieldText: function(event, content){
                this.data[this.index].label = content;
            },
            updateItemText: function(event, content){
                this.data[this.index][this.fieldKey].content = content;
            },
            keydownClear: function(event) {
                event.stopPropagation();
            },
            contentFocus: function () {
                hiddenVue.modal = true;
                this.editing = true;
            }
        }
    }
</script>