import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "next/image";
import jsPDF from 'jspdf';
import ExcelJS from 'exceljs';

export default function FreelancerList({ filters }) {
    const [freelancers, setFreelancers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchFreelancers(filters);
    }, [filters]);

    const handlePDF = () => {
        // Create new jsPDF instance
        const doc = new jsPDF();

        // Set up initial position for text
        let y = 10;

        // Add title
        doc.setFontSize(18);
        doc.text('Filtered Freelancers', 15, y);
        y += 10;

        // Add filtered freelancers data
        doc.setFontSize(12);
        freelancers.forEach((freelancer, index) => {
            const lineHeight = 7;
            const text = [
                `${index + 1}. Name: ${freelancer.firstName} ${freelancer.lastName}`,
                `   Email: ${freelancer.email}`,
                `   Age: ${freelancer.age}`,
                `   Gender: ${freelancer.gender ? 'Male' : 'Female'}`,
                `   Skills: ${freelancer.skills.join(', ')}`,
                `   Experience: ${freelancer.experience}`,
            ];

            text.forEach(line => {
                doc.text(line, 15, y);
                y += lineHeight;
            });

            // Add spacing between freelancers
            y += lineHeight;
        });

        // Save the PDF with a specified name
        doc.save('filtered_freelancers.pdf');
    }
    const handleXLS = async () => {
        try {
            // Prepare data for Excel file
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Filtered Freelancers');

            // Define columns
            worksheet.columns = [
                { header: 'Name', key: 'name', width: 20 },
                { header: 'Email', key: 'email', width: 30 },
                { header: 'Age', key: 'age', width: 10 },
                { header: 'Gender', key: 'gender', width: 10 },
                { header: 'Skills', key: 'skills', width: 30 },
                { header: 'Experience', key: 'experience', width: 20 },
            ];

            // Fill rows with data
            freelancers.forEach(freelancer => {
                worksheet.addRow({
                    name: `${freelancer.firstName} ${freelancer.lastName}`,
                    email: freelancer.email,
                    age: freelancer.age,
                    gender: freelancer.gender ? 'Male' : 'Female',
                    skills: freelancer.skills.join(', '),
                    experience: freelancer.experience,
                });
            });

            // Generate Excel file and trigger download
            const buffer = await workbook.xlsx.writeBuffer(); // Await here to ensure buffer is fully written
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'filtered_freelancers.xlsx';
            a.click();
        } catch (error) {
            console.error('Error generating Excel:', error);
            // Handle error as needed
        }
    }

    const fetchFreelancers = async (filters = {}) => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3005/api/freelancers', {
                params: filters
            });
            setFreelancers(response.data);


        } catch (error) {
            console.error('Error fetching freelancers:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className="flex flex-row justify-between w-full sm:w-[95%]">
                <h1 className=" text-4xl text-emerald-300 ">Freelancers</h1>
                <div className="flex gap-2">
                    <button className="bg-amber-200 text-amber-800 p-2 rounded" onClick={handlePDF}>Export PDF</button>
                    <button className="bg-green-200 text-green-800 p-2 rounded" onClick={handleXLS}>Export Exel</button>

                </div>

            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-12 gap-x-6 gap-y-10 mt-12 w-full sm:w-[90%]">

                    {freelancers.map((freelancer) => (
                        <div className="col-span-12 md:col-span-6 ">
                            <div className="relative p-4 rounded-2xl bg-zinc-700/25 border-2 border-emerald-300/25 hover:border-emerald-300/75  ">
                                <div className="flex gap-4 items-center ">
                                    <Image
                                        src={freelancer.gender ? "/personal-25.png" : "/woman.png"}
                                        width={100}
                                        height={100}
                                        className="bg-white rounded-3xl"
                                    />
                                    <div className="flex flex-col gap-2 text-base text-gray-200">
                                        <span >Name : {freelancer.firstName}</span>
                                        <span>Experince : {freelancer.experience} years</span>
                                    </div>
                                </div>
                                <div class="  right-4 top-3 absolute flex gap-2 items-center">
                                    {freelancer.skills.map((skill) => (

                                        <Image
                                            src={skill.concat(".svg")}
                                            width={20}
                                            height={20}
                                            className="rounded"
                                        />
                                    )
                                    )}


                                </div>
                                <div className="bottom-3 right-4 absolute">
                                    <button className="px-4 py-1 bg-cyan-600 rounded-full  text-gray-200 ">Age : {freelancer.age}</button>
                                </div>
                            </div>



                        </div>
                    ))}

                </div>
            )}

        </>


    )
}
