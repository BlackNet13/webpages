document.addEventListener('DOMContentLoaded', function () {
    var jqueryLoaded = typeof jQuery !== 'undefined';
    var bootstrapJSLoaded = typeof bootstrap !== 'undefined';
    var bootstrapCssLoaded = checkBootstrapCSS();

    if (jqueryLoaded && bootstrapJSLoaded && bootstrapCssLoaded) {
        showAlert('success', 'You are successfully using Bootstrap and jQuery, remember to use this HTML file to test your MSA code.');
    } else {
        showAlert('danger', 'You are not using the downloaded Bootstrap and jQuery, please resolve it.');
    }

    function checkBootstrapCSS() {
        // Create an element and apply a Bootstrap-specific class to check if the CSS is applied
        var testElement = document.createElement('div');
        testElement.className = 'hidden d-none'; // d-none is a Bootstrap class
        document.body.appendChild(testElement);
        var isLoaded = window.getComputedStyle(testElement).display === 'none';
        document.body.removeChild(testElement); // Clean up after the test
        return isLoaded;
    }

    function showAlert(type, message) {
        var alertPlaceholder = document.getElementById('bootstrap-alert');
        var wrapper = document.createElement('div');
        wrapper.innerHTML = [
            '<div class="alert alert-' + type + ' alert-dismissible" role="alert">',
            '   <div>' + message + '</div>',
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');
        alertPlaceholder.append(wrapper);
    }
});
