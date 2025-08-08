function copyEmail(event) {
    event.preventDefault(); // prevents mail client from opening

    const email = document.getElementById("emailLink").textContent;
    const tooltip = document.getElementById("tooltipText");

    navigator.clipboard.writeText(email).then(() => {
      tooltip.innerText = "Copied!";
      setTimeout(() => {
        tooltip.innerText = "Click to copy";
      }, 1500);
    });
  }
