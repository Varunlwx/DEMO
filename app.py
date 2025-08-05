from flask import Flask, render_template, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder='.', template_folder='.')

# Serve static files
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/products')
def get_products():
    # Mock product data - in a real application, this would come from a database
    products = [
        {
            'id': 1,
            'name': 'Designer Sweater',
            'category': 'MENSWEAR',
            'price': 199.99,
            'image': 'assets/product1.jpg'
        },
        {
            'id': 2,
            'name': 'Premium Jacket',
            'category': 'MENSWEAR',
            'price': 299.99,
            'image': 'assets/product2.jpg'
        },
        {
            'id': 3,
            'name': 'Luxury Dress',
            'category': 'WOMENSWEAR',
            'price': 249.99,
            'image': 'assets/product3.jpg'
        },
        {
            'id': 4,
            'name': 'Limited Edition Coat',
            'category': 'LIMITED',
            'price': 399.99,
            'image': 'assets/product4.jpg'
        }
    ]
    return jsonify(products)

@app.route('/api/collections')
def get_collections():
    # Mock collection data
    collections = [
        {
            'id': 1,
            'name': 'Summer 2025',
            'description': 'The latest summer styles',
            'image': 'assets/collection1.jpg'
        },
        {
            'id': 2,
            'name': 'Winter Essentials',
            'description': 'Stay warm in style',
            'image': 'assets/collection2.jpg'
        },
        {
            'id': 3,
            'name': 'Limited Edition',
            'description': 'Exclusive designs',
            'image': 'assets/collection3.jpg'
        }
    ]
    return jsonify(collections)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)