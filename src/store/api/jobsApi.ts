import { rootApiSlice } from "./rootApiSlice";

// Types corresponding to your backend DTOs
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
  ON_SITE: "On-site",
  REMOTE: "Remote",
  HYBRID: "Hybrid",
} as const;
export type WorkMode = (typeof WorkMode)[keyof typeof WorkMode];

// DTO Interfaces
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

export interface CreateJobProfileDto {
  profileType: JobProfileType;
  searchStatus?: JobSearchStatus;
  aboutMe?: string;
  profileImageUrl?: string;

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
  resumeUrl?: string;
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

// Response Types (Simplified for generic usage)
export interface JobProfileResponse {
  id: string;
  userId: string;
  profileType: JobProfileType;
  // ... include other fields returned by backend
}

export interface JobPostResponse {
  id: string;
  jobTitle: string;
  companyName: string; // If populated
  // ... include other fields
  isApplied?: boolean; // For seeker feed
}

export interface ApplicantResponse {
  id: string;
  candidateName: string;
  status: string;
  // ... details
}

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

    // 3. Get Feed (Seeker: Jobs, Recruiter: Candidates)
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

    // 4. Apply for Job (Seeker)
    applyForJob: builder.mutation<void, { jobId: string; body: ApplyJobDto }>({
      query: ({ jobId, body }) => ({
        url: `/jobs/apply/${jobId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["JobFeed", "Profile"], // To update 'isApplied' status
    }),

    // 5. Get Applicants (Recruiter)
    getApplicants: builder.query<ApplicantResponse[], string>({
      query: (jobId) => ({
        url: `/jobs/applicants/${jobId}`,
        method: "GET",
      }),
      providesTags: ["Applicants", "Profile"],
    }),
  }),
});

export const {
  useCreateOrUpdateProfileMutation,
  useCreateJobPostMutation,
  useGetJobFeedQuery,
  useApplyForJobMutation,
  useGetApplicantsQuery,
} = jobsApi;
