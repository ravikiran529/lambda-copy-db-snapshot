// Lambda function to copy an RDS snapshot
 
var AWS = require('aws-sdk');
var rds = new AWS.RDS();
 
// define variables
console.log ('Loading function');
 
//main function
exports.handler = (event, context, callback) => {
 
    // Get the EBS snapshot ID from the CloudWatch event details
    var srcSnapshotId = event.SourceIdentifier;
    const dstSnapshotId = `${srcSnapshotId}-copy`;
    const description = `Snapshot copy from ${srcSnapshotId} to ${dstSnapshotId}.`;
    console.log ("srcSnapshotId: ", srcSnapshotId, ", dstSnapshotId: ", dstSnapshotId);

    // Prepare variables for rds.copySnapshot call
    const params = {
      SourceDBSnapshotIdentifier: srcSnapshotId, /* required */
      TargetDBSnapshotIdentifier: dstSnapshotId, /* required */
      CopyTags: true,
    };
 
    // Execute the copy snapshot and log any errors
    rds.copyDBSnapshot(params, (err, data) => {
        if (err) {
            const errorMessage = `Error copying snapshot ${srcSnapshotId} to ${dstSnapshotId}.`;
            console.log(errorMessage);
            console.log(err);
            callback(errorMessage);
        } else {
            const successMessage = `Successfully started copy of snapshot ${srcSnapshotId} to ${dstSnapshotId}.`;
            console.log(successMessage);
            console.log(data);
            callback(null, successMessage);
        }
    });
};