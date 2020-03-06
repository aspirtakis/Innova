const backendProd = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: 'cfe595a88b10a4aa5ef460660f6240bd3a72f89e411d31169579444145119f89',
  sessionUrl: 'user/session',
  tasks: 'funnel/_table/funnel.tasks',
  remarks: 'funnel/_table/funnel.remarks',
  assumptions: 'funnel/_table/funnel.assumptions',
  checklists: 'funnel/_table/funnel.checklists',
  stageGates: 'funnel/_table/funnel.stagegates',
  defUser: '',
  defPass: '',
};

const backendDev = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: 'cfe595a88b10a4aa5ef460660f6240bd3a72f89e411d31169579444145119f89',
  sessionUrl: 'user/session',
  tasks: 'funnel_dev/_table/funnel.tasks',
  remarks: 'funnel_dev/_table/funnel.remarks',
  assumptions: 'funnel_dev/_table/funnel.assumptions',
  checklists: 'funnel_dev/_table/funnel.checklists',
  stageGates: 'funnel_dev/_table/funnel.stagegates',
  defUser: '',
  defPass: '',
};
const backendAga = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: 'cfe595a88b10a4aa5ef460660f6240bd3a72f89e411d31169579444145119f89',
  sessionUrl: 'user/session',
  tasks: 'funnel_dev/_table/funnel.tasks',
  remarks: 'funnel_dev/_table/funnel.remarks',
  assumptions: 'funnel_dev/_table/funnel.assumptions',
  checklists: 'funnel_dev/_table/funnel.checklists',
  stageGates: 'funnel_dev/_table/funnel.stagegates',
  defUser: 'agamemnon.aspirtakis@kpn.com',
  defPass: 'a224935a',
};
const backendAgaSTG = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: 'cfe595a88b10a4aa5ef460660f6240bd3a72f89e411d31169579444145119f89',
  sessionUrl: 'user/session',
  tasks: 'FunnSTG/_table/funnel.tasks',
  remarks: 'FunnSTG/_table/funnel.remarks',
  assumptions: 'FunnSTG/_table/funnel.assumptions',
  checklists: 'FunnSTG/_table/funnel.checklists',
  stageGates: 'FunnSTG/_table/funnel.stagegates',
  defUser: 'agamemnon.aspirtakis@kpn.com',
  defPass: 'a224935a',
};



const backend = backendAga;

export { backend };
