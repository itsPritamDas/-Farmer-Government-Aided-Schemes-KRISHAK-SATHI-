// ================== REGISTER ==================
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
      .then((cred) => {
    
        return db.collection("users").doc(cred.user.uid).set({
          name: name,
          email: email,
          role: "farmer"   // default role = farmer
        });
      })
      .then(() => {
        alert("Registration successful! Please login.");
        window.location.href = "index.html";
      })
      .catch(err => alert(err.message));
  });
}

// ================== LOGIN ==================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    auth.signInWithEmailAndPassword(email, password)
      .then((cred) => {
        // Get from Firestore
        return db.collection("users").doc(cred.user.uid).get();
      })
      .then((doc) => {
        if (doc.exists) {
          const role = doc.data().role;
          if (role === "admin") {
            window.location.href = "admin.html";
          } else {
            window.location.href = "user.html";
          }
        } else {
          alert("No user profile found!");
        }
      })
      .catch(err => alert(err.message));
  });
}

// ================== LOGOUT ==================
function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}
