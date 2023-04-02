import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Block.css";

interface Block {
  picture: string;
  semester: string;
  year: number;
  name: string;
  content: string;
}

const blocks: Block[] = [
  { picture: "picture1.png", semester: "Fall", year: 2022, name: "Block 1", content: "Block 1 content" },
  { picture: "picture2.png", semester: "Spring", year: 2021, name: "Block 2", content: "Block 2 content" },
  { picture: "picture3.png", semester: "Fall", year: 2020, name: "Block 3", content: "Block 3 content" },
  { picture: "picture4.png", semester: "Spring", year: 2021, name: "Block 4", content: "Block 4 content" },
  { picture: "picture5.png", semester: "Fall", year: 2021, name: "Block 5", content: "Block 5 content" },
  { picture: "picture6.png", semester: "Spring", year: 2022, name: "Block 6", content: "Block 6 content" },
  { picture: "picture7.png", semester: "Fall", year: 2020, name: "Block 7", content: "Block 7 content" },
  { picture: "picture8.png", semester: "Spring", year: 2021, name: "Block 8", content: "Block 8 content" },
  { picture: "picture9.png", semester: "Fall", year: 2021, name: "Block 9", content: "Block 9 content" },
  { picture: "picture10.png", semester: "Spring", year: 2022, name: "Block 10", content: "Block 10 content" },
  { picture: "picture11.png", semester: "Fall", year: 2020, name: "Block 11", content: "Block 11 content" },
  { picture: "picture12.png", semester: "Spring", year: 2021, name: "Block 12", content: "Block 12 content" },
  { picture: "picture13.png", semester: "Fall", year: 2021, name: "Block 13", content: "Block 13 content" },
  
];


const BlockPage: React.FC = () => {
  const [yearFilter, setYearFilter] = useState<number | undefined>();
  const [semesterFilter, setSemesterFilter] = useState<string | undefined>();
  const [filteredBlocks, setFilteredBlocks] = useState<Block[]>(blocks);
  const navigate = useNavigate();

  useEffect(() => {
    const yearFilteredBlocks = yearFilter !== undefined ? filteredBlocks.filter((block) => block.year === yearFilter) : filteredBlocks;
    const semesterFilteredBlocks = semesterFilter !== undefined ? filteredBlocks.filter((block) => block.semester === semesterFilter) : filteredBlocks;
    setFilteredBlocks(yearFilteredBlocks.filter((block) => semesterFilteredBlocks.includes(block)));
  }, [yearFilter, semesterFilter]);

  const handleYearFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYearFilter(parseInt(event.target.value));
  };

  const handleSemesterFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSemesterFilter(event.target.value);
  };

  const handleBlockClick = (block: Block) => {
    navigate(`/schedule/${block.year}/${block.semester}`);
  };

  return (
    <div>
      <div>
        <label htmlFor="year-filter">Year:</label>
        <select id="year-filter" onChange={handleYearFilterChange}>
          <option value="">All</option>
          <option value="2022">2020</option>
          <option value="2022">2021</option>
          <option value="2023">2022</option>
          {/* Add more options here */}
        </select>
      </div>
      <div>
        <label htmlFor="semester-filter">Semester:</label>
        <select id="semester-filter" onChange={handleSemesterFilterChange}>
          <option value="">All</option>
          <option value="Fall">Fall</option>
          <option value="Spring">Spring</option>
          {/* Add more options here */}
        </select>
      </div>
      <div>
        {filteredBlocks.map((block, index) => (
          <div key={index} className="block" onClick={() => handleBlockClick(block)}>
            <img src={block.picture} />
            <div>{`${block.semester} ${block.year} ${block.name}`}</div>
          </div>
        ))}
        <div className="block new" onClick={() => navigate("/new-schedule")}>
          +
        </div>
      </div>
    </div>
  );
};

export default BlockPage;
