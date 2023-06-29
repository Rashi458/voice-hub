import auth, { db, storage } from "../firebase";

export async function addPost(
  url,
  description,
  genreList,
  userHandle = "hk",
  imagea
) {
  const { uid } = auth;
  const file = window.file;

  const doc = db.collection("post").doc();
  addAudioToBucket(doc.id, ".wav", file).then((url) => {
    console.log(url, "plz work...");
    doc
      .set({
        audio: url,
        uid: "uid",
        description: description,
        genre: genreList,
        when: new Date(),
        likes: 0,
        comments_count: 0,
        handle: userHandle,
        image: (imagea),
      })
      .then(() => {
        console.log("POST ADDED");
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

export async function addAudioToBucket(pid, fileFormat, file) {
  const filename = pid + fileFormat;
  const audioRef = storage.ref().child("audios/ " + filename);
  const snap = await audioRef.put(file);
  const url = await snap.ref.getDownloadURL();

  return url;
}
