# SimpleUI
Easily and quickly create even the most complex UI forms in Minecraft Bedrock Edition with the GameTest framework! This little module allows you to create easy to read JavaScript Class trees for UI forms and enables full sub menu control.

#### Example
```javascript
new UI().type("ActionForm")
        .title("Months")
        .body("Choose your favorite month!")
        .buttons([
            new Element().button("January"),
            new Element().button("February"),
            new Element().button("March"),
            new Element().button("April"),
            new Element().button("May")
        ])
        .responses([
            new Response(3, function(player){ player.runCommand("say I like April too!") })
        ])
        .execute(player);
```
![](https://i.ibb.co/4pwtHSn/Capture3.png)



## Table Of Contents
* [How To Create A UI](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#how-to-create-a-ui)
* [Classes](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#classes)



## How To Create A UI
To create one of these UI's it is highly recommended that you have a little bit of prior knowledge on creating JavaScript code, but this tutorial will take you step by step on how you can create your very own UI with this module. All code follows closely along with the documentation on the `mojang-minecraft-ui` module: https://docs.microsoft.com/en-us/minecraft/creator/scriptapi/mojang-minecraft-ui/mojang-minecraft-ui

To start out, we need to create a new UI class and specify the type of UI form we will be creating, the types of UI forms can be found in the Minecraft documentation. The current types are `ActionForm`, `ModalForm`, and `MessageForm`. We will only be going over the ActionForm set up but the other types follow similiar steps (except ModalForm, there is a section on how to set up a ModalForm at the end).

*Make sure you have imported the UI class*
#### UI setup and type definition
```javascript
import { UI } from './SimpleUI.js';

new UI().type("ActionForm")
```

Now that we have specified the type of UI we want to use, we now need to set up our UI settings which are easy to do with functions that are built into the UI class. We can start by adding a title and body to our ActionForm like so:

#### UI title and body
```javascript
import { UI } from './SimpleUI.js';

new UI().type("ActionForm")
        .title("Tutorial title")
        .body("Click any button to see more!")
```

Continuing, we now have a good structure to our form but we probably want some sort of input/button(s) that the player can press to cause some action to happen. This is relatively easy with this UI class because we can pass in an array of button classes into our UI's buttons function! This sounds a bit confusing but see the example below for a better idea (be sure to import the Element class or Button class itself):

#### UI buttons
```javascript
import { UI, Element } from './SimpleUI.js';

new UI().type("ActionForm")
        .title("Tutorial title")
        .body("Click any button to see more!")
        .buttons([
           new Element().button("example1"),
           new Element().button("example2")
        ])
```

Now that we have buttons we need a way to get the players response. This is also quite simple and easy to set up with the responses function in the UI class. This function takes in an array of response classes that read the players response and automatically activate when a player responds to the UI. First, lets set up the responses array with our responses corresponding to our buttons (the first parameter inside the response class is the index of our button in the buttons array, remember to import the response class):

#### UI responses
```javascript
import { UI, Element, Response } from './SimpleUI.js';

new UI().type("ActionForm")
        .title("Tutorial title")
        .body("Click any button to see more!")
        .buttons([
           new Element().button("example1"),
           new Element().button("example2")
        ])
        .responses([
           new Response(0),
           new Response(1)
        ])
```

With responses that catch when one of the buttons are pressed, we now need to tell the response what we want it to do. In our case, I want the first button to say "hello" while the second one opens a MessageForm UI that the player will see. This is quite easy to do because our response class comes built-in with an execute parameter that takes in a function and/or UI class and executes it for us (you can input an array with multiple functions and a UI so both can run). This means we can pass in a function that the response can run and a UI class that the response can run. For now, we want to focus on the first response and have it run a function (when the response runs the function it passes in the player as a parameter):

#### UI response running a function
```javascript
import { UI, Element, Response } from './SimpleUI.js';

new UI().type("ActionForm")
        .title("Tutorial title")
        .body("Click any button to see more!")
        .buttons([
           new Element().button("example1"),
           new Element().button("example2")
        ])
        .responses([
           new Response(0, function(player) { player.runCommand("say hello") }),
           new Response(1)
        ])
```

For our second button we want to open a new UI or in other words open a sub menu. To do this, we can use the same parameter of our response class but instead of passing in a function we can pass in a UI class to execute (this is a bit of class-ception if I say so myself). Inside the UI class that we want to run as the sub menu we can set up the class like we did in the beginning but with different settings of course:

#### UI response running a UI class
```javascript
import { UI, Element, Response } from './SimpleUI.js';

new UI().type("ActionForm")
        .title("Tutorial title")
        .body("Click any button to see more!")
        .buttons([
           new Element().button("example1"),
           new Element().button("example2")
        ])
        .responses([
           new Response(0, function(player) { player.runCommand("say hello") }),
           new Response(1, new UI().type("MessageForm")
                                   .title("Sub menu")
                                   .body("This was all done with the module created by: KillerCube")
                                   .buttons([
                                      new Element().button("okay"),
                                      new Element().button("cool")
                                   ])
           )
        ])
```

Finally we can execute our UI with the built-in execute function inside of our UI class. Now you can enjoy a beautiful UI that you can show off to your friends! (You will have to pass in a player parameter in order for this UI to execute on the player you want it to execute on. Make sure you have a selected player variable ready to go).

#### UI execution and finished
```javascript
import { UI, Element, Response } from './SimpleUI.js';

new UI().type("ActionForm")
        .title("Tutorial title")
        .body("Click any button to see more!")
        .buttons([
           new Element().button("example1"),
           new Element().button("example2")
        ])
        .responses([
           new Response(0, function(player) { player.runCommand("say hello") }),
           new Response(1, new UI().type("MessageForm")
                                   .title("Sub menu")
                                   .body("This was all done with the module created by: KillerCube")
                                   .buttons([
                                      new Element().button("okay"),
                                      new Element().button("cool")
                                   ])
           )
        ])
        .execute(player);
```



## Classes
* [UI](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#ui)
* [Element](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#element)
* [Response](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#response)
* [Feedback](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#feedback)
* [Button](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#button)
* [Dropdown](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#dropdown)
* [Icon](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#icon)
* [Slider](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#slider)
* [TextField](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#textfield)
* [Toggle](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#toggle)

## UI
Main UI class for creating UI.

### Functions
* [constructor](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#constructor)
* [type](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#type)
* [title](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#title)
* [body](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#body)
* [buttons](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#buttons)
* [layout](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#layout)
* [feedback](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#feedback)
* [responses](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#responses)
* [execute](https://github.com/KillerCube1/SimpleUI/edit/main/README.md#execute)

### constructor

`new UI()`

Builds a UI that can be executed later with the function `UI.execute(<player>)`.

### type

`type(type: string)`

Sets the type of UI to display.

### title

`title(title: string)`

Sets the title of the UI.

### body

`body(body: string)`

Sets the body of the UI.

### buttons

`buttons(buttons: Button[])`

Creates buttons for the UI (**NOT** available with ModalForm).

### layout

`layout(layout: any[])`

Creates a layout for the UI (**ONLY** used with ModalForm).

### feedback

`feedback(feedback: Feedback)`

Prepares function to run once a response is given (**ONLY** used with ModalForm).

### responses

`responses(responses: Response[])`

Prepares response actions to take once a response is given (**NOT** available with ModalForm).

### execute

`execute(player: Player)`

Shows and runs the UI to the given player.

## Element
Main element class that contains all UI elements (Raw classes are available for each element).

## Response
Response for UI.

## Feedback
Feedback for UI (used for ModalForm).

## Button
Button for UI.

## Dropdown
Dropdown for UI (ModalForm ONLY).

## Icon
Icon for UI (ModalForm ONLY).

## Slider
Slider for UI (ModalForm ONLY).

## TextField
TextField for UI (ModalForm ONLY).

## Toggle
Toggle for UI (ModalForm ONLY).
