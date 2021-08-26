export const sample_100_120 = () => {
    return `
        <div
            class="textareaWithLimits"
            data-warn-limit="100"
            data-limit="120"
        >
            <textarea
                id="tweet-input-120"
                data-testid="tweet-input"
                class="field__input textareaWithLimits__input"
                rows="5"
            ></textarea>
            <span
                id="tweet-input-limit"
                data-testid="tweet-input-limit"
                class="textareaWithLimits__limit bg-ok"
            ></span>
        </div>
    `;
};

export const sample_100_120_soft = () => {
    return `
        <div
            class="textareaWithLimits"
            data-warn-limit="100"
            data-limit="120"
            data-limit-type="soft"
        >
            <textarea
                data-testid="tweet-input"
                class="field__input textareaWithLimits__input"
                rows="5"
            ></textarea>
            <span
                id="tweet-input-limit"
                data-testid="tweet-input-limit"
                class="textareaWithLimits__limit bg-ok"
            ></span>
        </div>
    `;
};

export const sample_140_120 = () => {
    return `
        <div
            class="textareaWithLimits"
            data-warn-limit="140"
            data-limit="120"
        >
            <textarea
                id="tweet-input-120"
                data-testid="tweet-input"
                class="field__input textareaWithLimits__input"
                rows="5"
            ></textarea>
            <span
                id="tweet-input-limit"
                data-testid="tweet-input-limit"
                class="textareaWithLimits__limit bg-ok"
            ></span>
        </div>
    `;
};

export const sample_120 = () => {
    return `
        <div
            class="textareaWithLimits"
            data-limit="120"
        >
            <textarea
                id="tweet-input-120"
                data-testid="tweet-input"
                class="field__input textareaWithLimits__input"
                rows="5"
            ></textarea>
            <span
                id="tweet-input-limit"
                data-testid="tweet-input-limit"
                class="textareaWithLimits__limit bg-ok"
            ></span>
        </div>
    `;
};