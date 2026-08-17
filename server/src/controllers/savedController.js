import SavedJob from "../models/savedJob.model.js";

// Toggle Save / Unsave Job
export const toggleSaveJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { id: userId } = req.user;

    const existingSave = await SavedJob.findOne({ userId, jobId });

    if (existingSave) {
      // Unsave/Remove Bookmark
      await SavedJob.findByIdAndDelete(existingSave._id);
      return res.status(200).json({
        success: true,
        isSaved: false,
        message: "Job removed from saved jobs",
      });
    }

    // Save Job
    await SavedJob.create({ userId, jobId });
    return res.status(201).json({
      success: true,
      isSaved: true,
      message: "Job saved successfully",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Get all saved jobs for current user
export const getSavedJobs = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const savedJobs = await SavedJob.find({ userId }).populate("jobId");

    return res.status(200).json({
      success: true,
      data: savedJobs,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
