import {
  firebase,
  functions,
  auth,
  db,
  storageRef,
  googleAuthProvider,
  facebookAuthProvider,
} from "auth/FirebaseAuth";
import { getStorage, ref, deleteObject } from "firebase/storage";
const FirebaseService = {};

FirebaseService.signInEmailRequest = async (email, password) =>
  await auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((err) => err);

FirebaseService.signInEmailRequest = async (email, password) =>
  await auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((err) => err);

FirebaseService.signOutRequest = async () =>
  await auth
    .signOut()
    .then((user) => user)
    .catch((err) => err);

FirebaseService.signInGoogleRequest = async () =>
  await auth
    .signInWithPopup(googleAuthProvider)
    .then((user) => user)
    .catch((err) => err);

FirebaseService.signInFacebookRequest = async () =>
  await auth
    .signInWithPopup(facebookAuthProvider)
    .then((user) => user)
    .catch((err) => err);

FirebaseService.signUpEmailRequest = async (email, password) =>
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((err) => err);

const getFirestoreRef = (path) => firebase.firestore().collection(path);

FirebaseService.fetchDocument = async (collection, id) => {
  const document = await getFirestoreRef(collection).doc(id).get();
  if (!document.exists) return null;
  return { id: document.id, ...document.data() };
};

FirebaseService.fetchCollection = async (collection, options = {}) => {
  const data = [];
  let baseQuery = getFirestoreRef(collection);

  if (options.queries) {
    const { queries } = options;

    queries.forEach(({ attribute, operator, value }) => {
      if (attribute === "uid")
        attribute = firebase.firestore.FieldPath.documentId();
      baseQuery = baseQuery.where(attribute, operator, value);
    });
  }

  if (options.sort) {
    const { attribute, order } = options.sort;
    baseQuery = baseQuery.orderBy(attribute, order);
  }

  (await baseQuery.get()).forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

FirebaseService.uploadImage = async (fileName, file) => {
  console.log("filename : " + fileName);
  let url = await storageRef.ref("uploads").child(fileName).put(file);
  return url.ref.getDownloadURL();
};

FirebaseService.addDoctorCategory = async (categoryName, iconUrl) => {
  try {
    await db.collection("DoctorCategory").add({
      categoryName,
      iconUrl,
    });
  } catch (error) {
    throw error;
  }
};

FirebaseService.removeDoctorCategory = async (categoryId) => {
  try {
    await db.collection("DoctorCategory").doc(categoryId).delete();
  } catch (error) {
    throw error;
  }
};

FirebaseService.editDoctorCategory = async (id, categoryName, iconUrl) => {
  try {
    if (iconUrl == null) {
      await db.collection("DoctorCategory").doc(id).update({
        categoryName,
      });
    } else {
      await db.collection("DoctorCategory").doc(id).set({
        categoryName,
        iconUrl,
      });
    }
  } catch (error) {
    throw error;
  }
};

FirebaseService.removeTopRatedDoctor = async (topRatedId) => {
  try {
    let snapshot = await db
      .collection("TopRatedDoctor")
      .where("doctorId", "==", topRatedId)
      .get();
    await snapshot.docs.at(0).ref.delete();
  } catch (error) {
    console.log(
      "🚀 ~ file: FirebaseService.js ~ line 124 ~ FirebaseService.removeTopRatedDoctor= ~ error",
      error
    );

    throw error;
  }
};

FirebaseService.addTopRatedDoctor = async (doctorId) => {
  try {
    await db.collection("TopRatedDoctor").add({ doctorId });
  } catch (error) {
    throw error;
  }
};

FirebaseService.deleteDoctorAccount = async (doctorId) => {
  try {
    var addMessage = firebase.functions().httpsCallable("deleteDoctor");
    await addMessage({ doctorId: doctorId });
    console.log("delete doctor");
  } catch (error) {
    console.log(
      "🚀 ~ file: FirebaseService.js ~ line 160 ~ FirebaseService.deleteDoctorAccount ~ error",
      error
    );
    throw error;
  }
};
FirebaseService.deleteUser = async (userId) => {
  try {
    var addMessage = firebase.functions().httpsCallable("deleteUser");
    await addMessage({ userId: userId });
    console.log("delete user");
  } catch (error) {
    console.log(
      "🚀 ~ file: FirebaseService.js ~ line 160 ~ FirebaseService.deleteDoctorAccount ~ error",
      error
    );
    throw error;
  }
};

FirebaseService.countCollection = async (documentName) => {
  let size = await db
    .collection(documentName)
    .get()
    .then((snap) => {
      return snap.size; // will return the collection size
    });
  return size;
};

FirebaseService.setPercentage = async (data) => {
  await db
    .collection("Settings")
    .doc("withdrawSetting")
    .set({ percentage: data.data.percentage, tax: data.data.tax });
};

FirebaseService.getWithdrawalSettings = async () => {
  try {
    let snapshot = await db.collection("Settings").doc("withdrawSetting").get();
    if (!snapshot.exists) return {};
    return snapshot.data();
  } catch (error) {
    console.log(
      "🚀 ~ file: FirebaseService.js ~ line 206 ~ FirebaseService.getWithdrawalSettings= ~ error",
      error
    );
    throw error;
  }
};
FirebaseService.getImageCarousel = async () => {
  try {
    let data = [];
    let snapshot = await db
      .collection("Settings")
      .doc("imageCarousel")
      .collection("listImage")
      .get();
    console.log(
      "🚀 ~ file: FirebaseService.js ~ line 213 ~ FirebaseService.getImageCarousel= ~ snapshot",
      snapshot.docs
    );
    snapshot.docs.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (error) {
    console.log(
      "🚀 ~ file: FirebaseService.js ~ line 212 ~ FirebaseService.getImageCarousel= ~ error",
      error
    );
    throw error;
  }
};
FirebaseService.removeImageCarousel = async (data) => {
  console.log(
    "🚀 ~ file: FirebaseService.js ~ line 232 ~ FirebaseService.removeImageCarousel= ~ data",
    data
  );
  try {
    await db
      .collection("Settings")
      .doc("imageCarousel")
      .collection("listImage")
      .doc(data.data.imageId)
      .delete();

    let picRef = storageRef.refFromURL(data.data.imageUrl);
    picRef.delete();
  } catch (error) {
    throw error;
  }
};
FirebaseService.saveImageCarouselData = async (data) => {
  try {
    await db
      .collection("Settings")
      .doc("imageCarousel")
      .collection("listImage")
      .add({
        imageUrl: data.imageUrl,
        fileName: data.fileName,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      });
  } catch (error) {
    console.log(
      "🚀 ~ file: FirebaseService.js ~ line 231 ~ FirebaseService.saveImageCarouselData= ~ error",
      error
    );
    throw error;
  }
};

FirebaseService.markWithdrawalRequestComplete = async (record) => {
  try {
    await db
      .collection("WithdrawRequest")
      .doc(record.id)
      .update({ status: "complete" });

    let transactionSnapshot = await db
      .collection("Transaction")
      .where("withdrawRequestId", "==", record.id)
      .get();
    if (transactionSnapshot.empty) return;
    transactionSnapshot.docs[0].ref.update({ status: "success" });
  } catch (error) {
    console.log(
      "🚀 ~ file: FirebaseService.js ~ line 224 ~ FirebaseService.markWithdrawalRequestComplete ~ error",
      error
    );

    throw error;
  }
};
FirebaseService.setDoctorAccountStatus = async (record, status) => {
  try {
    await db
      .collection("Doctors")
      .doc(record)
      .update({ accountStatus: status });
  } catch (error) {
    console.log(
      "🚀 ~ file: FirebaseService.js ~ line 240 ~ FirebaseService.setDoctorAccountStatus= ~ error",
      error
    );

    throw error;
  }
};

export default FirebaseService;
