import * as fs from "fs";

export class ProductManager {

    constructor(path){
        this.path = `./src/${path}`;
        this.products = [];
        this.id = 0;

        if (!fs.existsSync(this.path)){
            fs.writeFileSync(this.path, JSON.stringify(this.products))
        }
    }

    async addProduct(product){
        const { title, description, code, price, status = true, stock, category, thumbnails = []} = product;
        if (title && description && price && code && stock && status && category) {
            const codeValid = this.products.find(p => p.code === code);
            if (codeValid) {
                return(`Product already exists.`);
            }  else {
                this.id++
                product.id = this.id;
                this.products.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(this.products))
                try {
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                    return `The product "${product.title}" was added successfully.`;
                } catch (err) {
                    return err;
                }
            }
        } else {
            return (`ERROR, Product data is missing or is a different type of data.`);
        }
    }

    async getProducts(){
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        return(products)
    }

    async getProductById(id){
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        const productForId = products.find(p => p.id === id)
        if(productForId){
            return(productForId)
        } else return("Product not found.")
    }

    async updateProduct(id, updateData) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex !== -1) {
            const updatedProduct = { ...this.products[productIndex], ...updateData };
            this.products[productIndex] = updatedProduct;
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
                .then(() => {return `The product "${updatedProduct.title}" was updated successfully.`})
                .catch((err) => {(err)})
        } else {
            return("Product not found.");
        }
    }

    async deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            return("Product not found.");
        }
    
        const product = this.products[index];
        this.products.splice(index, 1);
    
        await promises.writeFile(this.path, JSON.stringify(this.products))
            .then(() => {return `The product "${product.title}" was deleted successfully.`})
            .catch((err) => {return err});
    }

    async deleteAll() {
        this.products = [];
        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
        return `Products was deleted successful.`
    }
}

export default ProductManager;