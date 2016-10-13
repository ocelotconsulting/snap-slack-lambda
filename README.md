# Node Snap Slack (Mission Impossible Self Destruct) Slack Bot
This Slack bot is designed to send a message as the given user in the current
channel, and then delete it after a specified number of seconds.

## Project status
Works, just need to take in the delay time prior to deleting message.

## Execution
Follow these steps to get started:

1. Git-clone this repository.

        $ git clone git@github.com:ocelotconsulting/snap-slack-lambda.git

2. Modify configuration (as above).

3. Package lambda zip:

        $ npm run dist

4. Create lambda by uploading zip.
