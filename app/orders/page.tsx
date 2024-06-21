"use client";

import { FormEvent, useMemo, useRef, useState } from "react";

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}

interface OrderItem {
    product: Product
    quantity: number
}

interface Item {
    id: number
}

interface Field {
    id: number
    product: number | undefined
    quantity: number | undefined
}

interface Order {
    id: number
    items: OrderItem[],
    amount: number
}

const products = [
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
]

export default function Products() {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [orders, setOrders] = useState<Order[]>([
        {
            id: 1,
            amount: 320.69,
            items: [
                {
                    product: products[0],
                    quantity: 3
                },
                {
                    product: products[1],
                    quantity: 2
                }
            ]
        },
        {
            id: 2,
            amount: 140.35,
            items: [
                {
                    product: products[2],
                    quantity: 1
                },
                {
                    product: products[0],
                    quantity: 1
                },
                {
                    product: products[1],
                    quantity: 3
                }
            ]
        },
    ])
    const [fields, setFields] = useState<Field[]>([
        {
            id: 0,
            product: undefined,
            quantity: undefined
        }
    ])

    const totalAmount = useMemo(() => {
        const amount = fields.filter(field => {
            if (!field.product) return false
            if (!field.quantity) return false
            return true
        }).map(field => {
            const product = products.find(p => p.id == field.product)
            if (!product) {
                return field
            }
            return {
                ...field,
                product
            }
            // @ts-ignore
        }).reduce((total, field) => total + ((field.product as Product).price * field.quantity), 0)
        console.log(amount)
        return amount
    }, [fields])

    function addField() {
        const lastId = fields.reverse()[0].id
        setFields([...fields, { id: lastId + 1, product: undefined, quantity: undefined }])
    }

    function removeField(index: number) {
        if (fields.length > 1) {
            setFields(val => val.filter((_, i) => i != index))
        }
    }

    function setFieldProduct(value: number, index: number) {
        setFields(val => val.map((field, i) => {
            if (i == index) {
                return { ...field, product: value, quantity: 1 }
            }
            return field
        }))
    }

    function setFieldQuantity(value: number, index: number) {
        setFields(val => val.map((field, i) => {
            if (i == index) {
                return { ...field, quantity: value }
            }
            return field
        }))
    }

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
        const data: Order = {
            id: Math.floor(Math.random() * 9999),
            items: fields.map(field => ({
                product: products.find(p => p.id == field.product) as Product,
                quantity: field.quantity as number
            })),
            amount: totalAmount
        }
        setOrders(val => [...val, data])
        setFields([
            {
                id: 0,
                product: undefined,
                quantity: undefined
            }
        ])
        closeModal()
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center justify-between px-10">
                <div className="text-4xl">Orders</div>
                <div>
                    <button
                        className="px-5 py-2 bg-white text-black rounded-md font-semibold"
                        onClick={openModal}
                    >
                        Create New Order
                    </button>
                </div>
            </div>
            <div className="h-1 w-full my-10 border-t border-neutral-800"></div>
            <div>
                <dialog
                    className="backdrop:backdrop-blur-sm bg-black text-white rounded-md w-full max-w-[600px] border border-neutral-800"
                    ref={modalRef}
                >
                    <div className="p-5 flex flex-col">
                        <div className="text-xl font-semibold">Create Order</div>
                        <div className="text-sm opacity-60">Enter details below to create new order</div>
                        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-3">
                            <div className="flex flex-col gap-5">
                                {fields.map((field, i) => (
                                    <div key={`${field.id}-${field.product}`} className="grid grid-cols-8 gap-3">
                                        <div className="col-span-5">
                                            <label htmlFor="p-name">
                                                <p className="text-sm">Product</p>
                                                <select value={field.product} onChange={e => setFieldProduct(parseInt(e.target.value), i)} required className="mt-2 block w-full bg-black outline-none border border-neutral-800 px-3 py-2 rounded-md" id="">
                                                    <option disabled selected></option>
                                                    {products.map(product => (
                                                        <option key={`op_${product.id}`} value={product.id}>{product.name}</option>
                                                    ))}
                                                </select>
                                            </label>
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="p-name">
                                                <p className="text-sm">Quantity</p>
                                                <input value={field.quantity} onChange={e => setFieldQuantity(parseInt(e.target.value), i)} required className="mt-2 block w-full bg-black outline-none border border-neutral-800 px-3 py-2 rounded-md" name={`quantity-`} type="number" min="0" step="1" id="p-name" />
                                            </label>
                                        </div>
                                        <div className="col-span-1 flex items-end justify-center">
                                            <button type="button" onClick={e => removeField(i)} className="w-10 h-10 hover:bg-neutral-900 rounded-md">⛒</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {fields.length < 3 ? <div className="flex items-center justify-center mt-10">
                                <button className="bg-neutral-900 block w-full py-3 rounded-md" type="button" onClick={addField}>Add Item</button>
                            </div> : null}
                            <div className="mt-10 flex items-center justify-between">
                                <div className="text-xl">Total Amount</div>
                                <div className="text-4xl">{totalAmount}</div>
                            </div>
                            <div className="flex items-center justify-between gap-5 mt-10">
                                <button className="text-sm px-5 py-2 hover:bg-neutral-800 text-white rounded-md font-medium" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="text-sm px-5 py-2 bg-white text-black rounded-md font-medium">Create</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
            <div className="flex flex-col px-5">
                <div className="grid grid-cols-5 px-5">
                    <div className="col-span-1 text-xl">ID</div>
                    <div className="col-span-2 text-xl">No of Items</div>
                    <div className="col-span-2 text-xl">Total Amount</div>
                </div>
                <div className="w-full h-px my-3"></div>
                {orders.map(order => (
                    <div className="grid grid-cols-5 py-3 px-5 hover:bg-neutral-900 rounded-md">
                        <div className="col-span-1 opacity-60">#{order.id}</div>
                        <div className="col-span-2 opacity-60">{order.items.length}</div>
                        <div className="col-span-2 opacity-60">{order.amount}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
