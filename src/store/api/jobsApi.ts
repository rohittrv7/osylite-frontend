import { rootApiSlice } from "./rootApiSlice";

// --- Enums / Constants ---
export const JobProfileType = {
  CANDIDATE: "candidate",
  RECRUITER: "recruiter",
} as const;
export type JobProfileType =
  (typeof JobProfileType)[keyof typeof JobProfileType];

export const JobSearchStatus = {
  ACTIVELY_LOOKING: "actively_looking",
  CASUALLY_LOOKING: "casually_looking",
  NOT_LOOKING: "not_looking",
  IMMEDIATE_JOINER: "immediate_joiner",
} as const;
export type JobSearchStatus =
  (typeof JobSearchStatus)[keyof typeof JobSearchStatus];

export const JobType = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  INTERNSHIP: "Internship",
  CONTRACT: "Contract",
  FREELANCE: "Freelance",
} as const;
export type JobType = (typeof JobType)[keyof typeof JobType];

export const WorkMode = {
  ON_SITE: "On-Site", // Office aana padega
  REMOTE: "Remote", // Work From Home
  HYBRID: "Hybrid", // Mix
} as const;
export type WorkMode = (typeof WorkMode)[keyof typeof WorkMode];

export interface JobSearchDto {
  keyword?: string;
  location?: string;
  jobType?: string;
  workMode?: string;
  minSalary?: number;
}

// Response Interface based on your JSON
export interface JobResponse {
  id: string;
  jobTitle: string;
  companyName: string;
  roleCategory: string;
  city: string;
  state: string;
  minSalary: number;
  maxSalary: number;
  jobType: string;
  workMode: string;
  skillsRequired: string[];
  experienceRequired: string;
  vacancies: number;
  viewsCount: number;
  applicationsCount: number;
  createdAt: string;
  isActive: boolean;
  recruiter: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    jobProfile?: {
      companyAddress?: string;
      profileImageUrl?: string;
    };
    isApplied: boolean; // Add this field to indicate if the user has applied
  };
}

// --- DTO Interfaces ---

export interface EducationDto {
  degree: string;
  college: string;
  yearOfPassing: number;
}

export interface WorkHistoryDto {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description?: string;
}

// Profile Creation DTO
export interface CreateJobProfileDto {
  profileType: JobProfileType;
  searchStatus?: JobSearchStatus;
  aboutMe?: string;
  profileImageUrl?: string;
  resumeUrl?: string; // Correct place for resume URL

  // Candidate Fields
  currentJobTitle?: string;
  totalExperienceYears?: number;
  highestQualification?: string;
  skills?: string[];
  expectedSalary?: string;
  noticePeriod?: string;
  preferredLocations?: string[];
  education?: EducationDto[];
  workHistory?: WorkHistoryDto[];

  // Recruiter Fields
  companyName?: string;
  designation?: string;
  hiringIndustry?: string;
  officialEmail?: string;
  companyWebsite?: string;
  operatingCity?: string;
  companyAddress?: string;
  hiringFocus?: string[];
  jobType?: string[]; // e.g. ["Full Time", "Internship"]
  workMode?: string[];
}

// Job Posting DTO (Matches Backend Exactly)
export interface CreateJobPostDto {
  jobTitle: string;
  roleCategory: string;
  description: string;
  city: string;
  state: string;
  address?: string;
  minSalary: number;
  maxSalary: number;
  jobType: JobType;
  workMode: WorkMode;
  skillsRequired: string[];
  experienceRequired: string;
  vacancies: number;
}

export interface ApplyJobDto {
  coverLetter?: string;
}

export interface JobFeedFilterDto {
  city?: string;
  role?: string;
  skill?: string;
  minSalary?: number;
  minExperience?: number;
}

// --- Response Types ---
export interface JobProfileResponse {
  id: string;
  userId: string;
  profileType: JobProfileType;
}

export interface JobPostResponse {
  id: string;
  jobTitle: string;
  companyName: string;
  isApplied?: boolean;
}

export interface ApplicantResponse {
  id: string;
  candidateName: string;
  status: string;
}

export interface JobSearchDto {
  keyword?: string;
  location?: string;
  jobType?: string;
  workMode?: string;
  minSalary?: number;
}

// Response Interface based on your JSON
// export interface JobResponse {
//   id: string;
//   jobTitle: string;
//   companyName: string;
//   roleCategory: string;
//   city: string;
//   state: string;
//   minSalary: number;
//   maxSalary: number;
//   jobType: string;
//   workMode: string;
//   skillsRequired: string[];
//   experienceRequired: string;
//   vacancies: number;
//   viewsCount: number;
//   applicationsCount: number;
//   createdAt: string;
//   recruiter: {
//     id: string;
//     firstName: string;
//     lastName: string;
//     avatarUrl?: string;
//     jobProfile?: {
//       companyAddress?: string;
//       profileImageUrl?: string;
//     };
//   };
//   isApplied: boolean; // Add this field to indicate if the user has applied
// }

export interface ApplicantDto {
  applicationId: string;
  status: string;
  appliedAt: string;
  coverLetter?: string;
  candidate: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    profile: {
      title: string;
      experience: number;
      skills: string[];
      resumeUrl?: string;
      education: { degree: string; college: string }[];
    } | null;
  };
}

export interface MatchingCandidateDto {
  id: string; // Profile ID
  currentJobTitle: string;
  skills: string[];
  totalExperienceYears: number;
  user: {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    avatarUrl?: string;
  };
}

// --- API Slice ---
export const jobsApi = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Create/Update Profile
    createOrUpdateProfile: builder.mutation<
      JobProfileResponse,
      CreateJobProfileDto
    >({
      query: (body) => ({
        url: "/jobs/profile",
        method: "POST",
        body,
      }),
      invalidatesTags: ["JobProfile", "Profile"],
    }),

    // 2. Post Job (Recruiter)
    createJobPost: builder.mutation<JobPostResponse, CreateJobPostDto>({
      query: (body) => ({
        url: "/jobs/post",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MyJobs", "JobFeed", "Profile"],
    }),

    // 3. Get Feed
    getJobFeed: builder.query<
      JobPostResponse[] | JobProfileResponse[],
      JobFeedFilterDto
    >({
      query: (params) => ({
        url: "/jobs/feed",
        method: "GET",
        params,
      }),
      providesTags: ["JobFeed", "Profile"],
    }),

    // 5. Get Applicants
    getApplicants: builder.query<ApplicantResponse[], string>({
      query: (jobId) => ({
        url: `/jobs/applicants/${jobId}`,
        method: "GET",
      }),
      providesTags: ["Applicants", "Profile"],
    }),

    getRecommendedJobs: builder.query<JobResponse[], void>({
      query: () => ({
        url: "/jobs/recommendations",
        method: "GET",
      }),
      providesTags: ["JobFeed"],
    }),

    // 2. Search Jobs (Manual filters)
    searchJobs: builder.query<JobResponse[], JobSearchDto>({
      query: (params) => ({
        url: "/jobs/search",
        method: "GET",
        params,
      }),
      providesTags: ["JobFeed"],
    }),

    applyForJob: builder.mutation<void, { jobId: string; body: ApplyJobDto }>({
      query: ({ jobId, body }) => ({
        url: `/jobs/apply/${jobId}`,
        method: "POST",
        body,
      }),
      // "JobFeed" invalidate karne se list refresh hogi aur button "Applied" show karega
      invalidatesTags: ["JobFeed", "Profile"],
    }),

    getJobApplicants: builder.query<ApplicantDto[], string>({
      query: (jobId) => ({
        url: `/jobs/applicants/${jobId}`,
        method: "GET",
      }),
      providesTags: ["Applicants"],
    }),

    // 7. Get AI/Matching Candidates for a specific Job (Recruiter Only)
    getMatchingCandidates: builder.query<MatchingCandidateDto[], string>({
      query: (jobId) => ({
        url: `/jobs/matches/${jobId}`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    getMyPostedJobs: builder.query<JobResponse[], void>({
      query: () => ({
        url: "/jobs/my-posts", // Backend endpoint: GET /jobs/my-posts
        method: "GET",
      }),
      providesTags: ["MyJobs"],
    }),

    updateJobPost: builder.mutation<
      JobResponse,
      {
        jobId: string;
        body: Partial<CreateJobPostDto> & { isActive?: boolean };
      }
    >({
      query: ({ jobId, body }) => ({
        url: `/jobs/${jobId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["MyJobs", "JobFeed", "Profile"],
    }),

    getJobById: builder.query<JobResponse, string>({
      query: (jobId) => ({
        url: `/jobs/${jobId}`, // Assuming backend has GET /jobs/:id
        method: "GET",
      }),
      providesTags: (_result, _err, id) => [{ type: "JobFeed", id }],
    }),
  }),
});

export const {
  useCreateOrUpdateProfileMutation,
  useCreateJobPostMutation,
  useGetJobFeedQuery,
  useApplyForJobMutation,
  useGetApplicantsQuery,
  useGetRecommendedJobsQuery,
  useSearchJobsQuery,
  useGetJobApplicantsQuery,
  useGetMatchingCandidatesQuery,
  useGetMyPostedJobsQuery,
  useUpdateJobPostMutation,
  useGetJobByIdQuery,
} = jobsApi;
