// src/utils/taskConfigurations.js

export const taskConfigurations = {
  email: {
    taskName: "Email",
    stages: [
      { stageName: "Email Copy", duration: 1, requiresClientsAttention: true, conditionKey: "copyAssistance" },
      { stageName: "Email Design", duration: 2, requiresClientsAttention: true },
      { stageName: "Email Design Revision", duration: 2, requiresClientsAttention: true, conditionKey: "designRevisions" },
      { stageName: "Email Simple Animation", duration: 1, requiresClientsAttention: true, conditionKey: "simpleAnimation" },
      { stageName: "Email Complex Animation", duration: 2, requiresClientsAttention: true, conditionKey: "complexAnimation" },
      { stageName: "Email Production", duration: 1, requiresClientsAttention: true },
      { stageName: "Email Dynamic Content", duration: 1, requiresClientsAttention: true, conditionKey: "dynamicContent" },
      { stageName: "Email Production Revision", duration: 2, requiresClientsAttention: true, conditionKey: "productionRevisions" },
      { stageName: "Email Editable", duration: 1, requiresClientsAttention: true, conditionKey: "emailEditable" },
      { stageName: "Email Schedule/Send", duration: 1, requiresClientsAttention: true, conditionKey: "emailScheduleSend" },
    ]
  },
  landingPage: {
    taskName: "Landing Page",
    stages: [
      { stageName: "LP Copy", duration: 1, requiresClientsAttention: true, conditionKey: "copyAssistance" },
      { stageName: "LP Design", duration: 2, requiresClientsAttention: true },
      { stageName: "LP Design Revision", duration: 2, requiresClientsAttention: true, conditionKey: "designRevisions" },
      { stageName: "LP Simple Animation", duration: 1, requiresClientsAttention: true, conditionKey: "simpleAnimation" },
      { stageName: "LP Complex Animation", duration: 2, requiresClientsAttention: true, conditionKey: "complexAnimation" },
      { stageName: "LP Production", duration: 1, requiresClientsAttention: true },
      { stageName: "LP Dynamic Content", duration: 1, requiresClientsAttention: true, conditionKey: "dynamicContent" },
      { stageName: "LP Production Revision", duration: 2, requiresClientsAttention: true, conditionKey: "productionRevisions" },
      { stageName: "LP Editable/Review", duration: 1, requiresClientsAttention: true, conditionKey: "lpEditableReview" },
    ]
  }
};
