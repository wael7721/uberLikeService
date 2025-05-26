type SignInData = {
  email: string;
  password: string;
};
export async function signUpUser(formData: SignInData) {
  try {
    const response = await fetch("http://taxi_backend:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("SignUp error:", error);
    return { type: "error", message: "Network error. Please try again." };
  }
}
async function signInUser(formData: Record<string,any>) {
    try {
    const response = await fetch("http://taxi_backend:3000/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("SignUp error:", error);
    return { type: "error", message: "Network error. Please try again." };
  }
}