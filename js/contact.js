// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Form fields
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Error elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    // Validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            validate: (value) => {
                if (!value.trim()) {
                    return 'Name is required';
                }
                if (value.trim().length < 2) {
                    return 'Name must be at least 2 characters';
                }
                return '';
            }
        },
        email: {
            required: true,
            validate: (value) => {
                if (!value.trim()) {
                    return 'Email is required';
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    return 'Please enter a valid email address';
                }
                return '';
            }
        },
        subject: {
            required: false,
            validate: (value) => {
                return ''; // Optional field
            }
        },
        message: {
            required: true,
            minLength: 20,
            validate: (value) => {
                if (!value.trim()) {
                    return 'Message is required';
                }
                if (value.trim().length < 20) {
                    return 'Message must be at least 20 characters';
                }
                return '';
            }
        }
    };

    // Validate a single field
    function validateField(fieldName, value) {
        const rule = validationRules[fieldName];
        if (!rule) return true;

        const error = rule.validate(value);
        const errorElement = document.getElementById(`${fieldName}-error`);
        const inputElement = document.getElementById(fieldName);

        if (error) {
            errorElement.textContent = error;
            errorElement.setAttribute('aria-live', 'polite');
            inputElement.classList.add('error');
            inputElement.setAttribute('aria-invalid', 'true');
            return false;
        } else {
            errorElement.textContent = '';
            inputElement.classList.remove('error');
            inputElement.setAttribute('aria-invalid', 'false');
            return true;
        }
    }

    // Validate all fields
    function validateForm() {
        let isValid = true;

        isValid = validateField('name', nameInput.value) && isValid;
        isValid = validateField('email', emailInput.value) && isValid;
        isValid = validateField('subject', subjectInput.value) && isValid;
        isValid = validateField('message', messageInput.value) && isValid;

        return isValid;
    }

    // Clear all errors
    function clearErrors() {
        [nameError, emailError, subjectError, messageError].forEach(error => {
            error.textContent = '';
        });
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            input.classList.remove('error');
            input.setAttribute('aria-invalid', 'false');
        });
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }

    // Show success message
    function showSuccess() {
        successMessage.style.display = 'flex';
        errorMessage.style.display = 'none';
        successMessage.setAttribute('aria-live', 'polite');
        // Announce to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = 'Form submitted successfully. Thank you for your message.';
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    }

    // Show error message
    function showError() {
        errorMessage.style.display = 'flex';
        successMessage.style.display = 'none';
        errorMessage.setAttribute('aria-live', 'polite');
    }

    // Set loading state
    function setLoading(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnIcon.style.display = 'none';
            btnSpinner.style.display = 'inline-block';
            submitBtn.setAttribute('aria-busy', 'true');
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnIcon.style.display = 'inline-block';
            btnSpinner.style.display = 'none';
            submitBtn.setAttribute('aria-busy', 'false');
        }
    }

    // Clear form
    function clearForm() {
        form.reset();
        clearErrors();
    }

    // Simulate form submission (replace with actual API call)
    async function submitForm(formData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate success (in real implementation, check response)
        // For demo purposes, always return success
        return { success: true };
        
        // Real implementation would look like:
        // try {
        //     const response = await fetch('/api/contact', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(formData)
        //     });
        //     return await response.json();
        // } catch (error) {
        //     return { success: false, error: error.message };
        // }
    }

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Clear previous messages
        clearErrors();

        // Validate form
        if (!validateForm()) {
            // Focus first error field
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.focus();
            }
            return;
        }

        // Prepare form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim()
        };

        // Set loading state
        setLoading(true);

        try {
            // Submit form
            const result = await submitForm(formData);

            if (result.success) {
                showSuccess();
                clearForm();
                
                // Re-enable form after 3 seconds
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            } else {
                showError();
                setLoading(false);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showError();
            setLoading(false);
        }
    });

    // Real-time validation on blur
    nameInput.addEventListener('blur', () => {
        validateField('name', nameInput.value);
    });

    emailInput.addEventListener('blur', () => {
        validateField('email', emailInput.value);
    });

    subjectInput.addEventListener('blur', () => {
        validateField('subject', subjectInput.value);
    });

    messageInput.addEventListener('blur', () => {
        validateField('message', messageInput.value);
    });

    // Clear error on input
    nameInput.addEventListener('input', () => {
        if (nameInput.classList.contains('error')) {
            validateField('name', nameInput.value);
        }
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.classList.contains('error')) {
            validateField('email', emailInput.value);
        }
    });

    subjectInput.addEventListener('input', () => {
        if (subjectInput.classList.contains('error')) {
            validateField('subject', subjectInput.value);
        }
    });

    messageInput.addEventListener('input', () => {
        if (messageInput.classList.contains('error')) {
            validateField('message', messageInput.value);
        }
    });
});

