import Case from "../../../DB/Models/case.model.js";
import User from "../../../DB/Models/user.model.js";
import cloudinaryConnection from "../../utils/cloudinary.js";
import { systemRoles } from "../../utils/system-enums.js";

//============================================ add case ============================================//
export const addCase = async (req, res, next) => {
  // 1- destructing the request body
  const { name, description, phoneNumber, numberOfCase } = req.body;
  // const { _id } = req.authUser;
  // 2- check if number of case is already exists
  const isNumberOfCase = await Case.findOne({ numberOfCase });
  if (isNumberOfCase)
    return next(new Error("Number of case is already exists ", { cause: 409 }));
  // 3- upload case file to cloudinary
  if (!req.file)
    return next(new Error("Case file is required", { cause: 400 }));
  const { secure_url, public_id } =
    await cloudinaryConnection().uploader.upload(req.file.path, {
      folder: `${process.env.MAIN_FOLDER}/Case_files/${numberOfCase}`,
    });
  //3.1- if cloudinary fail
  req.folder = `${process.env.MAIN_FOLDER}/Case_files/${numberOfCase}`;

  // 4- generate the case object
  const caseObj = {
    name,
    description,
    phoneNumber,
    numberOfCase,
    caseFile: { secure_url, public_id },
    // clientId: _id,
  };

  // 5- create Case
  const createCase = await Case.create(caseObj);
  req.savedDocument = { model: Case, _id: createCase._id };
  if (!createCase)
    return next(new Error("Case creation failed!", { cause: 400 }));

  // 6- send response
  res.status(201).json({
    succes: true,
    message: "Case created successfully!",
    data: { createCase },
  });
};

//============================================ update case ============================================//
export const updateCase = async (req, res, next) => {
  // 1- destructuring the request body
  const { name, description, phoneNumber, numberOfCase, oldPublicId } =
    req.body;
  // 2- destructuring the request params
  const { caseId } = req.params;

  // 3- check if the case is exist by using caseId
  const caseObj = await Case.findById(caseId);
  if (!caseObj) return next({ cause: 404, message: "Case not found" });

  // 4- check if the use want to update the name field
  if (name) {
    // 4.1 check if the new case name different from the old name
    if (name == caseObj.name) {
      return next({
        cause: 400,
        message: "Please enter different case name from the existing one.",
      });
    }

    // 4.2 check if the new case name is already exist
    const isNameDuplicated = await Case.findOne({ name });
    if (isNameDuplicated) {
      return next({ cause: 409, message: "Case name is already exist" });
    }

    // 4.3 update the case name
    caseObj.name = name;
  }
  // 5- check if the user want to update the number Of Case
  if (numberOfCase) {
    caseObj.numberOfCase = numberOfCase;
  }

  // 6- check if the user want to update the phone number
  if (phoneNumber) {
    caseObj.phoneNumber = phoneNumber;
  }

  // 7- check if the user want to update the description
  if (description) {
    caseObj.description = description;
  }

  // 8- check if the user want to update the file of case
  if (oldPublicId) {
    if (!req.file) return next({ cause: 400, message: "File is required" });

    const newPulicId = oldPublicId.split(`${caseObj.numberOfCase}/`)[1];

    const { secure_url } = await cloudinaryConnection().uploader.upload(
      req.file.path,
      {
        folder: `${process.env.MAIN_FOLDER}/Case_files/${numberOfCase}`,
        public_id: newPulicId,
      }
    );

    caseObj.caseFile.secure_url = secure_url;
  }

  await caseObj.save();

  // 8- send response
  res.status(200).json({
    success: true,
    message: "Case updated successfully",
    data: caseObj,
  });
};

//============================================ delete case by id ============================================//
export const deleteCaseById = async (req, res, next) => {
  // destructuring the request query
  const { caseId } = req.params;
  // delete Case
  const caseObj = await Case.findByIdAndDelete(caseId);
  if (!caseObj) return next({ cause: 404, message: "Case not found!" });
  // delete the case folder from cloudinary
  const folderPath = `${process.env.MAIN_FOLDER}/Case_files/${caseObj.numberOfCase}`;
  // The-Law-Café/Case_files/123/ednsbt8fvyyxindukedc

  await cloudinaryConnection().api.delete_resources_by_prefix(folderPath);
  await cloudinaryConnection().api.delete_folder(folderPath);
  // send response
  res
    .status(200)
    .json({ success: true, message: "Case deleted successfully!" });
};

// //============================================ delete case by owner ============================================//
// export const deleteCaseByowner = async (req, res, next) => {
//   const getCase = await Case.findOne({clientId:req.authUser._id})
//   // delete Case
//   const caseObj = await Case.findByIdAndDelete(getCase._id);
//   if (!caseObj) return next({ cause: 404, message: "Case not found!" });
//   // delete the case folder from cloudinary
//   const folderPath =
//     caseObj.caseFile.public_id.split(`${caseObj.numberOfCase}`)[0] +
//     `${caseObj.numberOfCase}`;
//     // The-Law-Café/Case_file/123/ednsbt8fvyyxindukedc

//   await cloudinaryConnection().api.delete_resources_by_prefix(folderPath);
//   await cloudinaryConnection().api.delete_folder(folderPath);
//   // send response
//   res
//     .status(200)
//     .json({ success: true, message: "Case deleted successfully!" });
// };

//========================================= Get case by id =========================================//
export const getCasetById = async (req, res, next) => {
  // destructuring the request query
  const { caseId } = req.params;
  // search of case
  const caseObj = await Case.findById(caseId);
  if (!caseObj) return next(new Error("Case not found!", { cause: 404 }));
  // send response
  res.status(200).json({
    success: true,
    data: caseObj,
  });
};

//========================================= Get all case =========================================//
export const getAllCases = async (req, res, next) => {
  // search of cases
  const cases = await Case.find();
  if (!cases.length)
    return next(new Error("There are no cases yet!", { cause: 404 }));
  // send response
  res.status(200).json({
    success: true,
    data: cases,
  });
};

//========================================= Get all new case =========================================//
export const getAllNewCases = async (req, res, next) => {
  // search of cases
  const newCases = await Case.find({ lawyerId: null });
  if (!newCases.length)
    return next(new Error("There are no new cases yet!", { cause: 404 }));
  // send response
  res.status(200).json({
    success: true,
    data: newCases,
  });
};

//========================================= Get all cases for specific client =========================================//
export const getAllCasesForClientOwner = async (req, res, next) => {
  //destruct data from query
  const clientId = req.authUser._id;
  // search of cases
  const allCasesForClientOwner = await Case.find({ clientId });
  if (!allCasesForClientOwner.length)
    return next(new Error("There are no cases yet!", { cause: 404 }));
  // send response
  res.status(200).json({
    success: true,
    data: allCasesForClientOwner,
  });
};

//========================================= Get all cases for specific lawyer =========================================//
export const getAllCasesForLawyerOwner = async (req, res, next) => {
  //destruct data from query
  const lawyerId = req.authUser._id;
  // search of cases
  const allCasesForLawyerOwner = await Case.find({ lawyerId });
  if (!allCasesForLawyerOwner.length)
    return next(new Error("There are no cases yet!", { cause: 404 }));
  // send response
  res.status(200).json({
    success: true,
    data: allCasesForLawyerOwner,
  });
};

//========================================= Assign lawyer to new case =========================================//
export const assignLawyerToCase = async (req, res, next) => {
  //destruct data from query
  const { lawyerId, caseId } = req.query;
  //get lawyer
  const lawyer =await User.findById(lawyerId);
  if (!lawyer) return next(new Error("Lawyer not found!", { cause: 404 }));
  if (lawyer.role != systemRoles.LAWYER)
    return next(
      new Error(
        `You are trying to appoint a/an #${lawyer.role}# for this case you should just hire a lawyer!`,
        { caust: 400 }
      )
    );
  //assign lawer to case
  const assignedlawyer =await Case.findByIdAndUpdate(
    caseId,
    { lawyerId },
    { new: true }
  );
  if (!assignedlawyer) return next(new Error("Case not found!", { cause: 404 }));
  //send response
  res.status(200).json({
    succes: true,
    message:"The lawyer assigned to this case successfully!",
    assignedlawyer
  });
};
