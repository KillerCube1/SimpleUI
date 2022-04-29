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
            new Response(),
            new Response(),
            new Response(foo)
        ])
        .execute(player);

function foo(player) {
  
}
```
