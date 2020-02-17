const backendProd = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: 'cfe595a88b10a4aa5ef460660f6240bd3a72f89e411d31169579444145119f89',
  sessionUrl: 'user/session',
  tasks: 'funnel/_table/funnel.tasks',
  defUser:'',
  defPass:''
};

const backendDev = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: 'cfe595a88b10a4aa5ef460660f6240bd3a72f89e411d31169579444145119f89',
  sessionUrl: 'user/session',
  tasks:'funnel_dev/_table/funnel.tasks',
  defUser:'',
  defPass:''
};
const backendAga = {
  beUrl: 'https://aws.openinnovationhub.nl/api/v2/',
  apptoken: 'cfe595a88b10a4aa5ef460660f6240bd3a72f89e411d31169579444145119f89',
  sessionUrl: 'user/session',
  tasks:'funnel_dev/_table/funnel.tasks',
  defUser:'agamemnon.aspirtakis@kpn.com',
  defPass:'a224935a'
};



const backend = backendAga;

export { backend };