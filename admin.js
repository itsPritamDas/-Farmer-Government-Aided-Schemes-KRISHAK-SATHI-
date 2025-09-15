// ================== POST CROP ==================
const cropForm = document.getElementById("cropForm");
if (cropForm) {
  cropForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cropName = document.getElementById("cropName").value;
    const season = document.getElementById("season").value;
    const pesticide = document.getElementById("pesticide").value;

    db.collection("crops").add({
      cropName,
      season,
      pesticide
    }).then(() => {
      alert("✅ Crop added successfully!");
      cropForm.reset();
    }).catch(err => alert(err.message));
  });
}

// ================== POST SCHEME ==================
const schemeForm = document.getElementById("schemeForm");
if (schemeForm) {
  schemeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const schemeName = document.getElementById("schemeName").value;
    const benefit = document.getElementById("benefit").value;

    db.collection("schemes").add({
      schemeName,
      benefit
    }).then(() => {
      alert("✅ Scheme added successfully!");
      schemeForm.reset();
    }).catch(err => alert(err.message));
  });
}

// ================== VIEW + APPROVE or REJECT APPLICATIONS ==================
const appList = document.getElementById("applicationsList");
if (appList) {
  db.collection("applications").onSnapshot(snapshot => {
    appList.innerHTML = "";
    snapshot.forEach(doc => {
      const app = doc.data();
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${app.userEmail}</strong> applied for 
        <em>${app.schemeName}</em> - Status: ${app.status}
        ${app.status === "Pending" ? `
          <button onclick="approveApp('${doc.id}')">Approve</button>
          <button onclick="rejectApp('${doc.id}')">Reject</button>
        ` : ""}
      `;
      appList.appendChild(li);
    });
  });
}

function approveApp(appId) {
  db.collection("applications").doc(appId).update({
    status: "Approved"
  }).then(() => {
    alert("✅ Application approved!");
  }).catch(err => alert(err.message));
}

function rejectApp(appId) {
  db.collection("applications").doc(appId).update({
    status: "Rejected"
  }).then(() => {
    alert("❌ Application rejected!");
  }).catch(err => alert(err.message));
}
