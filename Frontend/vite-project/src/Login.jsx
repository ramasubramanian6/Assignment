import React from 'react';
import { Button, Checkbox, Form, Input,message } from 'antd';
import axiosInstance from './axios/axios.js'; 
import { useNavigate } from 'react-router-dom'; 
import { useState } from 'react';



const Login = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();



//For trial i write route here 

const onFinish = async(values) => {
    
    console.log('Success:', values);
    try {
        const response = await axiosInstance.post('/getuser', values);
        console.log(response.data);
        if(!response.data) {

            alert('Invalid Input. Please try again.');
            message.error('Invalid credentials. Please try again.');
            return;
        }
        if (response.data.length === 0) {
             alert('Invalid input. Please try again.');
            message.error('No user found with the provided credentials.');  
            return;
        }
        if(response) {
            message.success('Login successful!');
            console.log('Login successful:', response.data);
            localStorage.setItem("key", "user Login Successful");
          
            navigate('/'); 
            form.resetFields();
            return response.data; y
        }
        
    } catch (error) {
         alert('Invalid credentials. Please try again.');
        console.error('Login input.', error);
        message.error('Login failed. Please check your credentials.');
    }

};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
    
    
    
  return   (
    
    <div className='flex justify-center items-center h-screen flex-col bg-linear-to-r from-blue-200 to-blue-400'>
        <h1 className='text-6xl font-bold mb-10 ' >Login Page</h1>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className='w-1/2 h-2/4 border-2 border-blue-600  shadow-xl bg-blue-100 flex flex-col justify-center items-center p-10 rounded-lg'
        >
            <Form.Item
                label="email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
                className='text-xl font-bold w-auto  '
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                 className='text-xl font-bold '
            >
                <Input.Password />
            </Form.Item>

           
            <Form.Item label={null} >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                
            </Form.Item>
            <div>
                <p><span className='text-lg font-bold'>Test-Email:</span> ramasubramanianponni37@gmail.com</p>
                <p><span className='text-lg font-bold'>Test-Password:</span> 25111999</p>
                <p className='mt-10'>**** For demo no Register Page page is created  <span className='text-xl font-bold text-amber-900'>: )</span></p>
            </div>
           
        </Form>
    </div>
);
}
export default Login;