"use client";

import { FormEvent, useRef, useState } from "react";

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}

export default function Products() {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            name: "UPVC Pipe",
            price: 59.99,
            stock: 100,
        },
        {
            id: 2,
            name: "Shower Mixer",
            price: 70.36,
            stock: 80,
        },
        {
            id: 3,
            name: "Connection Pipe",
            price: 69.99,
            stock: 72,
        },
    ]);

    function openModal() {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    }

    function closeModal() {
        if (modalRef.current) {
            modalRef.current.close()
        }
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as Omit<Product, "id">
        const id = Math.random() * 9999
        setProducts([...products, {
            id,
            ...data
        }])
        closeModal()
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center justify-between px-10">
                <div className="text-4xl">Products</div>
                <div>
                    <button
                        className="px-5 py-2 bg-white text-black rounded-md font-semibold"
                        onClick={openModal}
                    >
                        Add New Product
                    </button>
                </div>
            </div>
            <div className="h-1 w-full my-10 border-t border-neutral-800"></div>
            <div>
                <dialog
                    className="backdrop:backdrop-blur-sm bg-black text-white rounded-md w-full max-w-[500px] border border-neutral-800"
                    ref={modalRef}
                >
                    <div className="p-5 flex flex-col">
                        <div className="text-xl font-semibold">Add Product</div>
                        <div className="text-sm opacity-60">Enter details below to add new product</div>
                        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-3">
                            <label htmlFor="p-name">
                                <p className="text-sm">Name</p>
                                <input required className="mt-2 block w-full bg-black outline-none border border-neutral-800 px-3 py-2 rounded-md" name="name" type="text" id="p-name" />
                            </label>
                            <label htmlFor="p-price">
                                <p className="text-sm">Price</p>
                                <input required className="mt-2 block w-full bg-black outline-none border border-neutral-800 px-3 py-2 rounded-md" name="price" type="number" min="0" step="0.01" id="p-price" />
                            </label>
                            <label htmlFor="p-stock">
                                <p className="text-sm">Stock</p>
                                <input required className="mt-2 block w-full bg-black outline-none border border-neutral-800 px-3 py-2 rounded-md" name="stock" type="number" min="0" step="1" id="p-stock" />
                            </label>
                            <div className="flex items-center justify-between gap-5 mt-10">
                                <button className="text-sm px-5 py-2 hover:bg-neutral-800 text-white rounded-md font-medium" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="text-sm px-5 py-2 bg-white text-black rounded-md font-medium">Add</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
            <div className="flex flex-col px-5">
                <div className="grid grid-cols-6 px-5">
                    <div className="col-span-4 text-xl">Name</div>
                    <div className="col-span-1 text-xl">Stock</div>
                    <div className="col-span-1 text-xl">Price</div>
                </div>
                <div className="w-full h-px my-3"></div>
                {products.map(product => (
                    <div key={product.id} className="grid grid-cols-6 py-3 px-5 hover:bg-neutral-900 rounded-md">
                        <div className="col-span-4 opacity-60">{product.name}</div>
                        <div className="col-span-1 opacity-60">{product.stock}</div>
                        <div className="col-span-1 opacity-60">{product.price}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
