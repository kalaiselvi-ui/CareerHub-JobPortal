import CandidateProfile from "../models/candidateProfile.model.js";
import Job from "../models/job.model.js";

const matchSkills = (jobSkills, candidateSkills) => {
  const jsTechnologies = [
    "react",
    "node",
    "next",
    "vue",
    "express",
    "angular",
    "nuxt",
    "svelte",
  ];

  const normalizeSkill = (skill) => {
    let normalized = skill
      .toLowerCase()
      .trim()
      .replace(/[.\s-]/g, "");

    if (jsTechnologies.includes(normalized)) {
      return normalized;
    }

    if (
      normalized.endsWith("js") &&
      jsTechnologies.includes(normalized.slice(0, -2))
    ) {
      return normalized.slice(0, -2);
    }

    return normalized;
  };

  const job = jobSkills.map(normalizeSkill);

  const candidate = candidateSkills.map(normalizeSkill);

  const matchedSkills = job.filter((skill) => candidate.includes(skill));
  const missingSkills = job.filter((skill) => !candidate.includes(skill));

  const percentage = job.length
    ? Math.round((matchedSkills.length / job.length) * 100)
    : 0;

  return {
    matchedSkills,
    missingSkills,
    percentage,
  };
};

const getSkillMatch = async (jobId, userId) => {
  const job = await Job.findById(jobId);

  if (!job) {
    throw new Error("Job not found");
  }
  const candidate = await CandidateProfile.findOne({ userId });

  if (!candidate) {
    throw new Error("Candidate profile not found");
  }

  const result = matchSkills(job.skills || [], candidate.skills || []);
  return result;
};

export { matchSkills, getSkillMatch };
