# Plan to Implement Drop-down Menus

This plan outlines the steps to change the visual layout of the application to use expandable drop-down menus organized by broad categories to improve the user experience.

## 1. Modify index.html

* Wrap each existing section (`#resources`, `#upgrades`, `#passiveIncome`, `#passiveUpgrades`, `#inventory`) within a new container `div` with a class like `dropdown-container`.
* Inside each `dropdown-container`, the existing `<h2>` will serve as the `dropdown-header`.
* Wrap the content within each section (paragraphs, buttons, lists) in a new `div` with a class like `dropdown-content`.

## 2. Update style.css

* Add CSS rules for `.dropdown-container` to define borders, margins, or padding as needed.
* Style the `.dropdown-header` to indicate it's clickable (e.g., change cursor, add background color, padding).
* Add a visual indicator (like an arrow) to the `.dropdown-header` using pseudo-elements or an icon font.
* Set the initial state of `.dropdown-content` to `display: none;` to hide it by default.
* Define a CSS class (e.g., `.active`) that will be added to the `.dropdown-container` when the drop-down is open. Use this class to set `.dropdown-content` to `display: block;`.
* Add a transformation to the arrow indicator in the `.active` state to show the drop-down is open.
* (Optional) Add CSS transitions for a smooth opening and closing animation.

## 3. Modify script.js

* Get all elements with the class `dropdown-header`.
* Loop through each header and add a click event listener.
* Inside the event listener, find the parent `.dropdown-container` and toggle the `.active` class on it. This will trigger the CSS to show or hide the `.dropdown-content`.

## Proposed HTML Structure Changes

```mermaid
graph TD
    A[body] --> B(div.dropdown-container: Resources)
    A --> C(div.dropdown-container: Upgrades)
    A --> D(div.dropdown-container: Passive Income)
    A --> E(div.dropdown-container: Passive Upgrades)
    A --> F(div.dropdown-container: Inventory)

    B --> B1(h2.dropdown-header: Resources)
    B --> B2(div.dropdown-content)
    B2 --> B3(p#gems)
    B2 --> B4(button#findGemsButton)

    C --> C1(h2.dropdown-header: Upgrades)
    C --> C2(div.dropdown-content)
    C2 --> C3(button#multiplierUpgrade)
    C2 --> C4(p#multiplier)

    D --> D1(h2.dropdown-header: Passive Income)
    D --> D2(div.dropdown-content)
    D2 --> D3(p#incomeRate)

    E --> E1(h2.dropdown-header: Passive Upgrades)
    E --> E2(div.dropdown-content)
    E2 --> E3(button#passiveUpgrade)
    E2 --> E4(p#passiveLevel)

    F --> F1(h2.dropdown-header: Inventory)
    F --> F2(div.dropdown-content)
    F2 --> F3(ul#inventoryList)
