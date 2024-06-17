"use client";
import Image from "next/image";

import { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'


export default function Register() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: 20,
        gender: true,
        skills: [],
        experience: ''
    });
    const [requiredFields, setRequiredFields] = useState([
        'firstName', 'lastName', 'email', 'age', 'skills'
    ]);
     
    const validateForm = () => {
        for (const field of requiredFields) {
            if (!formData[field]) {
                return false;
            }
        }
        return true;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSkillsChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            // اضافه کردن مهارت به آرایه‌ی مهارت‌ها
            setFormData({ ...formData, skills: [...formData.skills, value] });
        } else {
            // حذف کردن مهارت از آرایه‌ی مهارت‌ها
            setFormData({ ...formData, skills: formData.skills.filter(skill => skill !== value) });
        }
    };
    const handleExperienceChange = (e) => {
        setFormData({
            ...formData,
            experience: e.target.value // مقدار تجربه را از رادیو باتن بگیرید
        });
    };
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill out all fields!',
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:3005/api/freelancers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Freelancer created successfully!',
            }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                  // Redirect to another page
                  router.push('/freelancers'); // مسیر صفحه دیگر را تنظیم کنید
                }
              });

            // Clear form fields or do any other necessary action
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                age: 0,
                gender: true,
                skills: [],
                experience: ''
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('New freelancer:', data);
            // انجام هر کار دیگری که نیاز دارید (بروزرسانی UI و غیره)
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="h-[100vh] w-[90%] sm:w-[45%]">
            <form onSubmit={handleSubmit}>


                <div className="flex justify-center ">

                    <div className=" sm:w-full flex flex-col w-[95%]   bg-zinc-700/50 sm:px-2   rounded-3xl border border-emerald-300 hover:border-emerald-600">

                        <div className="flex   flex-row  items-center justify-center ">
                            <h1 class="text-4xl text-emerald-300  pt-6">Sign up</h1>
                        </div>
                        <div className="flex  flex-col sm:flex-row justify-center items-center mt-10 ">
                            <div className="p-2 sm:p-6">

                                <div className=" flex flex-col sm:pr-5  sm:border-dashed sm:border-r-2 border-x-zinc-400">

                                    <div >
                                        <div className="flex flex-row  ">
                                            <label for="fname" class="p-2 text-base text-gray-200">First name :</label>
                                        </div>
                                        <div className="flex flex-row ">
                                            <input type="text" id="fname" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Michael" className="pl-5 rounded-full h-8 px-6  bg-transparent border-2 border-gray-300  text-emerald-200/75" />
                                        </div>

                                    </div>

                                    <div >
                                        <div className="flex flex-row  ">
                                            <label for="lname" class="p-2 text-base text-gray-200">Last name :</label>
                                        </div>
                                        <div className="flex flex-row ">
                                            <input type="text" id="lname" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Scofield" className="pl-5 rounded-full h-8 px-6  bg-transparent border-2 border-gray-300  text-emerald-200/75" /> </div>

                                    </div>
                                    <div >
                                        <div className="flex flex-row  ">
                                            <label for="age" class="p-2 text-base text-gray-200">Age :</label>
                                        </div>
                                        <div className="flex flex-row ">
                                            <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} placeholder="20" className="pl-5 rounded-full h-8 px-6  bg-transparent border-2 border-gray-300  text-emerald-200/75" /> </div>

                                    </div>



                                    <div >
                                        <div className="flex flex-row  ">
                                            <label for="email" class="p-2 text-base text-gray-200">Enter your email :</label>
                                        </div>
                                        <div className="flex flex-row ">
                                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="exam@gmail.com" class="pl-5 rounded-full h-8 px-6 bg-transparent border-2 border-gray-300  text-emerald-200/75" /> </div>

                                    </div>

                                    <div >
                                        <div className="flex flex-row  ">
                                            <label for="email" class="p-2 text-base text-gray-200">gender :</label>
                                        </div>
                                        <div className="flex flex-row ">
                                            <select name="gender" id="gender" value={formData.gender} onChange={handleChange} class="pl-5 rounded-full h-8 px-40   bg-transparent border-2 border-gray-300  text-emerald-300 ">
                                                <option value="true">Man</option>
                                                <option value="false">Female</option>
                                            </select>
                                        </div>

                                    </div>




                                </div>

                            </div>

                            <div className=" p-2 sm:p-6 ">
                                <div className="flex flex-col basis-2/4 ">

                                    <div className="flex flex-row">
                                        <p for="" class="p-2 text-xl text-gray-200">What do you know ?</p>
                                    </div>

                                    <div className="flex flex-col gap-1 px-2 mt-4">

                                        <div className="flex gap-6">
                                            <input type="checkbox" id="html" name="skills" value="html" onChange={handleSkillsChange} />
                                            <label for="html" className=" text-base text-gray-200">HTML</label>
                                        </div>

                                        <div className="flex gap-6">

                                            <input type="checkbox" id="css" name="skills" value="css" onChange={handleSkillsChange} />
                                            <label for="css" class=" text-base text-gray-200">CSS</label>
                                        </div>
                                        <div className="flex gap-6">


                                            <input type="checkbox" id="javascript" name="skills" value="js" onChange={handleSkillsChange} />
                                            <label for="javascript" class=" text-base text-gray-200">JavaScript</label>
                                        </div>
                                        <div className="flex gap-6">

                                            <input type="checkbox" id="tailwind" name="skills" value="tailwind" onChange={handleSkillsChange} />
                                            <label for="tailwind" class=" text-base text-gray-200">tailwind</label>
                                        </div>
                                        <div className="flex gap-6">

                                            <input type="checkbox" id="php" name="skills" value="php" onChange={handleSkillsChange} />
                                            <label for="php" class=" text-base text-gray-200">PHP</label>
                                        </div>
                                    </div>

                                    <div className="flex flex-row mt-4">
                                        <p for="" class="p-2 text-xl text-gray-200">Work Experience</p>
                                    </div>
                                    <div className="flex flex-col gap-1 px-2 mt-4">
                                        <div className="flex gap-6">

                                            <input type="radio" id="0-3" name="" value="0-3" onChange={handleExperienceChange} />
                                            <label for="0-3" class="text-base text-gray-200">0 to 3 years</label>
                                        </div>
                                        <div className="flex gap-6">

                                            <input type="radio" id="3-5" name="Experience" value="3-5" onChange={handleExperienceChange} />
                                            <label for="3-5" class="text-base text-gray-200">3 to 5 years</label>
                                        </div>
                                        <div className="flex gap-6">


                                            <input type="radio" id="5" name="Experience" value="5" onChange={handleExperienceChange} />
                                            <label for="5" class="text-base text-gray-200">more than 5 years</label>
                                        </div>
                                    </div>



                                </div>

                            </div>




                        </div>

                        <div className="flex   flex-row  m-8 justify-center">
                            <div className=" ">
                                <button type="submit" className=" px-8  py-2 bg-emerald-600 rounded-2xl text-slate-100 hover:bg-neutral-500 active:hover:bg-neutral-400 focus:outline-none focus:ring focus:ring-emerald-300">submit</button>

                            </div>

                        </div>


                    </div>

                </div>
            </form>



        </div>
    );
}