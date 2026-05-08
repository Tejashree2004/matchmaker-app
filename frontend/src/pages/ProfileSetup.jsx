import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";

import {
  saveProfile,
  getMyProfile,
} from "../api/authApi";

function ProfileSetup() {
  const nav = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // ================= STATES =================
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [gender, setGender] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [personality, setPersonality] = useState("");

  const [language, setLanguage] = useState("");
  const [weekendMood, setWeekendMood] = useState("");

  const [interests, setInterests] = useState([]);

  const [showPhotoMenu, setShowPhotoMenu] = useState(false);

  // ✅ NEW FIX: photo viewer modal
  const [showPhotoViewer, setShowPhotoViewer] = useState(false);

  // ================= LOAD PROFILE =================
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getMyProfile();
      if (!response) return;

      setName(response.name || "");
      setAge(response.age || "");
      setLocation(response.location || "");
      setBio(response.bio || "");

      setGender(response.gender || "");
      setLookingFor(response.lookingFor || "");
      setPersonality(response.personality || "");

      setLanguage(response.language || "");
      setWeekendMood(response.vibe || "");

      setPhotoPreview(response.photoUrl || "");

      if (response.interests) {
        setInterests(response.interests.split(","));
      }

      localStorage.setItem("userProfile", JSON.stringify(response));

    } catch (err) {
      console.log("Profile load error:", err);
    }
  };

  // ================= PHOTO =================
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhoto(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ================= PHOTO ACTIONS =================
  const handleViewPhoto = () => {
    setShowPhotoMenu(false);
    setShowPhotoViewer(true); // ✅ FIXED
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPhotoPreview("");
    setShowPhotoMenu(false);
  };

  const handleChangePhoto = () => {
    document.querySelector('input[type="file"]').click();
    setShowPhotoMenu(false);
  };

  // ================= SAVE =================
  const handleFinish = async () => {
    try {
      setLoading(true);

      const profileData = {
        name,
        age: parseInt(age),
        location,
        bio,
        gender,
        lookingFor,
        personality,
        language,
        vibe: weekendMood,
        interests: interests.join(","),
        photoUrl: photoPreview,
      };

      await saveProfile(profileData);

      localStorage.setItem("userProfile", JSON.stringify(profileData));

      alert("Profile saved 💖");
      nav("/home");

    } catch (err) {
      alert("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const interestList = [
    "🎵 Music",
    "✈️ Travel",
    "🍕 Food",
    "🎬 Movies",
    "💪 Fitness",
    "🎮 Gaming",
    "📸 Photography",
    "📚 Reading",
    "🧠 Psychology",
    "🏋️ Gym",
  ];

  return (
    <div className="profile-container">

      <div className="profile-card">

        {/* STEP 1 */}
        {step === 1 && (
          <>
   <h2 className="title">Build Your First Impression 💫</h2> <p className="quote"> “People don’t meet profiles, they meet impressions.” </p>

            <div className="photo-section">

              <label
                className="photo-circle"
                onClick={() => setShowPhotoMenu(true)}
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="profile" />
                ) : (
                  <div className="empty-circle"></div>
                )}

                <div className="plus-badge">+</div>

                <input type="file" hidden onChange={handlePhoto} />
              </label>

              {/* MENU */}
              {showPhotoMenu && (
                <div className="photo-menu-backdrop"
                  onClick={() => setShowPhotoMenu(false)}
                >
                  <div className="photo-menu"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button onClick={handleViewPhoto}>👁 View Photo</button>
                    <button onClick={handleChangePhoto}>✏️ Change Photo</button>
                    <button onClick={handleRemovePhoto} style={{ color: "red" }}>
                      🗑 Remove Photo
                    </button>
                    <button onClick={() => setShowPhotoMenu(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

            </div>

            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <Input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />

            <div className="pref-box"> <h4>Gender</h4> <div className="pref-options"> {["Male", "Female", "Other"].map((g) => ( <span key={g} className={gender === g ? "pref active" : "pref"} onClick={() => setGender(g)} > {g} </span> ))} </div> </div> <div className="pref-box"> <h4>Looking For 💫</h4> <div className="pref-options"> {["Friendship", "Dating", "Long-term", "Casual"].map((p) => ( <span key={p} className={lookingFor === p ? "pref active" : "pref"} onClick={() => setLookingFor(p)} > {p} </span> ))} </div> </div> <Input placeholder="Language (Hindi, English...)" value={language} onChange={(e) => setLanguage(e.target.value)} /> <textarea className="textarea" placeholder="Tell us about yourself ✨" value={bio} onChange={(e) => setBio(e.target.value)} /> <Button text="Next ➜" onClick={() => setStep(2)} /> </> )}

        {/* STEP 2 */}
        {step === 2 && (
          <> <p className="hint"> This helps us find your perfect match ✨ </p> <div className="pref-box"> <h4>Personality 🧠</h4> <div className="pref-options"> {["Introvert", "Extrovert", "Balanced", "Funny", "Calm"].map((p) => ( <span key={p} className={personality === p ? "pref active" : "pref"} onClick={() => setPersonality(p)} > {p} </span> ))} </div> </div> <div className="pref-box"> <h4>Weekend Mood 🍿</h4> <div className="pref-options"> {["Netflix", "Travel", "Party", "Food Hunt", "Gym"].map((w) => ( <span key={w} className={weekendMood === w ? "pref active" : "pref"} onClick={() => setWeekendMood(w)} > {w} </span> ))} </div> </div> <div className="pref-box"> <h4>Interests 💖</h4> <div className="chips"> {interestList.map((item) => ( <span key={item} className={ interests.includes(item) ? "chip active" : "chip" } onClick={() => toggleInterest(item)} > {item} </span> ))} </div> </div>
          
          
           <div className="btn-row"> <Button text="⬅ Back" onClick={() => setStep(1)} /> <Button text={loading ? "Saving..." : "Save Profile 💖"} onClick={handleFinish} /> </div> </> )} </div>

      {/* ================= VIEW PHOTO MODAL (FIXED) ================= */}
      {showPhotoViewer && (
        <div className="photo-viewer-backdrop" onClick={() => setShowPhotoViewer(false)}>
          <div className="photo-viewer" onClick={(e) => e.stopPropagation()}>
            <img src={photoPreview} alt="full-view" />
          </div>
        </div>
      )}

    </div>
  );
}

export default ProfileSetup;