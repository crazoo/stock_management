let stock = JSON.parse(localStorage.getItem("stockData")) || [
  {name:"Cream", category:"DairyProducts", date:"2021-07-19", qty:18},
  {name:"Blueberries", category:"Fruits", date:"2021-07-19", qty:11},
  {name:"Broccoli", category:"Vegetables", date:"2021-07-19", qty:27},
  {name:"Beef", category:"Meat", date:"2021-07-19", qty:36},
  {name:"Mozzarella", category:"DairyProducts", date:"2021-07-18", qty:21}
];

const table = document.getElementById("stockTable");

function save() {
  localStorage.setItem("stockData", JSON.stringify(stock));
}

function render() {
  table.innerHTML = "";
  stock.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td contenteditable="true" onblur="edit(${index},'name',this.innerText)">${item.name}</td>
      <td>
        <select onchange="edit(${index},'category',this.value)">
          ${['DairyProducts','Fruits','Vegetables','Meat','Sea Food','Others']
            .map(c => `<option ${c===item.category?'selected':''}>${c}</option>`)
            .join('')}
        </select>
      </td>
      <td><input type="date" value="${item.date}" onchange="edit(${index},'date',this.value)"></td>
      <td><input type="number" value="${item.qty}" onchange="edit(${index},'qty',this.value)"></td>
      <td>
        <button class="btn-update">Update</button>
        <button class="btn-delete" onclick="removeItem(${index})">Delete</button>
      </td>
    `;
    table.appendChild(tr);
  });
}

function edit(i, key, value) {
  stock[i][key] = value;
  save();
}

function removeItem(i) {
  stock.splice(i, 1);
  save();
  render();
}

function addItem() {
  const name = itemName.value.trim();
  const category = category.value;
  const qty = quantity.value;
  const date = date.value;

  if (!name || !category || !qty || !date) {
    alert("Fill all fields");
    return;
  }

  stock.push({name, category, date, qty});
  save();
  render();

  itemName.value = "";
  quantity.value = "";
}

render();
