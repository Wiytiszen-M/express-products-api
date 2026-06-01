const products = [
  {
    id: 1,
    name: "Notebook",
    price: 1200,
  },
  {
    id: 2,
    name: "Mouse",
    price: 25,
  },
  {
    id: 3,
    name: "Keyboard",
    price: 80,
  },
  {
    id: 4,
    name: "Monitor",
    price: 200,
  },
  {
    id: 5,
    name: "USB Cable",
    price: 10,
  },
  {
    id: 6,
    name: "Headphones",
    price: 60,
  },
  {
    id: 7,
    name: "Webcam",
    price: 45,
  },
  {
    id: 8,
    name: "Speakers",
    price: 70,
  },
  {
    id: 9,
    name: "External Hard Drive",
    price: 120,
  },
  {
    id: 10,
    name: "SSD 1TB",
    price: 150,
  },
  {
    id: 11,
    name: "Router",
    price: 90,
  },
  {
    id: 12,
    name: "Power Bank",
    price: 40,
  },
  {
    id: 13,
    name: "Smartphone",
    price: 800,
  },
  {
    id: 14,
    name: "Tablet",
    price: 300,
  },
  {
    id: 15,
    name: "Charger",
    price: 20,
  },
  {
    id: 16,
    name: "Laptop Stand",
    price: 35,
  },
  {
    id: 17,
    name: "Microphone",
    price: 110,
  },
  {
    id: 18,
    name: "Graphic Tablet",
    price: 220,
  },
  {
    id: 19,
    name: "HDMI Cable",
    price: 15,
  },
  {
    id: 20,
    name: "Flash Drive 64GB",
    price: 18,
  },
  {
    id: 21,
    name: "Printer",
    price: 250,
  },
  {
    id: 22,
    name: "Scanner",
    price: 180,
  },
  {
    id: 23,
    name: "Docking Station",
    price: 130,
  },
];

const findAll = () => {
  return products;
};

const findById = (id) => {
  return products.find((product) => product.id === Number(id));
};

const create = ({ name, price }) => {
  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };

  products.push(newProduct);

  return newProduct;
};

const replaceById = (id, { name, price }) => {
  const product = findById(id);

  if (!product) {
    return null;
  }

  product.name = name;
  product.price = price;

  return product;
};

const updateById = (id, { name, price }) => {
  const product = findById(id);

  if (!product) {
    return null;
  }

  if (name !== undefined) {
    product.name = name;
  }

  if (price !== undefined) {
    product.price = price;
  }

  return product;
};

const deleteById = (id) => {
  const productIndex = products.findIndex(
    (product) => product.id === Number(id),
  );

  if (productIndex === -1) {
    return null;
  }

  const deletedProduct = products.splice(productIndex, 1);

  return deletedProduct[0];
};

module.exports = {
  findAll,
  findById,
  create,
  replaceById,
  updateById,
  deleteById,
};
