let products = JSON.parse(localStorage.getItem('products')) || [], editId = -1;
const get = id => document.getElementById(id);

const save = () => {
  const p = {
    title: get('title').value,
    price: +get('price').value,
    image: get('image').value
  };
  if (!p.title || !p.price) return alert('Title and price required');
  editId > -1 ? products[editId] = p : products.push(p);
  editId = -1;
  localStorage.setItem('products', JSON.stringify(products));
  get('title').value = get('price').value = get('image').value = '';
  draw();
}

const draw = () => {
  let s = get('search').value.toLowerCase();
  const show = products.filter(p => p.title.toLowerCase().includes(s));
  get('list').innerHTML = show.map((p, i) => `
    <div class="product">
      <img src="${p.image}" alt="">
      <h4>${p.title} - ₹${p.price}</h4>
      <button onclick="edit(${i})">Edit</button>
      <button onclick="del(${i})">Delete</button>
    </div>
  `).join('');
}

const edit = i => {
  const p = products[i];
  get('title').value = p.title;
  get('price').value = p.price;
  get('image').value = p.image;
  editId = i;
}

const del = i => {
  if (confirm('Delete this product?')) {
    products.splice(i, 1);
    localStorage.setItem('products', JSON.stringify(products));
    draw();
  }
}

draw();
