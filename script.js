// JavaScript code for the donation page
// This code handles the donation form, amount selection, and thank you message display
document.addEventListener('DOMContentLoaded', function() {
    // DOM element selections
    const amountButtons = document.querySelectorAll('.amount-btn');
    const donateButton = document.querySelector('.donate-btn');
    const customAmountInput = document.getElementById('amount');
    const donationForm = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const hamburgerMenu = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Set default selected amount
    let selectedAmount = 25;
    
    // Update donate button text based on selected amount
    function updateDonateButtonText() {
        donateButton.textContent = `Donate R${selectedAmount} Now`;
    }
    
    // Initialize button text
    updateDonateButtonText();
    
    // Handle amount button clicks - prevent form submission
    amountButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent default button behavior (form submission)
            e.preventDefault();
            
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update selected amount
            selectedAmount = parseInt(this.textContent.replace('R', ''));
            
            // Clear custom amount input
            customAmountInput.value = '';
            
            // Update donate button text
            updateDonateButtonText();
            
            // Log to confirm button click is working
            console.log(`Selected amount: R${selectedAmount}`);
        });
    });
    
    // Handle custom amount input
    customAmountInput.addEventListener('input', function() {
        if (this.value) {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Update selected amount
            selectedAmount = parseInt(this.value);
            updateDonateButtonText();
        }
    });
    
    // Toggle mobile menu
    hamburgerMenu.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        
        // icon on toggle
        if (navLinks.classList.contains('show')) {
            this.textContent = '✕';
            
            // styling for mobile menu
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '60px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = '#2c3e50';
            navLinks.style.padding = '1rem';
        } else {
            this.textContent = '☰';
            navLinks.style.display = '';
        }
    });
    
    // Form submission handler
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        if (!nameInput.value || !emailInput.value) {
            showMessage('Please fill in all required fields', 'error');
            return;
        }
        
        if (selectedAmount <= 0 || isNaN(selectedAmount)) {
            showMessage('Please select a valid donation amount', 'error');
            return;
        }
        
        // Show success message and thank you
        showThankYouMessage();
    });
    
    // Show message to user
    function showMessage(text, type) {
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        message.style.padding = '10px';
        message.style.marginTop = '10px';
        message.style.borderRadius = '4px';
        
        if (type === 'error') {
            message.style.backgroundColor = '#ffebee';
            message.style.color = '#c62828';
            message.style.border = '1px solid #ef9a9a';
        } else {
            message.style.backgroundColor = '#e8f5e9';
            message.style.color = '#2e7d32';
            message.style.border = '1px solid #a5d6a7';
        }
        
        // Add message to DOM - right after form
        donationForm.after(message);

        setTimeout(() => {
            message.remove();
        }, 5000);
    }
    
    // Create and show thank you message
    function showThankYouMessage() {
        const thankYouDiv = document.createElement('div');
        thankYouDiv.className = 'thank-you';
        thankYouDiv.innerHTML = `
            <h2>Thank You, ${nameInput.value}!</h2>
            <p>Your donation of $${selectedAmount} will make a real difference.</p>
            <div class="checkmark">✓</div>
            <p>A confirmation email has been sent to ${emailInput.value}</p>
            <button id="resetBtn" class="donate-btn">Make Another Donation</button>
        `;
        
        // Style the thank you message
        thankYouDiv.style.textAlign = 'center';
        thankYouDiv.style.padding = '20px';
        
        // Style the checkmark
        const checkmark = thankYouDiv.querySelector('.checkmark');
        checkmark.style.fontSize = '5rem';
        checkmark.style.color = '#2ecc71';
        checkmark.style.margin = '20px 0';
        donationForm.style.display = 'none';
        
        // thabk you message
        donationForm.after(thankYouDiv);
        
        // Add event listener to reset button
        document.getElementById('resetBtn').addEventListener('click', function() {
            // Reset form
            donationForm.reset();
            
            // Reset selected amount to default ($25)
            selectedAmount = 25;
            
            // Reset active button
            amountButtons.forEach(btn => btn.classList.remove('active'));
            amountButtons[1].classList.add('active');

            updateDonateButtonText();
            
            donationForm.style.display = 'block';
            
            thankYouDiv.remove();
        });
    }
    
    // Add donation counter to the impact section
    function addDonationCounter() {
        const impactSection = document.querySelector('.impact');
        
        // Create counter element
        const counterDiv = document.createElement('div');
        counterDiv.className = 'donation-counter';
        counterDiv.innerHTML = `
            <h3>Total Donations: <span id="donationCount">127</span></h3>
            <div class="progress-bar-container">
                <div class="progress-bar"></div>
            </div>
            <p>Help us reach our goal of 500 donations</p>
        `;
        
        // Style the counter
        counterDiv.style.textAlign = 'center';
        counterDiv.style.margin = '20px 0';
        
        // Style for the progress bar container
        const progressBarContainer = counterDiv.querySelector('.progress-bar-container');
        progressBarContainer.style.height = '20px';
        progressBarContainer.style.backgroundColor = '#f1f1f1';
        progressBarContainer.style.borderRadius = '10px';
        progressBarContainer.style.overflow = 'hidden';
        progressBarContainer.style.margin = '10px 0';
        
        // Style the progress bar
        const progressBar = counterDiv.querySelector('.progress-bar');
        progressBar.style.height = '100%';
        progressBar.style.width = '25.4%'; // 127/500 = 25.4%
        progressBar.style.backgroundColor = '#3498db';
        
        // Add counter to the impact section
        impactSection.prepend(counterDiv);
    }
    
    // Call function to add donation counter
    addDonationCounter();
});