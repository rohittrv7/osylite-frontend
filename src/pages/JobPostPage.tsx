import { Briefcase, Users, Zap } from 'lucide-react';
import JobPostForm from '@/components/job/JobPostForm';

const JobPostPage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-display font-bold text-foreground">
              Job<span className="text-gold">Hai</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4 text-primary" />
              50 Lakh+ Candidates
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-primary" />
              Quick Hiring
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-8 pb-4 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Hire the Right
            <span className="text-gradient-maroon"> Talent</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Post your job and get applications from verified candidates
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-4">
          {[
            { label: 'Active Job Seekers', value: '50 Lakh+' },
            { label: 'Jobs Posted', value: '5 Lakh+' },
            { label: 'Successful Hires', value: '10 Lakh+' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center px-6 py-3 rounded-xl bg-card border border-border shadow-sm"
            >
              <span className="text-2xl font-bold text-primary font-display">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8 px-4 sm:px-6">
        <JobPostForm />
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 mt-8 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 JobHai. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default JobPostPage;
