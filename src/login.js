import Alpine from 'alpinejs'
import Iodine from '@caneara/iodine';
import "./styles/login.css" // import css file

// instance package for validation inputs 
const IodineInstance = new Iodine();

// bind alpine to window 
window.Alpine = Alpine;

Alpine.data("loginFormValidation", () => {
    return {
        fields: {
            username: {
                value: null,
                error: null,
                touch: null,
                rules: ["required", "minLength:5", "maxLength:12"]
            },

            password: {
                value: null,
                error: null,
                touch: null,
                rules: ["required", "minLength:5", "maxLength:12"]
            }
        },
        isFormInvalid: true,
        isFormSending: false,
        validateField(field) {
            const res = IodineInstance.assert(field.value, field.rules);
            field.error = res.valid ? null : res.error;
            field.touch = true;
            this.isFormValid();
        },
        isFormValid() {
            const isValid = Object.values(this.fields).every(field => (!field.error && field.touch));
            this.isFormInvalid = !isValid;
            return this.isFormInvalid;
        },
        clearFields() {
            this.fields.username.value = "";
            this.fields.password.value = "";
        },
        submit(event) {
            const ok = this.isFormValid();
            event.preventDefault();
            console.log("form submit success");
            setTimeout(() => {
                this.isFormSending = false
            }, 4000);
            return ok;
        },
    }
});


// start alpine
Alpine.start();
