"use client";
import { useState } from 'react';

import Image from "next/image";
import FilterForm from '../components/FilterForm';
import FreelancerList from '../components/FreelancerList';



export default function Freelancers() {
    const [filters, setFilters] = useState({});

    const handleFilterSubmit = (newFilters) => {
      setFilters(newFilters);
    };

    return (
        <div className="flex flex-col md:flex-row w-[95%] my-8">
            <div className="basis-1/4 ">
                <div className="bg-zinc-700/25 rounded-3xl border-2 border-neutral-400  pl-10 py-10 w-full sm:w-[85%] flex flex-col ">

                    <h2 for="" class=" text-2xl text-emerald-300">Filters</h2>
                    <FilterForm onSubmit={handleFilterSubmit} />    




                </div>

            </div>

            <div className="basis-3/4 mt-6  ">
                <div className="flex flex-col gap-2 items-center">

                    <FreelancerList filters={filters} />

                </div>

            </div>

        </div>
    );
}