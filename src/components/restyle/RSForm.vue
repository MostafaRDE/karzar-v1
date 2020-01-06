<template>
    <form @submit.prevent="initializeSubmit">

        {{ /* Load all data form here (The below slot) */ }}
        <slot/>

    </form>
</template>

<script>
    import RulesTable from '../../modules/form/rules-table.js'

    export default {
        name: "RSForm",

        props: {
            // Set submit method
            submit: {
                default: null,
                type: Function,
                required: false,
            },
        },

        data: () => ({
            // Errors of validation
            errors: {},

            // Fields of form for validating
            fields: [],

            // Request-data has object of submitted data
            requestData: {},

        }),

        methods: {

            // Get form fields
            getFormFields() {
                // Select all fields that can be validate
                this.$children.find(child => {
                    // Checking name of field (Child of components)
                    switch (child.$options.name) {
                        // Supported components as field
                        case 'RSCheckBox':
                        case 'RSDropDown':
                        case 'RSInput':
                        case 'RSRadioButton':
                            // If child has name
                            if (child.name !== '') {
                                // Add component as field that can be validate in "RSForm"
                                this.fields.push(child);
                                this.requestData[child.name] = child.value
                            }
                    }
                });
            },

            // Validating fields of form
            validating() {
                // Clear old errors
                this.errors = {};

                // Browsing all fields
                for (let i = 0; i < this.fields.length; i++) {
                    // Capacity of rules names
                    let rules = [];
                    // If the field of loop not null
                    if (this.fields[i].rules != null)
                        // Then split string rules by "|"-character
                        rules = this.fields[i].rules.split('|');
                    else
                        // Else go to next index of loop
                        continue;

                    // Browsing rules names capacity
                    for (let j = 0; j < rules.length; j++) {
                        let isValid = false,
                            ruleDetails = rules[j].split(':'),
                            ruleKey = ruleDetails[0],
                            ruleValue = ruleDetails.length > 1 ? ruleDetails[1] : null;

                        switch (ruleKey) {
                            // If it has the rule
                            case 'confirm_password':
                                // Create email instance object with "requestData"
                                const confirmPassword = new RulesTable.ConfirmPassword(this.requestData);
                                // Pass data to "passes"-method rule instance object for check is validate or not
                                isValid = confirmPassword.passes(this.requestData[this.fields[i].name]);
                                // If is not validate
                                if (!isValid) {
                                    // If errors has not key with the field name
                                    if (!this.errors.hasOwnProperty(this.fields[i].name)) {
                                        // Then create a sub empty array with field name in errors
                                        this.errors[this.fields[i].name] = []
                                    }
                                    // Add error message to errors of Field's sub array
                                    this.errors[this.fields[i].name].push(confirmPassword.message());
                                }
                                break;

                            // If it has the rule
                            case 'email':
                                // Create email instance object with "requestData"
                                const email = new RulesTable.Email(this.requestData);
                                // Pass data to "passes"-method rule instance object for check is validate or not
                                isValid = email.passes(this.requestData[this.fields[i].name]);
                                // If is not validate
                                if (!isValid) {
                                    // If errors has not key with the field name
                                    if (!this.errors.hasOwnProperty(this.fields[i].name)) {
                                        // Then create a sub empty array with field name in errors
                                        this.errors[this.fields[i].name] = []
                                    }
                                    // Add error message to errors of Field's sub array
                                    this.errors[this.fields[i].name].push(email.message());
                                }
                                break;

                            // If it has the rule
                            case 'min':
                                // Create email instance object with "requestData"
                                const min = new RulesTable.Min(this.requestData);
                                // Pass data to "passes"-method rule instance object for check is validate or not
                                isValid = min.passes(this.requestData[this.fields[i].name], ruleValue);
                                // If is not validate
                                if (!isValid) {
                                    // If errors has not key with the field name
                                    if (!this.errors.hasOwnProperty(this.fields[i].name)) {
                                        // Then create a sub empty array with field name in errors
                                        this.errors[this.fields[i].name] = []
                                    }
                                    // Add error message to errors of Field's sub array
                                    this.errors[this.fields[i].name].push(min.message());
                                }
                                break;

                            // If it has the rule
                            case 'password':
                                // Create required instance object with "requestData"
                                const password = new RulesTable.Password(this.requestData);
                                // Pass data to "passes"-method rule instance object for check is validate or not
                                isValid = password.passes(this.requestData[this.fields[i].name]);
                                // If is not validate
                                if (!isValid) {
                                    // If errors has not key with the field name
                                    if (!this.errors.hasOwnProperty(this.fields[i].name)) {
                                        // Then create a sub empty array with field name in errors
                                        this.errors[this.fields[i].name] = []
                                    }
                                    // Add error message to errors of Field's sub array
                                    this.errors[this.fields[i].name].push(password.message());
                                }
                                break;

                            // If it has the rule
                            case 'required':
                                // Create required instance object with "requestData"
                                const required = new RulesTable.Required(this.requestData);
                                // Pass data to "passes"-method rule instance object for check is validate or not
                                isValid = required.passes(this.requestData[this.fields[i].name]);
                                // If is not validate
                                if (!isValid) {
                                    // If errors has not key with the field name
                                    if (!this.errors.hasOwnProperty(this.fields[i].name)) {
                                        // Then create a sub empty array with field name in errors
                                        this.errors[this.fields[i].name] = []
                                    }
                                    // Add error message to errors of Field's sub array
                                    this.errors[this.fields[i].name].push(required.message());
                                }
                                break;
                        }

                    }
                }

                return Object.keys(this.errors).length === 0;
            },

            // First check validation, if validate run "submit"-prop function or return error-message from rules
            initializeSubmit() {
                // Call "getFormFields"-method
                this.getFormFields();

                // Check validating fields is OK:
                if (this.validating()) {
                    // Then if "submit"-function is not null:
                    if (this.submit != null)
                        // Then call "submit"-function
                        this.submit()
                }
                else {
                    this.$emit('errors', this.errors)
                }
            },

        },
    }
</script>