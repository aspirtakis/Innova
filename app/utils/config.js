const backendProd = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: 'cfe595a88b10a4aa5ef460660f6240bd3a72f89e411d31169579444145119f89',
  sessionUrl: 'user/session',
  tasks:'funnel/_table/funnel.tasks',
};

const backendDev = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: 'cfe595a88b10a4aa5ef460660f6240bd3a72f89e411d31169579444145119f89',
  sessionUrl: 'user/session',
  tasks:'funnel_dev/_table/funnel.tasks',
};


const backend = backendDev;

export { backend };
