document.addEventListener("DOMContentLoaded", () => {

    const API_BASE_URL = "http://localhost:5000/api";
    const path = window.location.pathname;

    // ================================
    // HELPER FUNCTION: API POST
    // ================================
    async function postData(url = "", data = {}, token = null) {
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        return { status: response.ok, data: resData };
    }

    // ================================
    // SIGN UP PAGE
    // ================================
    const signUpForm = document.getElementById("signupform");
    if (signUpForm) {
        console.log("Sign-Up page detected ✅");
        signUpForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirmPassword").value.trim();

            if (!name || !email || !password || !confirmPassword) return alert("Please fill all fields");
            if (password !== confirmPassword) return alert("Passwords do not match");

            try {
                const { status, data } = await postData(`${API_BASE_URL}/auth/signup`, { name, email, password });
                if (!status) return alert(data.message || "Sign-Up failed");

                alert("Sign-Up successful! You can now sign in.");
                window.location.href = "signin.html";
            } catch (err) {
                console.error(err);
                alert("Server error. Try again later.");
            }
        });
    }

    // ================================
    // SIGN IN PAGE
    // ================================
    const signInForm = document.getElementById("signinform");
    if (signInForm) {
        console.log("Signin page detected ✅");
        signInForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            if (!email || !password) return alert("Please enter email and password");

            try {
                const { status, data } = await postData(`${API_BASE_URL}/auth/signin`, { email, password });
                if (!status) return alert(data.message || "Sign in failed");

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                alert("Signed in successfully! You can continue using the app.");
                window.location.reload();
            } catch (err) {
                console.error(err);
                alert("Server error. Try again later.");
            }
        });
    }

    // ================================
    // ANALYZE PAGE
    // ================================
    const textForm = document.getElementById("textForm");
    if (textForm) {
        console.log("Analyze page detected ✅");
        const textInput = document.getElementById("aiText");
        const textResult = document.getElementById("result");

        textForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const text = textInput.value.trim();
            if (!text) return textResult.innerText = "Please enter some text.";

            textResult.innerText = "Analyzing...";

            try {
                const token = localStorage.getItem("token");
                const { status, data } = await postData(`${API_BASE_URL}/analyze`, { text }, token);

                if (!status) return textResult.innerText = data.message || "Analysis failed.";

                localStorage.setItem("analysisResult", JSON.stringify(data));
                window.location.href = "result.html";

            } catch (err) {
                console.error(err);
                textResult.innerText = "Server error.";
            }
        });
    }

    // ================================
    // RESULT PAGE
    // ================================
    if (path.includes("result.html")) {
        console.log("Result page detected ✅");
        const result = JSON.parse(localStorage.getItem("analysisResult") || "null");

        if (!result) {
            alert("No analysis found. Please analyze some text first.");
            window.location.href = "analyze.html";
        } else {
            const hallucinationEl = document.getElementById("hallucinationScore");
            const citationEl = document.getElementById("citationScore");
            const confidenceEl = document.getElementById("confidenceScore");

            if (hallucinationEl) hallucinationEl.innerText = result.aiGenerated ? "Detected" : "Not Detected";
            if (citationEl) citationEl.innerText = result.citation || "Verified";
            if (confidenceEl) confidenceEl.innerText = `${result.confidence}%`;
        }
    }

    // ================================
    // SMART BACK BUTTON
    // ================================
    const backButton = document.getElementById("backbutton");
    if (backButton) {
        backButton.addEventListener("click", () => {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = "index.html";
            }
        });
    }

});
