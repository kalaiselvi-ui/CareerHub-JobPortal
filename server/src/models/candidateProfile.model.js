import mongoose from "mongoose";

const candidateProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Professional Summary
    headline: {
      type: String,
      trim: true,
      maxLength: 150,
    },

    bio: {
      type: String,
      trim: true,
      maxLength: 1000,
    },

    // Resume
    resume: {
      type: String,
      trim: true,
    },

    // Skills
    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    // Work Experience
    experience: [
      {
        jobTitle: {
          type: String,
          trim: true,
        },

        company: {
          type: String,
          trim: true,
        },

        location: {
          type: String,
          trim: true,
        },

        startDate: {
          type: Date,
        },

        endDate: {
          type: Date,
        },

        currentlyWorking: {
          type: Boolean,
          default: false,
        },

        description: {
          type: String,
          trim: true,
          maxLength: 1000,
        },
      },
    ],

    // Education
    education: [
      {
        institution: {
          type: String,
          trim: true,
        },

        degree: {
          type: String,
          trim: true,
        },

        fieldOfStudy: {
          type: String,
          trim: true,
        },

        startDate: {
          type: Date,
        },

        endDate: {
          type: Date,
        },
      },
    ],

    // Social / Professional Links
    socialLinks: {
      linkedin: {
        type: String,
        trim: true,
      },

      github: {
        type: String,
        trim: true,
      },

      portfolio: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

const CandidateProfile = mongoose.model(
  "CandidateProfile",
  candidateProfileSchema,
);

export default CandidateProfile;
