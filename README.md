# Node Snap Slack Bot (a la SnapChat, Mission Impossible Self Destruct, etc)
This Slack bot is designed to send a message as the given user in the current
channel, and then delete it after a specified number of seconds. Great for those times where you want to say something, but are nervous that unintended message recipients might not be appropriate for what was said (or vice versa).

## Slack Setup
1. Create a custom integration for a BOT, and note the API Token (`bot-token` in [project config](config/default.json)).
2. Create a custom integration for a slash command, then take the token and encrypt it with an AWS KMS key

        $ aws kms encrypt --key-id alias/<KMS key name> --plaintext "<TOKEN>"

  Then note that as `encrypted-token` in [project config](config/default.json).

  In our environment, I gave the slash command the command of `/snapslack`, a description of `Deletes message after specified delay or 5 seconds` and a usage hint of `[# of seconds delay] [your temporary message]`.

## Configuration
Modify the [project config](config/default.json) to have the name of your proxied lambda (`snap-slack-lambda-name`) as
well as team configuration(s) for slack containing the:
* Slack team_id
* KMS-encrypted slash command token
* slack-provided BOT token for interacting with Slack web APIs

## AWS
You will have to have 2 lambda functions in order to utilize this code properly.
Please see the [AWS config](AWS.md) for more info.

## Execution
Follow these steps to get started:

1. Git-clone this repository.

        $ git clone git@github.com:ocelotconsulting/snap-slack-lambda.git

2. Modify configuration (as above).

3. Package lambda zip:

        $ npm run dist

4. Create lambda(s) by uploading zip as specified in [AWS config](AWS.md).
