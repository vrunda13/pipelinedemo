import '../scss/index.scss';

document.addEventListener('DOMContentLoaded', function () {
    const _rootElement = document.getElementById('root');
    init(_rootElement);
});

/**
 * Turns all textarea wrappers within ```element``` with class .textareaWithLimits and makes them functional.
 * @param {HTMLElement} element The HTML root node within which textarea wrapper elements exist
 */
function init(element) {
    /**
     * @todo Your implementation of any helper functions goes in here
     */

    function textareaPropertyExtractor(wrapperDiv) {
        const textareaElem = wrapperDiv.querySelector('textarea');
        const limitIndicator = wrapperDiv.querySelector('#tweet-input-limit');
        const charLimit = wrapperDiv.getAttribute('data-limit');
        var warnLimit = wrapperDiv.getAttribute('data-warn-limit') || charLimit - 10;
        const charWarn = (warnLimit > charLimit) ? (charLimit - 10) : (warnLimit);
        const limitType = wrapperDiv.getAttribute('data-limit-type') || "hard";
        return { textareaElem, limitIndicator, charLimit, charWarn, limitType }
    }

    function updateLimitIndicator({ textareaElem, limitIndicator, charLimit, charWarn }) {
        var charEntered = textareaElem.value.length;
        limitIndicator.textContent = charLimit - charEntered;
        console.log(charEntered);
        if (charEntered < charWarn) {
            limitIndicator.classList.remove("bg-stop", "bg-warn");
            limitIndicator.classList.add("bg-ok");
        } else if (charEntered < charLimit) {
            limitIndicator.classList.remove("bg-ok", "bg-stop");
            limitIndicator.classList.add("bg-warn");
        } else if (charEntered >= charLimit) {
            limitIndicator.classList.remove("bg-ok", "bg-warn");
            limitIndicator.classList.add("bg-stop");
        }
    }

    /**
     * reads all elements with ```element``` with CSS class .textareaWithLimits, and makes them functional
     */
    function initTextareasWithLimits() {
        const els = element.querySelectorAll('.textareaWithLimits');
        els.forEach(wrapperDiv => {
            const textareaObj = textareaPropertyExtractor(wrapperDiv);
            if (textareaObj.limitType === "hard")
                textareaObj.textareaElem.setAttribute("maxlength", textareaObj.charLimit);
            updateLimitIndicator(textareaObj);
            textareaObj.textareaElem.oninput = () => { updateLimitIndicator(textareaObj) };
        });
        /**
         * All such elements - els, must be provide text area with limits functionality
         * @todo Your implementation (you code which possibly makes use of helper functions written written)
         */
    }

    // we call this method to read all elements with ```element``` with CSS class .textareaWithLimits, and make them functional
    initTextareasWithLimits();
};

export { init };