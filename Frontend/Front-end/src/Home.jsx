import React from "react";
import { useState, useEffect } from 'react';
import './App.css';
import axiosInstance from '../src/axios/axios.js';
import { Table, Spin, message } from 'antd';

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${text.toFixed(2)}`, // Format price as currency
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        }

    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/getallproducts');
                console.log(response);
                setData(response.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    return (
        (loading && (data == [])) ? (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold mb-4">Loading Ecommerce </h1>
                <Spin size="large" ></Spin>
            </div>

        ) : (
            <div className="mt-10">
                <h1 className="w-full flex justify-center text-2xl font-bold  mb-10">WELCOME TO ECOMMERCE</h1>
                <Table
                    dataSource={data}
                    columns={columns}
                    rowKey="name"
                    pagination={{ pageSize: 10 }}
                    onRow={(data) => ({
                        onClick: () => {
                            console.log(data);
                            
                        }
                    })}
                />
            </div>

        )
    );
}
export default Home;