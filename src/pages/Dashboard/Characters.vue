<template>
    <div>
        <div class="py-20 px-40">
            <div class="row">
                <div class="col">
                    <h4 class="mb-10">{{ $t('glossaries.add_character') }}</h4>
                </div>
            </div>

            <rs-form :submit="addCharacter" @errors="setFormErrors($event)">
                <div class="row">
                    <div class="col-sm">
                        <rs-input inputLang="en"
                                  :label="$t('glossaries.name')"
                                  name="name"
                                  v-model="fields.name"
                                  :rules="fields.rules.name"/>
                        <span class="text-danger">{{ getInputError('name') }}</span>
                    </div>
                    <div class="col-sm">
                        <rs-input inputLang="en"
                                  :label="$t('glossaries.id')"
                                  name="id"
                                  :keypress="onlyIntNumber"
                                  v-model="fields.id"
                                  :rules="fields.rules.id"/>
                        <span class="text-danger">{{ getInputError('id') }}</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <rs-button type="submit" glow solid :loading="adding">{{ $t('glossaries.add') }}</rs-button>
                    </div>
                </div>
            </rs-form>
        </div>

        <hr style="border: none; border-top: solid 1px #fff3">

        <rs-form :submit="updateCharacter" @errors="setFormErrors($event, 'character')">
            <rs-modal classModel="p-30 text-center" v-model="modals.character.visibility">
                <h4 class="mb-20">{{ $t('glossaries.update_character')}}</h4>
                <div class="row">
                    <div class="col-sm pe-0 pe-sm-10 ps-0">
                        <rs-input inputLang="en"
                                  :label="$t('glossaries.name')"
                                  inputClass="text-center"
                                  name="name"
                                  v-model="modals.character.fields.name"
                                  :rules="modals.character.fields.rules.name"/>
                        <span class="text-danger">{{ getInputError('name') }}</span>
                    </div>
                    <div class="col-sm pe-0 ps-0 ps-sm-10">
                        <rs-input inputLang="en"
                                  type="number"
                                  :label="$t('glossaries.id')"
                                  inputClass="text-center"
                                  name="id"
                                  v-model="modals.character.fields.id"
                                  :rules="modals.character.fields.rules.id"/>
                        <span class="text-danger">{{ getInputError('id') }}</span>
                    </div>
                </div>

                <rs-button type="submit" glow solid :loading="modals.character.updating">{{ $t('glossaries.update') }}</rs-button>
            </rs-modal>
        </rs-form>

        <div class="py-20 px-40">
            <h4 class="mb-20">{{ $t('glossaries.characters') }}</h4>
            <template>
                <div v-if="loading" class="py-50">
                    <rs-overlay-loading width="28"/>
                </div>

                <character-item v-else-if="items.length"
                                v-for="(item, index) of items"
                                :key="`character-${index}`"
                                :data="item"
                                :editAction="showUpdateModal"
                                class="d-block"
                                :class="{'border-bottom': index < items.length - 1}"/>

                <div v-else class="py-50 text-center">
                    {{ $t('glossaries.nothing_found') }}
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import {characters, storeCharacter, updateCharacter} from "../../api";
    import i18n from "../../i18n";

    export default {
        name: "Characters",

        title: () => i18n.t('glossaries.dashboard') + ' | ' + i18n.t('glossaries.characters'),

        data: () => ({
            loading: false,
            items: [],

            formErrors: {},

            adding: false,
            fields: {
                id: '',
                name: '',

                rules: {
                    id: 'required|string:digits',
                    name: 'required|string',
                }
            },

            modals: {
                character: {
                    visibility: false,
                    updating: false,
                    id: 0,
                    formErrors: {},

                    fields: {
                        id: 0,
                        name: '',

                        rules: {
                            id: 'required|string:digits',
                            name: 'required|string',
                        }
                    }
                }
            }
        }),

        methods: {
            getItems() {
                if(!this.loading) {
                    this.loading = true;

                    characters()
                        .then(res => {
                            this.items = res.data.result
                        })
                        .catch(err => {})
                        .finally(() => {
                            this.loading = false;
                        })
                }
            },

            // Get errors from "rs-form"-component and set in "formErrors"-data-variable
            setFormErrors(errors, type) {
                if (type) {
                    this.modals[type].formErrors = errors
                } else {
                    this.formErrors = errors
                }
            },

            // Customizing error-message for show in view (below inputs)
            getInputError(key) {
                return (this.formErrors.hasOwnProperty(key)) ? this.formErrors[key][0] : ''
            },

            addCharacter() {
                if(!this.adding) {
                    this.formErrors = {};
                    this.adding = true;

                    storeCharacter(this.fields.id, this.fields.name)
                        .then(res => {
                            this.$toast.success({
                                title: i18n.t('glossaries.add_character'),
                                message: i18n.t('messages.successes.character_was_successfully_added'),
                            });
                            this.fields.id = '';
                            this.fields.name = '';
                            this.getItems();
                        })
                        .catch(err => {
                            this.$toast.error({
                                title: i18n.t('glossaries.add_character'),
                                message: err.response.data.msg,
                            })
                        })
                        .finally(() => {
                            this.adding = false;
                        })
                }
            },

            showUpdateModal(data) {
                this.modals.character.formErrors = {};
                this.modals.character.id = data.id;
                this.modals.character.fields.id = data.id;
                this.modals.character.fields.name = data.name;
                this.modals.character.visibility = true;
            },

            updateCharacter() {
                if (!this.modals.character.updating) {
                    this.modals.character.updating = true;
                    this.modals.character.formErrors = {};
                    updateCharacter(this.modals.character.id, this.modals.character.fields.id, this.modals.character.fields.name)
                        .then(res => {
                            this.$toast.success({
                                title: i18n.t('glossaries.update_character'),
                                message: i18n.t('messages.successes.the_character_was_successfully_updated'),
                            });
                            this.modals.character.id = 0;
                            this.modals.character.fields.id = 0;
                            this.modals.character.fields.name = '';
                            this.modals.character.visibility = false;
                            this.getItems();
                        })
                        .catch(err => {
                            this.$toast.error({
                                title: i18n.t('glossaries.update_character'),
                                message: err.response.data.msg,
                            })
                        })
                        .finally(() => {
                            this.modals.character.updating = false;
                        })
                }
            },
        },

        mounted() {
            this.getItems();
        }
    }
</script>
