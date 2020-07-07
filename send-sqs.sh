#! /bin/bash
STACK_NAME=$(sls info | grep stack | sed 's/[^ ]* //')
printf "stack name resolved as ${STACK_NAME}\n"

SQS_XRAY=$(aws cloudformation describe-stack-resources --stack-name ${STACK_NAME} --query 'StackResources[?LogicalResourceId==`SQSXrayTrigger`].PhysicalResourceId' --output text)
printf "xray sqs endpoint resolved as ${SQS_XRAY}\n"

SQS_LUMIGO=$(aws cloudformation describe-stack-resources --stack-name ${STACK_NAME} --query 'StackResources[?LogicalResourceId==`SQSLumigoTrigger`].PhysicalResourceId' --output text)
printf "lumigo sqs endpoint resolved as ${SQS_LUMIGO}\n"

printf "sqs send-message starting\n"

for ((i=1;i<=$1;i++)); 
do 
    aws sqs send-message --queue-url ${SQS_LUMIGO} --message-body hi &>/dev/null
    printf "Message ${i} delivered to ${SQS_LUMIGO}\n"
    aws sqs send-message --queue-url ${SQS_XRAY} --message-body hi &>/dev/null
    printf "Message ${i} delivered to ${SQS_XRAY}\n"
    if ! (( $i % 10 )); then
       sleep 30
    fi
done

printf "sqs send-message complete\n"
