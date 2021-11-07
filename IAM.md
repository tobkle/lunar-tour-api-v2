{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ManagePromoteChangeset",
      "Effect": "Allow",
      "Action": [
        "cloudformation:GetTemplate",
        "cloudformation:CreateChangeSet",
        "cloudformation:DescribeChangeSet"
      ],
      "Resource": [
        {
          "Fn::Sub": "arn:aws:cloudformation:*:${AWS::AccountId}:*"
        }
      ]
    },
    {
      "Sid": "ManageDeployedResources",
      "Effect": "Allow",
      "Action": [
        "cloudformation:GetTemplate",
        "cloudformation:ListStacks",
        "cloudformation:ListStackResources",
        "cloudformation:DescribeStacks",
        "apigateway:GET"
      ],
      "Resource": "*"
    },
    {
      "Sid": "MonitorLogs",
      "Effect": "Allow",
      "Action": [
        "apigateway:GET",
        "lambda:GetFunction",
        "logs:DescribeLogStreams",
        "logs:FilterLogEvents",
        "logs:GetLogEvents",
        "logs:GetQueryResults",
        "logs:StartQuery",
        "logs:StopQuery"
      ],
      "Resource": "*"
    },
    {
      "Sid": "MonitorMetrics",
      "Effect": "Allow",
      "Action": [
        "apigateway:GET",
        "cloudwatch:GetMetricData",
        "cloudformation:ListStackResources"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ManageIssues",
      "Effect": "Allow",
      "Action": [
        "cloudformation:ListStackResources",
        "cloudformation:DescribeStacks",
        "logs:CreateLogGroup",
        "logs:DescribeSubscriptionFilters",
        "logs:PutSubscriptionFilter",
        "logs:DeleteSubscriptionFilter",
        "lambda:GetFunction"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ManageAPICustomDomain",
      "Effect": "Allow",
      "Action": [
        "iam:CreateServiceLinkedRole",
        "route53:ListHostedZones",
        "route53:ListResourceRecordSets",
        "route53:ChangeResourceRecordSets",
        "acm:ListCertificates",
        "acm:AddTagsToCertificate",
        "acm:RequestCertificate",
        "acm:DescribeCertificate",
        "acm:DeleteCertificate",
        "apigateway:GET",
        "apigateway:POST",
        "apigateway:DELETE",
        "cloudfront:UpdateDistribution"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ManageAPIAccessLog",
      "Effect": "Allow",
      "Action": [
        "iam:CreateRole",
        "apigateway:GET",
        "apigateway:PATCH",
        "logs:CreateLogGroup",
        "logs:DescribeLogGroups"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ManageAPIAccessLogIam",
      "Effect": "Allow",
      "Action": [
        "iam:AttachRolePolicy",
        "iam:PassRole"
      ],
      "Resource": [
        {
          "Fn::Sub": "arn:aws:iam::${AWS::AccountId}:role/APIGatewayLogsRole*"
        }
      ]
    }
  ]
}

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ServerlessFrameworkDeployPermissions",
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*"
    }
  ]
}