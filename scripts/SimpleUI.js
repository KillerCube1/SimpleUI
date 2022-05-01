/**
 * Welcome to KillerCube's SimpleUI which contains a multitude of features that
 * make creating UI/server forms a whole lot easier!
 * 
 * This includes being able to set up everything in a nice easy to read
 * tree like structure and it also enables users to write instant response
 * controls with little to no effort.
 * 
 * Enjoy creating your favorite features!
 * 
 * Version: 1.0
 * Last Updated: 4/30/2022
 */



/**
 * TODO:
 * - Add response detection for closing UI
 */


import { ActionFormData, ActionFormResponse, ModalFormData, ModalFormResponse, MessageFormData, MessageFormResponse } from 'mojang-minecraft-ui';


/**
 * Main UI class for creating UI
 */
export class UI {
    /**
    * Builds a UI that can be executed later with the function
    * `UI.execute(<player>)`
    */
    constructor() {
        this.info = {};
    }

    /**
     * @remarks
     * Sets the type of UI to display
     * @param {"ActionForm"|"ModalForm"|"MessageForm"} type
     */
    type(type) {
        this.info["type"] = type;
        return this;
    }

    /**
     * @remarks
     * Sets the title of the UI
     * @param {string} title
     */
    title(title) {
        this.info["title"] = title;
        return this;
    }

    /**
     * @remarks
     * Sets the body of the UI
     * @param {string} body
     */
    body(body) {
        this.info["body"] = body;
        return this;
    }

    /**
     * @remarks
     * Creates buttons for the UI (**NOT** available with ModalForm)
     * @param {Button[]} buttons
     */
    buttons(buttons) {
        this.info["buttons"] = buttons;
        return this;
    }

    /**
     * @remarks
     * Creates a layout for the UI (**ONLY** used with ModalForm)
     * @param {array} layout
     */
    layout(layout) {
        this.info["layout"] = layout;
        return this;
    }

    /**
     * @remarks
     * Prepares function to run once a response is given
     * (**ONLY** used with ModalForm)
     * @param {Feedback} feedback
     */
    feedback(feedback) {
        this.info["feedback"] = feedback;
        return this;
    }

    /**
     * @remarks
     * Prepares response actions to take once a response is given
     * (**NOT** available with ModalForm)
     * @param {Response[]} responses
     */
    responses(responses) {
        this.info["response"] = responses;
        return this;
    }

    /**
     * @remarks
     * Shows and runs the UI to the given player
     * @param {Player} player
     */
    execute(player) {
        this.info["player"] = player;

        // Identify the type of UI
        switch (this.info.type) {
            case "ActionForm":
                this.element = new ActionFormData();
                createActionForm(this.info, this.element);
                break;

            case "ModalForm":
                this.element = new ModalFormData();
                createModalForm(this.info, this.element);
                break;

            case "MessageForm":
                this.element = new MessageFormData();
                createMessageForm(this.info, this.element);
                break;
        }

        return this;
    }
}

/**
 * Main element class that contains all UI elements
 * (Raw classes are available for each element)
 */
export class Element {
    constructor() { }

    /**
     * @remarks
     * Creates a button for use in UI
     * @param {string} text
     * @param {string} iconPath (**NOT** available for MessageForm)
     */
    button(text, iconPath = undefined) {
        return new Button(text, iconPath);
    }

    /**
     * @remarks
     * Creates a dropdown for use in UI (**ONLY** available with ModalForm)
     * @param {string} label
     * @param {string[]} options
     * @param {number} defaultValueIndex
     */
    dropdown(label, options, defaultValueIndex = null) {
        return new Dropdown(label, options, defaultValueIndex);
    }

    /**
     * @remarks
     * Creates a slider for use in UI (**ONLY** available with ModalForm)
     * @param {string} label
     * @param {number} minimumValue
     * @param {number} maximumValue
     * @param {number} valueStep
     * @param {number} defaultValue
     */
    slider(label, minimumValue, maximumValue, valueStep, defaultValue = null) {
        return new Slider(label, minimumValue, maximumValue, valueStep, defaultValue);
    }

    /**
     * @remarks
     * Creates a textField for use in UI (**ONLY** available with ModalForm)
     * @param {string} label
     * @param {string} placeHolderText
     * @param {string} defaultValue
     */
    textField(label, placeHolderText, defaultValue = null) {
        return new TextField(label, placeHolderText, defaultValue);
    }

    /**
     * @remarks
     * Creates a toggle for use in UI (**ONLY** available with ModalForm)
     * @param {string} label
     * @param {boolean} defaultValue
     */
    toggle(label, defaultValue = null) {
        return new Toggle(label, defaultValue);
    }

    /**
     * @remarks
     * Sets icon for use in UI (**ONLY** available with ModalForm)
     * @param {string} iconPath
     */
    icon(iconPath) {
        return new Icon(iconPath);
    }
}

/**
 * Response for UI
 */
export class Response {
    /**
     * @remarks
     * Creates a response catch for use in UI
     * (Use index -1 to detect UI isCanceled)
     * @param {number} index
     * @param {any} run
     */
    constructor(index, run) {
        this.index = index;
        this.exe = run;
    }

    /**
     * @remarks
     * Sets the button index to listen for
     * (This is preset in the constructor)
     * @param {number} index
     */
    setIndex(index) {
        this.index = index;
        return this;
    }

    /**
     * @remarks
     * Sets the function(s) and/or UI to run when this response is called
     * (This is preset in the constructor)
     * @param {any} run
     */
    execute(run) {
        this.exe = run;
        return this;
    }

    /**
     * @ignore
     */
    run(player) {
        if (Array.isArray(this.exe)) {
            for (let n of this.exe) {
                if (typeof n === 'function') {
                    n(player);
                } else {
                    n.execute(player);
                }
            }
        } else {
            if (typeof this.exe === 'function') {
                this.exe(player);
            } else {
                this.exe.execute(player);
            }
        }

        return this;
    }
}

/**
 * Feedback for UI (used for ModalForm)
 */
export class Feedback {
    /**
     * @remarks
     * Creates a feedback catch for use in UI 
     * (returns a ModalFormResponse Class to given function)
     * @param {function} func
     */
    constructor(func) {
        this.exe = func;
    }

    /**
     * @remarks
     * Sets the function to run when feedback is called
     * (This is preset in the constructor)
     * @param {function} func
     */
    execute(func) {
        this.exe = func;
        return this;
    }

    /**
     * @ignore
     */
    run(player, response) {
        this.exe(player, response);
        return this;
    }
}

/**
 * Button for UI
 */
export class Button {
    /**
     * @remarks
     * Creates a button for use in UI
     * @param {string} text
     * @param {string} iconPath (**NOT** available for MessageForm)
     */
    constructor(text, iconPath = undefined) {
        this.text = text;
        this.icon = iconPath;
    }
}

/**
 * Dropdown for UI (ModalForm ONLY)
 */
export class Dropdown {
    /**
     * @remarks
     * Creates a dropdown for use in UI (**ONLY** available with ModalForm)
     * @param {string} label
     * @param {string[]} options
     * @param {number} defaultValueIndex
     */
    constructor(label, options, defaultValueIndex = null) {
        this.type = "dropdown";
        this.label = label;
        this.options = options;
        this.defaultIndex = defaultValueIndex;
    }
}

/**
 * Icon for UI (ModalForm ONLY)
 */
export class Icon {
    /**
     * @remarks
     * Sets icon for use in UI (**ONLY** available with ModalForm)
     * @param {string} iconPath
     */
    constructor(iconPath) {
        this.type = "icon";
        this.icon = iconPath;
    }
}

/**
 * Slider for UI (ModalForm ONLY)
 */
export class Slider {
    /**
     * @remarks
     * Creates a slider for use in UI (**ONLY** available with ModalForm)
     * @param {string} label
     * @param {number} minimumValue
     * @param {number} maximumValue
     * @param {number} valueStep
     * @param {number} defaultValue
     */
    constructor(label, minimumValue, maximumValue, valueStep, defaultValue = null) {
        this.type = "slider";
        this.label = label;
        this.minimumValue = minimumValue;
        this.maximumValue = maximumValue;
        this.valueStep = valueStep;
        this.defaultValue = defaultValue;
    }
}

/**
 * TextField for UI (ModalForm ONLY)
 */
export class TextField {
    /**
     * @remarks
     * Creates a textField for use in UI (**ONLY** available with ModalForm)
     * @param {string} label
     * @param {string} placeHolderText
     * @param {string} defaultValue
     */
    constructor(label, placeHolderText, defaultValue = null) {
        this.type = "textfield";
        this.label = label;
        this.placeHolderText = placeHolderText;
        this.defaultValue = defaultValue;
    }
}

/**
 * Toggle for UI (ModalForm ONLY)
 */
export class Toggle {
    /**
     * @remarks
     * Creates a toggle for use in UI (**ONLY** available with ModalForm)
     * @param {string} label
     * @param {boolean} defaultValue
     */
    constructor(label, defaultValue = null) {
        this.type = "toggle";
        this.label = label;
        this.defaultValue = defaultValue;
    }
}



function createActionForm(info, ui) {
    // Set title
    ui.title(info.title);

    // Set body
    if (info.body != undefined) ui.body(info.body);

    // Set up buttons
    for (let button of info.buttons) {
        if (button != null) {
            if (button.icon == undefined) {
                ui.button(button.text);
            } else {
                ui.button(button.text, button.icon);
            }
        }
    }

    // Control responses
    ui.show(info.player).then((response) => {
        info.response.forEach((value) => {
            if (value.index == -1 && response.isCanceled) {
                value.run(info.player);
            } else if (response.selection == value.index) {
                value.run(info.player);
            }
        })
    })
}

function createMessageForm(info, ui) {
    // Set title
    ui.title(info.title);

    // Set body
    if (info.body != undefined) ui.body(info.body);

    // Set up buttons
    ui.button1(info.buttons[0].text);
    ui.button2(info.buttons[1].text);

    // Control responses
    ui.show(info.player).then((response) => {
        info.response.forEach((value) => {
            if (value.index == -1 && response.isCanceled) {
                value.run(info.player);
            } else if (response.selection == value.index) {
                value.run(info.player);
            }
        })
    })
}

function createModalForm(info, ui) {
    // Set title
    ui.title(info.title);

    // Set up layout
    for (let item of info.layout) {
        switch (item.type) {
            case "toggle":
                ui.toggle(item.label, item.defaultValue);
                break;

            case "slider":
                ui.slider(item.label, item.minimumValue, item.maximumValue, item.valueStep, item.defaultValue);
                break;

            case "dropdown":
                ui.dropdown(item.label, item.options, item.defaultValue);
                break;

            case "icon":
                ui.icon(item.icon);
                break;

            case "textfield":
                ui.textField(item.label, item.placeHolderText, item.defaultValue);
                break;
        }
    }

    // Control feedback
    ui.show(info.player).then((response) => {
        info.feedback.run(info.player, response);
    })
}