const backendProd = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: '35eeec37d6439c878471b426502d6b3903b023bb16d909000100dc912883fb74',
  sessionUrl: 'user/session',
  system: 'system/user?related=user_to_app_to_role_by_user_id&order=name%20ASC',
  tasks: 'funnel/_table/funnel.tasks',
  remarks: 'funnel/_table/funnel.remarks',
  assumptions: 'funnel/_table/funnel.assumptions',
  checklists: 'funnel/_table/funnel.checklists',
  stageGates: 'funnel/_table/funnel.stagegates',
  passreset: 'user/password?reset=true',
  defUser: '',
  defPass: '',
};

const backendDev = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: '35eeec37d6439c878471b426502d6b3903b023bb16d909000100dc912883fb74',
  sessionUrl: 'user/session',
  system: 'system/user?related=user_to_app_to_role_by_user_id&order=name%20ASC',
  tasks: 'funnel_dev/_table/funnel.tasks',
  remarks: 'funnel_dev/_table/funnel.remarks',
  assumptions: 'funnel_dev/_table/funnel.assumptions',
  checklists: 'funnel_dev/_table/funnel.checklists',
  stageGates: 'funnel_dev/_table/funnel.stagegates',
  passreset: 'user/password?reset=true',
  defUser: '',
  defPass: '',
};
const backendAga = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: '35eeec37d6439c878471b426502d6b3903b023bb16d909000100dc912883fb74',
  sessionUrl: 'user/session',
  system: 'system/user?related=user_to_app_to_role_by_user_id&order=name%20ASC',
  tasks: 'funnel_dev/_table/funnel.tasks',
  remarks: 'funnel_dev/_table/funnel.remarks',
  assumptions: 'funnel_dev/_table/funnel.assumptions',
  checklists: 'funnel_dev/_table/funnel.checklists',
  stageGates: 'funnel_dev/_table/funnel.stagegates',
  passreset: 'user/password?reset=true',
  defUser: 'agamemnon.aspirtakis@kpn.com',
  defPass: 'a224935a',
};
const backendAgaSTG = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: '35eeec37d6439c878471b426502d6b3903b023bb16d909000100dc912883fb74',
  sessionUrl: 'user/session',
  system: 'system/user?related=user_to_app_to_role_by_user_id&order=name%20ASC',
  tasks: 'FunnSTG/_table/funnel.tasks',
  remarks: 'FunnSTG/_table/funnel.remarks',
  assumptions: 'FunnSTG/_table/funnel.assumptions',
  checklists: 'FunnSTG/_table/funnel.checklists',
  stageGates: 'FunnSTG/_table/funnel.stagegates',
  passreset: 'user/password?reset=true',
  defUser: 'agamemnon.aspirtakis@kpn.com',
  defPass: 'a224935a',
};
const backendSTG = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: '35eeec37d6439c878471b426502d6b3903b023bb16d909000100dc912883fb74',
  sessionUrl: 'user/session',
  system: 'system/user?related=user_to_app_to_role_by_user_id&order=name%20ASC',
  tasks: 'FunnSTG/_table/funnel.tasks',
  remarks: 'FunnSTG/_table/funnel.remarks',
  assumptions: 'FunnSTG/_table/funnel.assumptions',
  checklists: 'FunnSTG/_table/funnel.checklists',
  stageGates: 'FunnSTG/_table/funnel.stagegates',
  passreset: 'user/password?reset=true',
  defUser: '',
  defPass: '',
};



const backend = backendProd;
export { backend };