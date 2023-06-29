import auth, { db } from "../firebase";

export function checkHandleAvailability(handle, availability, setAvailability) {
  var docRef = db.collection("handles").doc(handle.trim());

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        //console.log("Document data:", doc.data());
        setAvailability(false);
      } else {
        //console.log("No such document!");
        setAvailability(true);
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

export function createUser(userHandle, selectedInterests) {
  const { uid, password } = auth;
  const { displayName, email, photoURL } = auth.currentUser;
  const { creationTime, lastSignInTime } = auth.currentUser.metadata;

  const userDoc = {
    
    created_at: new Date(creationTime),
    last_sign_in: new Date(lastSignInTime),
    email: email,
    followers_count: 0,
    following_count: 0,
    handle: userHandle,
    mobile: "",
    name: displayName,
    password: password & uid,
    interests: selectedInterests,
    photoUrl: photoURL,
  };
window.userDoc=userDoc
  console.log(userDoc);

  //..............

  const batch = db.batch();

  const uRef = db.collection("user").doc(uid);
  //const hRef = db.collection("handles").doc(userHandle);
  console.log(uRef);
  batch.set(uRef, userDoc);
//batch.set(hRef,{uid:uid})
  console.log(batch);
  batch.commit();
}

export function createUserHandle(handle, uid) {
  db.collection().get();
}
