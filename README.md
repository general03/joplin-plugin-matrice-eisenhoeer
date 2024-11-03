# Joplin Plugin

## TODO

- Put button to do synchronization (not at starting app)
- Put the note generated at root and not in the last folder created

## Why

important : put tag #important
- Need focus more important than other
- Business thinking
- Allow to go ahead on the short objectif
Ex: create persona, do sport twice a week...


urgent : put due date
- Need to be done now (in the day)
Ex: call back lead, repair car...

## How

In to-do page you need to add `matrice_eisenhower` tag at below page in order to check only this page.

In this page you must use list and on each item you can put :
- #important for task which need more focus
- @10/12 which match with the date where the task need to be done (format : day/month)

## Result

When opening Joplin a new note was created with this pattern name `Matrice Eisenhower - 10/12/24 - <TODO Page name>`.
Inside you can see :
- IMPORTANT and URGENT : all tasks which are #important AND task with date which is to be done in less 15 days
- IMPORTANT and NON URGENT : all tasks which are #important AND task with date which is to be done in more 15 days
- NON IMPORTANT and URGENT : all tasks with date which is to be done in more 15 days
- NON IMPORTANT and NON URGENT : all tasks staying, you need to move in other category or archive it 

## Contrib

- Generate the build package : `npm run dist`
- Get the dev app command to test : "Help / Copy dev mode command to clipboard"