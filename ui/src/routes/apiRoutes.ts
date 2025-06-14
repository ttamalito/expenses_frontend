import { ResumeOptionEnum } from '@clients';

export const constants = {
  Account: 'Account',
  login: 'login',
  Password: 'Password',
  Register: 'Register',
  User: 'User',
  profile: 'profile',
  Candidate: 'Candidate',
  Status: 'Status',
  Resume: 'Resume',
  Interview: 'Interview',
  Company: 'Company',
  Service: 'Service',
  Get: 'Get',
  Update: 'Update',
  Create: 'Create',
  JobDescriptor: 'JobDescriptor',
  JobPosition: 'JobPosition',
  Page: 'Page',
  Link: 'Link',
  Picture: 'Picture',
};

export const routes = {
  Account: {
    getAccount: `/${constants.Account}`,
    profile: `/${constants.Account}/${constants.profile}`,
    login: `/${constants.Account}/${constants.login}`,
    ChangePassword: `/${constants.Account}/${constants.Password}/${constants.Update}`,
    Register: `/${constants.Account}/${constants.Register}`,
    RegisterCompany: `/${constants.Account}/${constants.Register}/${constants.Company}`,
    RegisterCompanyUser: `/${constants.Account}/${constants.Register}/${constants.Company}/${constants.User}`,
    Update: `/${constants.Account}/${constants.Update}`,
    UpdatePicture: `/${constants.Account}/${constants.Picture}/${constants.Update}`,
  },
  Resume: {
    GetResumeStatus: `/${constants.Resume}/${constants.Status}`,
    GetResume: `/${constants.Resume}`,
    GetResumeForCandidate: (candidateId: number, option: ResumeOptionEnum) => {
      return `/${constants.Resume}/${option}/${constants.Candidate}/${candidateId}`;
    },
    UpdateResume: (option: string) => {
      return `/${constants.Resume}/${option}/${constants.Update}`;
    },
    CreateResume: (option: string) => {
      return `/${constants.Resume}/${option}/${constants.Create}`;
    },
    DeleteResume: (options: string, id: number) => {
      return `/${constants.Resume}/${options}/${id}`;
    },
  },
  Interview: {
    GetInterview: (candidateId: number) => {
      return `/${constants.Interview}/${constants.Candidate}/${candidateId}`;
    },
    UpdateInterview: `/${constants.Interview}/${constants.Update}`,
    CreateInterview: `/${constants.Interview}/${constants.Create}`,
  },
  JobDescriptor: {
    GetJobDescriptor: (jobDescriptorId: number) => {
      return `/${constants.JobDescriptor}/${jobDescriptorId}`;
    },
    UpdateJobDescriptor: `/${constants.JobDescriptor}/${constants.Update}`,
    CreateJobDescriptor: `/${constants.JobDescriptor}/${constants.Create}`,
    ListJobDescriptors: `/${constants.JobDescriptor}/${constants.Page}`,
    LinkCandidate: (jobDescriptorId: number, candidateId: number) => {
      return `/${constants.JobDescriptor}/${jobDescriptorId}/${constants.Candidate}/${candidateId}/${constants.Link}`;
    },
  },
  JobPosition: {
    GetJobPosition: (jobPositionId: number) => {
      return `/${constants.JobPosition}/${jobPositionId}`;
    },
    UpdateJobPosition: `/${constants.JobPosition}/${constants.Update}`,
    CreateJobPosition: `/${constants.JobPosition}/${constants.Create}`,
    ListJobPositions: `/${constants.JobPosition}/${constants.Page}`,
  },
  Candidate: {
    ListCandidates: `/${constants.Candidate}/${constants.Page}`,
  },
  Company: {
    GetCompany: (companyId: number) => {
      return `/${constants.Company}/${companyId}`;
    },
    UpdateCompany: `/${constants.Company}/${constants.Update}`,
    ListCompanies: `/${constants.Company}/${constants.Page}`,
    GetService: (serviceId: number) => {
      return `/${constants.Company}/${constants.Service}/${serviceId}`;
    },
    ListServices: `/${constants.Company}/${constants.Service}/${constants.Page}`,
    CreateCompanyService: `/${constants.Company}/${constants.Service}/${constants.Create}`,
  },
};
