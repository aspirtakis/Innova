const backendProd = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: 'cfe595a88b10a4aa5ef460660f6240bd3a72f89e411d31169579444145119f89',
  sessionUrl: 'user/session',
  system: 'system/user?related=user_to_app_to_role_by_user_id&order=name%20ASC',
  tasks: 'funnel/_table/funnel.tasks',
  remarks: 'funnel/_table/funnel.remarks',
  assumptions: 'funnel/_table/funnel.assumptions',
  checklists: 'funnel/_table/funnel.checklists',
  stageGates: 'funnel/_table/funnel.stagegates',
  passrst:'user/password',
  defUser: '',
  defPass: '',
};

const backendDev = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: 'cfe595a88b10a4aa5ef460660f6240bd3a72f89e411d31169579444145119f89',
  sessionUrl: 'user/session',
  system: 'system/user?related=user_to_app_to_role_by_user_id&order=name%20ASC',
  tasks: 'funnel_dev/_table/funnel.tasks',
  remarks: 'funnel_dev/_table/funnel.remarks',
  assumptions: 'funnel_dev/_table/funnel.assumptions',
  checklists: 'funnel_dev/_table/funnel.checklists',
  stageGates: 'funnel_dev/_table/funnel.stagegates',
  passrst:'user/password',
  defUser: '',
  defPass: '',
};
const backendAga = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: 'cfe595a88b10a4aa5ef460660f6240bd3a72f89e411d31169579444145119f89',
  sessionUrl: 'user/session',
  system: 'system/user?related=user_to_app_to_role_by_user_id&order=name%20ASC',
  tasks: 'funnel_dev/_table/funnel.tasks',
  remarks: 'funnel_dev/_table/funnel.remarks',
  assumptions: 'funnel_dev/_table/funnel.assumptions',
  checklists: 'funnel_dev/_table/funnel.checklists',
  stageGates: 'funnel_dev/_table/funnel.stagegates',
  passrst:'user/password',
  defUser: 'agamemnon.aspirtakis@kpn.com',
  defPass: 'a224935a',
};
const backendAgaSTG = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: 'cfe595a88b10a4aa5ef460660f6240bd3a72f89e411d31169579444145119f89',
  sessionUrl: 'user/session',
  system: 'system/user?related=user_to_app_to_role_by_user_id&order=name%20ASC',
  tasks: 'FunnSTG/_table/funnel.tasks',
  remarks: 'FunnSTG/_table/funnel.remarks',
  assumptions: 'FunnSTG/_table/funnel.assumptions',
  checklists: 'FunnSTG/_table/funnel.checklists',
  stageGates: 'FunnSTG/_table/funnel.stagegates',
  passrst:'user/password',
  defUser: 'agamemnon.aspirtakis@kpn.com',
  defPass: 'a224935a',
};
const backendSTG = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: 'cfe595a88b10a4aa5ef460660f6240bd3a72f89e411d31169579444145119f89',
  sessionUrl: 'user/session',
  system: 'system/user?related=user_to_app_to_role_by_user_id&order=name%20ASC',
  tasks: 'FunnSTG/_table/funnel.tasks',
  remarks: 'FunnSTG/_table/funnel.remarks',
  assumptions: 'FunnSTG/_table/funnel.assumptions',
  checklists: 'FunnSTG/_table/funnel.checklists',
  stageGates: 'FunnSTG/_table/funnel.stagegates',
  passrst:'user/password',
  defUser: '',
  defPass: '',
};



const backend = backendProd;
export { backend };