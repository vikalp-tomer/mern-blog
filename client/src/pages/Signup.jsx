import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("Please fill all the fields");
      return;
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        setErrorMessage(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      console.log(data);
      navigate("/sign-in");
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to={"/"} className=" font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Vikalp's
            </span>{" "}
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                id="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                id="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                id="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size={"sm"} />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account</span>
            <Link to={"/sign-in"} className="text-blue-500">
              Sign in
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color={"failure"}>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
