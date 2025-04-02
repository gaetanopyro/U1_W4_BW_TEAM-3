function redirectToNextPage() {
  let checkbox = document.getElementById("check");

  if (checkbox.checked) {
    window.location.href = "../Benchmark_Page.html";
  } else {
    alert("Please check the checkbox to proceed.");
  }
}
