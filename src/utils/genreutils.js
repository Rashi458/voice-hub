import { db } from "../firebase";

export function fetchGenreList(genreList, setGenreList) {
  const temp = [...genreList];
  db.collection("genrelist")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        temp.push({ id: doc.id, value: doc.data().genre });
      });
      setGenreList(temp);
    });
}

export function addGenre(g) {
  db.collection("genrelist")
    .add({ genre: g })
    .then((ref) => {
      console.log("====================================");
      console.log("Genre Added", ref);
      console.log("====================================");
    })
    .catch((e) => {
      console.error(e);
    });
}
