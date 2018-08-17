/* 
Version 1.0.0
Copyright (c) 2018 pilisir.tw@gmail.com
Under MIT Licesne, please go to "https://en.wikipedia.org/wiki/MIT_License" to check license terms.
 */
const messages = {
    zh_TW: zhTW,
    zh_CN: zhCN,
    en_US: enUS
};

const i18n = new VueI18n({
    locale: 'zh_TW',
    messages
});

const userImageDefaultSrc = 'public/image/user.png';
const winnerImageDefaultSrc = 'public/image/crown.png';

let navbarVue;
let mainLayoutVue;
let hiddenVue;

let tableWidthDefaultSize = 'wiw-td-size';
let tableColumnPosition = 'position-relative';
let tableColumnClass = `${tableColumnPosition} ${tableWidthDefaultSize}`;
let modalActive = false;
let themeVariant = {
    navbar: 'dark',
    navbarType: 'dark',
    normal: 'secondary',
    outline: 'outline-secondary'
};
let themeObjectArray = [
    {
        label: "theme.label.secondary",
        variant: {
            navbar: 'dark',
            navbarType: 'dark',
            normal: 'secondary',
            outline: 'outline-secondary'
        } 
    },
    {
        label: "theme.label.primary",
        variant: {
            navbar: 'primary',
            navbarType: 'dark',
            normal: 'primary',
            outline: 'outline-primary'
        } 
    },
    {
        label: "theme.label.success",
        variant: {
            navbar: 'success',
            navbarType: 'dark',
            normal: 'success',
            outline: 'outline-success'
        } 
    },
    {
        label: "theme.label.info",
        variant: {
            navbar: 'info',
            navbarType: 'dark',
            normal: 'info',
            outline: 'outline-info'
        } 
    },
    {
        label: "theme.label.warning",
        variant: {
            navbar: 'warning',
            navbarType: 'light',
            normal: 'warning',
            outline: 'outline-warning'
        } 
    },
    {
        label: "theme.label.danger",
        variant: {
            navbar: 'danger',
            navbarType: 'dark',
            normal: 'danger',
            outline: 'outline-danger'
        } 
    }
];
let langObjectArray = [
    {
        label: '繁體中文',
        key: 'zh_TW'
    },
    {
        label: '简体中文',
        key: 'zh_CN'
    },
    {
        label: 'English',
        key: 'en_US'
    }
];
document.addEventListener("DOMContentLoaded", function(event) {
    initApp();
    initComponent();
});

function initComponent(){
    Vue.component('icon', VueAwesome);

    let tableFields = [
        {
            key : 'field0',
            label : i18n.t('table.field.default.none'),
            thClass:  tableWidthDefaultSize,
            tdClass:  tableColumnClass,
            formatter: 'contentFormatter'
        },
        {
            key : 'field1',
            label: i18n.t('table.field.default.main'),
            thClass:  tableWidthDefaultSize,
            tdClass:  tableColumnClass,
            formatter: 'contentFormatter',
            avatar: {
                src: userImageDefaultSrc
            },
            winCount: 0
        },
        {
            key : 'field2',
            label: i18n.t('table.field.default.opponent'),
            thClass:  tableWidthDefaultSize,
            tdClass:  tableColumnClass,
            formatter: 'contentFormatter',
            avatar: {
                src: userImageDefaultSrc
            },
            winCount: 0
        }
    ];

    const tableItems = [
        {
            field0: {
                content: i18n.t('table.row.default.new'),
                win: false
            }
        }
    ];

    navbar = new Vue({
        el: "#wiw-main-navbar",
        i18n,
        data: {
            themeVariant: themeVariant,
            themeObjectArray: themeObjectArray,
            langObjectArray: langObjectArray,
            preview: false
        },
        methods: {
            previewResultModal: function() {
                this.preview = true;
                hiddenVue.$refs.hiddenComponent.$refs.previewResultModal.show();
            },
            tableConfigModal: function() {
                hiddenVue.$refs.hiddenComponent.$refs.tableModal.show();
            },
            winnerIconModal: function() {
                hiddenVue.$refs.hiddenComponent.$refs.winnerIconModal.show();
            },
            themeChange: function(index) {
                themeVariant.navbar = themeObjectArray[index].variant.navbar;
                themeVariant.navbarType = themeObjectArray[index].variant.navbarType;
                themeVariant.normal = themeObjectArray[index].variant.normal;
                themeVariant.outline = themeObjectArray[index].variant.outline;
            },
            langChange: function(index) {
                let locale = langObjectArray[index].key;
                i18n.locale = locale;
                hiddenVue.$refs.hiddenComponent.tableWidthSizeOption[0].text = i18n.t('modal.tableConfig.tableWidth.size.lg');
                hiddenVue.$refs.hiddenComponent.tableWidthSizeOption[1].text = i18n.t('modal.tableConfig.tableWidth.size.def');
                hiddenVue.$refs.hiddenComponent.tableWidthSizeOption[2].text = i18n.t('modal.tableConfig.tableWidth.size.sm');
                hiddenVue.$refs.hiddenComponent.winnerIconOption[0].text = i18n.t('modal.winnerIconConfig.options.default');
                hiddenVue.$refs.hiddenComponent.winnerIconOption[1].text = i18n.t('modal.winnerIconConfig.options.upload');
                hiddenVue.$refs.hiddenComponent.winnerIconOption[2].text = i18n.t('modal.winnerIconConfig.options.url');
                document.title = i18n.t('nav.title');
            }
        },
        watch: {
            preview: function(val) {
                if (val == false) {
                    return;
                }
                mainLayoutVue.preview = true;

                let node = document.getElementById('wiw-main-layout');
                html2canvas(node).then(function(canvas) {
                    let previewWrapper = document.getElementById('wiw-preview-wrapper');
                    previewWrapper.innerHTML = '';
                    previewWrapper.appendChild(canvas);

                    mainLayoutVue.preview = false;
                    navbar.preview = false;
                });
            }
        }
    });

    mainLayoutVue = new Vue({
        el: "#wiw-main-layout",
        i18n,
        data: {
            themeVariant: themeVariant,
            fields: tableFields,
            items: tableItems,
            avatarUploadIndex: 0,
            winnerIconSrc: winnerImageDefaultSrc,
            winIconSrc: winnerImageDefaultSrc,
            alertEditing: false,
            noteEditing: false,
            preview: false
        },
        methods: {
            contentFormatter: function(value) {
                if (typeof value === 'undefined' || typeof value.content === 'undefined') {
                    return '';
                }
                return value.content;
            },
            titleFocus: function() {
                hiddenVue.modal = true;
                this.alertEditing = true;
            },
            titleBlur: function() {
                hiddenVue.modal = false;
                this.alertEditing = false;
            },
            noteFocus: function() {
                hiddenVue.modal = true;
                this.noteEditing = true;
            },
            noteBlur: function() {
                hiddenVue.modal = false;
                this.noteEditing = false;
            }

        },
        components: {
            'wiw-field-avatar': httpVueLoader('views/components/wiw-field-avatar.vue'),
            'wiw-field-delete': httpVueLoader('views/components/wiw-field-delete.vue'),
            'wiw-field-content': httpVueLoader('views/components/wiw-field-content.vue'),
            'wiw-item-win': httpVueLoader('views/components/wiw-item-win.vue')
        }
    });

    new Vue({
        el: "#wiw-footer-navbar",
        i18n,
        data: {
            themeVariant: themeVariant,
            competitorIndex: 2
        },
        methods: {
            addCompetition: function (event) {
                var newRowData = {
                    field0: {
                        content: i18n.t('table.row.default.new'),
                        win: false
                    }
                };
                mainLayoutVue.items.push(newRowData);
            },
            addCompetitor: function (event) {
                this.competitorIndex++;
                var newColumnData = {
                    key : 'field' + this.competitorIndex,
                    label : i18n.t('table.field.default.challenger'),
                    thClass:  tableWidthDefaultSize,
                    tdClass:  tableColumnClass,
                    formatter: 'contentFormatter',
                    avatar: {
                        src: userImageDefaultSrc
                    },
                    winCount: 0
                }
                mainLayoutVue.fields.push(newColumnData);
            }
        }
    });

    hiddenVue = new Vue({
        el: "#wiw-hidden-component",
        i18n,
        data: {
            themeVariant: themeVariant,
            fields: mainLayoutVue.fields,
            modal: modalActive
        },
        components: {
            'wiw-hidden-component': httpVueLoader('views/components/wiw-hidden-component.vue')
        }
    });
}

function initApp() {
    let locael = 'en_US';
    let language = navigator.language || navigator.userLanguage; 
    if ('zh-TW' === language) {
        locael = 'zh_TW';
    } else if ('zh-CN' === language) {
        locael = 'zh_CN';
    }

    i18n.locale = locael;
    document.title = i18n.t('nav.title');
    window.onbeforeunload = wiwConfirmExit;
    
}

function wiwConfirmExit() {
    return i18n.t('exit.confirm');
}