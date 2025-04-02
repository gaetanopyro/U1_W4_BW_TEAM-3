function redirectToNextPage() {
  let checkbox = document.getElementById("check");

  if (checkbox.checked) {
    window.location.href = "./Quiz-App_Requirements.html";
  } else {
    alert("Please check the checkbox to proceed.");
  }
}
