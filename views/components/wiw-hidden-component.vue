<!-- 
Version 1.0.0
Copyright (c) 2018 pilisir.tw@gmail.com
Under MIT Licesne, please go to "https://en.wikipedia.org/wiki/MIT_License" to check license terms.
-->
<template>
    <div>
        <div id="wiw-opacity-layer" :class="{'active': modal}"></div>
        <input id="wiw-avatar-upload-btn" type="file" class="d-none" @change="uploadAvatar($event)">
        <b-modal id="wiw-imgur-result-modal" ref="imgurResultModal" size="lg" centered>
            <template slot="modal-title">
                {{$t("button.preview.publish")}}
            </template>
            <div slot="modal-footer" class="w-100">
                <b-btn class="float-right" :variant="themeVariant.outline" @click="closeImgurReview">
                    {{$t("button.base.close")}}
                </b-btn>
                <span class="float-right">&nbsp;</span>
                <b-btn class="float-right wiw-copy" :variant="themeVariant.normal" @click="copyImgurPath">
                    {{$t("button.imgur.copy")}}
                </b-btn>
            </div>
            <div id="wiw-imgur-wrapper">
                <div>
                    <b-img :src="imgurLink" fluid/>
                </div>
                <div>
                    <b-link :href="imgurLink" target="_blank">{{imgurLink}}</b-link>
                </div>
                <input id="wiw-imgur-copy-text" v-model="imgurLink" class="imgur-copy-text">
            </div>
        </b-modal>
        <b-modal id="wiw-preview-result-modal" ref="previewResultModal" size="lg" centered>
            <template slot="modal-title">
                {{$t("nav.button.preview")}}
            </template>
            <div slot="modal-footer" class="w-100">
                <b-btn class="float-right" :variant="themeVariant.outline" @click="closePreview">
                    {{$t("button.base.close")}}
                </b-btn>
                <span class="float-right">&nbsp;</span>
                <b-btn class="float-right" :variant="themeVariant.outline" @click="downloadCanvas">
                    {{$t("button.preview.download")}}
                </b-btn>
                <span class="float-right">&nbsp;</span>
                <b-btn class="float-right" :variant="themeVariant.normal" @click="publishToImgur">
                    {{$t("button.preview.publish")}}
                </b-btn>
            </div>
            <div id="wiw-preview-wrapper">
            </div>
        </b-modal>
        <b-modal id="wiw-table-config-modal" ref="tableModal" centered ok-only :ok-variant="themeVariant.outline">
            <template slot="modal-title">
                {{$t("modal.tableConfig.title")}}
            </template>
            <template slot="modal-ok">
                {{$t("button.base.close")}}
            </template>
            <b-form-group :label="$t('modal.tableConfig.tableWidth.label.competitor')">
                <b-form-radio-group 
                    buttons 
                    :button-variant="themeVariant.normal" 
                    size="sm" 
                    v-model="competitorWidthSizeOptionSelect" 
                    :options="tableWidthSizeOption" 
                    name="competitorWidthSizeRadio" 
                    @input="competitorWidthSizeChange"/>
            </b-form-group>
            <b-form-group :label="$t('modal.tableConfig.tableWidth.label.competition')">
                <b-form-radio-group 
                    buttons 
                    :button-variant="themeVariant.normal" 
                    size="sm" 
                    v-model="competitionWidthSizeOptionSelect" 
                    :options="tableWidthSizeOption" 
                    name="competitionWidthSizeRadio" 
                    @input="competitionWidthSizeChange"/>
            </b-form-group>
        </b-modal>
        <b-modal id="wiw-winner-icon-modal" ref="winnerIconModal" centered ok-only :ok-variant="themeVariant.outline">
            <template slot="modal-title">
                {{$t("modal.winnerIconConfig.title")}}
            </template>
            <template slot="modal-ok">
                {{$t("button.base.close")}}
            </template>
            <b-form-group :label="$t('modal.winnerIconConfig.winner.label')">
                <b-form-radio-group 
                    buttons 
                    :button-variant="themeVariant.normal" 
                    size="sm" 
                    v-model="winnerIconOptionSelect" 
                    :options="winnerIconOption" 
                    name="winnerIconRadio" 
                    @input="winnerIconChange"/>
            </b-form-group>
            <b-row>
                <b-col md="2" class="pb-2">
                    <img class="wiw-icon-preview" :src="winnerIconSrc">
                </b-col>
                <b-col md="10">
                    <input type="file" v-if="winnerIconOptionSelect == 'upload'" @change="winnerIconUpload($event)">
                    <b-form @submit="winnerIconUrlSubmit" v-if="winnerIconOptionSelect == 'url'">
                        <b-input-group v-if="winnerIconOptionSelect == 'url'" size="sm">
                            <b-form-input type="url" :pattern="winIconUrlPattern" :placeholder="iconUrlPattern" required></b-form-input>
                            <b-input-group-append>
                                <b-btn type ="submit" size="sm" :variant="themeVariant.outline" class="btn-round-sm">{{$t("button.base.ok")}}</b-btn>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form>
                </b-col>
            </b-row>
            <b-form-group :label="$t('modal.winnerIconConfig.win.label')">
                <b-form-radio-group 
                    buttons 
                    :button-variant="themeVariant.normal" 
                    size="sm" 
                    v-model="winIconOptionSelect" 
                    :options="winnerIconOption" 
                    name="winIconRadio" 
                    @input="winIconChange"/>
            </b-form-group>
            <b-row>
                <b-col md="2">
                    <img class="wiw-icon-preview" :src="winIconSrc">
                </b-col>
                <b-col md="10">
                    <input type="file" v-if="winIconOptionSelect == 'upload'" @change="winIconUpload($event)">
                    <b-form @submit="winIconUrlSubmit" v-if="winIconOptionSelect == 'url'">
                        <b-input-group v-if="winIconOptionSelect == 'url'" size="sm">
                            <b-form-input type="url" :pattern="winIconUrlPattern" :placeholder="iconUrlPattern" required></b-form-input>
                            <b-input-group-append>
                                <b-btn type ="submit" size="sm" :variant="themeVariant.outline" class="btn-round-sm">{{$t("button.base.ok")}}</b-btn>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form>
                </b-col>
            </b-row>
        </b-modal>
        <b-modal id="wiw-about-modal" ref="aboutModal" style="text-overflow: ellipsis;overflow: hidden;" class="w-100" centered ok-only :ok-variant="themeVariant.outline">
            <template slot="modal-title">
                {{$t("modal.about.title")}}
            </template>
            <template slot="modal-ok">
                {{$t("button.base.close")}}
            </template>
            <div id="wiw-about-wrapper">
                <span class="font-weight-bold">
                    {{$t("modal.about.author")}}
                </span>
                <hr>
                <b-row>
                    <b-col cols="12">
                        {{wiwAuthor.name}}
                    </b-col>
                    <b-col cols="12">
                        <b-link :href="'mailto:' + wiwAuthor.email">{{wiwAuthor.email}}</b-link>
                    </b-col>
                    <b-col cols="12">
                        <b-link :href="wiwAuthor.github" target="_blank">{{wiwAuthor.github}}</b-link>
                    </b-col>
                </b-row>
                <br>
                <span class="font-weight-bold">
                    {{$t("modal.about.lib")}}
                </span>
                <hr>
                <b-row>
                    <b-col cols="12" v-for="lib in libList" :key="lib.label">
                        <b-link :href="lib.url" target="_blank">{{lib.label}}</b-link>
                    </b-col>
                </b-row>
                <br>
                <span class="font-weight-bold">
                    {{$t("modal.about.image")}}
                </span>
                <hr>
                <b-row>
                    <b-col cols="12" v-for="image in libImageList" :key="image.label">
                        <b-img class="wiw-icon-preview" :src="image.local"></b-img>
                        <span> <span>
                        <b-link :href="image.url" target="_blank">{{image.license}}</b-link>
                    </b-col>
                </b-row>
            </div>
        </b-modal>
        <simplert id="wiw-simplert" :useRadius="true" :useIcon="true" ref="simplert"></simplert>
    </div>
</template>

<script>
    const winIconUrlPattern = 'https?://.+.(?:[pP][nN][gG])$'; // *.png ignore case
    const iconUrlPattern = 'https://example.com/win.png';
    const uploadFileRegExp = new RegExp(/.(?:png)$/, 'i');
    let tableWidthSizeOption, winnerIconOption;
    const libList = [
        {
            label: 'Vue.js',
            url: 'https://vuejs.org/'
        },
        {
            label: 'Bootstrap Vue',
            url: 'https://bootstrap-vue.js.org/'
        },
        {
            label: 'Vue i18n',
            url: 'https://kazupon.github.io/vue-i18n/'
        },
        {
            label: 'Vue-Awesome',
            url: 'https://justineo.github.io/vue-awesome/demo/'
        },
        {
            label: 'vue2-simplert',
            url: 'https://vue2-simplert.gitbook.io/docs/'
        },
        {
            label: 'html2canvas',
            url: 'https://html2canvas.hertzen.com/'
        },
        {
            label: 'FileSaver.js',
            url: 'https://github.com/eligrey/FileSaver.js/'
        },
        {
            label: 'Outdated Browser',
            url: 'http://outdatedbrowser.com/'
        }
    ];

    const libImageList =[
        {
            local: userImageDefaultSrc,
            url: 'https://www.iconfinder.com/icons/2875606/crown_hat_king_layer_photo_royal_royalty_icon',
            license: 'CC BY-SA 3.0'
        },
        {
            local: winnerImageDefaultSrc,
            url: 'https://www.iconfinder.com/icons/216498/user_icon',
            license: 'CC BY-NC 3.0'
        }
    ];

    module.exports = {
        props: [
            'fields',
            'modal',
            'themeVariant'
        ],
        data() {
            return {
                wiwAuthor: wiwAuthor,
                libList: libList,
                libImageList: libImageList,
                tableWidthSizeOption: [],
                competitorWidthSizeOptionSelect: 'wiw-td-size',
                competitionWidthSizeOptionSelect: 'wiw-td-size',
                winnerIconOption: [],
                winnerIconOptionSelect: 'default',
                winIconOptionSelect: 'default',
                winnerIconSrc: winnerImageDefaultSrc,
                winIconSrc: winnerImageDefaultSrc,
                winIconUrlPattern: winIconUrlPattern,
                iconUrlPattern: iconUrlPattern,
                imgurLink: ''
            }
        },
        created: function() {
            tableWidthSizeOption = [
                { text: i18n.t('modal.tableConfig.tableWidth.size.lg'), value: 'wiw-td-size-lg' },
                { text: i18n.t('modal.tableConfig.tableWidth.size.def'), value: 'wiw-td-size' },
                { text: i18n.t('modal.tableConfig.tableWidth.size.sm'), value: 'wiw-td-size-sm' }
            ];

            winnerIconOption = [
                { text: i18n.t('modal.winnerIconConfig.options.default'), value: 'default' },
                { text: i18n.t('modal.winnerIconConfig.options.upload'), value: 'upload' },
                { text: i18n.t('modal.winnerIconConfig.options.url'), value: 'url' }
            ];

            this.tableWidthSizeOption = tableWidthSizeOption;
            this.winnerIconOption = winnerIconOption;
        },
        methods: {
            uploadAvatar: function(event) {
                let avatarImg = event.currentTarget;
                let fileReader = new FileReader();

                fileReader.addEventListener("load", function(e) {
                    mainLayoutVue.fields[mainLayoutVue.avatarUploadIndex].avatar.src = e.target.result;
                    document.getElementById('wiw-avatar-upload-btn').value = '';
                }); 

                try {
                    fileReader.readAsDataURL(avatarImg.files[0]);  
                } catch (err) {
                }
            },
            competitorWidthSizeChange: function() {
                tableWidthDefaultSize = this.competitorWidthSizeOptionSelect;
                tableColumnClass = `${tableColumnPosition} ${this.competitorWidthSizeOptionSelect}`;
                for (let k in this.fields) {
                    if (k == 0) {
                        continue;
                    }
                    this.fields[k].thClass = `${this.competitorWidthSizeOptionSelect}`;
                    this.fields[k].tdClass = tableColumnClass;
                }
            },
            competitionWidthSizeChange: function() {
                this.fields[0].thClass = `${this.competitionWidthSizeOptionSelect}`;
                this.fields[0].tdClass = `${tableColumnPosition} ${this.competitionWidthSizeOptionSelect}`;
            },
            winnerIconChange: function() {
                if (this.winnerIconOptionSelect == 'default') {
                    this.winnerIconSrc = winnerImageDefaultSrc;
                    mainLayoutVue.winnerIconSrc = winnerImageDefaultSrc;
                } 
            },
            winnerIconUrlSubmit: function(event) {
                event.preventDefault();
                let currentForm = event.currentTarget;
                let inputUrl = currentForm.querySelector('input[type="url"]').value;

                this.winnerIconSrc = inputUrl;
                mainLayoutVue.winnerIconSrc = inputUrl;
            },
            winnerIconUpload: function (event) {
                let uploadInput = event.currentTarget;

                if (!uploadFileRegExp.test(uploadInput.value)) {
                    uploadInput.value = '';
                    return;
                }
                
                let currentVue = this;
                let fileReader = new FileReader();

                fileReader.addEventListener("load", function(e) {
                    currentVue.winnerIconSrc = e.target.result;
                    mainLayoutVue.winnerIconSrc = e.target.result;
                    uploadInput.value = '';
                }); 

                try {
                    fileReader.readAsDataURL(uploadInput.files[0]);  
                } catch (err) {
                }
            },
            winIconChange: function() {
                if (this.winIconOptionSelect == 'default') {
                    this.winIconSrc = winnerImageDefaultSrc;
                    mainLayoutVue.winIconSrc = winnerImageDefaultSrc;
                } 
            },
            winIconUrlSubmit: function(event) {
                event.preventDefault();
                let currentForm = event.currentTarget;
                let inputUrl = currentForm.querySelector('input[type="url"]').value;

                this.winIconSrc = inputUrl;
                mainLayoutVue.winIconSrc = inputUrl;
            },
            winIconUpload: function(event) {
                let uploadInput = event.currentTarget;

                if (!uploadFileRegExp.test(uploadInput.value)) {
                    uploadInput.value = '';
                    return;
                }
                
                let currentVue = this;
                let fileReader = new FileReader();

                fileReader.addEventListener("load", function(e) {
                    currentVue.winIconSrc = e.target.result;
                    mainLayoutVue.winIconSrc = e.target.result;
                    uploadInput.value = '';
                }); 

                try {
                    fileReader.readAsDataURL(uploadInput.files[0]);  
                } catch (err) {
                }
            },
            downloadCanvas: function() {
                let canvas = document.querySelector("#wiw-preview-wrapper canvas"), ctx = canvas.getContext("2d");
                canvas.toBlob(function(blob) {
                    saveAs(blob, "whoiswinner.png");
                });
            },
            closePreview: function() {
                this.$refs.previewResultModal.hide();
            },
            closeImgurReview: function() {
                this.$refs.imgurResultModal.hide();
            },
            publishToImgur: function() {
                // hiddenVue.modal = true;
                this.updatePropsModal(true);

                let canvas = document.querySelector("#wiw-preview-wrapper canvas");
                let base64Image = canvas.toDataURL();
                let base64ImageArray = base64Image.split(';base64,');
                let params = new FormData();
                params.append('image', base64ImageArray[1]);

                fetch("https://api.imgur.com/3/image",
                    {
                        headers : {
                            Authorization: "Client-ID f90db03be2020a2"
                        },
                        method: 'POST',
                        body: params
                    }
                ).then(function(response) {
                    return response.json();
                }).then(function(jsonResponse) {
                    hiddenVue.$refs.hiddenComponent.$refs.previewResultModal.hide();
                    let link = jsonResponse.data.link;
                    // let link = 'https://i.imgur.com/BVzArat.png';

                    hiddenVue.$refs.hiddenComponent.imgurLink = link;
                    hiddenVue.$refs.hiddenComponent.$refs.imgurResultModal.show();
                    hiddenVue.modal = false;
                });
            },
            updatePropsModal: function(val) {
                this.$emit('update:modal', val);
            },
            copyImgurPath: function () {
                // https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios
                let copyTextInput = document.getElementById('wiw-imgur-copy-text');
                if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
                    let el = copyTextInput;
                    let editable = el.contentEditable;
                    let readOnly = el.readOnly;
                    el.contentEditable = true;
                    el.readOnly = false;
                    let range = document.createRange();
                    range.selectNodeContents(el);
                    let sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                    el.setSelectionRange(0, 999999);
                    el.contentEditable = editable;
                    el.readOnly = readOnly;
                } else {
                    copyTextInput.select();
                }
                document.execCommand('copy');
                copyTextInput.blur();
            }
        }
    }
</script>

<style scoped>
    img.wiw-icon-preview {
        /* width:25px; */
        height:25px;
    }

    .simplert {
        z-index: 9999;
    }

    #wiw-opacity-layer {
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        opacity: 0;
        background-color:#000;
        z-index: 9999;
        transition: 0.5s;
        visibility: hidden;
    }

    #wiw-opacity-layer.active {
        opacity:0.5;
        visibility: visible;
    }
</style>