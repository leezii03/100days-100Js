document.addEventListener('DOMContentLoaded', function() {
    const resultScreen = document.getElementById('txt-result');
    const buttons = document.querySelectorAll('.btn button');
    
    let currentInput = '';
    
    // Function to update the result screen
    function updateResult(value) {
        resultScreen.value = value;
    }

    // Function to handle button click events
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonValue = this.value;

            if (buttonValue === 'AC') {
                // Clear the screen
                currentInput = '';
                updateResult(currentInput);
            } else if (buttonValue === '=') {
                // Evaluate the expression
                try {
                    currentInput = eval(currentInput).toString();
                    updateResult(currentInput);
                } catch (error) {
                    currentInput = 'Error';
                    updateResult(currentInput);
                }
            } else if (buttonValue === 'x') {
                // Handle 'x' for multiplication
                currentInput = currentInput.slice(0 , -1);
                updateResult(currentInput);
            } else if (buttonValue === '%') {
                // Handle '%' for percentage
                currentInput += '/100';
                updateResult(currentInput);
            } else {
                // Append the clicked value to the current input
                currentInput += buttonValue;
                updateResult(currentInput);
            }
        });
    });
});
