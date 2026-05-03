import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

function ProfileSetup() {
  const nav = useNavigate();
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);

  const [gender, setGender] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [personality, setPersonality] = useState("");
  const [vibe, setVibe] = useState("");

  const [interests, setInterests] = useState([]);

  const toggleInterest = (item) => {
    setInterests((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const handleFinish = () => {
    console.log({
      name,
      age,
      location,
      bio,
      photo,
      gender,
      lookingFor,
      personality,
      vibe,
      interests,
    });
    nav("/home");
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

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <>
          <h2 className="title">Build Your First Impression 💫</h2>
          <p className="quote">
  “People don’t meet profiles, they meet impressions.”
</p>
            {/* PHOTO */}
            <div className="photo-section">
              <label className="photo-circle">
                {photo ? (
                  <img src={URL.createObjectURL(photo)} alt="profile" />
                ) : (
                  <div className="empty-circle"></div>
                )}
                <div className="plus-badge">+</div>

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>
            </div>

            <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Age" onChange={(e) => setAge(e.target.value)} />
            <Input placeholder="Location" onChange={(e) => setLocation(e.target.value)} />

            {/* GENDER */}
            <div className="pref-box">
              <h4>Gender</h4>
              <div className="pref-options">
                {["Male", "Female", "Other"].map((g) => (
                  <span
                    key={g}
                    className={gender === g ? "pref active" : "pref"}
                    onClick={() => setGender(g)}
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* LOOKING FOR */}
            <div className="pref-box">
              <h4>Looking For 💫</h4>
              <div className="pref-options">
                {["Friendship", "Dating", "Long-term", "Casual"].map((p) => (
                  <span
                    key={p}
                    className={lookingFor === p ? "pref active" : "pref"}
                    onClick={() => setLookingFor(p)}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <Input
              placeholder="Language (Hindi, English...)"
              onChange={(e) => setVibe(e.target.value)}
            />

            <textarea
              className="textarea"
              placeholder="Tell us about yourself ✨"
              onChange={(e) => setBio(e.target.value)}
            />

            <Button text="Next ➜" onClick={() => setStep(2)} />
          </>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <>
            {/* NO TITLE (REMOVED AS YOU ASKED) */}

            <p className="hint">
              This helps us find your perfect match ✨
            </p>

            {/* PERSONALITY */}
            <div className="pref-box">
              <h4>Personality 🧠</h4>
              <div className="pref-options">
                {["Introvert", "Extrovert", "Balanced", "Funny", "Calm"].map((p) => (
                  <span
                    key={p}
                    className={personality === p ? "pref active" : "pref"}
                    onClick={() => setPersonality(p)}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* WEEKEND VIBE */}
            <div className="pref-box">
              <h4>Weekend Mood 🍿</h4>
              <div className="pref-options">
                {["Netflix", "Travel", "Party", "Food Hunt", "Gym"].map((w) => (
                  <span
                    key={w}
                    className={vibe === w ? "pref active" : "pref"}
                    onClick={() => setVibe(w)}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

            {/* INTERESTS */}
            <div className="pref-box">
              <h4>Interests 💖</h4>
              <div className="chips">
                {interestList.map((item) => (
                  <span
                    key={item}
                    className={interests.includes(item) ? "chip active" : "chip"}
                    onClick={() => toggleInterest(item)}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="btn-row">
              <Button text="⬅ Back" onClick={() => setStep(1)} />
              <Button text="Finish 💖" onClick={handleFinish} />
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default ProfileSetup;