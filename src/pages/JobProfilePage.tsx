import JobProfileForm from "@/components/job/JobProfileForm";

const JobProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="pt-8 pb-4 px-4 sm:px-6 text-center">
        <div className=" mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Find Your Dream
            <span className="text-gradient-maroon"> Job</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Create your profile and let companies find you
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8 px-4 sm:px-6">
        <JobProfileForm />
      </section>
    </div>
  );
};

export default JobProfilePage;
