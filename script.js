function addMaterial() {
  const materialsDiv = document.getElementById("materials");
  const newMaterial = document.createElement("div");
  newMaterial.className = "material";
  newMaterial.innerHTML = `
    <input type="text" placeholder="Material name" class="material-name" />
    <input type="number" step="0.01" min="0" placeholder="Quantity" class="material-qty" />
    <input type="number" step="0.01" min="0" placeholder="Price per unit" class="material-price" />
  `;
  materialsDiv.appendChild(newMaterial);
}

document.getElementById("costForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let totalMaterialCost = 0;
  const materials = document.querySelectorAll(".material");

  materials.forEach(mat => {
    const qty = parseFloat(mat.querySelector(".material-qty").value);
    const price = parseFloat(mat.querySelector(".material-price").value);

    if (!isNaN(qty) && !isNaN(price)) {
      totalMaterialCost += qty * price;
    }
  });

  const laborHours = parseFloat(document.getElementById("laborHours").value);
  const hourlyRate = parseFloat(document.getElementById("hourlyRate").value);
  const laborCost = (!isNaN(laborHours) && !isNaN(hourlyRate)) ? laborHours * hourlyRate : 0;

  // Optional: Tax and/or markup %
  const taxPercent = parseFloat(document.getElementById("taxPercent")?.value) || 0;
  const markupPercent = parseFloat(document.getElementById("markupPercent")?.value) || 0;

  let subtotal = totalMaterialCost + laborCost;
  let taxAmount = subtotal * (taxPercent / 100);
  let markupAmount = subtotal * (markupPercent / 100);

  let totalCost = subtotal + taxAmount + markupAmount;

  document.getElementById("totalCost").textContent = totalCost.toFixed(2);
});
