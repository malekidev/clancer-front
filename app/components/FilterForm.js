import { useState } from 'react';

export default function FilterForm({ onSubmit }) {
    const [skills, setSkills] = useState([]);
    const [gender, setGender] = useState('');
    const [experience, setExperience] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ skills, gender, experience });
    };

    const handleSkillChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSkills([...skills, value]);
        } else {
            setSkills(skills.filter(skill => skill !== value));
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 px-2 mt-8">

                <div className="flex gap-6">
                    <input type="checkbox" id="html" inname="html" value="html" onChange={handleSkillChange} />
                    <label for="html" className=" text-base text-gray-200">HTML</label>
                </div>

                <div className="flex gap-6">


                    <input type="checkbox" id="css" name="css" value="css" onChange={handleSkillChange} />
                    <label for="css" class=" text-base text-gray-200">CSS</label>
                </div>
                <div className="flex gap-6">


                    <input type="checkbox" id="javascript"  value="js"  onChange={handleSkillChange}/>
                    <label for="javascript" class=" text-base text-gray-200">JavaScript</label>
                </div>
                <div className="flex gap-6">

                    <input type="checkbox" id="tailwind" value="tailwind" onChange={handleSkillChange} />
                    <label for="tailwind" class=" text-base text-gray-200">tailwind</label>
                </div>
                <div className="flex gap-6">

                    <input type="checkbox" id="php" value="php"  onChange={handleSkillChange}/>
                    <label for="php" class=" text-base text-gray-200">PHP</label>
                </div>
            </div>




            <h2 for="" className="text-2xl text-emerald-300 mt-8">Work Experience</h2>

            <div className="flex flex-col gap-1 px-2 mt-8">
                <div className="flex gap-6">

                    <input type="radio" id="0-3" name="Experience" value="0-3" onChange={(e) => setExperience(e.target.value)} />
                    <label for="0-3" class="text-base text-gray-200">0 to 3 years</label>
                </div>
                <div className="flex gap-6">

                    <input type="radio" id="3-5" name="Experience" value="3-5" onChange={(e) => setExperience(e.target.value)} />
                    <label for="3-5" class="text-base text-gray-200">3 to 5 years</label>
                </div>
                <div className="flex gap-6">


                    <input type="radio" id="5" name="Experience" value="5" onChange={(e) => setExperience(e.target.value)}/>
                    <label for="5" class="text-base text-gray-200">more than 5 years</label>
                </div>
            </div>




            <h2 for="" className="text-2xl text-emerald-300 mt-8">Gender</h2>
            <div className="flex flex-col gap-1 px-2 mt-8">
                <div className="flex gap-6">
                    <input type="radio" id="Man" name="gender" value="male" onChange={(e) => setGender(e.target.value)} />
                    <label for="Man" class="text-base text-gray-200">Man</label>
                </div>
                <div className="flex gap-6">

                    <input type="radio" id="Female" name="gender" value="female" onChange={(e) => setGender(e.target.value)} />
                    <label for="Female" class="text-base text-gray-200">Female</label>
                </div>


            </div>
            <div className="flex justify-start">
                <button type="submit" className="mt-8 p-8 py-2 w-[85%] bg-emerald-600 rounded-2xl text-slate-100 hover:bg-neutral-500 active:hover:bg-neutral-400 focus:outline-none focus:ring focus:ring-emerald-300">submit</button>

            </div>
        </form>
    )

}
