// =====================
// DATA
// =====================

const weaponReachData = [
  { Name: "Nodachi", Class: "Katana", Cut: 1.38, Blunt: 0, Reach: 25 },
  { Name: "Topper", Class: "Katana", Cut: 1.27, Blunt: 0.1, Reach: 25 },
  { Name: "Heavy_Polearm", Class: "Polearm", Cut: 0.81, Blunt: 0.4, Reach: 26 },
  { Name: "Naginata_Katana", Class: "Polearm", Cut: 0.98, Blunt: 0.2, Reach: 26 },
  { Name: "Naginata", Class: "Polearm", Cut: 0.92, Blunt: 0.2, Reach: 28 },
  { Name: "Polearm", Class: "Polearm", Cut: 0.58, Blunt: 0.5, Reach: 28 },
  { Name: "Falling_Sun", Class: "Heavy", Cut: 1.38, Blunt: 1.0, Reach: 25 },
  { Name: "Plank", Class: "Heavy", Cut: 0.92, Blunt: 1.2, Reach: 30 },
  { Name: "Fragment_Axe", Class: "Heavy", Cut: 0.35, Blunt: 1.8, Reach: 32 },
];

const turretData = [
  {Name: "Mounted_XBOW", Stage: 1, Iron_Plates: 6, Copper:0, Steel_Bars: 0, Copper_Alloy_Plates: 0, Electrical_Components: 0},
  {Name: "Mounted_XBOW_II", Stage: 2, Iron_Plates: 8, Copper: 0, Steel_Bars: 0, Copper_Alloy_Plates: 0, Electrical_Components: 0},
  {Name: "Harpoon", Stage: 3, Iron_Plates: 7, Copper: 3, Steel_Bars: 3, Copper_Alloy_Plates: 0, Electrical_Components: 0},
  {Name: "Harpoon_II", Stage: 4, Iron_Plates: 10, Copper: 4, Steel_Bars: 3, Copper_Alloy_Plates: 0, Electrical_Components: 0},
  {Name: "Double-Barrel_Harpoon", Stage: 5, Iron_Plates: 0, Copper: 0, Steel_Bars:6, Copper_Alloy_Plates: 6, Electrical_Components: 6},
];

// TODO: would be better to merge dupes so we dont need to review cell by cell,
// TODO: figure out images
bodyPartHitChancesData = [
  { Name: "Greenlander", Head: 80, Chest: 140, Stomach: 140, Right_Arm: 40, Left_Arm: 80, Legs: 80 },
  // shek + scorchlander are same
  { Name: "Scorchlander", Head: 80, Chest: 140, Stomach: 140, Right_Arm: 60, Left_Arm: 80, Legs: 80 },
  { Name: "Shek", Head: 80, Chest: 140, Stomach: 140, Right_Arm: 60, Left_Arm: 80, Legs: 80 },
  { Name: "Skeleton", Head: 80, Chest: 140, Stomach: 80, Right_Arm: 60, Left_Arm: 80, Legs: 80 },
  { Name: "Hive_Worker", Head: 80, Chest: 140, Stomach: 60, Right_Arm: 40, Left_Arm: 80, Legs: 80 },
  { Name: "Hive_Prince", Head: 80, Chest: 140, Stomach: 60, Right_Arm: 40, Left_Arm: 80, Legs: 80 },
  { Name: "Hive_Soldier", Head: 80, Chest: 140, Stomach: 60, Right_Arm: 40, Left_Arm: 80, Legs: 80 },
];

// specialist for all armours
const medBodyArmourData = [
  {
    Name: "White_Plate_Jacket",
    Blunt_Res: "28%",
    Cut_Res: "49%",
    Cut_Res_Eff: "70%",
    Coverage: "100% Chest, Stomach, Arms",
  },
  {
    Name: "Mercenary_Leather_Armour",
    Blunt_Res: "32%",
    Cut_Res: "49%",
    Cut_Res_Eff: "70%",
    Coverage: "100% Chest, 70% Stomach, 80% Arms",
  },
];

const heavyBodyArmourData = [
  {
    Name: "Mercenary_Plate",
    Blunt_Res: "48%",
    Cut_Res: "62%",
    Cut_Res_Eff: "80%",
    Coverage: "100% Chest, 70% Stomach, 90% Arms",
  },
  {
    Name: "Samurai_Armour",
    Blunt_Res: "52%",
    Cut_Res: "70%",
    Cut_Res_Eff: "90%",
    Coverage: "100% Chest, 85% Stomach, 85% Arms",
  },
  { Name: "Crab_Armour", Blunt_Res: "56%", Cut_Res: "78%", Cut_Res_Eff: "90%", Coverage: "100% Chest, Stomach, 90% Arms" },
  {
    Name: "Unholy_Chestplate",
    Blunt_Res: "44.8%",
    Cut_Res: "70%",
    Cut_Res_Eff: "95%",
    Coverage: "100% Chest, Stomach, 25% Arms, 40% Legs",
  },
];

// =====================
// GENERIC SORTABLE TABLE FUNCTION
// =====================
function createSortableTable({ tableId, data, headers }) {
  let sortKey = headers[0];
  let sortAsc = true;

  const table = document.getElementById(tableId);
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");

  // --- Setup headers ---
  const headerRow = document.createElement("tr");
  headers.forEach((key) => {
    const th = document.createElement("th");
    th.dataset.column = key;
    th.style.cursor = "pointer";

    th.addEventListener("click", () => {
      sortAsc = sortKey === key ? !sortAsc : true;
      sortKey = key;

      data.sort((a, b) => {
        if (a[key] < b[key]) return sortAsc ? -1 : 1;
        if (a[key] > b[key]) return sortAsc ? 1 : -1;
        return 0;
      });

      renderTable();
      updateSortIndicators();
    });

    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);

  // --- Sort indicators ---
  function updateSortIndicators() {
    thead.querySelectorAll("th").forEach((th) => {
      const key = th.dataset.column;
      if (key === sortKey) {
        th.textContent = key + (sortAsc ? " ▲" : " ▼");
      } else {
        th.textContent = `${key} ⇅`;
      }
    });
  }

  // --- Render table ---
  function renderTable() {
    tbody.innerHTML = "";

    data.forEach((row) => {
      const tr = document.createElement("tr");

      headers.forEach((key) => {
        const td = document.createElement("td");

        if (key === "Name") {
          const wrapper = document.createElement("div");
          wrapper.className = "name-cell";

          const text = document.createElement("div");
          text.textContent = row.Name;
          wrapper.appendChild(text);

          // if additional tables do not have image we will have list of tables
          if (tableId !== "bodyPartHitChancesTable") {
            const img = document.createElement("img");
            img.src = `img/${tableId}/${row.Name}.jpg`;
            img.alt = row.Name;
            wrapper.appendChild(img);
          }

          td.appendChild(wrapper);
        } else {
          td.textContent = row[key];
        }

        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });
  }

  // --- Initial render ---
  data.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return -1;
    if (a[sortKey] > b[sortKey]) return 1;
    return 0;
  });

  renderTable();
  updateSortIndicators();
}

// =====================
// CREATE TABLES
// =====================
createSortableTable({
  tableId: "weaponTable",
  data: weaponReachData,
  headers: Object.keys(weaponReachData[0]),
});

createSortableTable({
  tableId: "turretTable",
  data: turretData,
  headers: Object.keys(turretData[0]),
});

createSortableTable({
  tableId: "bodyPartHitChancesTable",
  data: bodyPartHitChancesData,
  headers: Object.keys(bodyPartHitChancesData[0]),
});

createSortableTable({
  tableId: "medBodyArmourTable",
  data: medBodyArmourData,
  headers: Object.keys(medBodyArmourData[0]),
});

createSortableTable({
  tableId: "heavyBodyArmourTable",
  data: heavyBodyArmourData,
  headers: Object.keys(heavyBodyArmourData[0]),
});

// TODO:
// createSortableTable({
//   tableId: "legwearTable",
//   data: ,
//   headers: ["Name", "Size", "Danger"]
// });

// createSortableTable({
//   tableId: "shirtsTable",
//   data: ,
//   headers: ["Name", "Size", "Danger"]
// });
