// components/DataTable.tsx
import React from "react";
import axios from "axios";

interface DataTableProps {
  data: Array<{ _id: string; name: string; email: string; age: number }>;
  onEdit: (user: {
    _id: string;
    name: string;
    email: string;
    age: number;
  }) => void;
  onDelete: (id: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            ID
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Age
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Options
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data &&
          data.map((row) => (
            <tr key={row._id}>
              <td className="px-6 py-4 whitespace-nowrap">{row._id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.age}</td>
              <td className="px-6 py-4 whitespace-nowrap space-x-5">
                <span
                  onClick={() => onDelete(row._id)}
                  className="cursor-pointer px-3 py-2 transition-all rounded bg-red-400 font-[500] hover:bg-red-500 hover:text-[white]"
                >
                  Delete
                </span>{" "}
                <span
                  onClick={() => {
                    onEdit(row);
                  }}
                  className="cursor-pointer px-3 py-2 transition-all rounded bg-blue-400 font-[500] hover:bg-blue-500 hover:text-[white]"
                >
                  Edit
                </span>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default DataTable;
