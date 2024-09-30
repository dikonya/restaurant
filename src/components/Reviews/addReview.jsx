import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Assuming db is the Firestore instance from your Firebase project

export const addReview = async (description, name, userId) => {
  try {
    const reviewsCollectionRef = collection(db, "reviews");
    const newReviewDocRef = await addDoc(reviewsCollectionRef, {
      description: description,
      name: name,
      userId: userId,
    });
    
    console.log("Document added with ID: ", newReviewDocRef.id);
    return newReviewDocRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const editReview = async (reviewId, description, name) => {
  try {
    const reviewDocRef = doc(db, "reviews", reviewId);
    await updateDoc(reviewDocRef, {
      description: description,
      name: name,
    });
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const reviewDocRef = doc(db, "reviews", reviewId);
    await deleteDoc(reviewDocRef);
    console.log("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};
