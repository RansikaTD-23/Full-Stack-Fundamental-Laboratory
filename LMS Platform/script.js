    /*Greeting*/
    const greetingEL = document.getElementById("greeting");
    if(greetingEL){
    const hour = new Date().getHours();
    let greeting;

    if (hour<12){
      greeting = "Good Morning";
    }
    else if (hour<18){
      greeting = "Good Afternoon";
    }
    else{
      greeting = "Good Evening";
    }
    greetingEL.textContent = greeting;
  }
    /*Dark Mode*/
    const toggleBtn = document.getElementById("darkToggle");

    function applyTheme(isDark) {
      document.body.classList.toggle("dark-mode", isDark);
      document.documentElement.setAttribute("data-bs-theme", isDark ? "dark" : "light");
      if (toggleBtn) {
        toggleBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
        }
    }

    let savedDark = false;
    try {
      savedDark = localStorage.getItem("theme") === "dark";
    } catch (e) {}
    applyTheme(savedDark);
     
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        const isDark = !document.body.classList.contains("dark-mode");
        applyTheme(isDark);
         try {
          localStorage.setItem("theme", isDark ? "dark" : "light");
        } catch (e) {}
      });
    }

  /* Course details modal */
const courseModal = document.getElementById("courseModal");

if (courseModal) {
  courseModal.addEventListener("show.bs.modal", function (event) {
    const btn = event.relatedTarget;
    document.getElementById("courseModalTitle").textContent = btn.getAttribute("data-title");
    document.getElementById("courseModalBody").textContent = btn.getAttribute("data-desc");
  });
}