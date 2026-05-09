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

  // ================= STATES =================
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

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

  const [showPhotoMenu, setShowPhotoMenu] =
    useState(false);

  const [showPhotoViewer, setShowPhotoViewer] =
    useState(false);

  // ================= LOAD PROFILE =================
  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile = async () => {

    try {

      const response =
        await getMyProfile();

      if (!response) return;

      // ================= SET STATES =================
      setName(response.name || "");
      setAge(response.age || "");
      setLocation(response.location || "");
      setBio(response.bio || "");

      setGender(response.gender || "");
      setLookingFor(response.lookingFor || "");

      setPersonality(response.personality || "");

      setLanguage(response.language || "");

      setWeekendMood(
        response.vibe || ""
      );

         setPhotoPreview(
  response.photoUrl &&
  !response.photoUrl.startsWith("blob:")
    ? response.photoUrl
    : ""
);

      // ================= INTERESTS =================
      if (response.interests) {

        setInterests(
          Array.isArray(response.interests)
            ? response.interests
            : response.interests.split(",")
        );
      }

      // ================= SAFE LOCAL STORAGE =================
      const safeProfile = {
        name: response.name || "",
        age: response.age || "",
        location: response.location || "",
        bio: response.bio || "",
        gender: response.gender || "",
        lookingFor:
          response.lookingFor || "",
        personality:
          response.personality || "",
        language:
          response.language || "",
        vibe: response.vibe || "",
        interests:
          response.interests || "",
        photoUrl:
          response.photoUrl || "",
      };

      localStorage.setItem(
        "userProfile",
        JSON.stringify(safeProfile)
      );

      localStorage.setItem(
        "profileName",
        response.name || ""
      );

    } catch (err) {

      console.log(
        "❌ Profile load error:",
        err
      );

      // ================= FALLBACK LOCAL DATA =================
      const saved =
        JSON.parse(
          localStorage.getItem(
            "userProfile"
          )
        ) || {};

      setName(saved.name || "");
      setAge(saved.age || "");
      setLocation(saved.location || "");
      setBio(saved.bio || "");

      setGender(saved.gender || "");

      setLookingFor(
        saved.lookingFor || ""
      );

      setPersonality(
        saved.personality || ""
      );

      setLanguage(
        saved.language || ""
      );

      setWeekendMood(
        saved.vibe || ""
      );

    setPhotoPreview(
  saved.photoUrl &&
  !saved.photoUrl.startsWith("blob:")
    ? saved.photoUrl
    : ""
);

      if (saved.interests) {

        setInterests(
          Array.isArray(saved.interests)
            ? saved.interests
            : saved.interests.split(",")
        );
      }
    }
  };

  // ================= INTEREST TOGGLE =================
  const toggleInterest = (item) => {

    setInterests((prev) =>
      prev.includes(item)
        ? prev.filter(
            (i) => i !== item
          )
        : [...prev, item]
    );
  };

  // ================= PHOTO HANDLE =================
  const handlePhoto = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    setPhoto(file);

    // ================= LIGHTWEIGHT PREVIEW =================
    const imageUrl =
      URL.createObjectURL(file);

    setPhotoPreview(imageUrl);
  };

  // ================= PHOTO ACTIONS =================
  const handleViewPhoto = () => {

    if (!photoPreview) return;

    setShowPhotoMenu(false);

    setTimeout(() => {

      setShowPhotoViewer(true);

    }, 150);
  };

  const handleRemovePhoto = () => {

    setPhoto(null);

    setPhotoPreview("");

    setShowPhotoMenu(false);
  };

  const handleChangePhoto = () => {

    document
      .querySelector(
        'input[type="file"]'
      )
      ?.click();

    setShowPhotoMenu(false);
  };

  // ================= SAVE PROFILE =================
  const handleFinish = async () => {

    try {

      setLoading(true);

      const profileData = {

        name,

        age: age
          ? parseInt(age)
          : null,

        location,

        bio,

        gender,

        lookingFor,

        personality,

        language,

        vibe: weekendMood,

        interests:
          interests.join(","),

        // IMPORTANT
        // don't save huge base64 image
        photoUrl: "",
      };

      const response =
        await saveProfile(
          profileData
        );

      // ================= SAFE STORAGE =================
     const safeProfile = {

  name,

  age,

  location,

  bio,

  gender,

  lookingFor,

  personality,

  language,

  vibe: weekendMood,

  interests:
    interests.join(","),

  // don't store blob url
  photoUrl: "",
};

      localStorage.setItem(
        "userProfile",
        JSON.stringify(safeProfile)
      );

      localStorage.setItem(
        "profileName",
        name || ""
      );

      alert(
        response?.message ||
          "Profile saved successfully 💖"
      );

      nav("/home");

    } catch (err) {

      console.log(
        "❌ Save profile error:",
        err
      );

      alert(
        err?.message ||
          "Failed to save profile"
      );

    } finally {

      setLoading(false);

    }
  };

  // ================= INTEREST LIST =================
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

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <>

            <h2 className="title">
              Build Your First
              Impression 💫
            </h2>

            <p className="quote">
              “People don’t meet
              profiles, they meet
              impressions.”
            </p>

            {/* ================= PHOTO ================= */}
            <div className="photo-section">

              <label
                className="photo-circle"
                onClick={() =>
                  setShowPhotoMenu(
                    true
                  )
                }
              >

                {photoPreview ? (

                  <img
                    src={photoPreview}
                    alt="profile"
                  />

                ) : (

                  <div className="empty-circle">

                    <span>
                      Upload
                    </span>

                  </div>

                )}

                <div className="plus-badge">
                  +
                </div>

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={
                    handlePhoto
                  }
                />

              </label>

              {/* ================= PHOTO MENU ================= */}
              {showPhotoMenu && (
                <div
                  className="photo-menu-backdrop"
                  onClick={() =>
                    setShowPhotoMenu(
                      false
                    )
                  }
                >

                  <div
                    className="photo-menu"
                    onClick={(e) =>
                      e.stopPropagation()
                    }
                  >

                    <button
                      onClick={
                        handleViewPhoto
                      }
                    >
                      👁 View Photo
                    </button>

                    <button
                      onClick={
                        handleChangePhoto
                      }
                    >
                      ✏️ Change Photo
                    </button>

                    <button
                      onClick={
                        handleRemovePhoto
                      }
                      style={{
                        color: "red",
                      }}
                    >
                      🗑 Remove Photo
                    </button>

                    <button
                      onClick={() =>
                        setShowPhotoMenu(
                          false
                        )
                      }
                    >
                      Cancel
                    </button>

                  </div>

                </div>
              )}

            </div>

            <Input
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

            <Input
              placeholder="Age"
              value={age}
              onChange={(e) =>
                setAge(
                  e.target.value
                )
              }
            />

            <Input
              placeholder="Location"
              value={location}
              onChange={(e) =>
                setLocation(
                  e.target.value
                )
              }
            />

            {/* ================= GENDER ================= */}
            <div className="pref-box">

              <h4>
                Gender
              </h4>

              <div className="pref-options">

                {[
                  "Male",
                  "Female",
                  "Other",
                ].map((g) => (
                  <span
                    key={g}
                    className={
                      gender === g
                        ? "pref active"
                        : "pref"
                    }
                    onClick={() =>
                      setGender(g)
                    }
                  >
                    {g}
                  </span>
                ))}

              </div>

            </div>

            {/* ================= LOOKING FOR ================= */}
            <div className="pref-box">

              <h4>
                Looking For 💫
              </h4>

              <div className="pref-options">

                {[
                  "Friendship",
                  "Dating",
                  "Long-term",
                  "Casual",
                ].map((p) => (
                  <span
                    key={p}
                    className={
                      lookingFor === p
                        ? "pref active"
                        : "pref"
                    }
                    onClick={() =>
                      setLookingFor(p)
                    }
                  >
                    {p}
                  </span>
                ))}

              </div>

            </div>

            <Input
              placeholder="Language (Hindi, English...)"
              value={language}
              onChange={(e) =>
                setLanguage(
                  e.target.value
                )
              }
            />

            <textarea
              className="textarea"
              placeholder="Tell us about yourself ✨"
              value={bio}
              onChange={(e) =>
                setBio(
                  e.target.value
                )
              }
            />

            <Button
              text="Next ➜"
              onClick={() =>
                setStep(2)
              }
            />

          </>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <>

            <p className="hint">
              This helps us find
              your perfect match ✨
            </p>

            {/* ================= PERSONALITY ================= */}
            <div className="pref-box">

              <h4>
                Personality 🧠
              </h4>

              <div className="pref-options">

                {[
                  "Introvert",
                  "Extrovert",
                  "Balanced",
                  "Funny",
                  "Calm",
                ].map((p) => (
                  <span
                    key={p}
                    className={
                      personality === p
                        ? "pref active"
                        : "pref"
                    }
                    onClick={() =>
                      setPersonality(
                        p
                      )
                    }
                  >
                    {p}
                  </span>
                ))}

              </div>

            </div>

            {/* ================= WEEKEND MOOD ================= */}
            <div className="pref-box">

              <h4>
                Weekend Mood 🍿
              </h4>

              <div className="pref-options">

                {[
                  "Netflix",
                  "Travel",
                  "Party",
                  "Food Hunt",
                  "Gym",
                ].map((w) => (
                  <span
                    key={w}
                    className={
                      weekendMood ===
                      w
                        ? "pref active"
                        : "pref"
                    }
                    onClick={() =>
                      setWeekendMood(
                        w
                      )
                    }
                  >
                    {w}
                  </span>
                ))}

              </div>

            </div>

            {/* ================= INTERESTS ================= */}
            <div className="pref-box">

              <h4>
                Interests 💖
              </h4>

              <div className="chips">

                {interestList.map(
                  (item) => (
                    <span
                      key={item}
                      className={
                        interests.includes(
                          item
                        )
                          ? "chip active"
                          : "chip"
                      }
                      onClick={() =>
                        toggleInterest(
                          item
                        )
                      }
                    >
                      {item}
                    </span>
                  )
                )}

              </div>

            </div>

            {/* ================= BUTTONS ================= */}
            <div className="btn-row">

              <Button
                text="⬅ Back"
                onClick={() =>
                  setStep(1)
                }
              />

              <Button
                text={
                  loading
                    ? "Saving..."
                    : "Save Profile 💖"
                }
                onClick={
                  handleFinish
                }
              />

            </div>

          </>
        )}

      </div>

      {/* ================= PHOTO VIEWER ================= */}
      {showPhotoViewer && (
        <div
          className="photo-viewer-backdrop"
          onClick={() =>
            setShowPhotoViewer(
              false
            )
          }
        >

          <div
            className="photo-viewer"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <img
              src={photoPreview}
              alt="full-view"
            />

          </div>

        </div>
      )}

    </div>
  );
}

export default ProfileSetup;