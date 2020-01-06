<template>
    <div class="py-20 px-40">
        <div class="row">
            <div class="col-sm-6 border-end">
                <rs-form class="px-10">
                    <h5>{{ $t('glossaries.base_information') }}</h5>

                    <rs-input class="mt-30" :label="$t('glossaries.name')"/>
                    <rs-input class="mt-20" :label="$t('glossaries.whatsapp_number')"/>

                    <rs-button class="mt-30" solid glow>{{ $t('glossaries.update') }}</rs-button>
                </rs-form>
            </div>
            <div class="col-sm-6">
                <rs-form class="px-10">
                    <h5>{{ $t('glossaries.change_password') }}</h5>

                    <rs-input class="mb-15 mt-30" :label="$t('glossaries.current_password')"/>
                    <hr class="opacity-1">
                    <rs-input class="mt-15" :label="$t('glossaries.new_password')"/>
                    <rs-input class="mt-20" :label="$t('glossaries.retype_new_password')"/>

                    <rs-button class="mt-30" solid glow>{{ $t('glossaries.change') }}</rs-button>
                </rs-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Profile"
    }
</script>
