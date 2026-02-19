import { useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Password reset email sent!");
      } else {
        alert(data.message || "Reset failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
