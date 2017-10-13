AWS Lambda function to copy an RDS DB Snapshot.

Designed to be triggered from a Cloudwatch event so automated snapshots are copied as soon as they are complete.

## Cloudwatch

This is the event pattern to match snapshot creation events:

```json
{
  "source": [
    "aws.rds"
  ],
  "detail-type": [
    "AWS API Call via CloudTrail"
  ],
  "detail": {
    "eventSource": [
      "rds.amazonaws.com"
    ],
    "eventName": [
      "CreateDBSnapshot"
    ]
  }
}
```