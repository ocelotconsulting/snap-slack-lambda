# AWS Configuration

## Proxy Lambda Setup
When uploading the zip, you'll need to add `proxy_lambda.handler` as the handler
for this lambda, it's main task is responding to slack within 3 seconds with a 200 response
after invoking the worker lambda.

### IAM
In addition to the AWSLambdaBasicExecutionRole (for CloudWatch logging), the
lambda function also needs to be assigned a role which
has permissions to invoke the `snap-slack-lambda-name` Lambda specified in the [project config](config/default.json).

## Worker Lambda Setup
When uploading the zip, you'll need to add `app.handler` as the handler
for this lambda, it performs the work of sending a message as the user (BOT) and
then deleting the message after an optionally specified delay.

### IAM
In addition to the AWSLambdaBasicExecutionRole (for CloudWatch logging), the
lambda function also needs to be assigned a role which
has permissions to decrypt the incoming slash command token `encrypted-token` specified in the [project config](config/default.json).

The policy in the role allows decryption using the KMS key used to encrypt the slash command token. It looks like

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "kms:Decrypt"
            ],
            "Resource": "arn:aws:kms:us-east-1:my_acct:key/5353535-3ac3-53a1-gggg-eeaaabbbccc"
        }
    ]
}
```
