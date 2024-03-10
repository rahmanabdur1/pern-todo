import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddProducts() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: 0,
        category: '',
        color: [],
        title: '',
        description: '',
        img: '',
    });

    useEffect(() => {
        fetchProducts();
        fetchSelectedProduct();
    }, [newProduct]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setQuantity(1);
    };

    const handleColorChange = (e) => {
        const { value, checked } = e.target;

        // Ensure that the colors property is initialized as an array
        setNewProduct((prevProduct) => {
            const currentColors = prevProduct.color || [];

            if (checked) {
                return { ...prevProduct, color: [...currentColors, value] };
            } else {
                return {
                    ...prevProduct,
                    color: currentColors.filter((color) => color !== value),
                };
            }
        });
    };

    const fetchSelectedProduct = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:3001/products/${productId}`);
            setSelectedProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };


    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const addProduct = async () => {
        try {
            const response = await axios.post('http://localhost:3001/products', newProduct);
            console.log([...products, response.data]);
            setNewProduct({
                name: '',
                price: 0,
                category: '',
                color: [],
                title: '',
                description: '',
                img: '',
            });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const categories = [
        { value: '', label: 'Select Category' },
        { value: 'shirts', label: 'Shirts' },
        { value: 'pants', label: 'Pants' },
        { value: 'dresses', label: 'Dresses' },

    ];


    const addProductToCart = () => {

    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };



    return (
        <div>
            <h1>Clothing Store</h1>

            <button>All products</button>   <button>shirts</button>   <button>pants</button>   <button>dresses</button>
            <ul>
                {products.map((product) => (
                    <li key={product.id} onClick={() => handleProductClick(product)}>
                        ${product.price} - Category: {product.category} - Title: {product.title} - Description: {product.description} -
                        Colors: {product.color ? product.color.join(', ') : 'No colors'}
                    </li>
                ))};
            </ul>

            <h2>Selected Product</h2>
            {selectedProduct && (
                <div>
                    {selectedProduct.name} - ${selectedProduct.price} - Category: {selectedProduct.category}
                    <br />
                    <label>
                        Quantity:
                        <button onClick={decrementQuantity}>-</button>
                        {quantity}
                        <button onClick={incrementQuantity}>+</button>
                    </label>
                    <br />
                    <button onClick={addProductToCart}>Add to Cart</button>
                </div>
            )}

            <h2>Add New Product</h2>
            <form>
                <label>
                    Name:
                    <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
                </label>
                <br />

                <label>
                    Price:
                    <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} />
                </label>
                <br />

                <label>
                    Category:
                    <select value={newProduct.category} onChange={handleInputChange} name="category">
                        {categories.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </label>
                <br />

                <label>
                    Colors:
                    {['red', 'blue', 'green', 'black'].map((color) => (
                        <span key={color}>
                            <input
                                type="checkbox"
                                name="color"
                                value={color}
                                checked={newProduct.color?.includes(color) || false}
                                onChange={handleColorChange}
                            />
                            {color}
                        </span>
                    ))}
                </label>
                <br />

                <label>
                    Title:
                    <input type="text" name="title" value={newProduct.title} onChange={handleInputChange} />
                </label>
                <br />

                <label>
                    Description:
                    <textarea name="description" value={newProduct.description} onChange={handleInputChange} />
                </label>
                <br />

                <label>
                    Image URL:
                    <input type="file" name="img" value={newProduct.img} onChange={handleInputChange} />
                </label>
                <br />

                <button type="button" onClick={addProduct}>
                    Add Product
                </button>
            </form>


        </div>
    );
};

export default AddProducts;