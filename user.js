// ================== VIEW CROPS ==================
const cropList = document.getElementById("cropsList");
if (cropList) {
  db.collection("crops").onSnapshot(snapshot => {
    cropList.innerHTML = "";
    snapshot.forEach(doc => {
      const crop = doc.data();
      const li = document.createElement("li");
      li.textContent = `${crop.cropName} (Season: ${crop.season}, Pesticide: ${crop.pesticide})`;
      cropList.appendChild(li);
    });
  });
}

// ================== VIEW & APPLY SCHEMES ==================
const schemeList = document.getElementById("schemesList");
if (schemeList) {
  db.collection("schemes").onSnapshot(snapshot => {
    schemeList.innerHTML = "";
    snapshot.forEach(doc => {
      const scheme = doc.data();
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${scheme.schemeName}</strong> - ${scheme.benefit}
        <button onclick="applyScheme('${doc.id}', '${scheme.schemeName}')">Apply</button>
      `;
      schemeList.appendChild(li);
    });
  });
}

function applyScheme(schemeId, schemeName) {
  const user = auth.currentUser;
  if (!user) {
    alert("Please login first!");
    return;
  }

  db.collection("applications").add({
    userId: user.uid,
    userEmail: user.email,
    schemeId,
    schemeName,
    status: "Pending"
  }).then(() => {
    alert("✅ Application submitted successfully!");
  }).catch(err => alert(err.message));
}

// ================== VIEW APPLICATION STATUS ==================
const statusList = document.getElementById("statusList");
if (statusList) {
  const user = auth.currentUser;
  if (user) {
    db.collection("applications")
      .where("userId", "==", user.uid)
      .onSnapshot(snapshot => {
        statusList.innerHTML = "";
        snapshot.forEach(doc => {
          const app = doc.data();
          const li = document.createElement("li");
          li.textContent = `${app.schemeName} - Status: ${app.status}`;
          statusList.appendChild(li);
        });
      });
  }
}
