import { storage } from "./Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



// ****************** SIGN UP PROGRESS BAR ANIMATE AND STEPS FUNCTION ***********************
export const HandleNext = (index: number) => {
  const ids = ["first", "second", "third", "fourth", "fifth"];
  const steps = ["stepOne", "stepTwo", "stepThree", "stepFour", "stepFive"];
  const title = [
    "Welcome, select an account type.",
    "Let's create a unique username",
    "Tell us more about you.",
    "Change a profile picture. Or go Next ",
    "You're all set. Ready?",
  ];
  const value = [0, 25, 50, 75, 100];
  // Set the clicked step as active and mark previous steps as completed
  const signupTitle = document.getElementById('signupTitle');
  var progressBar = document.getElementById('bar')
  if (signupTitle !== null) signupTitle.innerHTML = title[index]
  for (let i = 0; i <= index; i++) {
    document.getElementById(`${ids[i]}`)?.classList.add("activeDot");
    const pannelShow = document.getElementById(`${steps[i]}`);
    const pannelHide = document.getElementById(`${steps[i - 1]}`);

    if (pannelShow !== null) pannelShow.style.display = "block";
    if (pannelHide !== null) pannelHide.style.display = "none";
    if (progressBar !== null) progressBar.style.width = `${value[i]}%`
  }

  // Mark remaining steps as inactive and incomplete
  for (let i = index + 1; i < ids.length; i++) {
    const hidePannel = document.getElementById(`${steps[i]}`);
    if (hidePannel !== null) hidePannel.style.display = "none";
    document.getElementById(`${ids[i]}`)?.classList.remove("activeDot");
  }
};
// *********************** HANDLE Image Upload For Editor.js in firebase *************************

export async function handleImageUpload (file:File) {

  const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
  const res =  await getDownloadURL(storageRef);
  return {
    success: 1,
    file: {
      url: res,
    },
  }
};