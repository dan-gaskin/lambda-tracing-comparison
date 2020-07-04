#! /bin/bash
STACK_NAME=$(sls info | grep stack | sed 's/[^ ]* //')
printf "stack name resolved as ${STACK_NAME}\n"

SQS_XRAY=$(aws cloudformation describe-stack-resources --stack-name ${STACK_NAME} --query 'StackResources[?LogicalResourceId==`SQSXrayTrigger`].PhysicalResourceId' --output text)
printf "xray sqs arn resolved as ${SQS_XRAY}\n"

SQS_LUMIGO=$(aws cloudformation describe-stack-resources --stack-name ${STACK_NAME} --query 'StackResources[?LogicalResourceId==`SQSLumigoTrigger`].PhysicalResourceId' --output text)
printf "lumigo sqs arn resolved as ${SQS_LUMIGO}\n"

for ((i=1;i<=$1;i++)); 
do 
    printf "\nsending message ${i} to sqs triggers\n"
    aws sqs send-message --queue-url ${SQS_LUMIGO} --message-body hi
    aws sqs send-message --queue-url ${SQS_XRAY} --message-body hi
    printf "\n"
done