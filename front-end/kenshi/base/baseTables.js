// =====================
// DATA
// =====================

const turretConstructionData = [
  {
    Name: "Mounted_XBOW",
    Stage: 1,
    Iron_Plates: 6,
    Copper: 0,
    Steel_Bars: 0,
    Copper_Alloy_Plates: 0,
    Electrical_Components: 0,
  },
  {
    Name: "Mounted_XBOW_II",
    Stage: 2,
    Iron_Plates: 8,
    Copper: 0,
    Steel_Bars: 0,
    Copper_Alloy_Plates: 0,
    Electrical_Components: 0,
  },
  { Name: "Harpoon", Stage: 3, Iron_Plates: 7, Copper: 3, Steel_Bars: 3, Copper_Alloy_Plates: 0, Electrical_Components: 0 },
  {
    Name: "Harpoon_II",
    Stage: 4,
    Iron_Plates: 10,
    Copper: 4,
    Steel_Bars: 3,
    Copper_Alloy_Plates: 0,
    Electrical_Components: 0,
  },
  {
    Name: "Double-Barrel_Harpoon",
    Stage: 5,
    Iron_Plates: 0,
    Copper: 0,
    Steel_Bars: 6,
    Copper_Alloy_Plates: 6,
    Electrical_Components: 6,
  },
];

const turretDamageData = [
  { Name: "Mounted_XBOW_II", Pierce_Dmg: 75, Max_Reload: "6s", Min_Reload: "1.5s", Range: "100m" },
  { Name: "Harpoon", Pierce_Dmg: 75, Max_Reload: "4s", Min_Reload: "2s", Range: "120m" },
  { Name: "Harpoon_II", Pierce_Dmg: 90, Max_Reload: "4s", Min_Reload: "2s", Range: "120m" },
  { Name: "Double-Barrel_Harpoon", Pierce_Dmg: 80, Max_Reload: "6s", Min_Reload: "2s", Range: "75m" },
  { Name: "Multi-Barrel_Harpoon", Pierce_Dmg: 50, Max_Reload: "12s", Min_Reload: "2.5s", Range: "65m" },
];

// add pictures
const buildingConstructionData = [
  { Name: "Storm_House", Building_Mats: 16, Iron_Plates: 0, Copper_Alloy_Plates: 0 },
  { Name: "Longhouse", Building_Mats: 24, Iron_Plates: 0, Copper_Alloy_Plates: 0 },
  { Name: "Stationhouse", Building_Mats: 40, Iron_Plates: 0, Copper_Alloy_Plates: 0 },
  { Name: "Watchtower", Building_Mats: 60, Iron_Plates: 10, Copper_Alloy_Plates: 0 },
  { Name: "Outpost_s-III", Building_Mats: 20, Iron_Plates: 0, Copper_Alloy_Plates: 20 },
  { Name: "Outpost_s-IV", Building_Mats: 30, Iron_Plates: 0, Copper_Alloy_Plates: 30 },
];

// TODO: add pictures
const defensiveGateData = [
  { Name: "Makeshift", Building_Mats: 5, Door_Condition: 15 },
  { Name: "Defensive_II", Building_Mats: 10, Door_Condition: 30 },
  { Name: "Defensive_III", Building_Mats: 15, Door_Condition: 60 },
  { Name: "Defensive_IV", Building_Mats: 20, Door_Condition: 90 },
];

// TODO: add pictures
const windEnergyData = [
  { Name: "Small_Generator", Energy_Output: 25, Iron_Plates: 7, Copper: 0, Electrical_Components: 4 },
  { Name: "Generator", Energy_Output: 50, Iron_Plates: 8, Copper: 5, Electrical_Components: 0 },
  { Name: "Generator_II", Energy_Output: 100, Iron_Plates: 8, Copper: 0, Electrical_Components: 8 },
];

const tablesWithNoImages = ["turretConstructionTable", "windEnergyTable", "turretDamageTable"];

// =====================
// GENERIC SORTABLE TABLE FUNCTION
// =====================
function createSortableTable({ tableId, data, headers, sortName }) {
  let sortKey = sortName ?? headers[0];
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

          if (!tablesWithNoImages.includes(tableId)) {
            console.log(tableId);
            const img = document.createElement("img");
            img.src = "../" + `img/${tableId}/${row.Name}.jpg`;
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

createSortableTable({
  tableId: "turretConstructionTable",
  data: turretConstructionData,
  headers: Object.keys(turretConstructionData[0]),
  sortName: "Stage",
});

createSortableTable({
  tableId: "buildingConstructionTable",
  data: buildingConstructionData,
  headers: Object.keys(buildingConstructionData[0]),
  sortName: "Building_Mats",
});

createSortableTable({
  tableId: "defensiveGateTable",
  data: defensiveGateData,
  headers: Object.keys(defensiveGateData[0]),
  sortName: "Door_Condition",
});

createSortableTable({
  tableId: "windEnergyTable",
  data: windEnergyData,
  headers: Object.keys(windEnergyData[0]),
  sortName: "Energy_Output",
});

createSortableTable({
  tableId: "turretDamageTable",
  data: turretDamageData,
  headers: Object.keys(turretDamageData[0]),
  sortName: "Pierce_Dmg",
});
