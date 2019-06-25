# plg_editors-xtd_syntaxhighlighterghsvs

Editor button for Joomla that helps to insert code snippets into editor/article text that will be "highlighted" by content plugin SyntaxHighlighterGhsvs when you display the article in front-end. See README.md https://github.com/GHSVS-de/plg_content_syntaxhighlighterghsvs/tree/master

Downloads: https://github.com/GHSVS-de/plg_editors-xtd_syntaxhighlighterghsvs/releases

Changelogs: https://updates.ghsvs.de/changelog.php?file=syntaxhighlighterghsvs_xtd&element=syntaxhighlighterghsvs

## Prerequisites
- **Only usable in Joomla back-end**!
- The `/media/` folder of your Joomla installation must be writable. That's the standard for Joomla that is hosted at a "normal" host/provider. You can check that in Joomla back-end (System Information > Folder Permissions). **Normally you don't have to change something**!
- - The plugin creates language specific `*.html` files in folder  `/media/plg_editors-xtd_syntaxhighlighterghsvs/html/` when the editor button is clicked.
- - Never ever delete the file `insertcode_tmpl.html` inside that directory.

## Usage
- After installation and activation of this plugin you have a button named "Syntax Highlight" below the editor (JCE) or inside the toolbar (TinyMCE).
- Click it and a popup opens with a form with some fields. Make your settings/entries.
- Click the "Insert Code" button below the form after you have made your settings. Sometimes you have to scroll down a bit to see that button.
- - Danger of confusion: Joomla 4 shows an additional button "Close" that cancels the input and closes the popup.
