#! /bin/bash
SQS_LUMIGO=$(aws cloudformation describe-stack-resources --stack-name lambda-tracing-comparison-dev --query 'StackResources[?LogicalResourceId==`SQSXrayTrigger`].PhysicalResourceId' --output text)
SQS_XRAY=$(aws cloudformation describe-stack-resources --stack-name lambda-tracing-comparison-dev --query 'StackResources[?LogicalResourceId==`SQSLumigoTrigger`].PhysicalResourceId' --output text)

for ((i=1;i<=100;i++)); 
do 
    aws sqs send-message --queue-url ${SQS_LUMIGO} --message-body hi
    aws sqs send-message --queue-url ${SQS_XRAY} --message-body hi
done