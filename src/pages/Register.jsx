// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Register.css";

export default function Register() {
  const [pin, setPin] = useState("");
  const [scheme, setScheme] = useState("");
  const [branch, setBranch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const cleanPin = pin.trim();
    const cleanScheme = scheme.trim().toUpperCase();
    const cleanBranch = branch.trim().toUpperCase();

    if (!cleanPin || !cleanScheme || !cleanBranch) {
      setError("Fill in all three fields to register.");
      return;
    }

    setLoading(true);

    const { error: insertError } = await supabase
      .from("students")
      .insert([{ pin: cleanPin, scheme: cleanScheme, branch: cleanBranch }]);

    setLoading(false);

    if (insertError) {
      if (insertError.code === "23505") {
        setError("This PIN is already registered. Try logging in instead.");
      } else {
        setError("Registration failed: " + insertError.message);
      }
      return;
    }
    const { data: studentData, error: fetchError } = await supabase
    .from("students")
    .select("*")
    .eq("pin", cleanPin)
    .single();

  setLoading(false);

  // Step 3: Handle fetch errors
  if (fetchError) {
    console.error(fetchError);
    setError("Registration succeeded, but failed to load student data.");
    navigate("/login");
    return;
  }

    localStorage.setItem("student", JSON.stringify(studentData));
  navigate("/dashboard");
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <span className="register-rule" aria-hidden="true" />

        <div className="register-content">
          <p className="register-kicker">Learners Portal</p>
          <h1 className="register-title">Student register</h1>
          <p className="register-subtitle">
            Enter your PIN, scheme, and branch once — the portal will
            remember you on this device from then on.
          </p>

          <form onSubmit={handleRegister} className="register-form" noValidate>
            <div className="field">
              <label htmlFor="pin">PIN number</label>
              <input
                id="pin"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 24030-CM-001"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="field-input field-input--pin"
                autoComplete="off"
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="scheme">Scheme</label>
                <input
                  id="scheme"
                  type="text"
                  placeholder="e.g. C23"
                  value={scheme}
                  onChange={(e) => setScheme(e.target.value)}
                  className="field-input"
                />
              </div>

              <div className="field">
                <label htmlFor="branch">Branch</label>
                <input
                  id="branch"
                  type="text"
                  placeholder="e.g. CME"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="field-input"
                />
              </div>
            </div>

            {error && (
              <p className="register-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="register-submit">
              {loading ? "Registering…" : "Register"}
            </button>
          </form>

          <p className="register-footer">
            Already registered? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}