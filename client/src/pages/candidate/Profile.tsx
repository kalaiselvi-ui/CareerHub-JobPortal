import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Pencil, X, Loader2 } from "lucide-react";
import ProfileHeader from "../../components/candidate-profile/ProfileHeader.tsx";
import ProfileCompletion from "../../components/candidate-profile/ProfileCompletion.tsx";
import AboutSection from "../../components/candidate-profile/AboutSection.tsx";
import AboutModal from "../../components/candidate-profile/AboutModal.tsx";
import SkillsSection from "../../components/candidate-profile/SkillsSection.tsx";
import ExperienceSection from "../../components/candidate-profile/ExperienceSection.tsx";
import ExperienceModal from "../../components/candidate-profile/ExperienceModal.tsx";
import EducationSection from "../../components/candidate-profile/EducationSection.tsx";
import ResumeSection from "../../components/candidate-profile/ResumeSection.tsx";
import ResumeModal from "../../components/candidate-profile/ResumeModal.tsx";
import EducationModal from "../../components/candidate-profile/EducationModal.tsx";
import SocialLinksSection from "../../components/candidate-profile/SocialLinksSection.tsx";
import { useCandidateProfile } from "../../hooks/useCandidateProfile.ts";
import { useAuthStore } from "../../store/authStore.ts";
import {
  useCreateCandidateProfile,
  useUpdateCandidateProfile,
} from "../../mutations/candidateMutation.ts";

// --- TYPES ---
export interface BasicInfoForm {
  fullName: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
}

export interface AboutForm {
  bio: string;
}

export interface SkillsForm {
  skillsText: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export interface ResumeType {
  name: string;
  date: string;
  url?: string;
}

export interface SocialLinksForm {
  linkedin: string;
  github: string;
  portfolio: string;
}

export default function CandidateProfile() {
  // Modal toggle state
  const [activeModal, setActiveModal] = useState<
    | "basic"
    | "about"
    | "skills"
    | "experience"
    | "education"
    | "resume"
    | "social"
    | null
  >(null);

  // Active editing targets
  const [editingExperience, setEditingExperience] =
    useState<ExperienceItem | null>(null);
  const [editingEducation, setEditingEducation] =
    useState<EducationItem | null>(null);

  // Local component states
  const [basicInfo, setBasicInfo] = useState<BasicInfoForm>({
    fullName: "",
    headline: "",
    location: "",
    email: "",
    phone: "",
  });
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [educations, setEducations] = useState<EducationItem[]>([]);
  const [resume, setResume] = useState<ResumeType | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLinksForm>({
    linkedin: "",
    github: "",
    portfolio: "",
  });

  // --- REACT HOOK FORMS ---
  const basicInfoForm = useForm<BasicInfoForm>();
  const aboutForm = useForm<AboutForm>({ defaultValues: { bio } });
  const skillsForm = useForm<SkillsForm>();
  const experienceForm = useForm<ExperienceItem>();
  const educationForm = useForm<EducationItem>();
  const socialLinksForm = useForm<SocialLinksForm>();

  const { data: profile, isLoading, isError } = useCandidateProfile();
  const { user } = useAuthStore();

  const { mutate: createProfile, isPending: isCreating } =
    useCreateCandidateProfile();
  const { mutate: updateProfile, isPending: isUpdating } =
    useUpdateCandidateProfile();

  const isSaving = isCreating || isUpdating;

  // Sync API data / User store to React local state once loaded
  useEffect(() => {
    if (profile) {
      setBasicInfo({
        fullName:
          profile.basicInfo?.fullName ||
          profile.userId?.fullName ||
          user?.fullName ||
          "",
        email:
          profile.basicInfo?.email ||
          profile.userId?.email ||
          user?.email ||
          "",
        headline: profile.headline || profile.basicInfo?.headline || "",
        location: profile.basicInfo?.location || profile.userId?.location || "",
        phone: profile.basicInfo?.phone || profile.userId?.phone || "",
      });

      if (profile.bio) setBio(profile.bio);
      if (profile.skills) setSkills(profile.skills);
      if (profile.experience) setExperiences(profile.experience);
      if (profile.education) setEducations(profile.education);
      if (profile.resume) {
        setResume({
          name:
            typeof profile.resume === "string"
              ? "Uploaded Resume"
              : profile.resume.name,
          date: "Uploaded",
          url:
            typeof profile.resume === "string"
              ? profile.resume
              : profile.resume.url,
        });
      }
      if (profile.socialLinks) setSocialLinks(profile.socialLinks);
    } else if (user) {
      setBasicInfo((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        email: user.email || "",
      }));
    }
  }, [profile, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-light">
        <p className="text-slate-500 font-medium">Loading profile data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-light">
        <p className="text-red-500 font-medium">
          Failed to load profile. Please try again.
        </p>
      </div>
    );
  }

  // Helper to construct FormData dynamically
  const buildProfileFormData = (
    overrides: {
      fullName?: string;
      location?: string;
      email?: string;
      phone?: string;
      headline?: string;
      bio?: string;
      skills?: string[];
      experience?: ExperienceItem[];
      education?: EducationItem[];
      socialLinks?: SocialLinksForm;
      file?: File | null;
    } = {},
  ) => {
    const formData = new FormData();
    formData.append("fullName", overrides.fullName ?? basicInfo.fullName);
    formData.append("headline", overrides.headline ?? basicInfo.headline);
    formData.append("location", overrides.location ?? basicInfo.location);
    formData.append("email", overrides.email ?? basicInfo.email);
    formData.append("phone", overrides.phone ?? basicInfo.phone);
    formData.append("bio", overrides.bio ?? bio);
    formData.append("skills", JSON.stringify(overrides.skills ?? skills));
    formData.append(
      "experience",
      JSON.stringify(overrides.experience ?? experiences),
    );
    formData.append(
      "education",
      JSON.stringify(overrides.education ?? educations),
    );
    formData.append(
      "socialLinks",
      JSON.stringify(overrides.socialLinks ?? socialLinks),
    );

    const fileToUpload =
      overrides.file !== undefined ? overrides.file : resumeFile;
    if (fileToUpload) {
      formData.append("resume", fileToUpload);
    }

    return formData;
  };

  // Helper to save profile automatically choosing create or update API mutation
  const saveProfileData = (
    formData: FormData,
    onSuccessCallback?: () => void,
  ) => {
    const mutationFn = profile ? updateProfile : createProfile;
    mutationFn(formData, {
      onSuccess: (data) => {
        console.log("PROFILE SAVED:", data);

        if (onSuccessCallback) onSuccessCallback();
      },
      onError: (error) => {
        console.log("PROFILE SAVE ERROR:", error);
      },
    });
  };

  // --- Handlers ---
  const handleOpenBasic = () => {
    basicInfoForm.reset(basicInfo);
    setActiveModal("basic");
  };

  const handleOpenAbout = () => {
    aboutForm.reset({ bio });
    setActiveModal("about");
  };

  const handleOpenSkills = () => {
    skillsForm.reset({ skillsText: skills.join(", ") });
    setActiveModal("skills");
  };

  const handleOpenAddExperience = () => {
    setEditingExperience(null);
    experienceForm.reset({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: "",
    });
    setActiveModal("experience");
  };

  const handleOpenEditExperience = (item: ExperienceItem) => {
    setEditingExperience(item);
    experienceForm.reset(item);
    setActiveModal("experience");
  };

  const handleOpenAddEducation = () => {
    setEditingEducation(null);
    educationForm.reset({
      degree: "",
      fieldOfStudy: "",
      institution: "",
      startDate: "",
      endDate: "",
    });
    setActiveModal("education");
  };

  const handleOpenEditEducation = (item: EducationItem) => {
    setEditingEducation(item);
    educationForm.reset(item);
    setActiveModal("education");
  };

  const handleOpenSocial = () => {
    socialLinksForm.reset(socialLinks);
    setActiveModal("social");
  };

  // --- Submit Handlers ---
  const onSubmitBasic = (data: BasicInfoForm) => {
    setBasicInfo(data);
    const formData = buildProfileFormData({ ...data });
    saveProfileData(formData, () => setActiveModal(null));
  };

  const onSubmitAbout = (data: AboutForm) => {
    setBio(data.bio);
    const formData = buildProfileFormData({ bio: data.bio });
    saveProfileData(formData, () => setActiveModal(null));
  };

  const onSubmitSkills = (data: SkillsForm) => {
    const list = data.skillsText
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    setSkills(list);
    const formData = buildProfileFormData({ skills: list });
    saveProfileData(formData, () => setActiveModal(null));
  };

  const onSubmitExperience = (data: ExperienceItem) => {
    let updatedExperiences: ExperienceItem[];
    if (editingExperience) {
      updatedExperiences = experiences.map((exp) =>
        exp.id === editingExperience.id ? { ...data, id: exp.id } : exp,
      );
    } else {
      updatedExperiences = [
        ...experiences,
        { ...data, id: Date.now().toString() },
      ];
    }
    setExperiences(updatedExperiences);
    const formData = buildProfileFormData({ experience: updatedExperiences });
    saveProfileData(formData, () => setActiveModal(null));
  };

  const handleDeleteExperience = (id: string) => {
    const updatedExperiences = experiences.filter((exp) => exp.id !== id);
    setExperiences(updatedExperiences);
    const formData = buildProfileFormData({ experience: updatedExperiences });
    saveProfileData(formData);
  };

  const onSubmitEducation = (data: EducationItem) => {
    let updatedEducations: EducationItem[];
    if (editingEducation) {
      updatedEducations = educations.map((edu) =>
        edu.id === editingEducation.id ? { ...data, id: edu.id } : edu,
      );
    } else {
      updatedEducations = [
        ...educations,
        { ...data, id: Date.now().toString() },
      ];
    }
    setEducations(updatedEducations);
    const formData = buildProfileFormData({ education: updatedEducations });
    saveProfileData(formData, () => setActiveModal(null));
  };

  const handleDeleteEducation = (id: string) => {
    const updatedEducations = educations.filter((edu) => edu.id !== id);
    setEducations(updatedEducations);
    const formData = buildProfileFormData({ education: updatedEducations });
    saveProfileData(formData);
  };

  const onSubmitSocial = (data: SocialLinksForm) => {
    setSocialLinks(data);
    const formData = buildProfileFormData({ socialLinks: data });
    saveProfileData(formData, () => setActiveModal(null));
  };

  const handleSaveResume = (file: File) => {
    setResumeFile(file);
    setResume({
      name: file.name,
      date: new Date().toLocaleDateString(),
    });
    const formData = buildProfileFormData({ file });
    saveProfileData(formData, () => setActiveModal(null));
  };

  // Completion Checklist Calculator
  const completionItems = [
    { label: "Headline", completed: Boolean(basicInfo.headline) },
    { label: "About", completed: Boolean(bio) },
    { label: "Resume", completed: Boolean(resume) },
    { label: "Skills", completed: skills.length > 0 },
    { label: "Experience", completed: experiences.length > 0 },
    { label: "Education", completed: educations.length > 0 },
    {
      label: "Social Links",
      completed: Boolean(socialLinks.linkedin || socialLinks.github),
    },
  ];

  const completedCount = completionItems.filter((i) => i.completed).length;
  const completionPercentage = Math.round(
    (completedCount / completionItems.length) * 100,
  );

  return (
    <div className="min-h-screen bg-surface-light text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* PAGE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              My Profile
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Build your professional profile and help recruiters discover you.
            </p>
          </div>
          <button
            onClick={handleOpenBasic}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border-subtle hover:bg-slate-50 text-slate-700 font-medium text-sm rounded-xl shadow-xs transition-colors self-start sm:self-auto"
          >
            <Pencil className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        {/* MAIN PROFILE SECTIONS */}
        <div className="space-y-6">
          <ProfileHeader
            basicInfo={basicInfo}
            completionPercentage={completionPercentage}
            onEdit={() => setActiveModal("basic")}
          />

          <ProfileCompletion completionItems={completionItems} />

          <AboutSection bio={bio} onEdit={handleOpenAbout} />
          {activeModal === "about" && (
            <AboutModal
              form={aboutForm}
              onSubmit={onSubmitAbout}
              onClose={() => setActiveModal(null)}
            />
          )}

          <SkillsSection skills={skills} onEdit={handleOpenSkills} />

          <ExperienceSection
            experiences={experiences}
            onOpen={handleOpenAddExperience}
            onEdit={(exp) => handleOpenEditExperience(exp)}
            onDelete={handleDeleteExperience}
          />
          {activeModal === "experience" && (
            <ExperienceModal
              form={experienceForm}
              onSubmit={onSubmitExperience}
              onClose={() => setActiveModal(null)}
              isEditing={Boolean(editingExperience)}
            />
          )}

          <EducationSection
            educations={educations}
            onOpen={handleOpenAddEducation}
            onEdit={(edu) => handleOpenEditEducation(edu)}
            onDelete={handleDeleteEducation}
          />
          {activeModal === "education" && (
            <EducationModal
              form={educationForm}
              onSubmit={onSubmitEducation}
              onClose={() => setActiveModal(null)}
              isEditing={Boolean(editingEducation)}
            />
          )}

          <ResumeSection
            resume={resume}
            onUploadClick={() => setActiveModal("resume")}
          />
          {activeModal === "resume" && (
            <ResumeModal
              onSave={handleSaveResume}
              onClose={() => setActiveModal(null)}
            />
          )}

          <SocialLinksSection
            socialLinks={socialLinks}
            isOpen={handleOpenSocial}
          />
        </div>

        {/* --- MODALS --- */}

        {/* BASIC INFO MODAL */}
        {activeModal === "basic" && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-border-subtle space-y-4 my-8">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <h3 className="text-base font-semibold text-slate-900">
                  Edit Basic Information
                </h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={basicInfoForm.handleSubmit(onSubmitBasic)}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    {...basicInfoForm.register("fullName", { required: true })}
                    className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Professional Headline
                  </label>
                  <input
                    {...basicInfoForm.register("headline")}
                    className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    {...basicInfoForm.register("location")}
                    className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    {...basicInfoForm.register("email")}
                    className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Phone
                  </label>
                  <input
                    {...basicInfoForm.register("phone")}
                    className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-border-subtle">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 border border-border-subtle text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-2 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary-hover inline-flex items-center gap-1.5"
                  >
                    {isSaving && (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    )}
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SKILLS MODAL */}
        {activeModal === "skills" && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-border-subtle space-y-4">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <h3 className="text-base font-semibold text-slate-900">
                  Edit Skills
                </h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={skillsForm.handleSubmit(onSubmitSkills)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Skills (Comma separated)
                  </label>
                  <textarea
                    rows={3}
                    {...skillsForm.register("skillsText")}
                    placeholder="React.js, Node.js, MongoDB, TypeScript..."
                    className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-border-subtle">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 border border-border-subtle text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-2 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary-hover inline-flex items-center gap-1.5"
                  >
                    {isSaving && (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    )}
                    Save Skills
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SOCIAL LINKS MODAL */}
        {activeModal === "social" && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-border-subtle space-y-4">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <h3 className="text-base font-semibold text-slate-900">
                  Edit Professional Links
                </h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={socialLinksForm.handleSubmit(onSubmitSocial)}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    LinkedIn
                  </label>
                  <input
                    {...socialLinksForm.register("linkedin")}
                    placeholder="linkedin.com/in/username"
                    className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    GitHub
                  </label>
                  <input
                    {...socialLinksForm.register("github")}
                    placeholder="github.com/username"
                    className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Portfolio
                  </label>
                  <input
                    {...socialLinksForm.register("portfolio")}
                    placeholder="yourwebsite.dev"
                    className="w-full text-sm border border-border-subtle rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-border-subtle">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 border border-border-subtle text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-2 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary-hover inline-flex items-center gap-1.5"
                  >
                    {isSaving && (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    )}
                    Save Links
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
